pragma solidity ^0.5;

contract Goal {
    uint public id;
    string public description;
    uint public dateUNIX;
    // -1 => flagged; 0 => incomplete; 1 => confirming proof; 2 => done
    int public status;

    string private proof_URL;
    
    constructor (uint _id, string memory _description, uint _date, int _status)
        public
    {
        id = _id;
        description = _description;
        dateUNIX = _date;
        status = _status;
    }
    
    function addProof(string memory url)
        public 
    {
        proof_URL = url;
    }
}

