// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract C {
    uint256 a;
}

contract D {
    uint256 d = 0x55;
    address ContractC;
    uint8 dd = 0x8;

    constructor(address _C) {
        ContractC = _C;
    }
}
