$('#due_date').datepicker({
    autoclose: true,
    todayHighlight: true
});

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

function getThemes(){
    ALL = []
    nThemes = gt.getThemeCount().toNumber();
    for(i=0; i < nThemes; i++){
        currentTheme = gt.themes(usr_acc, i);
        goalIds = gt.getGoals(usr_acc, currentTheme[0].toNumber()-1);
        ALL.push(currentTheme);

        goalData =[]
        goalIds.forEach(function(val){
            goalData.push(gt.goals(val.toNumber()));
        });

        goals = []
        goalData.forEach(function(val){
            goals.push({
                description: val[1],
                date: fromUNIXtime(val[2].toNumber())
            })
        });
        ALL.push(goals);

        populateThemes(
            currentTheme[2], currentTheme[1].toNumber(),
            goals
        );
    }
    return ALL;
}
