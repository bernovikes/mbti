<template>
	<view class="min-vh-100 pt-65 pb-30 x-bg">
		<template v-if="isMobile()">
			<share />
			<bulletChat />
		</template>
		<view class="pl-14 white">
			<view class="font-22 lh-30 b">{{detail?.question_bank_title}}</view>
			<view class="f6 lh-20">测试报告</view>
			<view class="x-header-line mt3 mb-20"></view>
			<view class="f7 lh-21 ba width-fit x-created_time">报告生成时间：{{detail.created_at}}</view>
		</view>
		<view class="mt-20 pl-14 pr-14">
			<template v-if="detail.rule_type==='scl90'">
				<scl90-page></scl90-page>
			</template>
			<template v-if="detail.rule_type==='sds'">
				<sds></sds>
			</template>
			<!--  -->
			<comment />
			<bottom />
			<!--  -->
			<template v-if="!detail?.all_unlock">
				<pay-btn></pay-btn>
			</template>
			<!--  -->
			<template v-if="!detail?.all_unlock">
				<pay-dialog></pay-dialog>
			</template>
		</view>
		<!--  -->
		<redpack ref="redpackRef" />
		<uni-popup ref="wxscan">
			<view class="pa3 bg-white">
				<uQRCode ref="uqrcode" :text="scan_url" :size="150"></uQRCode>
			</view>
		</uni-popup>
		<rmodel ref="rmodelRef" @cancel="redpackRef.open" title="温馨提示" content="获得解读只差最后一步，96%的用户对报告准确率比较认可，请您认真对待自己的身心健康！" confirmText="还在考虑" cancelText="退出销毁" />
	</view>
</template>
<script setup>
	import 'url-search-params-polyfill';
	import rmodel from './components/model.vue'
	import bulletChat from './components/bullet-chat.vue'
	import uQRCode from '@/components/uqrcode/uqrcode.vue'
	import sds from './sds.vue'
	import share from './components/share.vue'
	import scl90Page from './scl90.vue'
	import payBtn from './components/pay/btn.vue'
	import comment from './components/comment.vue'
	import bottom from './components/bottom.vue'
	import payDialog from './components/pay/dialog.vue'
	import { fetchAnswerData, createOrder, createPayConfig, traceCheck } from '@/api/api.js'
	import { onLoad, onUnload } from '@dcloudio/uni-app'
	import { ref, computed, provide, onMounted, onBeforeUnmount, watch } from 'vue'
	import { payEnvCheck, payGetWay } from './order.js'
	import { HTTP_SUCCESS, REPEAT_PAY_ORDER } from '@/enum/http.js'
	import { getDevice, isMobile, isWechat } from '@/common/lib.js'
	import redpack from './components/redpack.vue'
	const page = getCurrentPages().slice(-1)[0]
	// #ifdef H5 || APP-PLUS
	const route = { query: page.$page.options, route: page.route }
	// #endif
	// #ifdef MP-WEIXIN
	const route = { query: page.options, route: page.route }
	// #endif		
	const detail = ref('')
	const scan_url = ref('')
	const speed = ref([
		{ 'label': '答题率', 'value': '100%' },
		{ 'label': '答题时间', 'value': '6分32秒' },
		{ 'label': '参考范围', 'value': '5-30分钟' }
	])
	provide('speed', speed)
	const redpackRef = ref('')
	const rmodelRef = ref('')
	let payIntervalTimer = ''
	const tempUser = uni.getStorageSync('tempUser')
	const login_user = uni.getStorageSync('login_user')
	const user_id = login_user?.id
	const buyed = ref('')
	const wxscan = ref('wxscan')
	const factorList = computed(() => detail.value?.report?.detail.find(item => item.componentName === 'factor'))
	const illustrate = computed(() => detail.value?.report?.detail.find(item => item.componentName === 'illustrate'))
	const appendix = computed(() => detail.value?.report?.detail.find(item => item.componentName === 'appendix'))
	const refer = computed(() => detail.value?.report?.detail.find(item => item.componentName === 'refer'))
	const science = computed(() => detail.value?.report?.detail.find(item => item.componentName === 'science'))
	const reportDesc = computed(() => detail.value?.report?.detail.find(item => item.componentName === 'report_desc'))
	provide('detail', detail)
	provide('factorList', factorList)
	provide('illustrate', illustrate)
	provide('appendix', appendix)
	provide('refer', refer)
	provide('buyed', buyed)
	provide('reportDesc', reportDesc)
	provide('science', science)
	const cachePrefix = () => `${route.query.no}_`
	const fetchDetail = async () => {
		try {
			uni.showLoading({
				title: '正在加载数据',
				mask: true
			})
			const { data } = await fetchAnswerData(route.query.no)
			uni.hideLoading()
			speed.value[1].value = data.report.finish_time
			const { question_bank_goods } = data
			const dict = { all: 2, lite: 1, diff: 1 }
			const permissions = question_bank_goods.map((item) => item.paid_order ? dict[item.type] : 0).reduce((p, c) => p + c)
			data.all_unlock = permissions === dict.all
			buyed.value = data.is_pay = !!permissions
			detail.value = data
		} catch (e) {
			//TODO handle the exception
		}
	}
	const queryString = () => new URLSearchParams({ ...route.query })
	// 离开当前页面,弹出红包
	const backvoid = () => {
		try {
			rmodelRef.value?.open()
		} catch (e) {
			//TODO handle the exception
		}
	}
	uni.$on('close_pay_dialog', () => !detail.value?.is_pay && rmodelRef.value?.open())
	uni.$on('wx_scan', (url) => {
		if (url) {
			uni.setStorageSync(`${cachePrefix()}scan`, true)
			wxscan.value?.open('center')
			scan_url.value = url
		}
	})
	onLoad((options) => {
		route.query = options
		fetchDetail()
		uni.$on('destroy', () => {
			backvoid()
		})
	})
	onBeforeUnmount(() => {
		if (uni.getStorageSync('go_follow')) {
			return false
		}
		if (!isMobile()) {
			return false
		}
		if (detail.value.is_pay) {
			return false
		}
		if (route.path === '/pages/report/index') {
			return false
		}
		uni.navigateTo({
			url: `/pages/report/index?${queryString()}`,
			success(res) {
				uni.$emit('destroy', { data: true })
			}
		})
	})
	let createOrderIng = false
	uni.$on('callpay', async (argv) => {
		if (createOrderIng) {
			uni.showToast({
				title: '请勿快速点击',
				icon: 'none'
			})
			return false
		}
		const { goods_id, pay_method } = argv
		const env = payEnvCheck(pay_method)
		const params = {
			answer_id: detail.value.id,
			visitor_code: tempUser,
			goods_id,
			pay_method
		}
		if (argv?.redpack) {
			params['coupon_id'] = argv.redpack
		}
		if (user_id) {
			params['user_id'] = user_id
		}
		try {
			createOrderIng = true
			uni.showLoading({
				title: '正在创建订单...',
				mask: true
			})
			const { code, data } = await createOrder(params)
			if (code === HTTP_SUCCESS) {
				// uni.setStorageSync('trace_no', data.trace_no)
				uni.setStorageSync(`${cachePrefix()}trace_no`, data.trace_no)
				uni.setStorageSync(`${cachePrefix()}pay_callback`, true)
				const pay_params = { trace_no: data.trace_no, env, device: getDevice() }
				if (user_id) {
					pay_params['user_id'] = user_id
				}
				const pay_res = await createPayConfig(pay_params)
				createOrderIng = false
				uni.hideLoading()
				const urlparams_obj = queryString()
				const callback = `pages/callback/index?${urlparams_obj}`
				const result = payGetWay(env, [pay_res.data, callback])
				if (result instanceof Promise) {
					result.then((res) => {
						fetchDetail()
					}).catch(() => {})
				}
			}
		} catch (e) {
			if (e?.code === REPEAT_PAY_ORDER) {
				fetchDetail()
				uni.hideLoading()
			}
			//TODO handle the exception
		}
	})
	//轮询查询订单状态
	//移动端非微信浏览器,发起支付成功或失败跳到callback页面由callback页面发起轮询通知，pc扫码支付打开页面发起通知
	// #ifdef H5
	if (!(isMobile() && isWechat()) && !payIntervalTimer) {
		payIntervalTimer = setInterval(async () => {
			const trace_no = uni.getStorageSync(`${cachePrefix()}trace_no`)
			const pay_callback = uni.getStorageSync(`${cachePrefix()}pay_callback`)
			const scan = uni.getStorageSync(`${cachePrefix()}scan`)
			if (pay_callback || scan) {
				try {
					const { code, data } = await traceCheck(trace_no)
					if (code === HTTP_SUCCESS && data?.pay_status) {
						uni.removeStorageSync(`${cachePrefix()}pay_callback`)
						uni.removeStorageSync(`${cachePrefix()}scan`)
						scan && wxscan.value?.close()
						uni.removeStorageSync(`${cachePrefix()}trace_no`)
						fetchDetail()
						clearInterval(payIntervalTimer)
					}
				} catch (e) {
					//TODO handle the exception
				}
			}
		}, 3000)
	}
	// #endif
	// 
	onUnload(() => {
		uni.removeStorageSync('scan')
		clearInterval(payIntervalTimer)
	})
</script>
<style lang="scss" scoped>
	.x-bg {
		background: url("https://res.vkunshan.com/depressed/report/bg-top.png") 0 0 / 100% 272px no-repeat #ECF2FF;
	}

	.x-header-line {
		width: 51px;
		height: 3px;
		background: linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%);
	}

	:deep(.icon-header-block) {
		background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0iI0ZGRiIgY3g9IjEwIiBjeT0iMTAiIHI9IjEwIi8+PHBhdGggZD0iTTkuMTUgNWwuMzEzIDcuODg4aDEuMDc0TDEwLjg1IDVoLTEuN3ptLjg0MyA4Ljc5N2EuODc3Ljg3NyAwIDAgMC0uNjk0LjMwOGMtLjIwNC4yLS4yOTkuNDYyLS4yOTkuNzg2IDAgLjMwOC4wOTUuNTcuMy43ODUuMTkuMjE2LjQyMS4zMjQuNjkzLjMyNC4yNzIgMCAuNTE3LS4xMDguNzIxLS4zMDguMTktLjIxNi4yODYtLjQ3OC4yODYtLjgwMSAwLS4zMjQtLjA5NS0uNTg2LS4yODYtLjc4Ni0uMTktLjIxNi0uNDM1LS4zMDgtLjcyLS4zMDh6IiBmaWxsPSIjNzRBNUZGIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L2c+PC9zdmc+") 0 0 / 100% 100% no-repeat;
		width: 20px;
		height: 20px;
	}

	:deep(.x-body-h1) {
		background: linear-gradient(to left, rgba(110, 160, 255, 0.48), rgba(109, 159, 255, 0.77), rgba(110, 159, 255, 1));
		border-radius: 0 100px 100px 0;
	}

	:deep(.x-header-block) {
		border-radius: 14px;
		background: white;
	}

	:deep(.x-answer-body) {
		background: rgba(159, 191, 255, .3);
		border-radius: 6px;
	}

	:deep(.icon-dot) {
		width: 7px;
		height: 7px;
	}

	:deep(.x-factor-title) {
		border: solid 1px;
		border-image: linear-gradient(#9ECAFF, #6499FF) 10;
		background: linear-gradient(to left, #DBE8FF, #F0F5FF);
	}

	:deep(.x-factor-list) {
		row-gap: 36px;
	}

	.x-created_time {
		border-radius: 3px;
		background: rgba(255, 248, 248, 0.07);
		padding: 0 6px;
	}

	:deep(.x-factor-item:not(:last-child)) {
		background: linear-gradient(transparent 50%, #CECECE 50%) left bottom / 100% 1px no-repeat;
		padding-bottom: 30px;
		margin-bottom: 20px;
	}
</style>