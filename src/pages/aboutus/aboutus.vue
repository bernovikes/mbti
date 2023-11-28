<template>
	<view class="bg-f5f6f7 h-100">
		<uni-nav-bar color="#fff" backgroundColor="transparent" :border="false" left-icon="back" title="关于我们" @clickLeft="back" />
		<view class="pt-64 tc">
			<image class="icon" src="https://res.vkunshan.com/static/ucenter/launch-icon.png" />
			<view class="font-15 fw5 color-63686d">MBTI测试</view>
			<view class="mt-44">
				<span class="icon-exclamation dib v-mid" />
				<span class="dark-gray f6 fw4 ml2">当前版本：3.301</span>
			</view>
		</view>
	</view>
</template>

<script setup>
	const back = () => {
		uni.switchTab({
			url: '/pages/index/index'
		})
	}
</script>

<style scoped lang="scss">
	:deep(.uni-navbar__content) {
		background: linear-gradient(247deg, #7FBFFE 0%, #9D91FE 100%);
	}

	.icon {
		width: 153px;
		height: 153px;
	}

	.icon-exclamation {
		background: url(https://res.vkunshan.com/static/ucenter/icon-exclamation.png) 0 0 / 100% no-repeat;
		width: 15px;
		height: 15px;
	}
</style>