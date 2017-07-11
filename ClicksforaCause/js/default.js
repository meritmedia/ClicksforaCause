var errColor = "hsla(3,50%,80%,1)";
var noErrColor = "hsla(63,50%,80%,1)";
var DCURL = "//fb.beatfreaks.com/DataConnect/MMScratcher/";
//var DCURL = "//beatfreaks.com/DataConnect/MMScratcher/";
var fbObj = "";
var ipObj = "";
var submissionsObj = "";
var idCounter = 0;
var previousSubmissions = 0;


var picsAvailable = [];
var emptyPicLower = 0;
var emptyPicUpper = 9;
var moneyPicLower = 9;
var moneyPicUpper = 11;
var picsAvailableLower = emptyPicLower;
var picsAvailableUpper = 12;
var winPicBig = 9;
var winPicMega = 10;
var winPicEpic = 11;

var FreeSpins = false;
var FreeSpinsCount = 5;

for (i = 0; i <= emptyPicUpper; i++) {
    picsAvailable[i] = "empty0" + (i + 1) + ".jpg";
}
for (i = moneyPicLower; i <= moneyPicUpper; i++) {
    picsAvailable[i] = "money0" + ((i+1) - emptyPicUpper) + ".jpg";
}
//console.log("picsAvailable: ");
//console.log(picsAvailable);

window.fbAsyncInit = function () {
    FB.init({
        appId: '1981521512082422',
        xfbml: true,
        version: 'v2.9'
    });

        FB.AppEvents.logPageView();



    // ADD ADDITIONAL FACEBOOK CODE HERE
    function onLogin(response) {
        if (response.status === 'connected') {
            FB.api('/me?fields=id,name,email,first_name', function (data) {
                //var welcomeBlock = document.getElementById('fb-welcome');
               // welcomeBlock.innerHTML = 'Hello, ' + data.first_name + '!';
                window.fbObj = data;
                if (fbObj.length > 0) {
                    //console.log("onLogin: " + fbObj.id);
                    idCounter++;
                }
                var myObj = $.getJSON('//ipinfo.io/json', function (data) {
                    window.ipObj = data;
                })
                    .done(function (response) {
                        //console.log("onLogin: " + ipObj.ip);
                        idCounter++;
                        //logAccess(idCounter);

                    });


                 //console.log(fbObj);
                // console.log("Data ID= " + data.id);
                //appLogin(data.id, '397759553599056', data.first_name);
            });

            FB.api(
                '/me',
                'GET',
                { "fields": "id,name,email,first_name" },
                function (response) {
                    if (fbObj === undefined) {
                        window.fbObj = response;
                        //console.log("fbObj was undefined: id= " + fbObj.id);
                    }
                    else {
                        //console.log("fbObj is defined:  id=" + fbObj.id);
                        
                    }
                    spin(fbObj.id, 0);

                }
            );

        }
    }

    FB.getLoginStatus(function (response) {
        // Check login status on load, and if the user is
        // already logged in, go directly to the welcome message.
        if (response.status === 'connected') {
            onLogin(response);
        } else {
            // Otherwise, show Login dialog first.
            FB.login(function (response) {
                onLogin(response);
            }, { scope: 'user_friends, email' });
        }
    });
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function spin(fbid, bet) {
    if (fbid) {

        bet = (bet.toString()).replace("$", "").replace(",", "");
        
    $("input[type=button]").prop("disabled", true);
    $("#win").html("$0.00").fadeOut(50);
    $(".row1").animate({ width: "toggle" },200);
    $(".row2").animate({ width: "toggle" }, 400);
    $(".row3").animate({ width: "toggle" }, 600);
    $(".row4").animate({ width: "toggle" }, 800);
    $(".row5").animate({ width: "toggle" }, 1000);
    $(".row1").animate({ width: "toggle" }, 200);
    $(".row2").animate({ width: "toggle" }, 200);
    $(".row3").animate({ width: "toggle" }, 200);
    $(".row4").animate({ width: "toggle" }, 200);
    $(".row5").animate({ width: "toggle" }, 200);

    $.when($.post(DCURL + "Default", { fbid: fbid, bet: bet })).done(function (data) {
        var thisObj = JSON.parse(data);

        $.each(thisObj, function (key, e) {
            balance = e.balance;
            bet = e.bet;
            win = e.win;
            multiplier = e.multiplier;

            if (FreeSpins == true) {
                win += bet;
                $("#play").html(FreeSpinsCount + " Free Spins");
                FreeSpinsCount--;
                
                if (FreeSpinsCount == 0) {
                    FreeSpinsCount = 5;
                    FreeSpins = false;
                    $("#play").html("Play");
                }
            }
            //console.log(balance);

            $("#balance").html(balance);
            $("#bet").val(bet);


            win_ = parseFloat(win).formatMoney(2);


            var picPos = [];

            if (parseFloat(win) == 0.00) { //No win

                picPos[0] = Math.floor((Math.random() * picsAvailableUpper) + picsAvailableLower);
                picPos[1] = Math.floor((Math.random() * emptyPicUpper) + emptyPicLower);
                picPos[2] = Math.floor((Math.random() * picsAvailableUpper) + picsAvailableLower);

                console.log(picPos[0] + ", " + picPos[1] + ", " + picPos[2]);

                if (picPos[0] == picPos[1] && picPos[0] == picPos[2]) {
                    multiplier =  1.1;
                    win = bet * multiplier;
                    winLabel = "3 of a Kind!!!";
                    winType = 1;        
                    if (picPos[0] == 2) {
                        FreeSpins = true;
                        winLabel = "5 Free Spins";
                    }
                  }
            }

            if (parseFloat(win) > 0.00 && win < (bet * 2)) {
                winLabel = "Good Job!!!";
                winType = 1;
                //picPos[0] = Math.floor((Math.random() * moneyPicUpper) + moneyPicLower); // any money pic
                //picPos[1] = Math.floor((Math.random() * moneyPicUpper) + moneyPicLower); // any money pic
                picPos[0] = (Math.floor((Math.random() * 2) + 0)) + 9; // any money pic
                picPos[1] = (Math.floor((Math.random() * 2) + 0)) + 9; // any money pic
                picPos[2] = Math.floor((Math.random() * emptyPicUpper) + emptyPicLower); // an empty pic (to avoid seeing 3 of the same money pics)
                //console.log("moneyPicUpper: " + moneyPicUpper);
                //console.log("moneyPicLower: " + moneyPicLower);
                //console.log("picPos: " + picPos[0] + ", " + picPos[1] + ", " + picPos[2]);
            }

            if (win >= (bet * 2) && win < (bet * 3)) {
                winType = 2;
                winLabel = "BIG WIN";
                picPos[0] = winPicBig;
                picPos[1] = winPicBig;
                picPos[2] = winPicBig;
            }

            if (win >= (bet * 3) && win < (bet * 4)) {
                winType = 3;
                winLabel = "MEGA WIN";
                picPos[0] = winPicMega;
                picPos[1] = winPicMega;
                picPos[2] = winPicMega;
            }

            if (win >= (bet * 4)) {
                winLabel = "EPIC WIN";
                winType = 4;
                picPos[0] = winPicEpic;
                picPos[1] = winPicEpic;
                picPos[2] = winPicEpic;
            }

            if (bet > 0) {
                var winPics = "";
                var picHolderClass = "display:inline-block;border:3px solid silver;background-color:white;width:190px;height:300px;margin:3px;padding:0;";
                var winPicsClass = "height:100%;width:100%;margin:0;padding:0;";
                for (i = 0; i < 3; i++) {
                    //console.log("i: " + i);
                    //console.log("picPos[i]: " + picPos[i]);
                    //console.log(window.picsAvailable[picPos[i]]);
                    winPics += "<div style=\'" + picHolderClass + "\' >";
                    winPics += "<img style=\'" + winPicsClass + "\' src=\'img/" + window.picsAvailable[picPos[i]] + "\'  alt=\'\' />";
                    winPics += "</div > ";
                }
                // console.log(winPics);
                $("#squat").html(winPics);
                $("#betRows .row").fadeOut(200);
                $("#squat").slideDown(800).delay(2500).slideUp(200);
                $("#betRows .row").fadeIn(200);
            }

            if (parseFloat(win) > 0.00) { // do the modal if you win anything
                playWinAud(winType);
                $("#betRows .row").fadeOut(200);
                msg1 = "<h1>" + winLabel + "!!!</h1>";
                // msg2 = "<h1>$" + win_ + "<br/>Bet: " + bet + "<br/>x<br/>Multiplier: " + multiplier + "</h1 >";
                msg2 = "<table style=\'margin:0 auto;\'>";
                msg2 += "<tr><td style=\'text-align:left;\'>Bet:</td><td style=\'text-align:right;\'>" + bet + "</td></tr>";
                msg2 += "<tr><td style=\'text-align:left;\'>Multiplier:</td><td style=\'text-align:right;\'>" + multiplier + "</td></tr>";
                msg2 += "<tr><td style=\'text-align:left;\'>Win:</td><td style=\'text-align:right;\'>" + win_ + "</td></tr></table > ";
                //msg2 += "<div style=\'height:75px;width:75px;margin:0 auto;\'><img src=\'img/trophy.png' style=\'height:100%;width:auto;\' alt=\'\'/></div>";
                $("#bigWin").html("<div style=\'position:relative;left:-50%;\'>" + msg1 + msg2 + "</div>");
                $("#bigWin").delay(1500).fadeIn(1000).effect("bounce", "slow").delay(3000).fadeOut(800);
                $("#betRows .row").delay(3000).fadeIn(200);
            }


            // this bit resets the win/balance numbers
            $("#win").html("$" + win_).fadeIn(1000);
            bal = parseFloat(balance).formatMoney(2);
            $("#balance").html("$" + bal).fadeOut(50).fadeIn(1000);
            $("input[type=button]").prop("disabled", false);
            //numberDisplay("#win",win)   
        });
    })
        .fail(function () {

            //alert("Default failed");
            msg1 = "Connection Lost!!!";
            msg2 = "Please reload game or you will lose your bet.";
            modalDisplay(msg1, msg2);
            location.href = "https://fb.beatfreaks.com/Clicksforacause";

        });
    }
    else {
        location.href = "https://fb.beatfreaks.com/Clicksforacause";
    }

}

function modalDisplay(msg1, msg2) {
    $(".betRows").fadeOut(200);
    $("#bigWin").html("<h1>" + msg1 + "!!!</h1>" + "<h1>$" + msg2 + "</h1>");
    $("#bigWin").fadeIn(1000).effect("bounce", "slow").delay(3000).fadeOut(800);
    $(".betRows").delay(3000).fadeIn(200);
}

Number.prototype.formatMoney = function (c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

$("#bigWin").click(function () {
    $("#bigWin").fadeOut(100).css("zIndex",-10);
    
})
var count = -1;
var speed = 200;

function numberDisplay(myField, countTo) {
    count++;
    $(myField).val(count);
    if (count > countTo) {
        return;
    }
    //speed = speed / 6 * 5;
    setTimeout(numberDisplay(myField, countTo), speed);

}


//$(window).load(function () {
//    console.log(fbObj.id);
//    $.post(DCURL + "Default", { fbid: fbObj.id, bet: 0 }).done(function (data) {
//        var thisObj = JSON.parse(data);
//        $.each(thisObj, function (key, e) {
//            balance = e.balance;
//            $("#balance").html(balance);
//        });
//    });
//});
//$(window).load(function () {
//    $.get(DCURL + "GetUsersAll").done(function (data) {
//        var thisObj = JSON.parse(data);
//        var myData = "<div>";
//        $.each(thisObj, function (key, e) {
//            fbPageID = e.fbPageID;
//            fbIDPic = e.fbIDPic;
//            fbName = e.fbName;
//            userLocation = e.location;
//            myData += "<span><img src=\"" + fbIDPic + "\" alt=\"" + userLocation + "\" title=\"" + userLocation + "\"   /><span>";
//        });
//        myData += "</div>";
//        $("#fbShare").after(myData);
//    });
//});

function logAccess(idCounter) {
    // console.log("idCounter: " + idCounter);
    if (idCounter >= 1) {
        gotoURL = DCURL + "LogAccess";
        $.get(gotoURL,
            {
                fbID: fbObj.id,
                fbEmail: fbObj.email,
                fbName: fbObj.name,
                ipAddress: ipObj.ip, 
                ipHostname: ipObj.hostname,
                ipCity: ipObj.city,
                ipRegion: ipObj.region,
                ipCountry: ipObj.country,
                ipPostal: ipObj.postal,
                ipLoc: ipObj.loc,
                ipOrg: ipObj.org
            })
            .done(function (data) {
              //  console.log(data);
                submissionsObj = JSON.parse(data);
                if (submissionsObj.length > 0) {
                 //   console.log("You have previous submissions");
                    window.previousSubmissions++;
                    previousSubmissionsAddBtn(window.previousSubmissions);
                    submissionsList(submissionsObj);
                }
                //console.log("Length of myData: " + myData.length);
            });
    }
}


/* END FACEBOOK */












var decodeObj = "";






var body = 'I like this site!';
function postToFeed(body) {
    FB.api('/me/feed', 'post', {
        link: 'http://FB.MUSINDEX.COM',
        message: body + "..." + "MusIndex.com | Artists with Benefits: The MusIndex app matches up nonprofit benefit event coordinators with entertainers looking to support a cause. You would register on the site if you are hosting a benefit and need entertainment (like a band, a clown, or a bellydancer), or if you're an entertainer and you're available to do benefits in case one comes up in the registry."
    }, function (response) {
        if (!response || response.error) {
            console.log('Error occured');
        } else {
            console.log('Post ID: ' + response.id);
        }
    });
}


