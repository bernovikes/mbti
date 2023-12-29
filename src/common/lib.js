import { appLogin, miniLogin } from '@/api/api.js'
import { HTTP_SUCCESS } from '@/enum/http';
import { versionConfig } from '@/api/json/config.js'
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
	const _clone = (argv) => JSON.parse(JSON.stringify(argv))
	// #ifdef H5
	return 'structuredClone' in window ? window.structuredClone(argv) : _clone(argv)
	// #endif
	// #ifdef APP-PLUS || MP
	return _clone(argv)
	// #endif
}
export const wechatAppLogin = () => {
	uni.login({
		provider: 'weixin',
		async success(loginRes) {
			try {
				const { data, code, msg } = await appLogin({
					access_token: loginRes.authResult.access_token,
					openid: loginRes.authResult.openid,
				})
				if (code === HTTP_SUCCESS) {
					uni.setStorageSync('login_user', { id: data?.user_id, nickname: '微信用户' })
					uni.showToast({
						icon: 'none',
						title: msg,
						success() {
							uni.switchTab({
								url: '/pages/index/index'
							})
						}
					})
				}
			} catch (e) {
				//TODO handle the exception
			}
		},
		fail(err) {
			uni.showModal({
				'title': '提示',
				'content': JSON.stringify(err)
			})
		}
	})
}
export const goPrivate = () => {
	uni.navigateTo({
		url: '/pages/webview/webview?url=https://res.vkunshan.com/config/depressed/privacy_policy.html'
	})
}
export const agreement = () => {
	uni.navigateTo({
		url: '/pages/webview/webview?url=https://res.vkunshan.com/config/depressed/user_agreement.html'
	})
}
// 版本比较
export const compVersion = async () => {
	const { version } = await versionConfig()
	const channel = import.meta.env.VITE_APP_CHANNEL
	const channel_version = version?.[channel]
	if (channel_version) {
		return +import.meta.env.VITE_APP_VERSION <= channel_version
	} else {
		return false
	}
}
export const WechatMiniLogin = () => {
	const cache = uni.getStorageSync('login_user')
	if (cache) {
		return Promise.resolve(cache)
	}
	return new Promise((resolve, reject) => {
		uni.login({
			async success({ code }) {
				try {
					const { code: lcode, data, msg } = await miniLogin({ code, nickname: '小程序用户' })
					if (lcode === HTTP_SUCCESS) {
						uni.setStorageSync('login_user', { id: data?.user_id, nickname: '微信用户' })
						uni.showToast({
							title: msg,
							icon: 'none'
						})
						resolve(data)
					} else {
						reject('login_error')
					}
				} catch (e) {
					//TODO handle the exception
				}
			}
		})
	})
}