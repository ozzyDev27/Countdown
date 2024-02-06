function timeUntil() {
	const now = new Date();
	const targetTime = new Date(now);
	targetTime.setHours(14, 45, 00, 0);
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
