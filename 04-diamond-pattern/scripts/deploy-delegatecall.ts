import "@nomiclabs/hardhat-ethers"
import { ethers } from "hardhat";

async function deployContract(name: string, ...args: any) {
    const Contract = await ethers.getContractFactory(name);
    const contract = await Contract.deploy(...args);
    await contract.deployed();

    return contract;
}

async function delegateCall() {
    const a = await deployContract("A");
    const b = await deployContract("B", a.address);

    console.log("A : ", await a.getA());
    console.log("B : ", await b.getB());
    console.log("--------------------");

    await a.setA(10);
    console.log("A : ", await a.getA());
    console.log("B : ", await b.getB());
    console.log("--------------------");

    await b.setB(20);
    console.log("A : ", await a.getA());
    console.log("B : ", await b.getB());
    console.log("--------------------");
}

delegateCall();