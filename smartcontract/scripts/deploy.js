const { ethers } = require("hardhat");

async function main() {
  const simpleStorageContract = await ethers.getContractFactory(
    "SimpleStorage"
  );
  // here we deploy the contract
  const deployedSimpleStorageContract = await simpleStorageContract.deploy();
  await deployedSimpleStorageContract.deployed();
  // print the address of the deployed contract
  console.log(
    "SimpleStorage Contract Address:",
    deployedSimpleStorageContract.address
  );
}
// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
