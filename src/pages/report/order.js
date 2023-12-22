import { isWechat } from '@/common/lib.js'
export const payEnvCheck = (paymethod) => {
	const platform = process.env.UNI_PLATFORM
	if (paymethod === 'wechat') {
		if (platform === 'h5') {
			return isWechat() ? 'wechat_jspay' : 'wechat_website_pay'
		}
		if (platform === 'app') {
			return 'wechat_app'
		}
	}
	if (paymethod === 'alipay') {
		if (platform === 'h5') {
			return 'alipay_website_pay'
		}
		if (platform === 'app') {
			return 'alipay_app'
		}
	}
	if (paymethod === 'wechat_scan') {
		return 'wechat_scan';
	}
}
/**
 * 微信h5支付
 * @param {string} 微信h5支付url  
 * @param {string} 回调地址  
 */
export const wechatH5Pay = (data, redirect_url) => {
	let path = `${import.meta.env.VITE_DOMAIN}/${redirect_url}`
	let url = `${data?.h5_url}&redirect_url=${encodeURIComponent(path)}`
	location.href = url
}
/**
 * 支付宝h5支付
 * @param {object} data
 */
export const aliPayH5 = (data) => {
	try {
		uni.setStorageSync('pay_callback', true)
		const div = document.createElement('div')
		div.innerHTML = data.h5
		document.body.append(div)
		div.querySelector('form').submit()
	} catch (e) {}
}
/**
 * 微信服务号支付
 * @param {object} data jssdk支付签名
 * @returns {object} promise  
 */
export const wechatJsSdkPay = (data) => {
	return new Promise((resolve, reject) => {
		function onBridgeReady() {
			WeixinJSBridge.invoke('getBrandWCPayRequest', data,
				function(res) {
					if (res.err_msg == "get_brand_wcpay_request:ok") {
						resolve(res)
					} else {
						reject(res)
					}
				});
		}
		// 
		if (typeof WeixinJSBridge == "undefined") {
			if (document.addEventListener) {
				document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
			} else if (document.attachEvent) {
				document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
				document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
			}
		} else {
			onBridgeReady();
		}
	})
}
const wechatScanDialog = (data) => {
	uni.$emit('wx_scan', data?.code_url)
}
const androidPay = (provider, data) => {
	return new Promise((resolve, reject) => {
		uni.requestPayment({
			provider,
			orderInfo: data,
			success(res) {
				uni.showToast({
					title: '支付成功'
				})
				resolve(res)
			},
			fail(err) {
				console.log(err)
				uni.showToast({
					title: '支付失败'
				})
				reject(err)
			}
		})
	})
}
export const payGetWay = (type, argv) => {
	const fn = {
		wechat_website_pay: wechatH5Pay,
		wechat_jspay: wechatJsSdkPay,
		alipay_website_pay: aliPayH5,
		wechat_scan: wechatScanDialog,
		wechat_app: () => androidPay('wxpay', ...argv),
		alipay_app: () => {
			const argvConfig = (data) => data?.h5			
			androidPay('alipay', argvConfig(...argv))
		}
	}
	return fn[type](...argv)
}