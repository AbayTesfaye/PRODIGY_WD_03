$(document).ready(function() {
    var turn = true;
    var X = '<i class="fa fa-times fa-4x" aria-hidden="true"></i>';
    var O = '<i class="fa fa-circle-o fa-4x" aria-hidden="true"></i>';
    var divArray = ["#1", "#2", "#3", "#4", "#5", "#6", "#7", "#8", "#9"];
      
    /* check if passed var (a) wins */
    function checkWin(a) {
      if ($("#1").hasClass(a) && $("#2").hasClass(a) && $("#3").hasClass(a) ||
        $("#4").hasClass(a) && $("#5").hasClass(a) && $("#6").hasClass(a) ||
        $("#7").hasClass(a) && $("#8").hasClass(a) && $("#9").hasClass(a) ||
        $("#1").hasClass(a) && $("#5").hasClass(a) && $("#9").hasClass(a) ||
        $("#3").hasClass(a) && $("#5").hasClass(a) && $("#7").hasClass(a) ||
        $("#1").hasClass(a) && $("#4").hasClass(a) && $("#7").hasClass(a) ||
        $("#2").hasClass(a) && $("#5").hasClass(a) && $("#8").hasClass(a) ||
        $("#3").hasClass(a) && $("#6").hasClass(a) && $("#9").hasClass(a)) {
        $(".col-xs-4").unbind();
        $(".col-xs-4").css("opacity", "0.6");
        $(".text h1").html(a + " Wins!");
        $(".text").show();
        return true;
      } else {
        return false;
      }
    }
    /* check if all divs are full && nobody has win yet if true it's a tie */
    function checkTie() {
      if (checkWin("cross") === false && checkWin("circle") === false) {
        var tie = 0;
        for (var i = 0; i < divArray.length; i++) {
          if ($(divArray[i]).hasClass("cross") || $(divArray[i]).hasClass("circle")) {
            tie += 1;
          }
        }
        if (tie === 9) {
          $(".col-xs-4").unbind();
          $(".col-xs-4").css("opacity", "0.6");
          $(".text h1").html("It's a Tie!");
          $(".text").show();
        }
      } else {
        checkWin("cross");
        checkWin("circle");
      }
    }
    /* clear board */
    function newGame() {
      $(".col-xs-4").empty();
      $(".col-xs-4").removeClass("cross circle");
      $(".col-xs-4").css("background", "#fff");
      $(".col-xs-4").css("opacity", "1");
      $(".text").hide();
      $(".col-xs-4").unbind();
    }
    /* pc random ai -> before moving check if atleast 1 div is empty || the game is not over */
    function easyMove() {
      if (checkWin("cross") === false) {
        if ($("#1").is(":empty") || $("#2").is(":empty") || $("#3").is(":empty") || $("#4").is(":empty") || $("#5").is(":empty") || $("#6").is(":empty") || $("#7").is(":empty") || $("#8").is(":empty") || $("#9").is(":empty")) {
          var random = Math.floor(Math.random() * 9);
          var randomdiv = $(".col-xs-4").eq(random);
          if ($(randomdiv).html().length == 0) {
            $(O).appendTo($(randomdiv));
            $(randomdiv).addClass("circle");
            checkWin("circle");
            checkTie();
            $(".col-xs-4").click(easyAi);
          } else {
            easyMove()
          }
        }
      } else {
        checkWin("cross");
        checkWin("circle");
        checkTie();
      }
    }
    /* human move vs easy ai */
    function easyAi() {
      if ($(this).html().length == 0) {
        $(X).appendTo($(this));
        $(this).addClass("cross");
        checkWin("cross");
        checkTie();
        easyMove();
      }
    }
    /* human move vs pc */
    function hardAi() {
      if ($(this).html().length == 0) {
        $(X).appendTo($(this));
        $(this).addClass("cross");
        checkWin("cross");
        checkTie();
        greatCounter();
      }
    }
  
    function youCantWin(side, a, b, c) { /* check if 2 consecutives X or O */
      if ($(a).hasClass(side) && $(b).hasClass(side) && $(c).is(":empty") ||
        $(c).hasClass(side) && $(a).hasClass(side) && $(b).is(":empty") ||
        $(b).hasClass(side) && $(c).hasClass(side) && $(a).is(":empty")) {
        if ($(a).is(":empty")) {
          $(O).appendTo($(a));
          $(a).addClass("circle");
          checkWin("circle");
          checkTie();
          hardAi();
        } else if ($(b).is(":empty")) {
          $(O).appendTo($(b));
          $(b).addClass("circle");
          checkWin("circle");
          checkTie();
          hardAi();
        } else {
          $(O).appendTo($(c));
          $(c).addClass("circle");
          checkWin("circle");
          checkTie();
          hardAi();
        }
      } else {
        return false;
      }
    }
    /* calls every combination and counter it */
    function greatCounter() {
      if ($('.circle').length == 0 && $("#5").is(":empty")) { /* if possible first move is always center */
        $(O).appendTo($("#5"));
        $("#5").addClass("circle");
      } else if ($('.circle').length == 1 && $("#5").hasClass("circle") && !youCantWin("cross", "#1", "#2", "#3") &&
        !youCantWin("cross", "#4", "#5", "#6") &&
        !youCantWin("cross", "#7", "#8", "#9") &&
        !youCantWin("cross", "#1", "#4", "#7") &&
        !youCantWin("cross", "#2", "#5", "#8") &&
        !youCantWin("cross", "#3", "#6", "#9") &&
        !youCantWin("cross", "#1", "#5", "#9") &&
        !youCantWin("cross", "#3", "#5", "#7")) {
        if ($("#1").hasClass("cross") && $("#9").hasClass("cross") || $("#3").hasClass("cross") && $("#7").hasClass("cross")) { /* counter double win strategy on edges, 2 cases, 1 counter */
          $(O).appendTo($("#2"));
          $("#2").addClass("circle");
          checkWin("circle");
          checkTie();
          hardAi();
        } else { /* counter double win strategy on non-edges, 4 cases, 4 counters */
          if ($("#3").hasClass("cross") && $("#7").is(":empty") && ($("#4").hasClass("cross") || $("#8").hasClass("cross"))) {
            $(O).appendTo($("#7"));
            $("#7").addClass("circle");
            checkWin("circle");
            checkTie();
            hardAi();
          } else if ($("#7").hasClass("cross") && $("#3").is(":empty") && ($("#2").hasClass("cross") || $("#6").hasClass("cross"))) {
            $(O).appendTo($("#3"));
            $("#3").addClass("circle");
            checkWin("circle");
            checkTie();
            hardAi();
          } else if ($("#1").hasClass("cross") && $("#9").is(":empty") && ($("#6").hasClass("cross") || $("#8").hasClass("cross"))) {
            $(O).appendTo($("#9"));
            $("#9").addClass("circle");
            checkWin("circle");
            checkTie();
            hardAi();
          } else if($("#9").hasClass("cross") && $("#1").is(":empty") && ($("#2").hasClass("cross") || $("#4").hasClass("cross"))){
            $(O).appendTo($("#1"));
            $("#1").addClass("circle");
            checkWin("circle");
            checkTie();
            hardAi();
          }
          else { 
        if ($("#3").is(":empty") && ($("#4").is(":empty") || $("#8").is(":empty"))) {
          $(O).appendTo($("#3"));
          $("#3").addClass("circle");
          checkWin("circle");
          checkTie();
          hardAi();
        } else { /* else it doens't play second turn if pc is first */
          $(O).appendTo($("#7"));
          $("#7").addClass("circle");
          checkWin("circle");
          checkTie();
          hardAi();
        }
      }
        }
      } else if ($('.circle').length == 0 && $("#5").hasClass("cross") && $("#1").is(":empty")) {
        $(O).appendTo($("#1"));
        $("#1").addClass("circle");
        checkWin("circle");
        checkTie();
        hardAi();
      } else if($("circle").length == 1 && $("cross").length == 1){
        if(("#1").is(":empty")){
          $(O).appendTo($("#1"));
          $("#1").addClass("circle");
          checkWin("circle");
          checkTie();
          hardAi();
        }
        else{
          $(O).appendTo($("#7"));
          $("#7").addClass("circle");
          checkWin("circle");
          checkTie();
          hardAi();
        }
      } else {
        /* check if can win */
        youCantWin("circle", "#1", "#2", "#3");
        youCantWin("circle", "#4", "#5", "#6");
        youCantWin("circle", "#7", "#8", "#9");
        youCantWin("circle", "#1", "#4", "#7");
        youCantWin("circle", "#2", "#5", "#8");
        youCantWin("circle", "#3", "#6", "#9");
        youCantWin("circle", "#1", "#5", "#9");
        youCantWin("circle", "#3", "#5", "#7");
        /* check if can counter */
        youCantWin("cross", "#1", "#2", "#3");
        youCantWin("cross", "#4", "#5", "#6");
        youCantWin("cross", "#7", "#8", "#9");
        youCantWin("cross", "#1", "#4", "#7");
        youCantWin("cross", "#2", "#5", "#8");
        youCantWin("cross", "#3", "#6", "#9");
        youCantWin("cross", "#1", "#5", "#9");
        youCantWin("cross", "#3", "#5", "#7");
        /* this shouldnt work but it does */
        easyMove();
      }
    }
  
    /* human vs human */
    $(".vsHuman").click(function() {
      newGame();
      $(".col-xs-4").click(function() {
        if ($(this).html().length == 0) {
          if (turn) {
            $(X).appendTo($(this));
            $(this).addClass("cross");
            checkWin("cross");
            checkTie();
            turn = false;
          } else {
            $(O).appendTo($(this));
            $(this).addClass("circle");
            checkWin("circle");
            checkTie();
            turn = true;
          }
        }
      });
    });
  
    /* easy ai vs human | choose randomly the first player */
    $(".vsEasy").click(function() {
      newGame();
      var chooseFirst = Math.floor(Math.random() * 2);
      if (chooseFirst === 1) {
        $(".col-xs-4").click(easyAi);
      } else {
        easyMove();
        $(".col-xs-4").click(easyAi);
      }
    });
  
    /* hard ai vs human | choose randomly first player */
    $(".vsAI").click(function() {
      newGame();
      var chooseFirst = Math.floor(Math.random() * 2);
      if (chooseFirst === 1) { /* tic tac god first */
        greatCounter();
        $(".col-xs-4").click(hardAi);
      } else { /* human first */
        $(".col-xs-4").click(hardAi);
      }
    });
    /* start 1vs1 default */
    $(".vsHuman").click();
  
  });
