// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "./AppStorage.sol";

contract C {
    AppStorage s;

    function setA(uint256 _a) public {
        s.a = _a;
    }

    function getA() public view returns (uint256) {
        return s.a;
    }
}

contract D {
    AppStorage s;

    constructor(address _C) {
        s.ContractC = _C;
        s.b = 0x20;
        s.c = 0x30;
    }

    function setB(uint256 _b) public {
        s.b = _b;
        // B's storage is set, A is not modified.
        (bool sucess, bytes memory data) = s.ContractC.delegatecall(
            abi.encodeWithSignature("setA(uint256)", _b + 1)
        );
        console.log("Success", sucess);
    }

    function getB() public view returns (uint256) {
        return s.b;
    }
}
