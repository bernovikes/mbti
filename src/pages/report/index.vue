<template>
	<view class="min-vh-100 pt-65 pb-30 x-bg">
		<view class="pl-14 white">
			<view class="font-22 lh-30">抑郁测试报告SCL—90</view>
			<view class="f6 lh-20">恭喜完成测试！</view>
			<view class="x-header-line mt3 mb-20"></view>
			<view class="f7 lh-20">2023-09-15 13:26</view>
		</view>
		<view class="mt-20 pl-14 pr-14">
			<view class="x-header-block mb-30 pb-22 pt3 w-100">
				<view class="x-body-h1 pr-20 width-fit flex pl-10 pt-6 pb-6 items-center">
					<view class="icon-header-block"></view>
					<view class="white lh-22 ml2">测试程度</view>
				</view>
				<!--  -->
				<view class="pl-20">
					<view class="pt3 lh-22 color-404246">测试结果：健康</view>
					<view class="font-23 mt2 lh-32">平均分 {{detail.report?.total_avg}}</view>
					<view class="f7  color-464240 lh-17">恭喜你已经超越 <text class="color-6fa0ff">91%</text> 的用户了～</view>
				</view>
			</view>
			<!--  -->
			<ui-block>
				<template v-slot:h1>
					<view class="flex items-center pt2 pb2 pr-30 pl3 white">
						<text class="font-30 lh-35 b">01</text>
						<text class="pl-10">|</text>
						<view class="pl-12">
							<view class="lh-18">报告说明</view>
							<view class="font-10">reportillustrate</view>
						</view>
					</view>
				</template>
				<template v-slot:body>
					<view class="color-50545e f6 lh-28">
						<view>
							抑郁自评量表 （SDS）是由美国社克大学教授庄（william w.K.Zung）于1955年开发的截止目前最严谨、知名度最高的权威抑郁评估量表，是国际上各精神科门诊和心理咨询机构首选的抑郁诊断工具。
						</view>
						<view class="mt-28">
							根据抑郁自评量表 (SDS)的中国常模，抑郁评定的临界值为53分，分值越高，抑郁倾向越明注重维护社会秩序，确保达成标准。
						</view>
					</view>
				</template>
			</ui-block>
			<!--  -->
			<ui-block>
				<template v-slot:h1>
					<view class="flex items-center pt2 pb2 pr-30 pl3 white">
						<text class="font-30 lh-35 b">02</text>
						<text class="pl-10">|</text>
						<view class="pl-12">
							<view class="lh-18">作答情况</view>
							<view class="font-10">Answering situation</view>
						</view>
					</view>
				</template>
				<template v-slot:body>
					<view class="x-answer-body pl-20 pr-20 pt-10 pb-10">
						<view v-for="(item,index) in 3" :key="index" class="font-13 flex items-center justify-between">
							<view class="color-4c5264 lh-26 fw5">答题率</view>
							<view class="lh-17 color-6e9fff">100%</view>
						</view>
					</view>
				</template>
			</ui-block>
			<!--  -->
			<ui-block>
				<template v-slot:h1>
					<view class="flex items-center pt2 pb2 pr-30 pl3 white">
						<text class="font-30 lh-35 b">03</text>
						<text class="pl-10">|</text>
						<view class="pl-12">
							<view class="lh-18">报告提示</view>
							<view class="font-10">Report prompt</view>
						</view>
					</view>
				</template>
				<template v-slot:body>
					<view class="f7 fw4 lh-29 color-50545e">
						<view>1、本报告中如果某项值过高，需去医院进行专业的筛查</view>
						<view class="mt-28">2、本报告是基于受测者对全部问题的回答所生成的评估结果，因此受测者的作答状态、自我认知和坦白程度等因素，均会影响其报告结果的真实性、准确性和有效性。</view>
						<view class="mt-28">3、本报告的有效期为6至12个月，如果受测者的生活或工作发生重大变化，应考虑再次参与测评。</view>
					</view>
				</template>
			</ui-block>
			<!--  -->
			<ui-block>
				<template v-slot:h1>
					<view class="flex items-center pt2 pb2 pr-30 pl3 white">
						<text class="font-30 lh-35 b">04</text>
						<text class="pl-10">|</text>
						<view class="pl-12">
							<view class="lh-18">总体概括</view>
							<view class="font-10">Overall Summary</view>
						</view>
					</view>
				</template>
				<template v-slot:body>
					<view class="f6 fw4 lh-28 color-50545e">
						<view>
							你的状态为 <text class="color-6fa0ff">{{detail.report?.total_avg_text}}</text> 本诊断结果按全国正常，SCL-90常模N-1388)为依据评定(1-5级评分)，仅作为参考而非绝对标佳。
						</view>
						<view class="mt-28">应根据临床(要害)症状来划分。如有疑问，或症状已经影响到你的正常生活、学习及工作，建议尽早向心理专家咨询，进行专业的心理辅导治疗。切勿不加重视，贻误治疗机会，导致严重后果。</view>
					</view>
				</template>
			</ui-block>
			<!--  -->
			<ui-block>
				<template v-slot:h1>
					<view class="flex items-center pt2 pb2 pr-30 pl3 white">
						<text class="font-30 lh-35 b">05</text>
						<text class="pl-10">|</text>
						<view class="pl-12">
							<view class="lh-18">结果分析</view>
							<view class="font-10">Result analysis</view>
						</view>
					</view>
				</template>
				<template v-slot:body>
					<view class="f6 fw4 lh-28 color-50545e">
						<view>在 <text class="color-6fa0ff">心理健康方面</text> 得分较高，<text class="color-6fa0ff">{{detail.report?.top_factor}}</text> 表现较为明显，且部分项目接近或超过阳性标准，这些行为和情感表现或多或少已经影响了你的生活和工作，可以根据以下内容的分析来进行针对性的调节。</view>
					</view>
				</template>
			</ui-block>
			<!--  -->
			<ui-block>
				<template v-slot:h1>
					<view class="flex items-center pt2 pb2 pr-30 pl3 white">
						<text class="font-30 lh-35 b">06</text>
						<text class="pl-10">|</text>
						<view class="pl-12">
							<view class="lh-18">因子分析</view>
							<view class="font-10">factor analysis</view>
						</view>
					</view>
				</template>
				<template v-slot:h2>
					<view class="x-body-h1 width-fit white lh-20  pt2 pb2  pl-14  pr-14  f6 fw4">
						<view class="icon-dot dib bg-white br-100 mr2"></view>因子详情分析
					</view>
				</template>
				<template v-slot:body>
					<view>
						<view v-for="(item,index) in  factorList?.config">
							<view class="x-factor-title bg-dce8ff f6 fw6 lh-20 pt1 pb1 pl-10 pr-10 width-fit color-5b92ff">{{item.factor}} {{item.avg}}分 [很轻]</view>
							<view class="color-50545e f6 fw4 lh-28 mt-12">{{item.content}}</view>
						</view>
					</view>
				</template>
			</ui-block>
			<!--  -->
			<ui-block>
				<template v-slot:h1>
					<view class="flex items-center pt2 pb2 pr-30 pl3 white">
						<text class="font-30 lh-35 b">07</text>
						<text class="pl-10">|</text>
						<view class="pl-12">
							<view class="lh-18">综合结果</view>
							<view class="font-10">Obtaining Results</view>
						</view>
					</view>
				</template>
				<template v-slot:body>
					<view class="f6 fw4 lh-28 color-50545e">根据上述分析，你的总分为<text class="color-5c93ff">{{detail.report?.total_sum}}</text>，平均分为<text class="color-5c93ff">{{detail.report?.total_avg}}</text>;阴性因子数<text class="color-5c93ff">{{detail.report?.negative_total}}</text>个，阳性项目数为<text class="color-5c93ff">{{detail.report?.positive_total}}</text>个，阳性项目平均分为<text class="color-5c93ff">{{detail.report?.positive_avg}}</text>，按照从高到低排列顺序为: {{detail.report?.top_factor}}。</view>
				</template>
			</ui-block>
			<!--  -->
			<ui-block>
				<template v-slot:h1>
					<view class="flex items-center pt2 pb2 pr-30 pl3 white">
						<text class="font-30 lh-35 b">08</text>
						<text class="pl-10">|</text>
						<view class="pl-12">
							<view class="lh-18">特别说明</view>
							<view class="font-10">Specification</view>
						</view>
					</view>
				</template>
				<template v-slot:nopadding>
					<view class="pb-30">
						<view v-for="(item,index) in illustrate?.section" :key="index" class="x-illustrate-item">
							<view v-if="item.h1" class="x-body-h1 mt-30 width-fit white lh-20  pt2 pb2  pl-14  pr-14  f6 fw4">
								<view class="icon-dot dib bg-white br-100 mr2"></view>{{item.h1}}
							</view>
							<view class="pt-22 pl-20 pr-20" v-if="item.content">
								<view class="color-50545e f6 fw4 lh-28">{{item.content}}</view>
							</view>
						</view>
					</view>
				</template>
			</ui-block>
			<!--  -->
			<ui-block>
				<template v-slot:h1>
					<view class="flex items-center pt2 pb2 pr-30 pl3 white">
						<text class="font-30 lh-35 b">09</text>
						<text class="pl-10">|</text>
						<view class="pl-12">
							<view class="lh-18">附录</view>
							<view class="font-10">appendix</view>
						</view>
					</view>
				</template>
				<template v-slot:nopadding>
					<view class="pb-30">
						<view v-for="(item,index) in appendix?.section" :key="index" class="x-illustrate-item">
							<view v-if="item.h1" class="x-body-h1 mt-30 width-fit white lh-20  pt2 pb2  pl-14  pr-14  f6 fw4">
								<view class="icon-dot dib bg-white br-100 mr2"></view>{{item.h1}}
							</view>
							<view class="pt-22 pl-20 pr-20" v-if="item.content">
								<view class="color-50545e f6 fw4 lh-28">{{item.content}}</view>
							</view>
						</view>
					</view>
				</template>
			</ui-block>
			<!--  -->
			<comment />
			<!--  -->
			<template v-if="!detail?.is_pay">
				<pay-btn></pay-btn>
			</template>
			<!--  -->
			<template v-if="!detail?.is_pay">
				<pay-dialog></pay-dialog>
			</template>
		</view>
		<!--  -->
	</view>
</template>
<script setup>
	import LEchart from '@/uni_modules/lime-echart/components/l-echart/l-echart.vue';
	import uiBlock from './components/ui-block.vue'
	import payBtn from './components/pay/btn.vue'
	import comment from './components/comment.vue'
	import payDialog from './components/pay/dialog.vue'
	import { fetchAnswerData, createOrder, createPayConfig, traceCheck } from '@/api/api.js'
	import { onLoad, onUnload } from '@dcloudio/uni-app'
	import { ref, computed, provide, getCurrentInstance } from 'vue'
	import { payEnvCheck, payGetWay } from './order.js'
	import http from '@/enum/http.js'
	import { isMobile, isWechat } from '@/common/lib.js'
	const detail = ref({})
	let payIntervalTimer = ''
	const tempUser = uni.getStorageSync('tempUser')
	const { ctx: { $page } } = getCurrentInstance()
	provide('detail', detail)
	const fetchDetail = async () => {
		try {
			const { data } = await fetchAnswerData($page.options.no)
			data.is_pay = !!data.question_bank_goods.find(item => item.type === 'all')?.paid_order
			detail.value = data
		} catch (e) {
			//TODO handle the exception
		}
	}
	const factorList = computed(() => detail.value?.report?.detail.find(item => item.componentName === 'factor'))
	const illustrate = computed(() => detail.value?.report?.detail.find(item => item.componentName === 'illustrate'))
	const appendix = computed(() => detail.value?.report?.detail.find(item => item.componentName === 'appendix'))
	onLoad((options) => {
		fetchDetail()
	})
	uni.$on('callpay', async (argv) => {
		const { goods_id, pay_method } = argv
		const env = payEnvCheck(pay_method)
		const params = {
			answer_id: detail.value.id,
			visitor_code: tempUser,
			goods_id,
			pay_method
		}
		try {
			const { code, data } = await createOrder(params)
			if (code === http.SUCCESS) {
				uni.setStorageSync('trace_no', data.trace_no)
				const pay_params = { trace_no: data.trace_no, env }
				const pay_res = await createPayConfig(pay_params)
				const urlparams_obj = new URLSearchParams({ ...$page.options })
				const callback = `pages/callback/callback?${urlparams_obj}`
				const result = payGetWay(env, [pay_res.data, callback])
				if (result instanceof Promise) {
					result.then((res) => {
						fetchDetail()
					}).catch(() => {})
				}
			}
		} catch (e) {
			//TODO handle the exception
		}
	})
	//轮询查询订单状态
	//移动端非微信浏览器,发起支付成功或失败跳到callback页面由callback页面发起轮询通知，pc扫码支付打开页面发起通知
	if (!(isMobile() && isWechat()) && !payIntervalTimer) {
		payIntervalTimer = setInterval(async () => {
			const trace_no = uni.getStorageSync('trace_no')
			const pay_callback = uni.getStorageSync('pay_callback')
			if (pay_callback) {
				try {
					const { code, data } = await traceCheck(trace_no)
					if (code === http.SUCCESS && data?.pay_status) {
						uni.removeStorageSync('pay_callback')
						uni.removeStorageSync('trace_no')
						fetchDetail()
						clearInterval(payIntervalTimer)
					}
				} catch (e) {
					//TODO handle the exception
				}
			}
		}, 3000)
	}
	onUnload(() => {
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

	.icon-header-block {
		background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0iI0ZGRiIgY3g9IjEwIiBjeT0iMTAiIHI9IjEwIi8+PHBhdGggZD0iTTkuMTUgNWwuMzEzIDcuODg4aDEuMDc0TDEwLjg1IDVoLTEuN3ptLjg0MyA4Ljc5N2EuODc3Ljg3NyAwIDAgMC0uNjk0LjMwOGMtLjIwNC4yLS4yOTkuNDYyLS4yOTkuNzg2IDAgLjMwOC4wOTUuNTcuMy43ODUuMTkuMjE2LjQyMS4zMjQuNjkzLjMyNC4yNzIgMCAuNTE3LS4xMDguNzIxLS4zMDguMTktLjIxNi4yODYtLjQ3OC4yODYtLjgwMSAwLS4zMjQtLjA5NS0uNTg2LS4yODYtLjc4Ni0uMTktLjIxNi0uNDM1LS4zMDgtLjcyLS4zMDh6IiBmaWxsPSIjNzRBNUZGIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L2c+PC9zdmc+") 0 0 / 100% 100% no-repeat;
		width: 20px;
		height: 20px;
	}

	:deep(.x-body-h1) {
		background: linear-gradient(to left, rgba(110, 160, 255, 0.48), rgba(109, 159, 255, 0.77), rgba(110, 159, 255, 1));
		border-radius: 0 100px 100px 0;
	}

	.x-header-block {
		border-radius: 14px;
		background: url(https://res.vkunshan.com/depressed/report/ip.png) bottom 22px right 22px / 47px 90px no-repeat white;
	}

	.x-answer-body {
		background: rgba(159, 191, 255, .3);
		border-radius: 6px;
	}

	.icon-dot {
		width: 7px;
		height: 7px;
	}

	.x-factor-title {
		border: solid 1px #6499FF;
	}
</style>