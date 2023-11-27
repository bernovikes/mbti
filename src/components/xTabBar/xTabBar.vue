<template>
	<view class="fixed w-100 bg-white cm-tabbar bottom-0 left-0 flex">
		<view @click="goPage(item.url)" v-for="(item,index) in menu" :key="index" class="w-50 tc h-100 flex items-center flex-column justify-center">
			<view :class="[item.icon,currentUrl===item.url?'active' : '']" class="icon center" />
			<view class="f7 fw4 lh-16">{{item.label}}</view>
		</view>
	</view>
</template>

<script setup>
	import { reactive, ref, getCurrentInstance } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	const { ctx: { $: { $pageInstance: { ctx } } } } = getCurrentInstance()
	const currentUrl = ref(`/${ctx.route}`)
	const menu = reactive([
		{ label: '首页', icon: 'icon-index', url: '/pages/index/index' },
		{ label: '我的', icon: 'icon-user', url: '/pages/ucenter/ucenter' }
	])
	const goPage = (url) => {
		uni.switchTab({
			url
		})
	}
</script>

<style lang="scss" scoped>
	.cm-tabbar {
		height: 50px;
		padding-bottom: calc(constant(safe-area-inset-bottom)); ///���� IOS<11.2/
		padding-bottom: calc(env(safe-area-inset-bottom)); ///���� IOS>11.2/
	}

	.icon {
		background: var(--img) center / 100% 100% no-repeat;
	}

	.active.icon-index {
		width: 25px;
		height: 26px;
		--img: url(https://res.vkunshan.com/depressed/tabbar/icon-home-check.png);
	}

	.icon-index {
		width: 25px;
		height: 24px;
		--img: url(https://res.vkunshan.com/depressed/tabbar/icon-home-no-check.png);
	}

	.icon-user {
		width: 25px;
		height: 25px;
		--img: url(https://res.vkunshan.com/depressed/tabbar/icon-ucenter-no-check.png);
	}

	.active.icon-user {
		--img: url(https://res.vkunshan.com/depressed/tabbar/icon-ucenter-check.png);
	}
</style>