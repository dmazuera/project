console.log("in booking js")



$('#calc-months').on('click', function(evt){ 
    evt.preventDefault();
    console.log("noticed click")

    var start_date = $('#start_date').val();
    var end_date = $('#end_date').val();
    var total_amount = total(start_date, end_date);

    $('#rent-price-result').text(total_amount);

})


function total(start_date, end_date) {

     var calendar = { may17:0, june17:1, july17:2, august17:3, september17:4, october17:5,
                november17:6, december17:7, january18:8, february18:9, march18:10 };
                

    if (start_date in calendar){
        var start_value = calendar[start_date];
    }

    if (end_date in calendar){
        var end_value = calendar[end_date];
    }
   
    var totalMonths = end_value - start_value +1;
    var priceListing = parseInt($('#rent-price-result').data("listing-price"));
    var totalPrice = totalMonths * priceListing;
    // console.log(totalPrice)

    return totalPrice;
}








// $('#book_listing').on('click', function(evt){ 
//     evt.preventDefault();
//     console.log("noticed booking click")

//     //open modal window saying... This 

//     var start_date = $('#start_date').val();
//     var end_date = $('#end_date').val();
//     var booking_price = $('#rent-price-result').val();
//     var ad_height = $('#ad-height').val();
//     var ad_width = $('#ad-width').val();

//     $('#rent-price-result').text(total_amount);

// })


// $('#show-ajax').on('click',function(){
//     console.log("Show Ajax Click")



















