// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract Fallback {
    function foo() internal view {
        console.log("Hello, World!");
    }

    // function that catches call that doesn't matches any func invocation
    fallback() external payable {
        foo();
        console.log("fallback");

        revert("You shouldn't be here!");
    }
}
