<template>
	<view class="cm-record min-h-100" :class="{'empty':!data.length && !loadding}">		
		<uni-nav-bar color="#fff" fixed="true" backgroundColor="transparent" :border="false" left-icon="back" :title="nav" @clickLeft="back">
			<template v-slot:right>
				<image class="img-header-emoji o-30 absolute" lazy-load src="https://res.vkunshan.com/static/images/image-header-emoji.png" />
			</template>
		</uni-nav-bar>
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
				<view class="mt-20 flex items-center">
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
					<span class="btn white f7 fw5 lh-16">
						<slot name="btn" :item="item"></slot>
					</span>
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
		uni.switchTab({
			url: '/pages/index/index'
		})
	}
</script>

<style lang="scss" scoped>
	.cm-record {
		background: url(https://res.vkunshan.com/static/home/home-gradient-bg.png) left top / 100% 273px no-repeat, linear-gradient(to bottom, #F7F8FF, #F7F8FF);
	}

	.empty.cm-record {
		background: white;
		padding: 0;
	}

	.img-header-emoji {
		width: 33px;
		height: 27px;
	}

	:deep(.uni-navbar__content),
	.btn {
		background: linear-gradient(247deg, #7FBFFE 0%, #9D91FE 100%);
	}

	.cm-record-item {
		border-radius: 8px;
		box-shadow: 2px 2px 16px 0px rgba(131, 119, 227, 0.29);
	}

	.cm-item-tag {
		border-radius: 1px;
	}

	.icon {
		width: 12px;
		height: 12px;
	}

	.btn {
		border-radius: 2px;
		padding: 5px 13px;
	}
</style>