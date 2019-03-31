$('#due_date').datepicker({
    autoclose: true,
    todayHighlight: true
});

function getThemes(){
    nThemes = onTrackDapp.getThemeCount().toNumber();
    for(i=0; i < nThemes; i++){
        currentTheme = onTrackDapp.themes(usr_acc, i);
        goalIds = onTrackDapp.getGoals(usr_acc, currentTheme[0].toNumber()-1);

        goalData =[]
        goalIds.forEach(function(val){
            goalData.push(onTrackDapp.goals(val.toNumber()));
        });

        goals = []
        goalData.forEach(function(val){
            goals.push({
                description: val[1],
                date: fromUNIXtime(val[2].toNumber())
            })
        });

        populateThemes(
            currentTheme[2], currentTheme[1].toNumber(),
            goals
        );
    }
}
getThemes();

function populateThemes(themeName, wager, goals){
newTheme = '<div class="col-md-3 panelspace"><div class="panel panel-default"><div class="panel-heading">'
         + themeName + '<span class="badge badge-pill badge progress-bar-dark"> €' 
        + wager + '</span></div><div class="panel-body"><ul class="list-group">' ;
    
    goals.forEach(function(val){
        newTheme+= populateMilestone(val.description, val.date)
    });
    newTheme += '</ul></div>';

      $("#allThemes").append(newTheme);
}

function populateMilestone(description, date){
return '<li class="list-group-item"><div class="card" style="width: 18rem;"><div class="card-body"><h5 class="card-title">'
                + description + '<span class="badge badge-pill badge progress-bar-info">' 
                + date 
                + '</span></h5>'
                + '<button type="button" class="btn btn-success" data-toggle="modal" data-target="#addProofModal">' 
                + 'Add Proof URL'
                + '</button></div></li>';
}

milestones_buffer = new Set(); 
$('#milestone_button').click(function () {
    formData = new FormData(document.getElementById("milestones"));
    if (formData.get("description") == "" && formData.get("due_date") == "") {
        alert("please enter a valid milestone!")
        return;
    }

    milestones_buffer.add({
        description: formData.get("description"),
        due: toUNIXtime(formData.get("due_date"))
    });

    $(':input','#milestones')
        .not(':button, :submit, :reset, :hidden')
        .val('');

    $('#milestones_buffer').append("<li> {" + formData.get("description") + "} is due on {"+ formData.get("due_date")+"}</li>");
});

proof = -1;
$("#url_button").click(function(){
    if($("#url").val() == 0)
        alert("enter proof url!")
    proof++;

    onTrackDapp.addProof(proof, $("#url").val());
});

$('#theme_submit').click(function (){
    if (milestones_buffer.size == 0) {
        alert("without milestones, you can't get your wager back");
        return;
    }
    goalIds = submitMilestones();

    formData = new FormData(document.getElementById("theme_form"));
    if (formData.get("wager") == "" && formData.get("theme_title") == "") return;

    onTrackDapp.addTheme(formData.get("wager"), formData.get("theme_title"), goalIds, 10, tx_param);

    $(':input','#theme_form')
        .not(':button, :submit, :reset, :hidden')
        .val('');
});

function submitMilestones(){
    goal_ids = []
    milestones_buffer.forEach(function(val){
        onTrackDapp.addGoal(val.description, val.due, tx_param);
        goal_ids.push(onTrackDapp.getGoalCount().toNumber());
    }); 
    milestones_buffer.clear();
    $("#milestones_buffer").empty();
    $("#addTheme").modal('hide');
    return goal_ids;
}


function addSampleToDapp(){
    goal_ids = []
    onTrackDapp.addGoal("Look for accommodations", toUNIXtime("01/05/19"), tx_param);
    goal_ids.push(onTrackDapp.getGoalCount().toNumber());
    onTrackDapp.addGoal("Look for flight tickets", toUNIXtime("15/05/19"), tx_param);
    goal_ids.push(onTrackDapp.getGoalCount().toNumber());
    onTrackDapp.addTheme(150, "Plan trip to Japan", goal_ids, 10, tx_param);

    goal_ids = []
    onTrackDapp.addGoal("Learn 20 new words in a week", toUNIXtime("12/04/19"), tx_param);
    goal_ids.push(onTrackDapp.getGoalCount().toNumber());
    onTrackDapp.addGoal("Learn 3 conjugations", toUNIXtime("20/04/19"), tx_param);
    goal_ids.push(onTrackDapp.getGoalCount().toNumber());
    onTrackDapp.addTheme(20, "Learning french", goal_ids, 10, tx_param);
}
