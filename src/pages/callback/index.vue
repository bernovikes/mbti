<template>
</template>

<script setup>
	const { ctx: { $page } } = getCurrentInstance()
	const qs = new URLSearchParams($page.options)
	uni.setStorageSync('pay_callback', true)
	uni.redirectTo({
		url: `/pages/report/index?${qs}`
	})
</script>

<style>
</style>