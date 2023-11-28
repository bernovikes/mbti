<template>
	<view class="article-page">
		<!--#ifdef H5-->
		<uni-nav-bar fixed="true" status-bar="true" left-icon="back" :title="title" @clickLeft="back" v-if="hide"></uni-nav-bar>
		<!--#endif-->
		<!-- <view class="title"> 法律政策</view> -->
		<view class="cont" v-html="data"></view>
	</view>
</template>

<script setup>
	import { userProtocol } from '@/api/json/config.js'
	import { onLoad } from '@dcloudio/uni-app'
	import { ref } from 'vue'
	const typeData = ['about_us', 'user_agreement', 'privacy_policy']
	const data = ref('')
	const hide = ref(false)
	const back = () => {
		uni.navigateBack()
	}
	onLoad(async (option) => {
		hide.value = option.hide
		const res = await userProtocol()
		data.value = res[typeData[option?.type]]
	})
</script>

<style lang="scss">
	.article-page {
		padding: 40rpx;

		.cont {
			font-size: 26rpx !important;
			line-height: 40rpx;
		}
	}
</style>