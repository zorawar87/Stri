_gasLimit = 300000;

// web3js configuration
if (typeof web3 !== 'undefined')  {
	web3 = new Web3(web3.currentProvider);
} else {
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

sys_acc = web3.eth.accounts[0];
usr_acc = web3.eth.defaultAccount = web3.eth.accounts[1];
abiDecoder.addABI(abi);
var onTrackContractSpec = web3.eth.contract(abi);
var onTrackDapp = onTrackContractSpec.at(contractAddress)

tx_param = {from: usr_acc, gas: _gasLimit};

function toUNIXtime(date){
    return new Date(date).getTime()/1000;
}

function fromUNIXtime(time){
    return new Date(time*1000).toDateString();
}

