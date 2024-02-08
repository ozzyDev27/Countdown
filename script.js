let closestTimeIndex = 0; // Declare closestTimeIndex outside the function to keep track of the current index
let countdownEndTime = null; // Variable to track the time when countdown ends

function timeUntil() {
    const now = new Date();
    const Times = [[9, 20, 0, true], [9,22,0,false], [10, 47, 27, true], [10,49,27,false], [11, 30, 6, true], [12, 3, 6, true], [12,5,6,false], [13, 27, 42,true],[13,29,42,false], [14, 45, 0,true]];

    // Convert Times array into an array of Date objects
    const timesInDateObjects = Times.map(time => {
        const [hour, minute, second] = time;
        const date = new Date();
        date.setHours(hour, minute, second, 0);
        return date;
    });

    // Check if current time exceeds target time
    if (now > timesInDateObjects[closestTimeIndex]) {
        // Find the next closest time from Times array
        closestTimeIndex++;
        if (closestTimeIndex >= Times.length) {
            closestTimeIndex = 0; // Reset index if all times have passed
        }
    }

    if (now > timesInDateObjects[closestTimeIndex] && now-timesInDateObjects[closestTimeIndex-1]<=120000) {
        const mainTextElement = document.querySelector('.mainText');
        mainTextElement.innerHTML = "Done!";}
    else if (!Times[closestTimeIndex][3]) {
        const mainTextElement = document.querySelector('.mainText');
        mainTextElement.innerHTML = "Done!";
    }
    else {
        const targetTime = new Date(timesInDateObjects[closestTimeIndex]);
        const timeDifference = targetTime - now;
        const minutes = Math.floor(timeDifference / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        const mainTextElement = document.querySelector('.mainText');
        mainTextElement.innerHTML = formattedTime;
    }

    adjustMainText(); // Call the function to adjust text size and rotation
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

setInterval(timeUntil, 200);

document.addEventListener('DOMContentLoaded', () => {
    const mainTextElement = document.querySelector('.mainText');
    mainTextElement.addEventListener('click', () => {
        if (mainTextElement.requestFullscreen) {
            mainTextElement.requestFullscreen();
        } else if (mainTextElement.mozRequestFullScreen) { /* Firefox */
            mainTextElement.mozRequestFullScreen();
        } else if (mainTextElement.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            mainTextElement.webkitRequestFullscreen();
        } else if (mainTextElement.msRequestFullscreen) { /* IE/Edge */
            mainTextElement.msRequestFullscreen();
        }
    });
});
