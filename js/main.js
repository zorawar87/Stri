$("input[type='text']").keypress(function(event){
    if(event.which === 13){
       var goalText = $(this).val();
       //clear the input afterwards
       $(this).val("");
       //create a new li and add to ul
       $("ul").append("<li> " + goalText + "</li>")

    }
});

$("input[type='number']").keypress(function(event){
    if(event.which === 13){
       var goalValue = $(this).val();
       //clear the input afterwards
       $(this).val("");
       //create a new li and add to ul
       $("ul").append("<li> " + goalValue + "</li>")

    }
});