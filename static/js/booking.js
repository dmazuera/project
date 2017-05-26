console.log("in booking js")

function total(start_date, end_date) {
    var totalMonths = "end_date" - "start_date";
    var priceListing = 15;

    var totalPrice = totalMonths * priceListing;

    return totalPrice;
}


$('#booking_total').on('click', function(evt){ 
    evt.preventDefault();
    var total_amount = total(15, 30);
    $('#result').text(total_amount);

})
// $('#book-listings').on('submit', function (evt) {
//     evt.preventDefault();
//     // debugger

//     // var startDate = parseInt($('#start_date').val());
//     // var endDate = parseInt($('#end_date').val());

//     var total_amount = total(15, 30);

//     $('#result').text(total_amount);

// });

