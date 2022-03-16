// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Hero {
    enum Class {
        Mage,
        Healer,
        Barbarian
    }

    function createHero(Class class) public payable {
        require(msg.value >= 0.05 ether, "Please send more money!!!");
    }
}
