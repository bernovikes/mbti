<template>
	<view class="tc pt-20 pl-20 pr-20">
		<view>请截图发给好友扫码进行免费测试，或者复制下方赠送链接即可</view>
		<block v-if="copystatus">
			<uQRCode class="center mt3" ref="uqrcode" :text="link" :size="200"></uQRCode>
			<view class="mt3 btn tc center white" @click="copyAddress">复制赠送链接</view>
		</block>
	</view>
</template>
<script setup>
import { setClipboardData } from '@/uni_modules/u-clipboard/js_sdk'
import { onLoad, onUnload } from '@dcloudio/uni-app'
import uQRCode from '@/components/uqrcode/uqrcode.vue'
import { fetchRedeemOrderDetail } from '@/api/api.js'
import { ref } from 'vue'
const domain = import.meta.env.VITE_DOMAIN
const link = ref('')
let timer = null
const copystatus = ref(false)
const createLink = (redeem_code, id) => {
	link.value = `${domain}/pages/answer/index?pay_redeem_code=${redeem_code}&id=${id}`
}
onLoad((options) => {
	const { redeem_code, trace_no, id } = options
	if (trace_no && !redeem_code) {
		timer = setInterval(() => {
			init(trace_no)
		}, 2000)
	}
	if (redeem_code && id) {
		copystatus.value = true
		createLink(redeem_code, id)
	}

})
onUnload(() => {
	timer && clearInterval(timer)
	timer = null
})
const init = async (trace_no) => {
	try {
		const { data } = await fetchRedeemOrderDetail(trace_no)
		if (data?.redeem_code) {
			copystatus.value = true
			createLink(data?.redeem_code, data?.question_bank_id)
			clearInterval(timer)
		}
	} catch (e) {
		//TODO handle the exception
	}
}
const copyAddress = () => {
	setClipboardData(link.value).then(() => {
		uni.showToast({
			title: '复制成功',
			icon: 'none'
		})
	})
}
</script>
<style scoped lang="scss">
.btn {
	width: 250px;
	line-height: 46px;
	background: #007aff;
	border-radius: 5px;
	cursor: pointer;
}
</style>