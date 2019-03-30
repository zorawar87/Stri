pragma solidity ^0.5;

import "browser/User.sol";
import "browser/Theme.sol";
import "browser/Goal.sol";

contract Manager {
    mapping (address => User) public users;
    
    function addUser(address _addr)
        public
    {
        users[msg.sender] = new User();
    }
    
    function addTheme(Theme _theme)
        public
    {
        users[msg.sender].addTheme(_theme);
    }
}
