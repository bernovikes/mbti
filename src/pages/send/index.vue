<template>
	<view class="tc pt-20 pl-20 pr-20">
		<view>请截图发给好友扫码进行免费测试，或者复制下方赠送链接即可</view>
		<uQRCode class="center mt3" ref="uqrcode" :text="link" :size="200"></uQRCode>
		<view class="mt3 btn tc center white" @click="copyAddress">复制赠送链接</view>
	</view>
</template>
<script setup>
	import { setClipboardData } from '@/uni_modules/u-clipboard/js_sdk'
	import { onLoad } from '@dcloudio/uni-app'
	import uQRCode from '@/components/uqrcode/uqrcode.vue'
	import { ref } from 'vue'
	const domain = import.meta.env.VITE_DOMAIN
	const link = ref('')
	onLoad((options) => {
		const { redeem_code } = options
		link.value = `${domain}?sorid=${redeem_code}`
	})
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