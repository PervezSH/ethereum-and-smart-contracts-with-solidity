// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

// deploy this contract first
contract A {
    // storage layout must be the same as Contract B
    uint256 a;

    function setA(uint256 _a) public {
        a = _a;
    }

    function getA() public view returns (uint256) {
        return a;
    }
}

contract B {
    uint256 b;
    address ContractA;

    constructor(address _A) {
        ContractA = _A;
    }

    function setB(uint256 _b) public {
        b = _b;
        // B's storage is set, A is not modified.
        (bool sucess, bytes memory data) = ContractA.delegatecall(
            abi.encodeWithSignature("SetA(uint256)", _b + 1)
        );
    }

    function getB() public view returns (uint256) {
        return b;
    }
}
