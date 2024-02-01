<template>
	<view class="fixed w-100 bottom-0 left-0">
		<view class="bg-white cm-tabbar  flex">
			<view @click="goPage(item)" v-for="(item,index) in menuConfig[theme]" :key="index" class="w-50 tc h-100 flex items-center flex-column justify-center">
				<view :class="[item.icon,currentUrl===item.url?'active' : '']" class="icon center" />
				<view class="f7 fw4 lh-16">{{item.label}}</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	const props = defineProps({
		theme: {
			type: String,
			default: 'yiyu'
		}
	})
	import { reactive, ref, onMounted } from 'vue'
	const page = getCurrentPages().slice(-1)[0]
	const currentUrl = ref(`/${page.route}`)
	const menuConfig = {
		yiyu: [
			{ label: '首页', icon: 'icon-index', url: '/pages/index/index', method: uni.switchTab },
			{ label: '智商情商', icon: 'icon-iqeq', url: '/pagesIQ/index/index', method: uni.redirectTo },
			{ label: '我的', icon: 'icon-user', url: '/pages/ucenter/ucenter', method: uni.switchTab }
		],
		iq: [
			{ label: '首页', icon: 'icon-index', url: '/pagesIQ/index/index', method: uni.redirectTo },
			{ label: '抑郁测试', icon: 'icon-iqeq', url: '/pages/index/index', method: uni.switchTab },
			{ label: '我的', icon: 'icon-user', url: '/pagesIQ/ucenter/index', method: uni.redirectTo }
		]
	}

	const goPage = (item) => {
		item.method({
			url: item.url
		})
	}
	onMounted(() => {
		// #ifdef H5 || APP-PLUS
		uni.hideTabBar()
		// #endif
	})
</script>

<style lang="scss" scoped>
	.cm-tabbar {
		height: 50px;
		padding-bottom: calc(constant(safe-area-inset-bottom));
		padding-bottom: calc(env(safe-area-inset-bottom));
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

	.icon-iqeq {
		width: 22px;
		height: 23px;
		--img: url(https://res.vkunshan.com/depressed/tabbar/icon-iqeq-no-check.png);
	}

	.active.icon-iqeq {
		--img: url(https://res.vkunshan.com/depressed/tabbar/icon-iqeq-check.png);
	}

	.active.icon-user {
		--img: url(https://res.vkunshan.com/depressed/tabbar/icon-ucenter-check.png);
	}

	@media screen and (min-width: 768px) {
		.cm-tabbar {
			max-width: 375px;
			margin: 0 auto;
		}
	}
</style>