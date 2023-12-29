<template>
	<view class="bg-f5f6f7 h-100">
		<view class="x-tabbar" :style="{'padding-top':statusBarHeight()}">
			<uni-nav-bar color="#fff" backgroundColor="transparent" :border="false" left-icon="back" title="关于我们" @clickLeft="back" />
		</view>
		<view class="pt-64 tc">
			<image class="icon" src="https://res.vkunshan.com/static/ucenter/launch-iconyiyu.png" />
			<view class="font-15 fw5 color-63686d">抑郁症测试</view>
			<view class="mt-44">
				<span class="icon-exclamation dib v-mid" />
				<span class="dark-gray f6 fw4 ml2">上海缇帕电子商务工作室 <br/>备案号：沪ICP备2020027980号-6A</span>		
			</view>
		</view>
	</view>
</template>

<script setup>
	import { statusBarHeight } from '@/common/lib.js'
	const back = () => {
		uni.switchTab({
			url: '/pages/index/index'
		})
	}
</script>

<style scoped lang="scss">
	.x-tabbar {
		background: linear-gradient(247deg, #7FBFFE 0%, #9D91FE 100%);
	}

	.icon {
		padding-top: 20px;
		padding-bottom: 20px;
		width: 153px;
		height: 153px;
	}

	.icon-exclamation {
		background: url(https://res.vkunshan.com/static/ucenter/icon-exclamation.png) 0 0 / 100% no-repeat;
		width: 15px;
		height: 15px;
	}
</style>