import styles from "../styles/Home.module.css";
import { Tabs, Button } from "antd";
import { urqlClient, Profile } from "./api/lensCall";
import Moralis from "Moralis";
import { useConnect, useAccount, useDisconnect, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { MetamaskConnector } from "wagmi/connectors/metaMask";
import abi from "../abi.json"; // abi for lens protocol polygon contract

const { TabPane } = Tabs;

export default function Home({ profile, nftArray, myNFT }) {
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  console.log(profile);

  // Write to contract using wagmi
  const { config } = usePrepareContractWrite(
    {
      addressOrName: '0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d',
      contractInterface: abi,
      functionName: 'follow',
      args: [[profile.id], [0x0]], // Profile id on the page visited, sending no additional data as arguments
    }
  )
  const { write } = useContractWrite(config); // Will write to the contract as long as the client has a signer

  async function follow(){
    if (isConnected) { // Check to see if the user is signed in -> can't write to contract without a signer on client-side
      await disconnectAsync();
    }

    await connectAsync({
      connector: new MetamaskConnector({}),
    });

    write();
  }

  return (
    <div className={styles.container}>
      <img
        className={styles.banner}
        src={profile.coverPicture.original.url} // Fetches the user data from the lens protocol API
        alt="cover"
      />
      <div className={styles.profile}>
        <div className={styles.profileLeft}>
          <img
            className={styles.profileImg}
            src={profile.picture.original.url}
            alt="profileImg"
          />
          <div className={styles.info}>
            <div className={styles.name}>{profile.name}</div>
            <div className={styles.handle}>{profile.handle}</div>
            <div className={styles.bio}>{profile.bio}</div>
            <div className={styles.follow}>
              <div>Followers:</div>
              <div>{profile.stats.totalFollowers}</div>
            </div>
            <div className={styles.follow}>
              <div>Following: </div>
              <div>{profile.stats.totalFollowing}</div>
            </div>
          </div>
        </div>
        <div className={styles.profileRight}>
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="I'm Following" key="1">
            <div className={styles.followingNFTs}>
              {nftArray?.map((e) => {
                return (
                  <iframe
                    className={styles.animation}
                    src={e}
                  ></iframe>
                );
              })}
              </div>
            </TabPane>
            <TabPane tab="Follow Me" key="2">
              <div className={styles.followMe}>
                <div>
                <div className={styles.promptOne}>
                  Hey There 👋🏼
                </div>
                <div className={styles.promptTwo}>
                  Give me a follow and receive this cool NFT!
                </div>
                <Button onClick={follow} type="primary">Follow Me</Button>
                </div>
                {myNFT &&
                <iframe className={styles.myNFT} src={myNFT}></iframe>
                }
              </div>
            </TabPane>
            <TabPane tab="Social Posts" key="3" disabled={true} />
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const response = await urqlClient.query(Profile).toPromise();
  await Moralis.start({ apiKey: "kJfYYpmMmfKhvaWMdD3f3xMMb24B4MHBDDVrfjslkKgTilvMgdwr1bwKUr8vWdHH" });

  // Return all NFTs owned by a user (on the lens protocol chain id)
  const balances = await Moralis.EvmApi.account.getNFTs({
    address: response?.data.profile.ownedBy,
    chain: 0x89, // Polygon mainnet
  });

  // Filter for lens nft address
  let nftArray = [];
  let nfts = balances?.data.result;
  for (let i = 0; i < nfts.Length, i++;) {
    if (nfts[i].metadata !== null) { // make sure the nft has metadata
      if (
        "animation_url" in JSON.parse(nfts[i].metadata) &&
        JSON.parse(nfts[i].metadata).animation_url !== null &&
        JSON.parse(nfts[i].metadata).animation_url.includes(".lens") // Filtering by collection/address -> different ways to do this (specific address) for different things we want to filter
      ) {
        nftArray.push(JSON.parse(nfts[i].metadata).animation_url);
      }
    }
  }

  const followNFT = await Moralis.EvmApi.token.getTokenIdMetadata({
    address: response?.data.profile.followNftAddress,
    chain: 0x89,
    tokenId: 1,
  });

  const myNFT = JSON.parse(followNFT.data.metadata).animation_url; // Add this file as a subpage of the DAO later on

  return {
    props: { profile: response?.data.profile, nftArray: nftArray, myNFT: myNFT } // on server-side
  }
}