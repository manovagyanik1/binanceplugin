console.log('starting plugin!!!!!!');

var coins = {
    "VEN/BTC": {
       price: 0.00005888,
       qty: 116
    },
       
    "BNB/BTC": {
       price: 0.000309,
       qty: 28.988
    },
    
    "POWR/BTC": {
       price: 0.00003850,
       qty: 200
    },
    
    "WABI/BTC": {
       price: 0.00010239,
       qty: 200
    },

    "TNT/BTC": {
       price: 0.00000715,
       qty: 2000
    },

    "DNT/BTC": {
       price: 0.00000501,
       qty: 2999
    },

    "LEND/BTC": {
       price: 0.00000324,
       qty: 3999
    },

    "MTH/BTC": {
       price: 0.00000767,
       qty: 2000
    },

    "CND/BTC": {
       price: 0.00000346,
       qty: 7501.79
    },

    "FUN/BTC": {
       price: 0.00000241,
       qty: 1844.15
    },

    "FUEL/BTC": {
       price: 0.00000474,
       qty: 999
    }
}

var totalAmount = 0;
for (var key in coins) {
    if (coins.hasOwnProperty(key)) {
        console.log(key + " -> " + coins[key]);
        totalAmount += coins[key].qty * coins[key].price;
    }
}

console.log(totalAmount);

for (var key in coins) {
    if (coins.hasOwnProperty(key)) {
        console.log(key + " -> " + coins[key]);
        coins[key].percent = (coins[key].price * coins[key].qty * 100) / totalAmount;
        coins[key].percent = Math.round(coins[key].percent);
    }
}


const API_CALL_TIMEOUT = 5000;
const REFRESH_TIME = 500;
var currentTotal = 0;

function compute() {
    currentTotal = 0;
    rows = $('#products tr:visible');
    var length =  rows.length;
    console.log(length);

    for(var i=1; i<length; i++) {
        var row = rows[i];
        var symbol = row.cells[1].textContent;
        if(coins[symbol]) {
            var buyPrice = coins[symbol].price;
            var buyPriceCell = row.cells[3];
            buyPriceCell.innerHTML = buyPrice;
            var currentPrice = parseFloat(row.cells[2].textContent.split("/")[0].trim(), 10);
            var change = (currentPrice - buyPrice) * 100 / buyPrice;
            var changeCell = row.cells[4];
            changeCell.innerHTML = parseInt(change, 10) + " %";
            var contributionCell = row.cells[5];
            contributionCell.innerHTML = coins[symbol].percent + " %";
            currentTotal+= currentPrice * coins[symbol].qty;
        }
    }
    console.log("totalAmount is: ", totalAmount);
    console.log("currentTotal is: ", currentTotal);

    var overallChange = Math.round((currentTotal - totalAmount) * 100 / totalAmount);
    $('#rate').text(overallChange + " %");
}

$( document ).ready(function() {
    console.log( "ready!" );

    setTimeout(function() {
        var table = $('#products');

        // click on favourites
        $("li.ng-binding").first().click();
        $( "<h1 id='rate'>Test</h1>" ).insertBefore( "#products" );

        var rowsCopy = $('#products tr:visible');
        rowsCopy[0].insertCell(3).innerHTML = "buy price";
        rowsCopy[0].insertCell(4).innerHTML = "% change";
        rowsCopy[0].insertCell(5).innerHTML = "% contribution";

        for(var i=1; i<length; i++) {
            var row = rows[i];
            row.insertCell(3);
            row.insertCell(4);
            row.insertCell(5);
        }

        setInterval(compute, REFRESH_TIME);

    }, API_CALL_TIMEOUT);
});

