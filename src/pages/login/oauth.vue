<template>
</template>

<script setup>
	import { onLoad } from '@dcloudio/uni-app'
	onLoad((option) => {
		const { user_id } = option
		uni.removeStorageSync('call_auth')
		uni.setStorageSync('login_user', { id: user_id, nickname: '匿名用户' })
		uni.switchTab({
			url: '/pages/index/index'
		})
	})
</script>

<style>
</style>