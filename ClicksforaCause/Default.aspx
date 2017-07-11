<%@ Page Title="Home Page" Language="C#"  AutoEventWireup="true" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head >
    <title></title>
    <script src="js/jquery-1.10.2.js"></script>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css" />
    <link href="css/bootstrap.css" rel="stylesheet" />
    <link href="css/Site.css" rel="stylesheet" />
    <script src="js/bootstrap.js"></script>
    <script src="js/modernizr-2.6.2.js"></script>
    <script src="js/default.js"></script>
<style>

</style>
    <script src="//code.jquery.com/jquery-1.12.4.js"></script>
    <script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
</head>
<body>
    <%--<img id="bkg" src="img/mmScratcher-bkg.jpg" alt="" />--%>
    <div id="mainForms" class="body-content">

        <div class="row titleBar" >
            <div class="container">
                <div class="col-xs-1">
                    <span class="glyphicon glyphicon-home"></span>
                </div>
                <div class="col-xs-3">
                    <span>Cash Blocks</span>
                </div>
                <div class="col-xs-4">
                    <input  type="button" id="makeADonation" name="makeADonation" value="OUT OF COINS?" />
                </div>
                <div class="col-xs-4">
                    <span style="float:right;">
                        Audio:
                        <span onclick="playVid()" class="glyphicon glyphicon-play"></span>
                        
                        <span  onclick="pauseVid()" class="glyphicon glyphicon-pause"></span>
                    </span>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row intro">
                <div class="col-xs-12 text-center">
                    MAKE A BET TO REVEAL YOUR PRIZE...
                </div>
            </div>
            <div id="betRows">
                <div id="squat">$0.00</div>
                <div class="row row1">
                    <div class="col-xs-3">
                        <input type="button" value="$1" id="bet0001"  class="betAmt betDiv" />
                    </div>
                    <div class="col-xs-3">
                        <input type="button" value="$10" id="bet0010" name="bet0010" class="betAmt betDiv" />
                    </div>
                    <div class="col-xs-3">
                        <input type="button" value="$100" id="bet0100" name="bet0100" class="betAmt betDiv" />
                    </div>
                    <div class="col-xs-3">
                        <input type="button" value="$1,000" id="bet1000" name="bet1000" class="betAmt betDiv" />
                    </div>
                </div>
                <div class="row row2">
                    <div class="col-xs-3">
                        <input type="button" value="$2" id="bet0002" name="bet0002" class="betAmt betDiv" />
                    </div>
                    <div class="col-xs-3">
                        <input type="button" value="$20" id="bet0020" name="bet0020" class="betAmt betDiv" />
                    </div>
                    <div class="col-xs-3">
                        <input type="button" value="$200" id="bet0200" name="bet0200" class="betAmt betDiv" />
                    </div>
                    <div class="col-xs-3">
                        <input type="button" value="$2,000" id="bet2000" name="bet2000" class="betAmt betDiv" />
                    </div>
                </div>
                <div class="row row3">
                    <div class="col-xs-3">
                        <input type="button" value="$3" id="bet0003" name="bet0003" class="betAmt betDiv" />
                    </div>
                    <div class="col-xs-3">
                        <input type="button" value="$30" id="bet0030" name="bet0030" class="betAmt betDiv" />
                    </div>
                    <div class="col-xs-3">
                        <input type="button" value="$300" id="bet0300" name="bet0300" class="betAmt betDiv" />
                    </div>
                    <div class="col-xs-3">
                        <input type="button" value="$3,000" id="bet3000" name="bet3000" class="betAmt betDiv" />
                    </div>
                </div>
                <div class="row row4">
                    <div class="col-xs-3">
                        <input type="button" value="$4" id="bet0004" name="bet0004" class="betAmt betDiv" />
                    </div>
                    <div class="col-xs-3">
                        <input type="button" value="$40" id="bet0040" name="bet0040" class="betAmt betDiv" />
                    </div>
                    <div class="col-xs-3">
                        <input type="button" value="$400" id="bet0400" name="bet0400" class="betAmt betDiv" />
                    </div>
                    <div class="col-xs-3">
                        <input type="button" value="$4,000" id="bet4000" name="bet4000" class="betAmt betDiv" />
                    </div>
                </div>
                <div class="row row5">
                    <div class="col-xs-3">
                        <input type="button" value="$5" id="bet0005" name="bet0005" class="betAmt betDiv" />
                    </div>
                    <div class="col-xs-3">
                        <input type="button" value="$50" id="bet0050" name="bet0050" class="betAmt betDiv" />
                    </div>
                    <div class="col-xs-3">
                        <input type="button" value="$500" id="bet0500" name="bet0500" class="betAmt betDiv" />
                    </div>
                    <div class="col-xs-3">
                        <input type="button" value="$5,000" id="bet5000" name="bet5000" class="betAmt betDiv" />
                    </div>
                </div>
            </div>

            <div class="row naver">
                <div class="col-xs-1">
                   
                    <%-- <div>&nbsp;</div><input type="button" value="-"  name="betLower" />--%>
                    <div id="betLower" class="betBtn">-</div>
                </div>
                <div class="col-xs-2">
                    <div class="amtDisplay amtDisplayHdr">BET<br />
                    <input  type="number" id="bet" name="bet" style="text-align:center;width:80%;background-color: transparent;border:none;color: yellow;" value="10" /></div>
                </div>
                <div class="col-xs-1">
                    
                    <%--<div>&nbsp;</div><input type="button" value="+"" name="betRaise" />--%>
                    <div id="betRaise" class="betBtn">+</div>
                </div>
                <div class="col-xs-3">
                    <div class="amtDisplay amtDisplayHdr">WIN</div>
                    <div id="win"  class="amtDisplay"></div>
                </div>
                <div class="col-xs-3">
                    <div class="amtDisplay amtDisplayHdr">BALANCE</div>
                    <div id="balance" class="amtDisplay"></div>
                </div>
                <div class="col-xs-2">
                    <%--<input  type="button" id="play" name="play" value="PLAY" />--%>
                    <div id="play" class="betBtn">PLAY</div>
                    <div id="autoPlay">AUTOPLAY: 20</div>
                </div>
            </div>
        
          <div id="gallery"></div>
      </div>
    </div>
    <div id="bigWin"><img id="trophy" src="img/trophy.png" alt="" /></div>
    <div id="coinStore" class="modalBox">
        <div>Buy Coins</div>
        <div>2,000,000</div>
        <div class="buyAmount">$5</div>
        <div class="buyBtn">BUY</div>
        <div>Purchases are made as donations to the<br /><b>Be Your Own Hero Foundation</b></div>
        <div><a href="http://beyourownhero.us" target="_blank">http://beyourownhero.us</a></div>
        <div class="cancelThis">X</div>
    </div>

    <audio id="myAudio" >
        <source src="Content/LadiesNotWaiting.mp3" type="audio/mp3" />
    </audio>
    <audio id="winAudio" >
        <source id="winAudioSource" src="Content/CashBlock.mp3" type="audio/mp3" />
    </audio>
    <script src="js/default2.js"></script>

</body>
</html>
