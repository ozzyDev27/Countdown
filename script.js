let closestTimeIndex = 0;
let countdownEndTime = null;
let xSpeed = (Math.floor(Math.random()-.5)+.5)*3;
let ySpeed = (Math.floor(Math.random()-.5)+.5)*3;
let arbitrarySpeedMultiplier = 2000;

function timeUntil() {
    const now = new Date();
    const Times = [[9, 20, 0, true], [9,22,0,false], [10, 47, 27, true], [10,49,27,false], [11, 27, 0, true], [12, 3, 6, true], [12,5,6,false], [13, 22, 42,true],[13,29,42,false], [14, 45, 0,true], [14,50,0,false], [16,0,0,true], [24,0,0,false]];

    const timesInDateObjects = Times.map(time => {
        const [hour, minute, second] = time;
        const date = new Date();
        date.setHours(hour, minute, second, 0);
        return date;
    });

    while (now > timesInDateObjects[closestTimeIndex]) {
        closestTimeIndex++;
        if (closestTimeIndex >= Times.length) {
            closestTimeIndex = 0;
        }
    }

    const mainTextElement = document.querySelector('.mainText');

    if (now > timesInDateObjects[closestTimeIndex] && now - timesInDateObjects[closestTimeIndex - 1] <= 120000) {
        mainTextElement.innerHTML = "Done!";
    } else if (!Times[closestTimeIndex][3]) {
        mainTextElement.innerHTML = "Done!";
    } else {
        const targetTime = new Date(timesInDateObjects[closestTimeIndex]);
        const timeDifference = targetTime - now;
        const minutes = Math.floor(timeDifference / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        mainTextElement.innerHTML = formattedTime;
    }

    adjustMainText();
    moveText();
}
function moveText() {
    const mainTextElement = document.querySelector('.mainText');
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    let x = parseFloat(mainTextElement.style.left) || screenWidth / 2; // Initialize x position to the center of the screen
    let y = parseFloat(mainTextElement.style.top) || screenHeight / 2; // Initialize y position to the center of the screen

    // Update position based on speed
    
    x += xSpeed/(screenWidth/arbitrarySpeedMultiplier);
    y += ySpeed/(screenWidth/arbitrarySpeedMultiplier);
    // Check if the text hits the boundaries and adjust the speed accordingly
    if (x >= screenWidth - mainTextElement.offsetWidth) {
        x = screenWidth - mainTextElement.offsetWidth; // Adjust x position to stay within the boundary
        xSpeed *= (-0.2*Math.random())-0.9; // Reverse x direction
        
    } else if (x <= 0) {
        x = 1; // Adjust x position to stay within the boundary
        xSpeed *= (-0.2*Math.random())-0.9; // Reverse x direction
    }
    
    if (y >= screenHeight - mainTextElement.offsetHeight) {
        y = screenHeight - mainTextElement.offsetHeight; // Adjust y position to stay within the boundary
        ySpeed *= (-0.2*Math.random())-0.9; // Reverse y direction
    } else if (y <= 0) {
        y = 1; // Adjust y position to stay within the boundary
        ySpeed *= (-0.2*Math.random())-0.9; // Reverse y direction   
    }

    // Update the position of the text element
    mainTextElement.style.left = x + 'px';
    mainTextElement.style.top = y + 'px';
}


function adjustMainText() {
    const mainTextElement = document.querySelector('.mainText');
    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth;
    if (screenHeight > screenWidth) {
        mainTextElement.style.transform = 'rotate(270deg)';
        mainTextElement.style.fontSize = '20vh';
    } else {
        mainTextElement.style.transform = 'none';
        mainTextElement.style.fontSize = '15vw';
    }
}

function enterFullscreen() {
    const mainTextElement = document.querySelector('.mainText');
    if (mainTextElement.webkitRequestFullscreen) {
        mainTextElement.webkitRequestFullscreen();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const mainTextElement = document.querySelector('.mainText');
    const now = new Date();
    mainTextElement.style.left=Math.random()*window.innerWidth;
    mainTextElement.style.top=Math.random()*window.innerHeight;
    if (now.getDay() === 0 || now.getDay() === 6) {
        mainTextElement.innerHTML = "Weekend :)";
    } else {
        timeUntil(); // Call the function to initialize the time display
        setInterval(timeUntil, 5); // Start updating the time display
        mainTextElement.addEventListener('click', enterFullscreen);
    }
});
