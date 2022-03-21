// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Here.sol";

contract TestHero is Hero {
    uint256 random;

    function generateRandom() public view override returns (uint256) {
        return random;
    }

    function setRandom(uint256 r) public {
        random = r;
    }
}
