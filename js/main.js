$("#text").keypress(function(event){
    if(event.which === 13){
       var goalText = $(this).val();
       //clear the input afterwards
       $(this).val("");
       //create a new li and add to ul
       $("ul").append("<li> " + goalText + "</li>")

    }
});

$("#value").keypress(function(event){
    if(event.which === 13){
       var goalValue = $(this).val();
       //clear the input afterwards
       $(this).val("");
       //create a new li and add to ul
       $("ul").append("<li> " + goalValue + "</li>")

    }
});

// //Kategorie hinzufügen
// $("#text").keypress(grab);
// //Zahlenwert hinzufügen
// $("#value").keypress(grab);

// function grab(event){
// 	if(event.which === 13){
// 		var goalValue =$("#text").val();
// 		var goalText =$("#number").val();
// 		if(goalValue == "" || goalText == ""){
// 			alert("Please fill out both!");
// 		} else {
// 			$("#value").val("");
// 			$("#text").val("Milestone");
// 			$("ul").append("<li> " + goalText + "<span class='betrag'>" + goalValue + "€</span></li>")
// 		}
// 	} 
// }