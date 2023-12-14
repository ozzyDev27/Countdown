function timeUntil() {
	const now = new Date();
	const targetTime = new Date(now);
	targetTime.setHours(10, 46, 0, 0);
    if (now>targetTime){
        const mainTextElement = document.querySelector('.mainText');
        mainTextElement.innerHTML = "Done!"; 
    }
    else{
        const timeDifference = targetTime - now;
        const minutes = Math.floor(timeDifference / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        const mainTextElement = document.querySelector('.mainText');
        mainTextElement.innerHTML = formattedTime;
    }
}

setInterval(timeUntil, 1000);