// Is there a way to integrate this with the main contract?
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract Comments {
    // Exposed data structure
    struct Comment {
        uint32 id;
        string topic;
        address creator_address;
        string message;
        uint256 created_at;
    }

    // Notify users that a comment was added
    event CommentAdded(Comment comment);
    // Fetch a list of comments for a topic
    function getCommments(string calldata topic) public view returns(Comment[] memory) {}

    // Store each topic with its array of associated comments
    mapping(string => Comment[]) private commentsByTopic;

    // Implement getComments test
    function getComments(string calldata topic) public view returns(Comment[] memory) {
        return commentsByTopic[topic];
    }

    // Data struct for adding comments
    uint32 private idCounter;

    // Persist a new comment
    function addComment(string calldata topic, string calldata message) public {
        Comment memory comment = Comment({
            id: idCounter,
            topic: topic,
            creator_address: msg.sender,
            message: message,
            created_at: block.timestamp
        });
        commentsByTopic[topic].push(comment);
        idCounter++;
        emit CommentAdded(comment);
    }
}