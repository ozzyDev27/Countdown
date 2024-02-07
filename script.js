function timeUntil() {
    const now = new Date();
    const targetTime = new Date(now);
    targetTime.setHours(14, 45, 0, 0);
    if (now > targetTime) {
        const mainTextElement = document.querySelector('.mainText');
        mainTextElement.innerHTML = "Done!";
    } else {
        const timeDifference = targetTime - now;
        const minutes = Math.floor(timeDifference / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        const mainTextElement = document.querySelector('.mainText');
        mainTextElement.innerHTML = formattedTime;
    }

    rotateMainTextIfNeeded();
}

function rotateMainTextIfNeeded() {
    const mainTextElement = document.querySelector('.mainText');
    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth;
    if (screenHeight > screenWidth) {
        mainTextElement.style.transform = 'rotate(270deg)';
    } else {
        mainTextElement.style.transform = 'rotate(0deg)';
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
