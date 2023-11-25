export const isWechat = () => {
	var ua = navigator.userAgent.toLowerCase();
	return ua.match(/micromessenger/i) == 'micromessenger';
}
export const isMobile = () => {
	return uni.getSystemInfoSync()?.deviceType === 'phone';
}