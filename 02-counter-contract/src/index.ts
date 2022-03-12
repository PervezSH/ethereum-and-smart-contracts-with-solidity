import { ethers } from "ethers";
import CounterJson from "../artifacts/contracts/Counter.sol/Counter.json";

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
        CounterJson.abi, // abi
        provider.getSigner()
    );

    const el = document.createElement("div");
    async function setCounter(count?) {
        el.innerHTML = count || await contract.getCounter();
    }
    setCounter();
    const button = document.createElement("button");
    button.innerText = "increment";
    button.onclick = async function () {
        await contract.count();
    }

    // listens to the increment counter
    contract.on(contract.filters.CounterInc(), function (count) {
        setCounter(count);
    });

    document.body.appendChild(el);
    document.body.appendChild(button);
}

getContract();