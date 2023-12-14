<template>
	<view>
		<!-- prerender -->
		<template v-if="preload">
			<view class="dn">
				<image lazy-load src="https://res.vkunshan.com/static/report/redpack/redpack_bg_1.png?x-oss-process=image/resize,w_592" />
				<image lazy-load src="https://res.vkunshan.com/static/report/redpack/redpack_bg_2.png?x-oss-process=image/resize,w_638" />
			</view>
		</template>
		<uni-popup ref="redpack">
			<view v-if="Object.values(detail).length" class="fixed z-999 bg-black-60 flex-column flex justify-center items-center  left-0 right-0 top-0 bottom-0">
				<block v-if="redpack1">
					<view class="x-redpack-one-container tc dib">
						<view class="f7 color-e57358  pt1">惊喜红包</view>
						<view class="f7 lh-solid color-e0890a mt-18">恭喜获得红包</view>
						<view class="font-dina b block  h1-redpack">{{detail.coupons[0].price}}</view>
						<view class="f7 mt2 h2-redpack color-604018">可享受<view class="di color-fb2043 ml1 mr1">{{discount_text}}折</view>查看完整版报告</view>
						<view class="x-redpack-bottom">
							<view @click.stop="tapPay(detail.coupons[0].id)" class="btn pulse fw5 color-e9042a center flex items-center width-fit">
								<text class="font-22">{{all_good_price-detail.coupons[0].price}}</text>
								<text class="font-18 di">¥</text>
								<text class="f7 lh-17 ml1 o-50">解锁完整报告</text>
							</view>
							<view @click.stop="showRedpack" class="btn-redpack-exit width-fit center mt3 font-15 color-ffd187 lh-21 medium">放弃我的报告</view>
						</view>
					</view>
				</block>
				<block v-if="redpack2">
					<view class="x-redpack-tow-container tc dib">
						<view class="f7 color-e57358 x-redpack-tow-h2 ">惊喜红包</view>
						<view class="f7 lh-solid color-e0890a mt-12">恭喜获得红包</view>
						<view class="font-dina b block  h1-redpack">{{detail.coupons[1].price}}</view>
						<view class="x-redpack-tow-bottom tc">
							<view class="color-ffd861 medium  f7 lh-17">您已获得 满额红包</view>
							<view @click.stop="tapPay(detail.coupons[1].id)" class="btn pulse fw5 mt1 color-e9042a center flex items-center width-fit">
								<text class="font-22">{{all_good_price-detail.coupons[1].price}}</text>
								<text class="font-18 di">¥</text>
								<text class="f7 lh-17 ml1 o-50">解锁完整报告</text>
							</view>
							<view @click="goFollow" class="btn-redpack-exit width-fit center mt-13 font-15 color-ffd187 lh-21 medium">退出销毁</view>
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
	const preload = ref(false)
	setTimeout(() => {
		preload.value = true
	}, 3000)
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
		const goods_id = all_good_price?.goods?.id
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
		width: 82%;
		height: 50.5%;
		max-height: 337px;
		background: url("https://res.vkunshan.com/static/report/redpack/redpack_bg_1.png?x-oss-process=image/resize,w_592") right top no-repeat,
			url(https://res.vkunshan.com/static/report/redpack/redpack_ip.png) left bottom no-repeat;
		background-size: 97% 100%, 98px 131px;
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
		height: 35px;
		padding: 0 20px;
		background: linear-gradient(to bottom, #FFE68C, #FFD045);
		box-shadow: 6px 4px 16px 0 rgba(78, 0, 21, 0.17);
	}

	.x-redpack-bottom {
		margin-top: 23%;
	}

	.btn-redpack-exit {
		padding: 4px 20px;
		border: solid 1px currentColor;
		border-radius: 20px;
	}

	.x-redpack-tow-container {
		background: url(https://res.vkunshan.com/static/report/redpack/redpack_bg_2.png?x-oss-process=image/resize,w_638&v=2) left top / 100% 100% no-repeat;
		width: 100%;
		height: 67.7%;
		max-height: 447px;
	}

	.x-redpack-tow-bottom {
		margin-top: 24%;
	}

	.x-redpack-tip {
		bottom: 10%;
	}

	.x-redpack-tow-h2 {
		padding-top: 6vh;
	}
</style>