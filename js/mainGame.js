// Declarations of variables
// A variable that contains the canvas defined in the html on which the hanging man will be drawn
var canvas = document.getElementById("myCanvas");
// A variable that is actually the body of the current drawing
var ctx = canvas.getContext("2d");
//An array of words that serves as a word pool for the game
var allWords = ["ענבים", "דלת", "ספר", "מחשב", "מטריה", "מרפסת", "קרטון", "בחילה", "אוזן", "ציפור", "דרדסית", "ברז", "תינוק", "צוהר", "פריחה", "בושם", "צלוחית", "שקע", "סנדלים", "קלסר", "דולפין", "כנען", "טלפון", "מורשת", "נודלס", "סידור", "טירון", "חלום", "סבתא", "אנגלית", "דוור", "שור", "מעיין"];
// An array of letters, with the help of which a keyboard generator function generates keys
var lettersForBtn = ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "כ", "ך", "ל", "מ", "ם", "נ", "ן", "ס", "ע", "פ", "ף", "צ", "ץ", "ק", "ר", "ש", "ת"];
// A variable that will contain the word added for the current game
var chosenWord = "";
// A variable that accumulates the amount of disqualifications in the game
var countFailed = 0;
var countTrueLetters = 0;
var esc = document.getElementById("esc");
// icon of hint
var hint = document.getElementById("hintButton");
// question if you need help
var textHint = document.getElementById("hintText");
//The timer
var seconds;
var timeInter;
//An array of objects each representing a limb from the hanging man. Each element contains - the name of the element and the starting point of the drawing and the ending point of the drawing
var man = [
    {
        nameL: "leftLine",
        startX: 20,
        startY: 200,
        endX: 20,
        endY: 20,
    },
    {
        nameL: "topLine",
        startX: 8,
        startY: 8,
        endX: 75,
        endY: 8,
    },
    {
        nameL: "rightLine",
        startX: 130,
        startY: 8,
        endX: 130,
        endY: 17,
    },

    {
        nameL: "bodyLine",
        startX: 130,
        startY: 64,
        endX: 130,
        endY: 85,
    },

    {
        nameL: "rigthHand",
        startX: 130,
        startY: 65,
        endX: 120,
        endY: 75,
    },
    {
        nameL: "leftHand",
        startX: 130,
        startY: 65,
        endX: 140,
        endY: 75,
    },

    {
        nameL: "rightLeg",
        startX: 130,
        startY: 125,
        endX: 140,
        endY: 135,
    },

    {
        nameL: "leftLege",
        startX: 130,
        startY: 125,
        endX: 120,
        endY: 135,
    },
];
// function declarations
// A function that manages the progress of the game is loaded when the page is opened
window.onload = function start() {
    document.getElementById("userName").innerText = "שם השחקן:\n" + sessionStorage.getItem('name') + "😊";
    // First the game management function calls the function that chooses a random word for this game
    getRandomItem();
    // Then the function calls the line creation function which creates lines according to the number of letters in the word
    crateLine();
    // Finally, the function calls the key creation function - to create the keyboard
    createButtons();
    startTimer(60, document.getElementById("time"));
    // fillWin();
}
//When the game over
function GameOver() {
    location.reload();
}
// Random word selection function
function getRandomItem() {
    // A variable into which a number among the numbers is drawn that is equal to the length of the array of words
    let x = Math.floor(Math.random() * allWords.length);
    // Placing the word found in the index that came out in the lottery inside the variable created for it
    chosenWord = allWords[x];
}

// A function to create lines instead of letters
function crateLine() {
    // A loop that works as many times as the length of the letters in the selected word
    for (var i = 0; i < chosenWord.length; i++) {
        // A variable that will be a line that will represent a certain letter from the word
        var letter = document.createElement("LABEL");
        // Each line gets its own id
        letter.id = i;
        // line design
        letter.style.fontColor = "white"
        letter.style.width = "30px";
        letter.style.display = "inline-block";
        letter.style.fontSize = "50px";
        letter.style.margin = "2%";
        letter.style.color = "#fffff";
        letter.style.height = "20px";
        letter.style.borderBottom = "thick solid white ";
        // Adding the newly created line to the existing line sequence
        var divWords = document.getElementById("theWord");
        divWords.appendChild(letter);
    }
}

// A function that creates a keyboard
function createButtons() {
    // A loop that goes through the entire array of letters and creates a key for each letter
    for (var i = 0; i < lettersForBtn.length; i++) {
        // A variable that will be a key on the keyboard
        var b = document.createElement("button");
        // The design of the key
        b.style.backgroundImage = "url('../pictures/tree.PNG')";
        b.style.borderColor = "#1a0d00";
        b.style.color = "red";
        b.style.fontFamily = "Narkisim"
        b.style.fontWeight = "bold"
        b.style.borderWidth = "6px"
        b.style.margin = "1%";
        b.style.borderRadius = "5px";
        b.style.width = "50px";
        b.style.height = "50px";
        b.style.fontSize = "30px"
        b.style.fontFamily = "myFont";
        // This command writes the letter you are creating on the key
        b.innerHTML = lettersForBtn[i];
        // The id is saved as the generated letter
        b.id = lettersForBtn[i]
        // When there is a press event, the key is sent for testing - does the selected letter appear in the word
        b.addEventListener('click', (e) => { checkLetter(e) })
        // When the button is clicked the button will be sent to hide so that it will not be used again
        document.getElementById("buttons").append(b);
    }
}
// A function that checks if a certain letter exists in a word
const checkLetter = (btn) => {
    var flag = false;
    // A loop that goes through the entire word and checks if the currently sent signal exists in the word
    for (var i = 0; i < chosenWord.length; i++) {
        if (btn.srcElement.innerHTML == chosenWord[i]) {
            // If the signal does exist, a variable is created that will populate the detected signal
            let l = document.getElementById("theWord").childNodes[i];
            // Then hide the line that was until now instead of the letter
            l.style.borderBottom = 'none';
            l.style.fontColor = "white"
            // And finally write the letter on the board
            l.innerHTML = chosenWord[i];
            flag = true;
            countTrueLetters++;
        }
    }
    // If the signal does not exist
    if (!flag) {
        // Updating the amount of disqualifications
        countFailed++;
        // and send to the function drawing the man
        drawLineInMan();
        var numOfFailed = document.getElementById("numOfFailed").innerHTML = (9 - countFailed);
    }
    // When the button is clicked the button will be sent to hide so that it will not be used again
    btn.srcElement.style.visibility = 'hidden';
    //when the player lost
    if (countFailed == 9) {
        end(false);
    }
    if (chosenWord.length == countTrueLetters) {
        end(true);
    }
}
//When the game overed
function end(flag) {
    // page that appears at the end of the game
    var result = document.getElementById("finish");
    // page style
    result.style.display = "block";
    document.getElementById("titleOfEnd").style.fontSize = "30px";
    document.getElementById("result").style.fontSize = "20px";
    document.getElementById("result").innerHTML = "המילה הנכונה: <br/><br/>\"" + chosenWord + "\"";
    document.getElementById("buttonAgain").style.display = "block";
    var button = document.getElementById("buttonAgain");
    button.innerHTML = "בא לי לשחק עוד הפעם!!";
    button.style.width = "500px";
    button.style.height = "100px";
    button.style.marginRight = "30%";
    button.style.alignItems = "center";
    button.style.marginTop = "5%";
    button.style.backgroundColor = "red";
    button.style.fontSize = "25px";
    // stop the timer
    clearInterval(timeInter);
    //   in win case
    if (flag) {
        var audio = new Audio('../audio/clups.mp3');
        audio.play();
        // suit text
        document.getElementById("titleOfEnd").innerText = "ואוו!! כל הכבוד!הצלחתם:)"

    }
    // in fail case
    else {
        var audio = new Audio('../audio/gameOver.mp3');
        audio.play();
        document.getElementById("titleOfEnd").innerText = "אוי, הפעם לא הלך! אולי בפעם הבאה!";
    }
}
//when the user hover the light bulbvar allGame=[]
hint.onmouseover = function (e) {
    textHint.style.visibility = "visible";
}
hint.onmouseout = function (e) {
    textHint.style.visibility = "hidden";
}
function doHint() {
    var flag = false;
    // loop that find the first missing letter in word
    for (var i = 0; i < chosenWord.length && !flag; i++) {
        // var that contains the current letter
        let l = document.getElementById("theWord").childNodes[i];
        // var that contains the keyBoard
        let buttons = document.getElementById("buttons");
        // in case that the butten is apear
        if (l.style.borderBottom != 'none') {
            // loop that finding the required butten and hide it
            for (let j = 0; j < 27; j++) {
                if (buttons.childNodes[j].innerHTML == chosenWord[i]) {
                    buttons.childNodes[j].style.visibility = 'hidden';
                }
            }
            // Then hide the line that was until now instead of the letter
            l.style.borderBottom = 'none';
            // And finally write the letter on the board
            l.innerHTML = chosenWord[i];
            flag = true;
            countTrueLetters++;
            //when the player lost
            if (countFailed == 9) {
                end(false);
            }
            if (chosenWord.length == countTrueLetters) {
                end(true);
            }
        }
    }
}
// A function that draws part of the man's body
function drawLineInMan() {
    // The switch goes through the amount of disqualifications and according to the amount it draws the required member, and it divides it into cases within the switch
    switch (countFailed) {
        // In any case of disqualification, the function that actually draws is called, and each time a different index is sent to it, and it takes the index and goes to the array of objects, and from there pulls out the appropriate data and draws a member accordingly
        case 1: drawNow(0);
            break;
        case 2: drawNow(1);
            break;
        case 3: drawNow(2);
            break;
        // In the fourth case, the function does not call the function that draws lines because now the head is drawn, so it does it independently
        case 4: {
            ctx.beginPath();
            ctx.arc(130, 50, 15, 0, 2 * Math.PI);
            ctx.stroke();
        }
            break;
        case 5: drawNow(3);
            break;
        case 6: drawNow(4);
            break;
        case 7: drawNow(5);
            break;
        case 8: drawNow(6);
            break;
        case 9: drawNow(7);
            break;

    }
}

function startTimer(duration, display) {
    var timer = 60, minutes;
    timeInter = setInterval(function () {
        //convert the duration to minutes and second
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        //checking
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        //write the data
        display.textContent = minutes + ":" + seconds;
        //check the time over
        if (--timer < 0) {
            end(false);
            clearInterval(timeInter);
        }
    }, 1000);
}

// A function for drawing a line that is a part of the human body
function drawNow(i) {
    // A member that contains the x value of the starting point of the line (changes each time according to the position in the array)
    var startX = man[i].startX;
    // A member that contains the y value of the starting point of the line (changes each time according to the position in the array)
    var startY = man[i].startY;
    // A member that contains the x value of the end point of the line (changes each time according to the position in the array)
    var endX = man[i].endX;
    // A member that contains the y value of the end point of the line (changes each time according to the position in the array)
    var endY = man[i].endY;
    // A variable that will advance the drawing in small steps
    var amount = 0;
    // Line drawing animation function
    var start = setInterval(function () {
        amount += 0.05;
        // line design
        ctx.strokeStyle = "white";
        ctx.lineWidth = 5;
        // The starting point of the line
        ctx.moveTo(startX, startY);
        // The end point - it is dynamic because there is an animation of a drawing and it constantly updates the drawing
        ctx.lineTo(startX + (endX - startX) * amount, startY + (endY - startY) * amount);
        ctx.stroke();
        // Stopping condition for the drawing function
        if (amount > 3) {
            clearInterval(start);
        }
    }, 20);
}




