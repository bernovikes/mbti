import { reactive, ref, inject } from 'vue'
import { isWechat, isMobile, virtualPaymentCheck } from '@/common/lib.js'
export const list = reactive([{
		type: 'wechat',
		label: '微信支付',
		rec: true,
		check: true,
		icon: 'icon-wxpay',
	},
	{
		type: 'alipay',
		label: '支付宝支付',
		check: false,
		icon: 'icon-alipay',
	},
	{
		type: 'wechat_scan',
		label: '微信扫码（支持他人扫码）',
		check: false,
		icon: 'icon-wxpay',
	},
])
export const pop = ref('')
export const goods = ref({})
export const detailData = () => inject('detail')
export const close = () => {
	pop.value?.close()
	isMobile() && uni.$emit('close_pay_dialog')
}
export const pay_type = ref('wechat')
export const choosePayMethod = ({ detail: { value } }) => {
	pay_type.value = value
}
export const submit = () => {
	pop.value.close()
	uni.$emit('callpay', {
		goods_id: goods.value?.id,
		goods_type: goods.value?.type,
		pay_method: pay_type.value
	})
}
export const OpenPayDialog = () => {
	return new Promise((resolve, reject) => {
		uni.$on('open_pay_dialog', async (val) => {
			resolve(val)
			// #ifdef MP-WEIXIN
			virtualPaymentCheck().then(res => {
				if (!res) {
					uni.setStorageSync('go_follow', true)
					uni.navigateTo({
						url: `/pages/order/create?answer_id=${detailData().value?.id}`
					})
				} else {
					pop.value?.open()
				}
			})
			// #endif
			// #ifndef MP-WEIXIN
			pop.value?.open()
			// #endif
		})
	})
}