// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract SimpleStorage {
    string storedMessage;
    uint256 public totalMessages;
    uint256 public totalUsers;

    struct Contributor {
      bool alreadyContributed;
    }

    //mapping user address to user(contributor) struct
    mapping(address => Contributor) public contributors;

    constructor() {
        storedMessage = "the first messgae";
        totalMessages = 0;
        totalUsers = 0;
    }

    function set(string memory message) public {
        storedMessage = message;
        totalMessages = totalMessages + 1;
        if (contributors[msg.sender].alreadyContributed == false) {
            //update user variables
            contributors[msg.sender].alreadyContributed = true;
            totalUsers = totalUsers + 1;
        }
    }

    function getMessage() public view returns (string memory) {
        return storedMessage;
    }

    function getTotalMessages() public view returns (uint256) {
      return totalMessages;
    }

        function getTotalUsers() public view returns (uint256) {
      return totalUsers;
    }
}
