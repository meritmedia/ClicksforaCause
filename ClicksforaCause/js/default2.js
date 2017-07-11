
var isEnabled = true;
$(".betAmt").click(function (e) {

    e.preventDefault();
    if (isEnabled == true) {
        isEnabled = false; // disable future clicks for now
        //console.log("isEnabled:" + isEnabled);
       

        spin(fbObj.id, $(this).val());


        setTimeout(function () {
        isEnabled = true;
        //console.log("isEnabled:" + isEnabled);
         }, 3000); // restore functionality after 3 seconds
    }
});

//$("#play").click(function () {
//    spin(fbObj.id, $("#bet").val());
//});



$("#play").click(function (e) {
    e.preventDefault();
    if (isEnabled == true) {
        isEnabled = false; // disable future clicks for now
        //console.log("isEnabled:" + isEnabled);
        spin(fbObj.id, $("#bet").val());
        setTimeout(function () {
            isEnabled = true;
            //console.log("isEnabled:" + isEnabled);
        }, 3000); // restore functionality after 3 seconds
    }
});



//$("#betRaise").click(function () {
//    bet = parseInt($("#bet").val());
//    pct10 = .10 * bet;
//    bet += pct10;
//    $("#bet").val(parseInt(bet));
//});


$(document).on("click", "#betRaise", function (e) {
   // alert("BetRaise");
        bet = parseInt($("#bet").val());
        pct10 = .10 * bet;
        bet += pct10;
        $("#bet").val(parseInt(bet));
    });


$("#betLower").click(function () {
    bet = parseInt($("#bet").val());
    pct10 = .10 * bet;
    bet -= pct10;
    $("#bet").val(parseInt(bet));
});


var aud = document.getElementById("myAudio");
aud.loop = true;
function playVid() {
    aud.volume = 0.1;
    aud.play();
}

function pauseVid() {
    aud.pause();
}

var winAud = document.getElementById("winAudio");
var winAudSource = document.getElementById("winAudioSource");
var winMP3 = [];
winMP3[0] = "CashBlock";
winMP3[1] = "GoodJob";
winMP3[2] = "BigWin";
winMP3[3] = "MegaWin";
winMP3[4] = "EpicWin";

function playWinAud(winType) {
    winAudSource.src = "content/" + winMP3[winType] + ".mp3";
    winAud.volume = 1.0;
    winAud.load();
    winAud.play();
}

$("#makeADonation").click(function () {
    $("#coinStore").fadeIn(200);
});

function getCoins(response) {
    if (response.error_code != '1383010') {
    var responseObj = JSON.parse(response);
    $.each(responseObj, function (key, e) {
        payment_id = e.payment_id;
        amount = e.amount;
        app_id = e.app_id;
        currency = e.currency;
        developer_payload = e.developer_payload;
        payment_id = e.payment_id;
        product_id = e.product_id;
        purchase_time = e.purchase_time;
        purchase_token = e.purchase_token;
        quantity = e.quantity;
        signed_request = e.signed_request;
        status = e.status;
        console.log(responseObj);
    });
    $.post(DCURL + "BuyCoins", { fbid: fbObj.id }).done(function (data) {
        var thisObj = JSON.parse(data);
        $.each(thisObj, function (key, e) {
            balance = parseFloat(e.balance);
            prevBalance = parseFloat(e.prevBalance);
            coinsBought = balance - prevBalance;
            msg1 = "Thank you!!!!";
            msg2 = "New Balance: " + parseFloat(balance).formatMoney(2);
            modalDisplay(msg1, msg2);
            spin(fbObj.id, 0);
        });
    });
    }
}

$("#coinStore .buyBtn").click(function () {
    FB.ui(
        {
            method: 'pay',
            action: 'purchaseiap',
            product_id: 'byohfdn0090',
            developer_payload: 'this_is_a_test_payload'
        },
        response => (getCoins(response)) // Callback function
    );
});


$("#coinStore .cancelThis").click(function () {
    $("#coinStore").fadeOut(200);
})

$(".glyphicon-home").click(function () {
    location.href = "https://fb.beatfreaks.com/ClicksforaCause/";
});


$(document).ready(function () {
    loadGallery();
var intervalID = window.setInterval(loadGallery, 30000);
});

function loadGallery() {
    $.get(DCURL + "GetAllUsers").done(function (data) {
        var items = "";
        itemsObj = JSON.parse(data);
       // console.log(itemsObj);
        $.each(itemsObj, function (key, e) {
            //console.log("e.fbid:" + e.fbid)
            balance = parseInt(parseFloat(e.balance));
            if (parseFloat(e.balance) >= 1000) {
                balance = parseInt((parseFloat(e.balance) / 1000)) + "K";
                if (parseFloat(e.balance) >= 1000000) {
                    balance = ">" + parseInt((parseFloat(e.balance) / 1000000)) + "M";
                }
            }
            //console.log("balance:" + balance);
            items += "<div><img src=\'https://graph.facebook.com/" + e.fbid + "/picture\' alt=\'\' />" + balance + "</div>";
        })
        $("#gallery").html("<div>Gallery</div><div>" + items + "</div>");
    });
}

var autoCount = 20;
var autoPlayInterval = "";
var autoPlayActive = false;
$("#autoPlay").click(function () {
    bet = parseInt($("#bet").val());
    if (bet > 0 && autoPlayActive == false) {
        $("#autoPlay").css({ "background-color": "red", "color": "white" });
        window.autoPlayActive = true;
        autoPlayRun();
        window.autoPlayInterval = window.setInterval(function () {
        autoPlayRun();
        }, 6500);
    }
      else {
            autoPlayStop();
    }
});

function autoPlayRun() {

    if (window.autoCount > -1 && autoPlayActive == true) {
        $("#play").click();
        $("#autoPlay").css({ "background-color": "red", "color": "white" });
        $("#autoPlay").html("AUTOPLAY: " + window.autoCount);
        window.autoCount--;
    }
    else {
        autoPlayStop();
    }
}

function autoPlayStop() {
    window.autoPlayActive = false;
    clearInterval(window.autoPlayInterval);
    window.autoCount = 20;
    $("#autoPlay").html("AUTOPLAY: 20");
    $("#autoPlay").css({ "background-color": "black", "color": "yellow" });
}


playVid();
playWinAud(0);
$(".intro").delay(7000).slideUp();