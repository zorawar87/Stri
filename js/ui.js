$('#due_date').datepicker({
    autoclose: true,
    todayHighlight: true
});

function getThemes(){
    nThemes = gt.getThemeCount().toNumber();
    for(i=0; i < nThemes; i++){
        currentTheme = gt.themes(user_acc, i);
        populateThemes(
            currentTheme[2], currentTheme[1].toNumber(),
        )
    }
}
