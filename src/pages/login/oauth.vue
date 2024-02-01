<template>
</template>

<script setup>
	import { onLoad } from '@dcloudio/uni-app'
	onLoad((option) => {
		const { user_id, refer } = option
		uni.removeStorageSync('call_auth')
		uni.setStorageSync('login_user', { id: user_id, nickname: '匿名用户' })
		location.href = decodeURIComponent(refer)
		// uni.switchTab({
		// 	url: '/pages/index/index'
		// })
	})
</script>

<style>
</style>