
function FilterListings(start_date, end_date, min_price, max_price, ad-height, ad-width) {
    var totalDays = end_date - start_date;
    var priceListing = 15;

    var totalPrice = totalDays * priceListing;

    return totalPrice;
}

$('#refine-search').on('submit', function (evt) {
    evt.preventDefault();
    // debugger


    var startDate = parseInt($('#start_date').val());
    var endDate = parseInt($('#end_date').val());

    var total_amt = total(startDate, endDate);

    $('#result').text(total_amt);

});




Function: 
Take in the adustments from max_price min_price... startDate endDate.... ad dimensions.. and 
SEARCH through the zipcode datamase **already** displayed on the page and
filter that database FURTHER to show now only 

Marker results that match that filter ask.

