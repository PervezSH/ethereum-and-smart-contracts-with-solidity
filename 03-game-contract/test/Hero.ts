import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import { expect } from "chai";
import { Contract } from "ethers";

describe("Hero", function() {
    async function deployHero() {
        const Hero = await ethers.getContractFactory("TestHero");
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
    it("should check if stats are correctly assigned", async function () {
        const hero = await deployHero();
        await hero.setRandom(69);
        // generate hero
        await hero.createHero(0, {
            value: ethers.utils.parseEther("0.05")
        });
        // get the first hero
        const h = (await hero.getHeroes())[0];
        // For 69; [S, H, D, I, M]
        // 1st Pos will be 4, Magic; value will be 16; [S, H, D, I]
        // 2nd Pos will be 1, Health; value will be 2; [S, I, D]
        // 3nd Pos will be 0, Stength; value will be 6; [D, I]
        // 4nd Pos will be 1, Intellect; value will be 10; [D]
        // 5nd Pos will be 0, Dexterity; value will be 14; []
        expect(await hero.getMagic(h)).to.equal(16);
        expect(await hero.getHealth(h)).to.equal(2);
        expect(await hero.getStrength(h)).to.equal(6);
        expect(await hero.getIntellect(h)).to.equal(10);
        expect(await hero.getDexterity(h)).to.equal(14);
    })
});