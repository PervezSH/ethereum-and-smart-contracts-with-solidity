import "@nomiclabs/hardhat-ethers";
import { Contract } from "ethers";
import { ethers } from "hardhat";

async function deployContract(name: string, ...args: any) {
    const Contract = await ethers.getContractFactory(name);
    const contract = await Contract.deploy(...args);
    await contract.deployed();

    return contract;
}

async function printStorage(contract: Contract, name: string, slots: any) {
    for (let i = 0; i < slots; i++) {
        console.log(
            name,
            i,
            await ethers.provider.getStorageAt(contract.address, i)
        );
    }
}

async function storage() {
    const c = await deployContract("C");
    const d = await deployContract("D", c.address);

    await printStorage(d, "D", 3);
}

storage();