debugging = false; //true to see console messages
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
var GoalTrackerContractSpec = web3.eth.contract(abi);
var gt = GoalTrackerContractSpec.at(contractAddress)

tx_param = {from: usr_acc, gas: _gasLimit};

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

    formData = new FormData(document.getElementById("theme_form"));
    if (formData.get("wager") == "" && formData.get("theme_title") == "") return;

    gt.addTheme(formData.get("wager"), formData.get("theme_title"), goalIds, 10, tx_param);

    $(':input','#theme_form')
        .not(':button, :submit, :reset, :hidden')
        .val('');
}

function submitMilestones(){
    goal_ids = []
    milestones_buffer.forEach(function(val){
        gt.addGoal(val.description, val.due, tx_param);
        goal_ids.push(gt.getGoalCount().toNumber());
    }); 
    milestones_buffer.clear();
    $("#milestones_buffer").empty();
    return goal_ids;
}

function toUNIXtime(date){
    return new Date(date).getTime()/1000;
}

function fromUNIXtime(time){
    return new Date(time*1000);
}


function populateThemes(themeName, wager, goals, date){
    // append to panel-group,  opener + themeName + divstring +populateMilestones(goals) + closeDiv
newTheme = '<div class="col-md-3 panelspace"><div class="panel panel-default"><div class="panel-heading">'
         + themeName + '<span class="badge badge-pill badge progress-bar-dark"> €' 
        + wager + '</span></div><div class="panel-body"><ul class="list-group">' 
        + populateMilestones(goals, date) + '</ul></div>';

      $("#allThemes").append(newTheme);
}

function populateMilestones(goals, date){
return '<li class="list-group-item"><div class="card" style="width: 18rem;"><div class="card-body"><h5 class="card-title">'
                + goals + '<span class="badge badge-pill badge progress-bar-info">' 
                + date 
                + '</span></h5>'
                + '<button type="button" class="btn btn-success" data-toggle="modal" data-target="#addProofModal">' 
                + 'Add Proof URL'
                + '</button></div></li>';

}
