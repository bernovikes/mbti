<template>
	<view class="flex font-15 white fw5 fixed x-eq-btns tc border-box pl-15 pr-15 justify-between left-0 z-3 w-100">
		<view @click="goTest" class="btn-left pt2 pb2">测一测你的智商多高</view>
		<view @click="openPayDialog" class="btn-right pt2 pb2 ">赠测Ta</view>
	</view>
</template>

<script setup>
	const openPayDialog = () => {
		uni.$emit('open_pay_dialog', 'friend')
	}
	const goTest = () => {
		uni.redirectTo({
			url: '/pagesIQ/index/index'
		})
	}
</script>

<style scoped lang="scss">
	.btn-left {
		background: linear-gradient(129deg, #90B5FF 0%, #6A92FF 100%);
		width: 59%;
	}

	.btn-right {
		background: url(https://res.vkunshan.com/depressed/report/eq/give-friend-btns.png) 0 0 / 100% no-repeat;
		width: 38%;
	}

	.btn-left,
	.btn-right {
		border-radius: 6px;
	}

	.x-eq-btns {
		bottom: 5%;
	}
</style>