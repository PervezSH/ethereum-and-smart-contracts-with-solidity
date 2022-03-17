import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import { expect } from "chai";
import { Contract } from "ethers";

describe("Hero", function() {
    async function deployHero() {
        const Hero = await ethers.getContractFactory("Hero");
        const hero = await Hero.deploy();
        await hero.deployed();

        return hero;
    }
    let hero : Contract;
    // runs once before the first test in this block
    before(async function () {
        hero = await deployHero();
    });
    it("should get a zero hero array", async function () {
        expect(await hero.getHeroes()).to.deep.equal([]);
    })
    it("should fail at creating hero cause of payment", async function () {
        let e : any;
        try {
            await hero.createHero(0, {
                value: ethers.utils.parseEther("0.0499999999")
            });
        } catch (err) {
            e = err;
        }

        expect(e.message.includes("Please send more money!!!")).to.equal(true);
    })
});