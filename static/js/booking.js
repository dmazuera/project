

function total(start_date, end_date) {
    var totalDays = end_date - start_date;
    var priceListing = 15;

    var totalPrice = totalDays * priceListing;

    return totalPrice;
}

$('#book-listings').on('submit', function (evt) {
    evt.preventDefault();
    // debugger


    var startDate = parseInt($('#start_date').val());
    var endDate = parseInt($('#end_date').val());

    var total_amt = total(startDate, endDate);

    $('#result').text(total_amt);

});