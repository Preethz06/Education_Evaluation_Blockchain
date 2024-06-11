// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EducationEvaluation {
    struct Evaluation {
        string studentId;
        string subject;
        uint256 score;
        string evaluator;
        uint256 timestamp;
        string transactionHash;
    }

    Evaluation[] public evaluations;

    event EvaluationAdded(string studentId, string subject, uint256 score, string evaluator, uint256 timestamp, string transactionHash);

    function addEvaluation(
        string memory _studentId,
        string memory _subject,
        uint256 _score,
        string memory _evaluator
    ) public {
        string memory txHash = toAsciiString(msg.sender);
        evaluations.push(Evaluation({
            studentId: _studentId,
            subject: _subject,
            score: _score,
            evaluator: _evaluator,
            timestamp: block.timestamp,
            transactionHash: txHash
        }));
        emit EvaluationAdded(_studentId, _subject, _score, _evaluator, block.timestamp, txHash);
    }

    function getEvaluations() public view returns (Evaluation[] memory) {
        return evaluations;
    }

    function toAsciiString(address x) private pure returns (string memory) {
        bytes memory s = new bytes(42);
        s[0] = '0';
        s[1] = 'x';
        for (uint i = 0; i < 20; i++) {
            bytes1 b = bytes1(uint8(uint(uint160(x)) / (2**(8*(19 - i)))));
            bytes1 hi = bytes1(uint8(b) / 16);
            bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
            s[2*i + 2] = char(hi);
            s[2*i + 3] = char(lo);            
        }
        return string(s);
    }

    function char(bytes1 b) private pure returns (bytes1 c) {
        if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
        else return bytes1(uint8(b) + 0x57);
    }
}
