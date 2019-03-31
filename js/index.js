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

tx_param = {from: web3.eth.defaultAccount, gas: _gasLimit};

milestones_buffer = new Set(); 

$('#milestone_button').click(addMilestone);
function addMilestone() {
    let formData = new FormData(document.getElementById("milestones"));
    if (formData.get("description") == "" && formData.get("due_date") == "") return;

    milestones_buffer.add({
        description: formData.get("description"),
        due: toUNIXtime(formData.get("due_date"))
    });

    $(':input','#milestones')
        .not(':button, :submit, :reset, :hidden')
        .val('');

    $('#milestones_buffer').append("<li> {" + formData.get("description") + "} is due on {"+ formData.get("due_date")+"}</li>");
}

$('#theme_submit').click(addTheme);
function addTheme(){
    if (milestones_buffer.size == 0) {
        alert("no milestones => no way to get wager back");
        return;
    }
    goalIds = submitMilestones();

    let formData = new FormData(document.getElementById("milestones"));
    if (formData.get("description") == "" && formData.get("due_date") == "") return;

    milestones_buffer.add({
        description: formData.get("description"),
        due: toUNIXtime(formData.get("due_date"))
    });

    $(':input','#milestones')
        .not(':button, :submit, :reset, :hidden')
        .val('');

    gt.addTheme()
}

function submitMilestones(){
    goal_ids = []
    milestones_buffer.forEach(function(val){
        gt.addGoal(val.description, val.due, tx_param);
        goal_ids.push(gt.getGoalCount().toNumber());
    }); 
    milestones_buffer.clear();
    $("#milestone_button").empty();
    return goal_ids;
l

function toUNIXtime(date){
    return new Date(date).getTime()/1000;
}

function fromUNIXtime(time){
    return new Date(time*1000);
}


function popoulateThemes(themeName, goals){
    // append to panel-group,  divstring + themeName + divstring +populateMilestones(goals) + closeDiv

}

function populateMilestones(goals){

}

$('#url_button').click(function(){
    $('#url_button').parent().parent().addClass('bg-info');
});


// $("url_button").click(function(){
//     var color = clicked ? 'red' : 'blue';
//     $("ul").css('background-color', red);
//     clicked = !clicked;
// });
