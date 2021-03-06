var SnekC = document.getElementById("S");
var SC = SnekC.getContext("2d");
var HeaderC = document.getElementById("H");
var HC = HeaderC.getContext("2d");
var clickedVar = false;
HC.font = "50px Arial";

//Credit to kirupa for writing this fire swipe detection
var input = document.getElementById('thebody');
input.addEventListener("touchstart", startTouch, false);
input.addEventListener("touchmove", moveTouch, false);
// Swipe Up / Down / Left / Right
var initialX = null;
var initialY = null;
function startTouch(e) {
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
};

function moveTouch(e) {
    if (initialX === null) {
        return;
    }

    if (initialY === null) {
        return;
    }
    var currentX = e.touches[0].clientX;
    var currentY = e.touches[0].clientY;
    var diffX = initialX - currentX;
    var diffY = initialY - currentY;
    if (Math.abs(diffX) > Math.abs(diffY)) {
        // sliding horizontally
        if (diffX > 0) {
            // swiped left
            keyss.push(65);
        } else {
            // swiped right

            keyss.push(68);
        }
    } else {
        // sliding vertically
        if (diffY > 0) {
            // swiped up
            keyss.push(87);
        } else {
            // swiped down
            keyss.push(83);
        }
    }
    initialX = null;
    initialY = null;
};


function resetVariables() {
    score = 0;
    clickedVar = false;
    running = "true";
    direction = "down"
    speed = 7
    keyss = []
    snook = {
        coords: [
            {
                x: 10,
                y: 10
            }
        ],
        buffer: {
            x: 10,
            y: 10
        }
    }
    GenerateApple();
}

SnekC.addEventListener("click", function () {
    clickedVar = true;
});

function HeaderUpdate() {
    HC.fillStyle = "#46567d";
    HC.fillRect(0, 0, HeaderC.width, HeaderC.height);
    HC.fillStyle = "#000000";
    HC.fillText("Score: " + score, 50, 65);
}


//Get Keys
document.onkeydown = function (evt) {
    evt = evt || window.event;
    if ((keyss.length < 2)) {
        keyss.push(evt.keyCode);
    }
};
//End of check keys


//These is what tells the code if you died.
function checkDed() {
    for (i = 1; i < snook.coords.length; i++) {
        if ((snook.coords[0].x === snook.coords[i].x) && (snook.coords[0].y === snook.coords[i].y)) {
            return true;
        }
    }
    if ((snook.coords[0].x < 0 || snook.coords[0].x > 29) || (snook.coords[0].y < 0 || snook.coords[0].y > 29)) {
        return true;
    }
}
//End


function GenerateApple() {
    apple = {
        coords: [
            {
                x: Math.floor(Math.random() * 30),
                y: Math.floor(Math.random() * 30)
            }
        ]
    }
}

function AppleCheck() {
    for (i = 0; i < apple.coords.length; i++) {
        if ((apple.coords[i].x === snook.coords[i].x) && (apple.coords[i].y === snook.coords[i].y)) {
            GenerateApple();
            snook.coords.push({
                x: snook.buffer.x, y: snook.buffer.y
            })
            score++;
        }
    }
}

function moveSnook() {
    //Ghost Coordinates of where the last segment of snake was just at
    snook.buffer.x = snook.coords[snook.coords.length - 1].x
    snook.buffer.y = snook.coords[snook.coords.length - 1].y
    if ((keyss[0] === 65 || keyss[0] === 37) && (direction != "right" || snook.coords.length === 1)) direction = "left";
    if ((keyss[0] === 68 || keyss[0] === 39) && (direction != "left" || snook.coords.length === 1)) direction = "right";
    if ((keyss[0] === 87 || keyss[0] === 38) && (direction != "down" || snook.coords.length === 1)) direction = "up";
    if ((keyss[0] === 83 || keyss[0] === 40) && (direction != "up" || snook.coords.length === 1)) direction = "down";
    //Remove the first element of the key queue
    keyss.shift();

    for (i = snook.coords.length - 1; i > 0; i--) {
        snook.coords[i].x = snook.coords[i - 1].x;
        snook.coords[i].y = snook.coords[i - 1].y;
    }
    switch (direction) {
        case "left":
            snook.coords[0].x -= 1;
            break;
        case "right":
            snook.coords[0].x += 1;
            break;
        case "up":
            snook.coords[0].y -= 1;
            break;
        case "down":
            snook.coords[0].y += 1;
            break;
    }
}


function draw() {
    SC.fillStyle = "#567d46";
    SC.fillRect(0, 0, SnekC.width, SnekC.height);
    SC.fillStyle = "red";
    SC.fillRect(apple.coords[0].x * 50 + 2.5, apple.coords[0].y * 50 + 2.5, 45, 45)
    SC.fillStyle = "#FFFFFF";
    for (i = 0; i < snook.coords.length; i++) {
        SC.fillRect(snook.coords[i].x * 50 + 2.5, snook.coords[i].y * 50 + 2.5, 45, 45);
    }
}

function GG() {
    SC.fillStyle = "red";
    SC.fillRect(0, 0, SnekC.width, SnekC.height);
    SC.font = "250px Arial";
    SC.fillStyle = "#000";
    SC.fillText("Game Over", 90, 700);

    if (keyss[0] === 13) {
        resetVariables();
    }
    if (clickedVar) {
        resetVariables();
    }
    if (keyss[0]) keyss.shift();
}

function TheSnek() {
    if (running === "true") {
        moveSnook();
        AppleCheck();
        HeaderUpdate();
        draw();
        if (clickedVar) {
            running = "paused";
            clickedVar = false;
        }
        if (checkDed()) running = "false";
    } else if (running === "paused") {
        if (clickedVar) {
            running = "true";
            clickedVar = false;
        }
    } else {
        GG();
    }
}

resetVariables();
setInterval(TheSnek, 1000 / speed);
