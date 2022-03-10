import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";

async function deploy() {
    // grab counter
    const Counter = await ethers.getContractFactory("Counter");
    // create counter on the network
    const counter = await Counter.deploy();
    await counter.deployed();

    return counter;
}

// @ts-ignore
async function count(counter) {
    console.log("Counter from typescript : ", await counter.count());
}

deploy().then(count);