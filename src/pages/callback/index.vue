<template>
</template>

<script setup>
	import { onLoad } from '@dcloudio/uni-app'
	onLoad((options) => {
		const qs = new URLSearchParams(options)
		uni.setStorageSync('pay_callback', true)
		uni.redirectTo({
			url: `/pages/report/index?${qs}`
		})
	})
</script>

<style>
</style>