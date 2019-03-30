pragma solidity ^0.5;

import "browser/Goal.sol";

contract Theme {
    uint private counter = 0;
    
    uint public id;
    uint public wager;
    string public description;
    Goal[] public goals;
    
    uint[] private paybacks;
    
    constructor (Goal[] memory _goals, uint _wager, string memory _description)
        public
    {
        counter++;
        id = counter;
        wager = _wager;
        description = _description;
        goals = _goals;
    }
}

