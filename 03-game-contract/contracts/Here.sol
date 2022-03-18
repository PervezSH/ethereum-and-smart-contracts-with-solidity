// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Hero {
    enum Class {
        Mage,
        Healer,
        Barbarian
    }

    // store heroes
    mapping(address => uint256[]) addressToHeroes;

    function getHeroes() public view returns (uint256[] memory) {
        return addressToHeroes[msg.sender];
    }

    // random number generation
    function generateRandom() public view returns (uint256) {
        return
            uint256(
                keccak256(abi.encodePacked(block.difficulty, block.timestamp))
            );
    }

    function createHero(Class class) public payable {
        require(msg.value >= 0.05 ether, "Please send more money!!!");
        // strength, health, intellect, magic, dexterity

        uint256[] memory stats = new uint256[](5);
        stats[0] = 2; // strength
        stats[1] = 7; // health
        stats[2] = 12; // intellect
        stats[3] = 17; // magic
        stats[4] = 22; // dexterity

        uint256 len = 5;
        uint256 hero = uint256(class);

        do {
            // randomly select a stat from stats array
            uint256 pos = generateRandom() % len;
            // ramdomly choose a value for that stat
            uint256 value = (generateRandom() % (13 + len)) + 1;
            // put stats info into hero
            // first 2 bits represents class
            // next 5 bits represents health
            // ...and so on
            hero |= value << stats[pos];

            len--;
            stats[pos] = stats[len];
        } while (len > 0);
        addressToHeroes[msg.sender].push(hero);
    }
}
