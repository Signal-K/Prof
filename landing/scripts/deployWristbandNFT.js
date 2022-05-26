const hre = require("hardhat");

async function main() {
  const WristBandNFT = await hre.ethers.getContractFactory("WristbandNFT");
  const wristBandNFT = await WristBandNFT.deploy();

  await roboPunksNFT.deployed();

  console.log("WristbandNFT deployed to:", wristBandNFT.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
