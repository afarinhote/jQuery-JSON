jQuery(document).ready(function() {
  var retrievedGroups = localStorage.getItem("groupsData");
  var userSelection = localStorage["userSelect"];
  var resetData = localStorage["DataReset"];
  var groupsJ = JSON.parse(retrievedGroups);
  var varGroup = [];
  var winners = {};
  var winnerKeys = [];
  var seconds = [];
  var secondKeys = [];
  var teamGames = document.getElementsByClassName("teamGame");
  var teamNumber = document.getElementsByClassName("team");
  var teamEights = document.getElementsByClassName("eights");
  var teamQuarters = document.getElementsByClassName("quarters");
  var teamMids = document.getElementsByClassName("mids");
  var teamFinals = document.getElementsByClassName("finals");
  /*fake encryption*/
  var passwordToEncr;
  var encryptString = "greatgame";
  var jsonName;
  var encrypted;
  var decrypt;
  /*Variables for User Reset and save*/

  var userGroup = [];
  var userGames = [];
  function reseData() {
    for (let i = 0; i < 32; i++) {
      userGroup.push(jQuery(teamNumber[i]).text());
      userGames.push(jQuery(teamGames[i]).text());
    }
    var resetSelection = userGroup.concat(userGames);
    localStorage["resetData"] = JSON.stringify(resetSelection);
    userGroup = [];
    userGames = [];
  }

  function resetPage() {
    classRemoval();
    let pageResetVar = localStorage.getItem("resetData");
    pageResetVar = JSON.parse(pageResetVar);
    for (let i = 0; i < 64; i++) {
      jQuery(teamNumber[i]).text(pageResetVar[i]);
      jQuery(teamGames[i]).text(pageResetVar[i + 32]);
    }
  }

  jQuery(".reset").click(function() {
    resetPage();
  });

  /*Groups assignements*/
  for (let i = 0; i < groupsJ.length; i++) {
    varGroup[i] = groupsJ[i].group;
    winnerKeys[i] = "group" + varGroup[i] + "Winner";
    secondKeys[i] = "group" + varGroup[i] + "Second";
  }
  function divCount() {
    for (j = 0; j < teamNumber.length; j++) {
      teamNumber[j].id = "Team" + j;
    }
  }
  function groupWonCount() {
    for (j = 0; j < 8; j++) {
      teamNumber[(4*j)].className += " groupWon";
      teamNumber[(4*j)+1].className += " groupWon";
      teamNumber[(4*j)+2].classList.remove("groupWon");
      teamNumber[(4*j)+3].classList.remove("groupWon");
    }
  }
  function finalsId() {
    for (j = 0; j < 2; j++) {
      teamFinals[2 * j].id = "F-G" + (j + 1) + "T1";
      teamFinals[2 * j + 1].id = "F-G" + (j + 1) + "T2";
    }
  }
  function midsId() {
    for (j = 0; j < 2; j++) {
      teamMids[2 * j].id = "M-G" + (j + 1) + "T1";
      teamMids[2 * j + 1].id = "M-G" + (j + 1) + "T2";
    }
  }
  function quartersId() {
    for (j = 0; j < 4; j++) {
      teamQuarters[2 * j].id = "Q-G" + (j + 1) + "T1";
      teamQuarters[2 * j + 1].id = "Q-G" + (j + 1) + "T2";
    }
  }
  function eightsId() {
    for (j = 0; j < 8; j++) {
      teamEights[2 * j].id = "E-G" + (j + 1) + "T1";
      teamEights[2 * j + 1].id = "E-G" + (j + 1) + "T2";
    }
  }
  function winnerSeconds() {
    for (let i = 0; i < winnerKeys.length; i++) {
      winners[winnerKeys[i]] = jQuery("#Team" + i * 4).text();
      seconds[secondKeys[i]] = jQuery("#Team" + (i * 4 + 1)).text();
    }
  }
  function updateEights() {
    winnerSeconds();
    for (j = 0; j < 8; j++) {
      jQuery("#E-G" + (j + 1) + "T1").text(winners[winnerKeys[j]]);
      jQuery("#E-G" + (j + 1) + "T2").text(seconds[secondKeys[j]]);
      classRemoval();
    }
  }
  function updateQuarters() {
    for (j = 0; j < 4; j++) {
      let team1 = jQuery("#E-G" + (j * 2 + 1) + "T1").text();
      let team2 = jQuery("#E-G" + (2 * j + 2) + "T1").text();
      jQuery("#Q-G" + (j + 1) + "T1").text(team1);
      jQuery("#Q-G" + (j + 1) + "T2").text(team2);
      classRemoval();
    }
  }
  function updateMids() {
    for (j = 0; j < 2; j++) {
      let team1 = jQuery("#Q-G" + (j + 1) + "T1").text();
      let team2 = jQuery("#Q-G" + (j + 3) + "T1").text();
      jQuery("#M-G1T" + (j + 1)).text(team1);
      jQuery("#M-G2T" + (j + 1)).text(team2);
      classRemoval();
    }
  }
  function updateFinals() {
    for (j = 0; j < 2; j++) {
      let team1 = jQuery("#M-G" + (j + 1) + "T1").text();
      let team2 = jQuery("#M-G" + (j + 1) + "T2").text();
      jQuery("#F-G1T" + (j + 1)).text(team1);
      jQuery("#F-G2T" + (j + 1)).text(team2);
    }
  }
  function podiumGold() {
    for (let i = 0; i < 2; i++) {
      jQuery("#F-G1T" + (i + 1)).dblclick(function() {
        if (
          jQuery("#F-G1T1").text() !== " " &&
          jQuery("#F-G1T2").text() !== " "
        ) {
          jQuery("div[class*='won']").toggleClass("won");
          jQuery("div[class*='lost']").toggleClass("lost");
          jQuery("#F-G1T" + (i + 1)).toggleClass("won");
          jQuery("#F-G1T" + (2 - i)).toggleClass("lost");
          jQuery("#crown").remove();
          jQuery("#first").remove();
          jQuery("#second").remove();
          {
            jQuery("#third").remove();
          }
          jQuery("div[class*='won']").append(
            '<img id="crown" src="img/crown.svg" />'
          );
          jQuery(".all").append("<div class='podium' id='second'</div>");
          jQuery("#second").append(
            jQuery("div[class*='lost']").text() + "<br>"
          );
          jQuery("#second").append(
            '<img id="podiumSilver" src="img/silver.svg" />'
          );
          jQuery(".all").append("<div class='podium' id='first'</div>");
          jQuery("#first").append(jQuery("div[class*='won']").text() + "<br>");
          jQuery("#first").append('<img id="podiumGold" src="img/gold.svg" />');
          jQuery(".all").append("<div class='podium' id='third'</div>");
          jQuery("#third").append(
            jQuery("div[class$='thirdPlace']").text() + "<br>"
          );
          jQuery("#third").append(
            '<img id="podiumBronzeSad" src="img/bronze.png" />'
          );
        }
      });
    }
  }
  function podiumBronze() {
    for (let i = 0; i < 2; i++) {
      jQuery("#F-G2T" + (i + 1)).dblclick(function() {
        if (
          jQuery("#F-G2T1").text() !== " " &&
          jQuery("#F-G2T2").text() !== " "
        ) {
          jQuery("div[class*='thirdPlace']").toggleClass("thirdPlace");
          jQuery("div[class*='fourthPlace']").toggleClass("fourthPlace");
          jQuery("#F-G2T" + (i + 1)).toggleClass("thirdPlace");
          jQuery("#F-G2T" + (2 - i)).toggleClass("fourthPlace");
          {
            jQuery("#third").remove();
          }
          jQuery(".all").append("<div class='podium' id='third'</div>");
          jQuery("#third").append(
            jQuery("div[class$='thirdPlace']").text() + "<br>"
          );
          jQuery("#third").append(
            '<img id="podiumBronzeSad" src="img/bronze.png" />'
          );
        }
      });
    }
  }
  function classRemoval() {
    jQuery(".podium").remove();
    jQuery("div[class*='won']").removeClass("won");
    jQuery("div[class*='lost']").removeClass("lost");
    jQuery("div[class*='thirdPlace']").removeClass("thirdPlace");
    jQuery("div[class*='fourthPlace']").removeClass("fourthPlace");
    jQuery("#crown").remove();
  }
  divCount();
  groupWonCount()
  eightsId();
  quartersId();
  midsId();
  finalsId();
  winnerSeconds();
  updateEights();
  podiumGold();
  podiumBronze();
  reseData();
  resetPage();
  

  function updateTeams() {
    divCount();
    groupWonCount()
    winnerSeconds();
    updateEights();
    updateQuarters();
    updateMids();
    updateFinals();
  }

  jQuery(function() {
    jQuery(".group").sortable();
    revert: true;
  });

  jQuery(".group").sortable({
    items: "div:not(.unsortable)"
  });
  jQuery(".group").disableSelection();

  jQuery(".group").sortable({
    update: function() {
      updateTeams();
    }
  });
  jQuery(".teamSelect").click(function() {
    updateTeams();
  });
  /*games*/

  jQuery(function() {
    jQuery("div[id^='E-G'] , div[id^='Q-G'],  div[id^='M-G']").draggable({
      containment: ".wrapper",
      cursor: "pointer",
      revert: "invalid",
      helper: "clone",
      activeClass: "wii"
    });
    for (let i = 0; i < 4; i++) {
      jQuery("div[id^='Q-G" + (i + 1) + "T1']").droppable({
        hoverClass: "hover",
        accept: "div[id^='E-G" + (i * 2 + 1) + "T']",
        drop: function(event, ui) {
          let pass = jQuery(".ui-draggable-dragging").text();
          jQuery("div[id^='Q-G" + (i + 1) + "T1']").text(pass);
          updateMids();
          updateFinals();
        }
      });
      jQuery("div[id^='Q-G" + (i + 1) + "T2']").droppable({
        hoverClass: "hover",
        accept: "div[id^='E-G" + (i * 2 + 2) + "T']",
        drop: function(event, ui) {
          let pass = jQuery(".ui-draggable-dragging").text();
          jQuery("div[id^='Q-G" + (i + 1) + "T2']").text(pass);
          updateMids();
          updateFinals();
        }
      });
    }
    for (let i = 0; i < 2; i++) {
      jQuery("div[id^='M-G" + (i + 1) + "T1']").droppable({
        hoverClass: "hover",
        accept: "div[id^='Q-G" + (i * 2 + 1) + "T']",
        drop: function(event, ui) {
          let pass = jQuery(".ui-draggable-dragging").text();
          jQuery("div[id^='M-G" + (i + 1) + "T1']").text(pass);
          updateFinals();
        }
      });
      jQuery("div[id^='M-G" + (i + 1) + "T2']").droppable({
        hoverClass: "hover",
        accept: "div[id^='Q-G" + (i * 2 + 2) + "T']",
        drop: function(event, ui) {
          let pass = jQuery(".ui-draggable-dragging").text();
          jQuery("div[id^='M-G" + (i + 1) + "T2']").text(pass);
          updateFinals();
        }
      });

      for (let i = 0; i < 2; i++) {
        jQuery("div[id^='F-G1T" + (i + 1) + "']").droppable({
          hoverClass: "hover",
          accept: "div[id^='M-G" + (i + 1) + "T']",
          drop: function(event, ui) {
            let pass = jQuery(".ui-draggable-dragging").text();
            jQuery("div[id^='F-G1T" + (i + 1) + "']").text(pass);
            let team1 = jQuery("#M-G" + (i + 1) + "T1").text();
            let team2 = jQuery("#M-G" + (i + 1) + "T2").text();
            if (pass === jQuery("#M-G" + (i + 1) + "T1").text()) {
              jQuery("#F-G2T" + (i + 1)).text(team2);
            } else {
              jQuery("#F-G2T" + (i + 1)).text(team1);
            }
            jQuery("#crown").remove();
            jQuery(".podium").remove();
            jQuery("div[class*='won']").removeClass("won");
            jQuery("div[class*='lost']").removeClass("lost");
          }
        });
      }
    }
  });
  /*JSON and Validation*/
  function validate() {
    jsonName = jQuery("#user").val();
    passwordToEncr = jQuery("#password").val();
    let pageUserReset = localStorage.getItem(jsonName);
    pageUserReset = JSON.parse(pageUserReset);
    if (pageUserReset == null) {
      return 1;
    } else {
      encrypted = String(CryptoJS.AES.encrypt(passwordToEncr, encryptString));
      decrypt = String(CryptoJS.AES.decrypt(encrypted, encryptString));
      if (
        String(CryptoJS.AES.decrypt(encrypted, encryptString)) ===
        String(CryptoJS.AES.decrypt(pageUserReset[64], encryptString))
      ) {
        return true;
      } else {
        alert("Wrong password");
        jsonName = undefined;
      }
    }
  }

  jQuery("#login").click(function() {
    if (
      jQuery.trim(jQuery("#user").val()) !== "" &&
      jQuery.trim(jQuery("#password").val()) !== ""
    ) {
      if (validate() === true) {
        alert("You are logged in");
      } else if (jsonName !== undefined) {
        alert("New user");
      }
    }
  });

  jQuery(".save").click(function() {
    if (jsonName !== undefined) {
      passwordToEncr = jQuery("#password").val();
      encrypted = String(CryptoJS.AES.encrypt(passwordToEncr, encryptString));
      userGroup = [];
      userGames = [];
      for (let i = 0; i < 32; i++) {
        userGroup.push(jQuery(teamNumber[i]).text());
        userGames.push(jQuery(teamGames[i]).text());
      }
      var dataSave = userGroup.concat(userGames);
      dataSave = dataSave.concat(encrypted);
      localStorage[jsonName] = JSON.stringify(dataSave);
      userGroup = [];
      userGames = [];
      alert("Saved");
    } else {
      alert("Please Login");
    }
  });

  jQuery(".load").click(function() {
    if (jsonName !== undefined) {
      classRemoval();
      let pageUserReset = localStorage.getItem(jsonName);
      pageUserReset = JSON.parse(pageUserReset);
      for (let i = 0; i < pageUserReset.length; i++) {
        jQuery(teamNumber[i]).text(pageUserReset[i]);
        jQuery(teamGames[i]).text(pageUserReset[i + 32]);
      }
    } else {
      alert("Please Login");
    }
  });
});
