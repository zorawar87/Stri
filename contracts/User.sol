pragma solidity ^0.5;

import "browser/Theme.sol";

contract User {
    Theme[] themes;
    
    constructor()
        public
    {
    }

    // returns the number of transfers (debits) made by _debtor
    function getThemeCount()
        public
        view
        returns (uint)
    {
        return themes.length;
    }

    function getTheme(uint _themeId)
        public
        view
        returns (Theme)
    {
        return themes[_themeId];
    }
    
    function addTheme(Theme _theme)
        public
    {
        themes.push(_theme);
    }
}

