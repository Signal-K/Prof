import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../lib/UserContext";
import Loading from "./loading";

const Profile = () => {
  const history = useHistory();
  const [user] = useContext(UserContext);

  // Redirect to login page if not loading and no user found
  useEffect(() => {
    user && !user.loading && !user.issuer && history.push("/login");
  }, [user, history]);

  return (
    <>
      {user?.loading ? (
        <Loading />
      ) : (
        user?.issuer && (
          <>
            <div className="label">Email</div>
            <div className="profile-info">{user.email}</div>

            <a href="https://dao.emulsion.space"><div className="label">User Id</div></a>
            <div className="profile-info">{user.issuer}</div>
            <div className="profile-info">{walletAccount}</div>
            <br />

            {/*
            Only show this component if the web3 wallet has an NFT belonging to the Star Sailors collection
            <IonPhaser game={game} />*/}
            <SearchForm />

            {/* <Utterances /> -> <script src="https://utteranc.es/client.js"
        repo="[ENTER REPO HERE]"
        issue-term="pathname"
        theme="github-light"
        crossorigin="anonymous"
        async>
</script> */}
          </>
        )
      )}
      <style>{`
        .label {
          font-size: 12px;
          color: #6851ff;
          margin: 30px 0 5px;
        }
        .profile-info {
          font-size: 17px;
          word-wrap: break-word;
        }
      `}</style>
    </>
  );
};

export default Profile;
