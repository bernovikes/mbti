<template>
	<view>
		<view class="dn">
			<image lazy-load src="https://res.vkunshan.com/depressed/report/redpack1.png" />
			<image lazy-load src="https://res.vkunshan.com/depressed/report/redpack2.png" />
		</view>
		<uni-popup ref="redpack">
			<view v-if="Object.values(detail).length" class="fixed z-999 bg-black-60 flex-column flex justify-center items-center  left-0 right-0 top-0 bottom-0">
				<block v-if="redpack1">
					<view class="x-redpack-one-container tc dib">
						<view class="f7 lh-solid color-e0890a  pt-50">恭喜获得优惠红包</view>
						<view class="font-dina b lh-74 h1-redpack">{{detail.coupons[0].price}}</view>
						<view class="x-redpack-bottom">
							<view @click.stop="tapPay(detail.coupons[0].id)" class="btn pulse fw5 color-e9042a center flex items-center width-fit">
								<text class="font-21 btn-left lh-30">¥{{(all_good_price-detail.coupons[0].price).toFixed(2)}}</text>
								<text class="font-15 lh-21 ml-10">解锁完整报告</text>
							</view>
							<view @click.stop="showRedpack" class="btn-redpack-exit pt2 pb2 pl-34 pr-34  border-box width-fit center mt3 f6 color-ffd187 lh-21 medium">放弃我的报告</view>
						</view>
					</view>
				</block>
				<block v-if="redpack2">
					<view class="x-redpack-tow-container tc dib">
						<view class="f7 lh-solid color-e0890a pt-40">恭喜获得大额优惠红包</view>
						<view class="font-dina b lh-74 h1-redpack">{{detail.coupons[1].price}}</view>
						<view class="x-redpack-tow-bottom tc">
							<view class="color-ffd861 medium  f7 lh-17">您已获得满额红包</view>
							<view @click.stop="tapPay(detail.coupons[1].id)" class="btn pulse fw5 mt3 color-e9042a center flex items-center width-fit">
								<text class="font-21 btn-left lh-30">¥{{(all_good_price-detail.coupons[1].price).toFixed(2)}}</text>
								<text class="font-15 lh-21 ml-10">解锁完整报告</text>
							</view>
							<view @click="goFollow" class="btn-redpack-exit pt2 pb2 pl-46 pr-46 width-fit border-box center mt-13 f6 color-ffd187 lh-21 medium">退出销毁</view>
						</view>
					</view>
					<view class="f7 o-70 white absolute x-redpack-tip">小雅提示您:退出后进入自动销毁报告队列</view>
				</block>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import { inject, ref, watch, onMounted } from 'vue'
	const detail = inject('detail')
	const redpack1 = ref(false)
	const redpack2 = ref(false)
	const show = ref(true)
	const redpack = ref('')
	const all_good_price = ref(0)
	const discount_text = ref(0)
	let all_goods = ''
	const open = () => {
		redpack1.value = true
		redpack2.value = false
		redpack.value.open('center')
	}
	watch(detail, () => {
		all_goods = detail.value.question_bank_goods.find(item => item.type === 'all')
		all_good_price.value = all_goods?.goods?.discount_price
		discount_text.value = (((all_good_price.value - detail.value.coupons?.[0].price) / all_good_price.value) * 10).toFixed(1)
	})
	defineExpose({
		open
	})
	const redpackClose = () => redpack.value.close()
	const close = () => {
		redpack1.value = false
		redpack2.value = false
		redpackClose()
	}
	const tapPay = (redpack_type) => {
		const goods_id = all_goods?.goods?.id
		if (redpack_type) {
			uni.$emit('callpay', {
				pay_method: 'wechat', //支付渠道 微信或支付宝						
				redpack: redpack_type,
				goods_id
			})
		}
		redpackClose()
	}
	const goFollow = () => {
		redpackClose()
		uni.navigateTo({
			url: '/pages/follow/follow'
		})
	}
	const showRedpack = () => {
		redpack1.value = false
		redpack2.value = true
	}
</script>

<style scoped lang="scss">
	.x-redpack-one-container {
		width: 77%;
		height: 60.5%;
		max-height: 397px;
		background: url("https://res.vkunshan.com/depressed/report/redpack1.png?v=3") center top no-repeat;
		background-size: 97% 100%;
		margin: auto;
	}

	page:has(.x-redpack-one-container) {
		overflow: hidden;
	}

	.h1-redpack {
		background: linear-gradient(180deg, #FF5336 0%, #F90449 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		font-size: 50px;
	}

	.btn {
		border-radius: 25px;
		// height: 48px;
		padding: 10px 26px 8px 31px;
		background: linear-gradient(to bottom, #FFE68C, #FFD045);
		box-shadow: 6px 4px 16px 0 rgba(78, 0, 21, 0.17);
	}

	.btn-left {
		letter-spacing: 2px;
	}

	.x-redpack-bottom {
		margin-top: 32.5%;
	}

	.btn-redpack-exit {
		border: solid 1px currentColor;
		border-radius: 20px;
	}

	.x-redpack-tow-container {
		background: url(https://res.vkunshan.com/depressed/report/redpack2.png?v=3) left top / 100% 100% no-repeat;
		width: 77%;
		height: 67.7%;
		max-height: 439px;
	}

	.x-redpack-tow-bottom {
		margin-top: 41.9%;
	}

	.x-redpack-tip {
		bottom: 10%;
	}

	.x-redpack-tow-h2 {
		padding-top: 6vh;
	}
</style>