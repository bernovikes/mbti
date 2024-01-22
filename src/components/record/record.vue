<template>
	<view class="x-container bg-f5f6f7" :class="{'empty':!data.length && !loadding}">
		<view class="x-navbar" :style="{'padding-top':statusBarHeight()}">
			<uni-nav-bar color="#fff" fixed="true" backgroundColor="transparent" :border="false" left-icon="back" :title="nav" @clickLeft="back" />
		</view>
		<!--  -->
		<view class="pl-14 pr-14 mt-20 pb-20" v-if="data.length&&!loadding">
			<view class="bg-white mb2 cm-record-item pt-14 pb-14 pl3 pr3" v-for="(item,index) in data" :key="index">
				<view class="flex">
					<span class="f6 fw6 ml2 color-29292f">
						<slot name="title" :item="item"></slot>
					</span>
					<span class="f7 lh-17  ml-auto">
						<slot name="status" :item="item"></slot>
					</span>
				</view>
				<view class="mt-17 flex items-center">
					<image class="icon" lazy-load src="https://res.vkunshan.com/static/log-ioc01.png" />
					<span class="font-13 fw5 color-4b4b57 lh-18 ml-10">
						<slot name="no" :item="item"></slot>
					</span>
				</view>
				<view class="mt2 flex items-center">
					<image class="icon" lazy-load src="https://res.vkunshan.com/static/log-ioc02.png" />
					<span class="f7 fw5 color-9898a8 lh-16 ml-10">
						<slot name="time" :item="item"></slot>
					</span>
				</view>
				<!--  -->
				<view class="tr mt2">
					<slot name="btn" :item="item"></slot>
				</view>
			</view>
		</view>
		<!--  -->
		<block v-if="!loadding&&!data.length">
			<slot name="empty"></slot>
		</block>
	</view>
</template>

<script setup>
	import { statusBarHeight } from '@/common/lib.js'
	const props = defineProps({
		loadding: {
			type: Boolean,
			default: true
		},
		nav: {
			type: String,
			default: ''
		},
		data: {
			type: Array,
			default: []
		}
	})
	const back = () => {
		uni.navigateBack()
	}
</script>

<style lang="scss" scoped>
	.empty.cm-record {
		background: white;
		padding: 0;
	}

	.x-navbar {
		background: linear-gradient(315deg, #5790FF 0%, #73A2FF 53%, #8EB4FF 100%);
	}

	.cm-record-item {
		border-radius: 8px;
	}

	.cm-item-tag {
		border-radius: 1px;
	}

	.icon {
		width: 12px;
		height: 12px;
	}

	.x-container {
		/* #ifdef H5 || APP-PLUS */
		min-height: 100%;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		min-height: 100vh;
		/* #endif */
	}
</style>