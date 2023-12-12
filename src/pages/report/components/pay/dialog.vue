<template>
	<uni-popup ref="pop" type="bottom">
		<view class="x-pay-dialog pb-safe">
			<view class="x-pay-dialog__header">
				<view class="tr">
					<view @click="close" class="x-close dib tc white f7 inline-flex items-center justify-center">✕</view>
				</view>
				<view class="white pl-20 lh-19">
					<view>解锁永久版</view>
					<view>专属深度分析报告</view>
				</view>
			</view>
			<!--  -->
			<view class="bg-white pt-20 pl-20 pr-20 pb-18">
				<view class="pl-68 pr-68" v-if="buyed">
					<view class="x-pay-dialog__goods pt-22 relative  tc" v-for="(item,index) in goodsList" :key="index">
						<view class="absolute x-pay-goods-top">
							<view class="x-pay-submark font-11 lh-20 white fw5">报告特惠</view>
						</view>
						<view class="f6 fw6 lh-20 color-616161">完整解析报告</view>
						<view class="font-26 color-3d8dff font-dina b"><text class="f6">¥</text>{{item.discount_price}}</view>
						<view class="f7 lh-20 fw5 color-c3c3c3 strike">¥{{item.origin_price}}</view>
						<view class="white font-11 fw4 lh-20 x-pay-dialog__goods-bottom">已减¥{{item.origin_price-item.discount_price}}</view>
					</view>
				</view>
				<!--  -->
				<checkbox-group @change="chooseGoods" class="flex x-goods justify-between" v-if="!buyed">
					<label :class="{[item.type]:item.type,'active':active===item.type||!index}" class="x-goods-item relative  pt-26 border-box  flex items-center justify-center flex-column" v-for="(item,index) in goodsList" :key="index">
						<view class="absolute x-pay-goods-top tc" v-if="index">
							<view class="x-pay-submark font-11 lh-20 white fw5">超值加购</view>
						</view>
						<view :class="{'color-464646':!index,'color-616161':index}" class="f6 b lh-20">{{item.t1}}</view>
						<view :class="{'color-559bff':!index,'color-59566f':index}" class="b lh-20">￥{{item.discount_price}}</view>
						<view class="strike f7 fw5 color-c3c3c3 lh-20">￥{{item.origin_price}}</view>
						<view class="mt-auto bottom font-11 lh-27 w-100 tc">
							{{item.bottom}}
						</view>
						<checkbox v-if="index" hidden :value="item.type" :checked="item.check" />
					</label>
				</checkbox-group>
				<!--  -->
				<radio-group class="mt-28" @change="choosePayMethod">
					<label :class="{'active':pay_type===item.type}" class="flex items-center f7 lh-17 fw5 color-434446 x-pay-label" v-for="(item,index) in list" :key="index">
						<image class="icon mr3" :src="`https://res.vkunshan.com/static/report/${item.icon}.png`" />
						<text>{{item.label}}</text>
						<radio hidden :value="item.type" :checked="item.check" />
						<view class="radio ml-auto color-d7dce2 ba br-100 border-box" />
					</label>
				</radio-group>
				<!--  -->
				<view @click="submit" class="btn white flex items-center justify-center mt-28 lh-22">{{btn_text}}</view>
			</view>
		</view>
	</uni-popup>
</template>
<script setup>
	import { onMounted, ref, reactive, toRefs, watch, inject, computed } from 'vue'
	import { isWechat, isMobile } from '@/common/lib.js'
	const detailData = inject('detail')
	const btn_text = computed(() => {
		const val = detailData.value
		return val?.is_pay && !val?.all_unlock ? '立即升级' : '立即解锁'
	})
	const goods = ref({})
	const pop = ref('')
	const pay_type = ref('wechat')
	const goodsList = ref([{
			t1: '基础班报告',
			check: false,
			redpack: 0,
			bottom: '',
		},
		{
			t1: '完整版报告',
			redpack: 0,
			check: true,
			bottom: '因子详细解析',
		}
	])
	const buyed = inject('buyed')
	const active = ref('all')
	const list = reactive([{
			type: 'wechat',
			label: '微信',
			rec: true,
			check: true,
			icon: 'icon-wxpay',
		},
		{
			type: 'alipay',
			label: '支付宝',
			check: false,
			icon: 'icon-alipay',
		},
		{
			type: 'wechat_scan',
			label: '微信扫码支付',
			check: false,
			icon: 'icon-wxpay',
		},
	])
	const choosePayMethod = ({ detail: { value } }) => {
		pay_type.value = value
	}
	const close = () => {
		pop.value?.close()
		isMobile() && uni.$emit('close_pay_dialog')
	}
	onMounted(() => {
		if (!isMobile()) {
			list.splice(0, 1)
		}
		if (isWechat()) {
			list.splice(1, 1)
		}
		pay_type.value = list[0].type
		uni.$on('open_pay_dialog', () => {
			pop.value?.open()
		})
	})
	const chooseGoods = ({ detail: { value } }) => {
		active.value = value.join('')
		goods.value = goodsList.value[active.value ? 1 : 0]
	}
	watch(detailData, (nval) => {
		const { question_bank_goods } = nval
		if (buyed.value) {
			goodsList.value = [{
				t1: '完整解析报告',
				check: true,
				redpack: 0,
				bottom: '',
			}]
		}
		goods.value = goodsList.value[buyed.value ? 0 : 1]
		const goods_type = buyed.value ? ['diff'] : ['lite', 'all']
		const filter_goods_list = question_bank_goods.filter(item => goods_type.includes(item.type)).map((item, index) => {
			if (['lite', 'diff'].includes(item.type)) {
				goodsList.value[index].bottom = `已减￥${item.goods.origin_price-item.goods.discount_price}`
			}
			goodsList.value[index].id = item.goods_id
			goodsList.value[index].type = item.type
			goodsList.value[index].discount_price = item.goods.discount_price
			goodsList.value[index].origin_price = item.goods.origin_price
		})
	}, { deep: true })
	const submit = () => {
		pop.value.close()
		uni.$emit('callpay', {
			goods_id: goods.value?.id,
			pay_method: pay_type.value
		})
	}
</script>

<style scoped lang="scss">
	.x-pay-dialog {
		background: url(https://res.vkunshan.com/depressed/report/emoji.png) top 17px right 41px / 51px 43px no-repeat,
			url(https://res.vkunshan.com/depressed/report/pay-dialog-header.png) 0 0 / 100% 76px no-repeat;	
	}

	.x-pay-dialog__header {
		height: 76px;
	}

	.x-close {
		width: 41px;
		height: 23px;
		background: rgba(137, 137, 137, .5);
		border-radius: 0px 12px 0px 4px;
	}

	.x-pay-dialog__goods {
		border-radius: 9px;
		border: 1px solid #C7DEFF;
	}

	.x-pay-dialog__goods-bottom {
		background: linear-gradient(to left, #539AFF, #98B6FF) no-repeat;
		border-radius: 0 0 9px 9px;
	}

	.x-pay-submark {
		background-color: rgba(255, 99, 99, .9);
		border-radius: 9px 0 6px 0;
		width: 58px;
		height: 20px;
	}

	.x-pay-goods-top {
		top: -1px;
		left: -1px;
	}

	.active.x-goods-item {
		background: url("data:image/svg+xml,%3Csvg width='27.632' height='15' viewBox='0 0 27.632 15' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient x1='91.115%25' y1='41.374%25' x2='0%25' y2='64.735%25' id='a'%3E%3Cstop stop-color='%23539AFF' offset='0%25'/%3E%3Cstop stop-color='%2398B6FF' offset='100%25'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M0 0h18.632a9 9 0 0 1 9 9v6H4a4 4 0 0 1-4-4V0z' fill='url(%23a)'/%3E%3Cpath stroke='%23FFF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' d='M9 7.34l3.812 3.555L19.105 5'/%3E%3C/g%3E%3C/svg%3E") right top no-repeat;
	}

	.icon {
		width: 26px;
		height: 26px;
	}

	.x-pay-label:not(:last-child) {
		margin-bottom: 18px;
	}

	.radio {
		width: 14px;
		height: 14px;
	}

	.x-pay-label.active .radio {
		border: transparent;
		background: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient x1='100%25' y1='0%25' x2='1.425%25' y2='100%25' id='a'%3E%3Cstop stop-color='%236CA8FF' offset='0%25'/%3E%3Cstop stop-color='%234B94FF' offset='100%25'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Ccircle fill='url(%23a)' cx='8' cy='8' r='8'/%3E%3Cpath stroke='%23FFF' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' d='M4 7.985L7.018 11 12 6'/%3E%3C/g%3E%3C/svg%3E") 0 0 / 100% 100% no-repeat
	}

	.btn {
		height: 44px;
		background: linear-gradient(224deg, #75AEFF 0%, #3F8DFF 57%, #67A5FF 100%);
		border-radius: 22px;
	}

	.x-goods-item {
		height: 136px;
		border-radius: 8px;
		border: 1px solid;
		width: calc(50% - 7.5px);
	}

	.lite.x-goods-item {
		border-color: #C7DEFF;
	}

	.all.x-goods-item {
		border-color: #DCDCDC;
	}

	.x-goods-item .bottom {
		border-radius: 0 0 8px 8px;
		background: #EFEFEF;
		color: #A2A1A8;
	}

	.active .bottom {
		color: white;
		background: linear-gradient(to left, #539AFF, #98B6FF);
	}


	@media screen and (min-width: 768px) {
		.x-pay-dialog {
			max-width: 428px;
			margin: 0 auto;
		}
	}
</style>