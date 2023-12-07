export const isWechat = () => {
	// #ifdef H5
	var ua = navigator.userAgent.toLowerCase();
	return ua.match(/micromessenger/i) == 'micromessenger';
	// #endif
	return false
}
export const getDevice = () => uni.getSystemInfoSync()?.deviceType
export const isMobile = () => {
	return uni.getSystemInfoSync()?.deviceType === 'phone';
}
export const getUserId = () => {
	return uni.getStorageSync('login_user')?.id
}
export const wechatNewAuth = () => {
	if (!uni.getStorageSync('call_auth')) {
		uni.setStorageSync('call_auth', +new Date())
		const env = import.meta.env
		const page = `${env.VITE_DOMAIN}/pages/login/oauth`
		location.href = `${env.VITE_APP_BASE_API}/wechat/login/oauth?redirect=${page}`
	}
}
const _requestAnimationFrame = (callback) => {
	return setTimeout(function() {
		callback(Date.now());
	}, 1000 / 60);
}

export function requestAnimationFrame(callback) {
	// #ifdef MP-WEIXIN || APP-PLUS
	return _requestAnimationFrame(callback)
	// #endif
	return window.requestAnimationFrame(callback)
}

export const statusBarHeight = () => {
	return `${uni.getSystemInfoSync()?.statusBarHeight}px`
}
export const structuredClone = (argv) => {
	// #ifdef H5
	return window.structuredClone(argv)
	// #endif
	// #ifdef APP-PLUS || MP
	return JSON.parse(JSON.stringify(argv))
	// #endif
}