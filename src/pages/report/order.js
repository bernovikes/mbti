import { isWechat } from '@/common/lib.js'
export const payEnvCheck = (paymethod) => {
	const platform = process.env.UNI_PLATFORM
	if (paymethod === 'wechat') {
		if (platform === 'h5') {
			return isWechat() ? 'wechat_jspay' : 'wechat_website_pay'
		}
	}
	if (paymethod === 'alipay') {
		if (platform === 'h5') {
			return 'alipay_h5'
		}
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
		// store.state.report.callback = true
		const div = document.createElement('div')
		div.innerHTML = data
		document.body.append(div)
		div.querySelector('form').submit()
	} catch (e) {
		console.log(e)
	}
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
export const payGetWay = (type, argv) => {
	console.log(type, argv)
	const fn = {
		wechat_website_pay: wechatH5Pay,
		alipay_h5: aliPayH5,
		wechat_jspay: wechatJsSdkPay
	}
	return fn[type](...argv)
}