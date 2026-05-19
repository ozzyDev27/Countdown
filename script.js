let xSpeed = (Math.floor(Math.random()-.5)+.5)*3;
let ySpeed = (Math.floor(Math.random()-.5)+.5)*3;
let arbitrarySpeedMultiplier = 1;
let triggerAnim=false;
let bounceNum=0;
let started = false;
let manualTarget = null;
const speedFloor = 1.5;

function timeUntil() {
    const now = new Date();
    const mainTextElement = document.querySelector('.mainText');

    if (manualTarget) {
        const timeDifference = manualTarget - now;
        if (timeDifference <= 0) {
            mainTextElement.innerHTML = "Done!";
        } else {
            const minutes = Math.floor(timeDifference / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
            mainTextElement.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }
    }

    adjustMainText();
    moveText();
}



function moveText() {
    const mainTextElement = document.querySelector('.mainText');
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const isPortrait = screenHeight > screenWidth;
    const visWidth = isPortrait ? mainTextElement.offsetHeight : mainTextElement.offsetWidth;
    const visHeight = isPortrait ? mainTextElement.offsetWidth : mainTextElement.offsetHeight;
    let x = parseFloat(mainTextElement.style.left) || screenWidth / 2;
    let y = parseFloat(mainTextElement.style.top) || screenHeight / 2;
    x += ((xSpeed*arbitrarySpeedMultiplier)/1680)*screenWidth;
    y += ((ySpeed*arbitrarySpeedMultiplier)/1050)*screenHeight;
    if (x >= screenWidth - visWidth) {
        x-=xSpeed*arbitrarySpeedMultiplier;
        if (bounceNum==1){
            x=(screenWidth-visWidth)-10;
            xSpeed=-1.5;
            bounceNum=0;
            console.log("uhh")
        }
        else{
            console.log(bounceNum)
            bounceNum=1;
        }
        xSpeed = Math.abs(xSpeed)*((-0.2*Math.random())-0.9);
        if (Math.abs(xSpeed) < speedFloor) xSpeed = -speedFloor;
    } else if (x <= 0) {
        x-=xSpeed*arbitrarySpeedMultiplier;
        xSpeed = Math.abs(xSpeed)*-1*((-0.2*Math.random())-0.9);
        if (Math.abs(xSpeed) < speedFloor) xSpeed = speedFloor;
        bounceNum=0
        console.log("!!!")
    }
    
    if (y >= screenHeight - visHeight) {
        y-=ySpeed*arbitrarySpeedMultiplier;
        ySpeed =Math.abs(ySpeed)*((-0.2*Math.random())-0.9);
        if (Math.abs(ySpeed) < speedFloor) ySpeed = -speedFloor;
    } else if (y <= 0) {
        y-=ySpeed*arbitrarySpeedMultiplier;
        ySpeed = Math.abs(ySpeed)*-1*((-0.2*Math.random())-0.9);
        if (Math.abs(ySpeed) < speedFloor) ySpeed = speedFloor;
    }
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
    }}

function enterFullscreen() {
    const body = document.querySelector('body');
    if (body.webkitRequestFullscreen) {
        body.webkitRequestFullscreen();
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const mainTextElement = document.querySelector('.mainText');
    const now = new Date();
    mainTextElement.style.left=(Math.random()*(window.innerWidth-mainTextElement.offSetWidth))+'px';
    mainTextElement.style.top=(Math.random()*(window.innerHeight-mainTextElement.offsetHeight))+'px';
    mainTextElement.innerHTML = "Click!";
    adjustMainText();
    const moveInterval = setInterval(moveText, 5);

    document.querySelector('body').addEventListener('click', () => {
        const input = prompt('Enter target time (HH:MM):');
        enterFullscreen();
        if (!input) return;
        let [h, m] = input.split(':').map(Number);
        if (isNaN(h) || isNaN(m)) return;
        const target = new Date();
        target.setHours(h, m, 0, 0);
        if (target <= new Date() && h < 12) {
            target.setHours(h + 12, m, 0, 0);
        }
        manualTarget = target;
        if (!started) {
            started = true;
            clearInterval(moveInterval);
            setInterval(timeUntil, 5);
        }
    });
    
});
