<template>
	<web-view :src="weburl"></web-view>
</template>

<script setup>
	import { onLoad } from '@dcloudio/uni-app'
	import { ref } from 'vue'
	const weburl = ref('')
	onLoad((options) => {
		const { url } = options
		weburl.value = url
	})
</script>

<style>

</style>