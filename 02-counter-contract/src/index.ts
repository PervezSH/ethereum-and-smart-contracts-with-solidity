import { ethers } from "ethers";

// get ethereum
function getEth() {
    // @ts-ignore
    const eth = window.ethereum;
    if (!eth) throw new Error("Get Metamask!!!");
    return eth;
}
// hasAccoount
async function hasAccounts() {
    const eth = getEth();
    const accounts = await eth.request({method: "eth_accounts"}) as String[];
    return accounts.length > 0;
}
// request account
async function requestAccounts() {
    const eth = getEth();
    const accounts = await eth.request({method: "eth_requestAccounts"}) as String[];
    return accounts && accounts.length > 0;
}
// getContract
async function getContract() {
    const contractAddress = process.env.CONTRACT_ADDRESS;
    if (!await hasAccounts() && !await requestAccounts()) {
        throw new Error("Can't Access MetaMask!!!");
    }
    // get provider
    const provider = new ethers.providers.Web3Provider(getEth());
    // get contract
    const contract = new ethers.Contract(
        contractAddress,
        [
            "function count() public",
            "function getCounter() public view returns (uint256)",
        ], // abi
        provider
    );

    const el = document.createElement("div");
    async function setCounter() {
        el.innerHTML = await contract.getCounter();
    }
    setCounter();
    const button = document.createElement("button");
    button.innerText = "increment";
    button.onclick = async function () {
        await contract.count();
        setCounter();
    }
    document.body.appendChild(el);
    document.body.appendChild(button);
}

getContract();