<template>
	<view class="bg-f4f6fc x-bg pb-safe flex flex-column">
		<view class="x-header" :style="{'padding-top':statusBarHeight()}">
			<uni-nav-bar color="#333" backgroundColor="transparent" :border="false" left-icon="back" title="提交订单" @clickLeft="goBack" />
		</view>
		<view class="pl-10 pr-10 mt-10">
			<view @click="chooseAddress" class="x-address flex items-center pr-20 pl3">
				<image class="icon-location" src="https://res.vkunshan.com/depressed/order/create/icon-address.png"></image>
				<text v-if="!address" class="font-13 color-4e4f54 fw5 lh-18 ml-10">添加收货地址</text>
				<view class="color-4e4f54 ml-6" v-if="address">
					<view class="f6 fw6 lh-20">{{address}}</view>
					<view class="f7 lh-17">
						<text>{{user.userName}}</text>
						<text class="ml-12">{{user.telNumber}}</text>
					</view>
				</view>
				<uni-icons class="ml-auto" type="right" color="#B3B4B6" size="13"></uni-icons>
			</view>
			<view class="pa3 bg-white mt-10 x-body">
				<view class="fw5 color-313235">
					<image class="icon-shop mr1 v-mid" src="https://res.vkunshan.com/depressed/order/create/shop-icon.png" />小熊测试旗舰店
					<image class="icon-text v-mid" src="https://res.vkunshan.com/depressed/order/create/text.png" />
				</view>
				<!--  -->
				<checkbox-group class="flex x-goods mt3" @change="changeCheck">
					<label :class="{active:!index || item.type===active}" v-for="(item,index) in goodsList" class=" w-50 relative  flex flex-column justify-center items-center x-goods-item">
						<view v-if="index" class="absolute x-abs-mark color-ff645e font-10 lh-15 bg-ffe8e8 pl-5 pr-5">超值加购</view>
						<view class="font-15 b font-dina lh-20">¥{{item.discount_price}}</view>
						<view :class="{'color-464646':index}" class="f7 lh-20 fw5">基础版报告</view>
						<checkbox v-if="index" hidden :value="item.type" :checked="item.check" />
					</label>
				</checkbox-group>
				<view class="bb color-e1e3e6 w-100 mt-22"></view>
				<view class="flex justify-between font-13 lh-18 fw5 mt-18 mb-18">
					<view class="color-6a6c72">店铺优惠</view>
					<view class="color-ff4e4e">减 ¥ 39.9</view>
				</view>
				<view class="bb color-e1e3e6 w-100 mt-22"></view>
				<view class="color-6a6c72 tr mt-17">
					合计：<text class="color-ff4e4e">¥<text class="font-22">{{goods.discount_price}}</text></text>
				</view>
			</view>
		</view>
		<view class="bg-white pl3 pr3 mt-auto pt-12 flex justify-between pb-30">
			<view class="color-ff4e4e">
				<text class="fw5">¥<text class="font-22">{{goods.discount_price}}</text></text>
				<text class="ba font-10 width-fit x-mark ml2">已减39.9元</text>
			</view>
			<view @click="submit" class="white fw5 lh-22 btn bg-4fa5ff grid place-center">立即支付</view>
		</view>
	</view>
</template>

<script setup>
	import { statusBarHeight } from '@/common/lib.js'
	import { createOrder, createPayConfig } from '@/api/api.js'
	import { ref } from 'vue'
	import { HTTP_SUCCESS } from '@/enum/http.js'
	import { payGetWay } from '../report/order.js'
	import { onLoad } from '@dcloudio/uni-app'
	const goodsList = uni.getStorageSync('mp_goodsList')
	const login_user = uni.getStorageSync('login_user')
	const user_id = login_user?.id
	uni.removeStorageSync('go_follow')
	// uni.removeStorageSync('mp_goodsList')
	const goBack = () => uni.navigateBack()
	const address = ref('')
	const user = ref({})
	const active = ref('all')
	const goods = ref(goodsList[active.value ? goodsList.length - 1 : 0])
	let answerid = ''
	onLoad(({ answer_id }) => {
		answerid = answer_id
	})
	const changeCheck = ({ detail: { value } }) => {
		active.value = value.join('')
		goods.value = goodsList[active.value ? goodsList.length - 1 : 0]
	}
	const chooseAddress = () => {
		uni.chooseAddress({
			success(res) {
				const { provinceName, cityName, countyName, detailInfo, userName, telNumber } = res
				address.value = [provinceName, cityName, countyName, detailInfo].join('')
				user.value = {
					userName,
					telNumber
				}
			}
		})
	}
	let createOrderIng = false
	const submit = async () => {
		if (createOrderIng) {
			uni.showToast({
				title: '请勿快速点击',
				icon: 'none'
			})
			return false
		}
		const params = {
			answer_id: answerid,
			goods_id: goods.value.id,
			pay_method: 'wechat',
			user_id
		}
		try {
			createOrderIng = true
			uni.showLoading({
				title: '正在创建订单...',
				mask: true
			})
			const { code, data } = await createOrder(params)
			const pay_params = { trace_no: data.trace_no, env: 'wechat_mini', device: 'phone', user_id }
			const pay_res = await createPayConfig(pay_params)
			createOrderIng = false
			uni.hideLoading()
			const result = payGetWay('wechat_mini', [pay_res.data])
			result.then((res) => {
				setTimeout(() => {
					goBack()
				}, 1000)
			}).catch(() => {})
		} catch (e) {}
	}
</script>

<style lang="scss" scoped>
	.x-header {
		background: linear-gradient(180deg, #C9DCFF 0%, #FFFFFF 100%) no-repeat;
	}

	.x-bg {
		height: 100%;
	}

	.x-address {
		background: url("https://res.vkunshan.com/depressed/order/create/address-bg.png") 0 0 / 100% no-repeat;
		height: 72px;
	}

	.icon-shop {
		width: 17px;
		height: 16px;
	}

	.x-body {
		border-radius: 8px;
	}

	.icon-text {
		width: 47px;
		height: 14px;
	}

	.active.x-goods-item {
		background: url(https://res.vkunshan.com/depressed/order/create/check.png) 0 0 / 100%  100% no-repeat;

	}

	.x-goods {
		column-gap: 15px;
	}

	.x-goods-item {
		height: 78px;
		background: #F4F4F7;
		border-radius: 8px;
		color: #559BFF;
	}

	.x-mark {
		vertical-align: text-top;
	}

	.btn {
		width: 115px;
		height: 38px;
		border-radius: 6px;
	}

	.x-abs-mark {
		top: -7px;
		right: 0;
	}

	.icon-location {
		width: 31px;
		height: 31px;
	}
</style>