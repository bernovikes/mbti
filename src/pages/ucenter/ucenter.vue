<template>
	<view class="x-bg absolute left-0 right-0 top-0 bottom-0 pl-18 pr-18" :style="{'padding-top':statusBarHeight()}">
		<!-- #ifdef MP-WEIXIN -->
		<div class="mt-20"></div>
		<!-- #endif -->
		<view class="pt-22 flex">
			<view @click="goSetting" class="icon-setting ml-auto" />
		</view>
		<view class="pt-65">
			<view @click="userInfo.nickname ? '' : goLogin()">
				<view class="avatar br-100 v-mid dib"></view>
				<span class="font-17 fw5 dark-gray lh-24 ml3">{{userInfo.nickname ? userInfo.nickname : '点击登录账号'}}</span>
			</view>
			<!--  -->
			<view class="x-label-g grid mt-30 mb-34">
				<view class="x-label-record bg-e7efff" @click="goRecord">
					<view class="x-label-record-padding">
						<view class="flex items-center">
							<view class="icon-pc"></view>
							<!-- <image class="icon-pc" src="https://res.vkunshan.com/depressed/ucenter/pc.png" /> -->
							<view class="ml-10">
								<view class="f6 fw6 color-304071 lh-20">测评记录</view>
								<view class="font-10 fw4 color-8a94b3">专属测试报告</view>
							</view>
						</view>
						<!--  -->
						<view class="mt3 fw5 font-10 color-679bff flex">
							<span class="x-leave-text">我留下的痕迹</span>
							<span class="bg-white lh-14 x-label-btn ml-auto">
								进入<uni-icons color="#ABAFFF" size="8" type="forward"></uni-icons>
							</span>
						</view>
					</view>
				</view>
				<!--  -->
				<view class="x-label-order bg-e7efff" @click="goOrder">
					<view class="x-label-record-padding">
						<view class="flex items-center">
							<view class="icon-search"></view>
							<!-- <image class="icon-search" src="https://res.vkunshan.com/depressed/ucenter/search.png" /> -->
							<view class="ml-10">
								<view class="f6 fw6 color-304071 lh-20">找回报告</view>
								<view class="font-10 fw4 color-8a94b3">通过订单号查询</view>
							</view>
						</view>
						<!--  -->
						<view class="mt3 fw5 font-10 color-679bff flex">
							<span class="x-find-order-text">查找测试记录</span>
							<span class="bg-white lh-14 x-label-btn ml-auto">
								查找<uni-icons color="#ABAFFF" size="8" type="forward"></uni-icons>
							</span>
						</view>
					</view>
				</view>
			</view>
			<!--  -->

			<!--  -->
			<view class="bg-white x-menu" v-for="(item,index) in range" :key="index" :class="{'mb-14':!index}">
				<view @click="callfun(citem)" class="x-menu-item flex items-center" v-for="(citem,cindex) in item" :key="cindex">
					<image class="icon v-mid" webp :src="`https://res.vkunshan.com/slide/nav0${citem.icon}.png`" />
					<span class="f6 fw4 dark-gray ml3">{{citem.label}}</span>
					<uni-icons class="ml-auto" type="forward" color="#B1AFC4"></uni-icons>
				</view>
			</view>
			<!--  -->
		</view>
		<kefu ref="kefuRef" />
		<xTabBar />
	</view>
</template>

<script setup>
	import { reactive, ref } from 'vue'
	import { statusBarHeight } from '@/common/lib.js'
	import { onShow } from '@dcloudio/uni-app'
	// #ifdef APP-PLUS
	const env = import.meta.env
	if (env.VITE_APP_UCENTER !== '/pages/ucenter/ucenter') {
		uni[env.VITE_APP_UCENTER_METHOD]({
			url: env.VITE_APP_UCENTER
		})
	}
	// #endif
	const onShareAppMessage = () => {}
	const kefuRef = ref('')
	const range = ref([])
	const userInfo = ref('')
	onShow(() => {
		userInfo.value = uni.getStorageSync('login_user')
	})
	const locationUrl = (url) => {
		uni.navigateTo({
			url: url
		})
	}
	const menu = reactive([{
			label: '联系客服',
			arrow: true,
			icon: 4,
			fn: () => kefuRef.value.open()
		},
		{
			label: '意见反馈',
			arrow: true,
			icon: 5,
			fn: () => locationUrl('/pages/feedback/feedback')
		},
		{
			label: '设置',
			arrow: true,
			icon: 7,
			fn() {
				goSetting()
			}
		},
	])
	range.value.push(menu.slice(0, 2))
	range.value.push(menu.slice(2))
	const goSetting = () => {
		uni.navigateTo({
			url: '/pages/setting/setting'
		})
	}
	const callfun = (item) => {
		item.fn()
	}
	const goLogin = () => {
		uni.navigateTo({
			url: '/pages/login/login'
		})
	}
	const goRecord = () => {
		uni.navigateTo({
			url: '/pages/testRecord/testRecord'
		})
	}
	const goOrder = () => {
		uni.navigateTo({
			url: '/pages/order/index'
		})
	}
</script>

<style lang="scss" scoped>
	.x-bg {
		background: url(https://res.vkunshan.com/depressed/ucenter/bg.png) 0 0 / 100% 50% no-repeat #F7FAFC;
	}

	.avatar {
		width: 61px;
		height: 61px;
		background: url(https://res.vkunshan.com/static/ucenter/avatar.png) 0 0 / 100% no-repeat;
	}

	.icon {
		width: 17px;
		height: 17px;
	}

	.x-menu-item {
		padding: 16px 21px 13px 14px;
	}

	.x-menu-item:not(:last-child) {
		background: linear-gradient(#F5F6F7, #F5F6F7) right 21px bottom / calc(calc(100% - 52px) - 1rem) 1px no-repeat;
	}

	.x-menu {
		border-radius: 8px;
	}

	.icon-setting {
		--img: url("data:image/svg+xml,%3Csvg width='19.919' height='22.691' viewBox='0 0 19.919 22.691' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='translate(-1.54 -.155)' stroke='%234B4D51' fill='none' fill-rule='evenodd'%3E%3Cpath d='M11.5 1.155l8.96 5.172v10.346l-8.96 5.172-8.96-5.172V6.327l8.96-5.172z' stroke-width='2'/%3E%3Ccircle stroke-width='1.8' cx='11.5' cy='11.5' r='3.6'/%3E%3C/g%3E%3C/svg%3E");
		background: var(--img) 0 0 / 100% 100% no-repeat;
		width: 23px;
		height: 23px;
	}

	.x-label-order,
	.x-label-record {
		height: 90px;
		box-shadow: 1px 2px 24px 0px rgba(223, 226, 255, 0.38);
		border-radius: 9px;
	}

	.x-label-record-padding {
		padding: 14px 14px 8px 15px;
	}

	.x-label-order-padding {
		padding: 14px 13px 8px 17px;
	}

	.x-label-g {
		grid-template-columns: repeat(2, 1fr);
		column-gap: 9px;
	}


	.icon-pc {
		width: 46px;
		height: 37px;
		background: url(https://res.vkunshan.com/depressed/ucenter/pc.png) 0 0 / 100% no-repeat;
	}

	.x-label-btn {
		padding: 0 6px 0 7px;
		border-radius: 7px;
	}

	.icon-search {
		width: 33px;
		height: 33px;
		background: url(https://res.vkunshan.com/depressed/ucenter/search.png) 0 0 / 100% no-repeat;
	}
</style>