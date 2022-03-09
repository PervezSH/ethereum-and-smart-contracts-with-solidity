import { ethers } from "ethers";

function getEth() {
    // @ts-ignore
    const eth = window.ethereum;
    if (!eth) throw new Error("Get MetaMask!!!");
    return eth;
}

async function hasAccunts() {
    const eth = getEth();
    const accounts = await eth.request({methode: "eth_accounts"}) as string[];
    return accounts && accounts.length;
}

async function requestAccunts() {
    const eth = getEth();
    const accounts = await eth.request({methode: "eth_requestAccounts"}) as string[];
    return accounts && accounts.length;
}

async function getContract() {
    const contractAddress = process.env.CONTRACT_ADDRESS;
    if (!await hasAccunts() && await requestAccunts()){
        throw new Error("Can't Access MetaMask!!!");
    }
    // we should have access to your meta mask at this point
    // get provider, which is metamask
    const provider = new ethers.providers.Web3Provider(getEth());
    const contract = new ethers.Contract(
        contractAddress, // given the location of our contract, in this network
        [
            "function hello() public pure returns (string memory)"
        ], // give interface, abi
        provider, // tells where the networks at
    );

    console.log("We have done it, time to call");
    console.log(await contract.hello());
}

getContract();