import "@nomiclabs/hardhat-ethers"; // adds bunch of convenient methods, to ethers library
import { ethers } from "hardhat";
import { expect } from "chai"; // for testing

describe("Hello World", () => {
    it("should get the hello world",async () => {
        // Deploy
        // create EVM understandable format
        const HelloWorld = await ethers.getContractFactory("HelloWorld");
        // deploy it to a network
        const hello = await HelloWorld.deploy();
        // wait
        await hello.deployed();
        // Call function to test'
        expect(await hello.hello()).to.equal("Hello, World");
    });
});