<template>
	<view class="x-bg min-vh-100 pt-50 pb-20">
		<uni-nav-bar :fixed="true" class="navbar z-999 fixed top-0 left-0 w-100" backgroundColor="transparent" status-bar :border="false" title="订单查询" @clickLeft="back" left-icon="back" />
		<view :style="{'padding-top':statusBarHeight()}">
			<view class="x-page-container pt-20">
				<view class="order-query-container pl-15 pr-15 pb-30 white-shadow bg-white">
					<view class="flex items-center">
						<image webp class="icon-order" src="https://res.vkunshan.com/order/order_icon.png" />
						<view class="b ml2 f5 color-22242a">报告订单号查询</view>
					</view>
					<input v-model.trim="order_sn" placeholder="请输入订单单号" placeholder-class="color-c2bfd6" class="f6 mt-20 color-242137 bg-eff1fa f6  pl-20 input-order" />
					<view @click="bindOrder" class="b font-17 flex items-center justify-center color-fefefe btn-query">立即查询</view>
				</view>
				<!--  -->
				<view class="font-17 color-22242a tc mt-30 b">订单查询帮助指南</view>
				<!--  -->
				<view class="white-shadow bg-white order-query-container  mt3 ">
					<view class="pl3 pr-30">
						<view class="flex">
							<view class="white grid flex-shrink-0 place-center f6 circle br-100">1</view>
							<view class="ml2 color-22242a">
								<view class="font-15  b">微信订单号查询：</view>
								<view class="f6  lh-20 mt2">打开微信支付—点击微信支付凭证—复制商户单号</view>
							</view>
						</view>
						<!--  -->
						<view class="flex mt-24">
							<view class="white grid flex-shrink-0 place-center f6 circle br-100">2</view>
							<view class="ml2 color-22242a">
								<view class="font-15  b">支付宝订单号查询：</view>
								<view class="f6  lh-20 mt2">点击我的进入账单—找到相应的订单—复制商家订单号</view>
							</view>
						</view>
						<!--  -->
						<view class="flex mt-24">
							<view class="white grid flex-shrink-0 place-center f6 circle br-100">2</view>
							<view class="ml2 color-22242a">
								<view class="font-15  b">查找方法图文教程如下：</view>
							</view>
						</view>
						<!--  -->
					</view>
					<image mode="widthFix" class="center w-100 mt-20" src="https://res.vkunshan.com/order/wechat.png?x-oss-process=image/resize,w_680" />
					<image mode="widthFix" class="center w-100 mt-20" src="https://res.vkunshan.com/order/alipay.png?x-oss-process=image/resize,w_680" />
					<view class="pl3 pr-30 mt-40 pb-30">
						<view class="flex">
							<view class="white grid flex-shrink-0 place-center f6 circle br-100">1</view>
							<view class="ml2 color-22242a">
								<view class="font-15  b">复制查找</view>
								<view class="f6  color-666a74 lh-20 mt2">
									长按复制商户单号/商家订单号,粘贴到本页面进行查询即可
								</view>
							</view>
						</view>
						<!--  -->
						<view class="flex mt-24">
							<view class="white grid flex-shrink-0 place-center f6 circle br-100">2</view>
							<view class="ml2 color-22242a">
								<view class="font-15  b">客服反馈</view>
								<view class="f6  color-666a74 lh-20 mt2">如未正常显示请添加客服微信反馈，也可以在“小熊心理测试” 公众号内回复“客服”二字，进行咨询。
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { statusBarHeight } from '@/common/lib.js'
	import { fetchOrderDetail } from '@/api/api.js'
	import { ref } from 'vue'
	const onShareAppMessage = () => {}
	const order_sn = ref('')
	const dpr = ref(2)
	const tempUser = uni.getStorageSync('tempUser');
	const toast = (title) => uni.showToast({
		title,
		icon: 'none'
	})
	const back = () => uni.navigateBack()
	const bindOrder = async () => {
		if (!order_sn.value) {
			return toast('请输入查询的订单号')
		}
		try {
			const { data } = await fetchOrderDetail(order_sn.value)
			if (data?.no) {
				uni.redirectTo({
					url: `/pages/report/index?no=${data?.no}`
				})
				return false
			}
			uni.showModal({
				title: '提示',
				content: "订单异常，关注公众号：“小熊心理测试”回复“客服”联系我们"
			})
		} catch (e) {
			//TODO handle the exception
		}
	}
</script>

<style lang="scss" scoped>
	.x-bg {
		background: url(https://res.vkunshan.com/order/bg_gradient.png?x-oss-process=image/resize,w_750) left top -10px / contain no-repeat
	}

	.order-query-container {
		border-radius: 14px;
		padding-top: 39px;

	}

	.white-shadow {
		box-shadow: 4px 7px 19px 0px rgba(10, 0, 74, 0.07);
	}

	.btn-query {
		background: linear-gradient(to right, #6F97FA 0%, #9D91FE 100%);
		height: 50px;
		border-radius: 50px;
		margin-top: 18px;
		box-shadow: 2px 5px 15px 0 rgba(37, 68, 211, 0.19);
	}

	.icon-order {
		width: 16px;
		height: 19px;
	}

	.input-order {
		border-radius: 19px;
		height: 37px;
	}

	.circle {
		background: rgb(188, 181, 255);
		width: 18px;
		height: 18px;
	}

	.navbar {
		background: rgba(255, 255, 255, 0.8);
		backdrop-filter: blur(7px);
	}
</style>