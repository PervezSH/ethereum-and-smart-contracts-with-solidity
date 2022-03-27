import "@nomiclabs/hardhat-ethers"
import { Contract } from "ethers";
import { ethers } from "hardhat";

async function deploy() {
    const Fallback = await ethers.getContractFactory("Fallback");
    const fallback = await Fallback.deploy();
    await fallback.deployed()

    return fallback;
}

async function callCount(fallback: Contract) {
    const f = await ethers.getContractAt("IFallback", fallback.address);
    await f.count();
}

deploy().then(callCount);