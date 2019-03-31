debugging = false; //true to see console messages
_gasLimit = 200000;

// web3js configuration
if (typeof web3 !== 'undefined')  {
	web3 = new Web3(web3.currentProvider);
} else {
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
web3.eth.defaultAccount = web3.eth.accounts[0];
abiDecoder.addABI(abi);
var GoalTrackerContractSpec = web3.eth.contract(abi);
var gt = GoalTrackerContractSpec.at(contractAddress)


milestones_buffer = new Set(); 

$('#milestone_button').click(addMilestone);
function addMilestone() {
    let formData = new FormData(document.getElementById("milestones"));
    milestones_buffer.add({
        desc: formData.get("description"),
        due: formData.get("due_date")
    });
    $('#milestones_buffer').append("<li> {" + formData.get("description") + "} is due on { "+ formData.get("due_date")+" }<a href='#' class='close' aria-hidden='true'>&times;</a></ul>");
}

function deleteMilestone(){
}


function addTheme(){

}
