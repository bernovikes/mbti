<template>
	<view class="mb-26">
		<view class="color-6b9dff font-15 lh-17 width-fit relative b tc x-comment-title pl1 center mb3">
			<view class="icon-comment-circle absolute dib br-100"></view>
			用户评价
		</view>
		<swiper @change="changeSwiper" class="h-100 bg-dde9ff x-comment">
			<swiper-item v-for="(item,index) in comment" :key="index">
				<view class="pl3 pr3 h-100 flex items-center" v-if="currentSwiper===index">
					<image class="x-comment-avatar flex-shrink-0 br-100" :src="item.img" lazy-load />
					<view class="pl3">
						<view class="f6 lh-20">{{item.name}}</view>
						<view class="f7 lh-18 black-60">{{item.cp}}</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { comment } from '../mock.js'	
	const currentSwiper = ref(0)
	const changeSwiper = ({ detail: { current } }) => {
		currentSwiper.value = current
	}
</script>

<style lang="scss" scoped>
	.x-comment {
		border-radius: 8px;
		height: 94px;
	}

	.icon-comment-circle {
		width: 13px;
		height: 13px;
		background: url("data:image/svg+xml,%3Csvg width='13' height='13' viewBox='0 0 13 13' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient x1='50%25' y1='0%25' x2='50%25' y2='100%25' id='a'%3E%3Cstop stop-color='%2374A3FF' offset='0%25'/%3E%3Cstop stop-color='%2371A1FF' stop-opacity='.5' offset='57.525%25'/%3E%3Cstop stop-color='%23BBB2F7' stop-opacity='0' offset='100%25'/%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='159.5' cy='3864.5' r='6.5' transform='translate(-153 -3858)' fill='url(%23a)' fill-rule='evenodd' opacity='.459'/%3E%3C/svg%3E") no-repeat;
		left: 0;
		top: -5px;
	}

	.x-comment-title {}

	.x-comment-avatar {
		width: 64px;
		height: 64px;
	}
</style>