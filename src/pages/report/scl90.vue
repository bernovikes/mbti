<template>
	<view>
		<view class="mb-30 pb-22 pt3 w-100 scl90 x-header-block">
			<view class="x-body-h1 pr-20 width-fit flex pl-10 pt-6 pb-6 items-center">
				<view class="icon-header-block"></view>
				<view class="white lh-22 ml2">测试程度</view>
			</view>
			<!--  -->
			<view class="pl-20 pr-24 b flex">
				<view>
					<view class="pt3 lh-22 color-404246">测试结果：{{total_avg_text}}</view>
					<view class="font-23 mt2 lh-32">平均分 {{total_avg}}</view>
				</view>
				<view class="flex ml-auto">
					<view class="x-bubble-chat mt2 mr1 width-fit white font-10 fw4 lh-13 grid place-center pl-6 pr2">{{chat}}</view>
					<view class="x-header-ip"></view>
				</view>
			</view>
		</view>
		<!--  -->
		<ui-block :lock="!detail.is_pay">
			<template v-slot:h1>
				<view class="flex items-center mb-22 pt2 pb2 pr-30 pl3 white">
					<text class="font-30 lh-35 b">01</text>
					<text class="pl-10">|</text>
					<view class="pl-12">
						<view class="lh-18">测评简介</view>
						<view class="font-10">reportillustrate</view>
					</view>
				</view>
			</template>
			<template v-slot:body>
				<view class="f6 fw4 lh-28 pre-wrap  color-50545e">
					<view :class="{'mb-28':!index}" v-for="(item,index) in reportDesc.section" :key="index">
						{{item.content}}
					</view>
				</view>
			</template>
		</ui-block>
		<!--  -->
		<ui-block :lock="!detail.is_pay">
			<template v-slot:h2>
				<view class="x-body-h1 width-fit white lh-20  pt2 pb2  pl-14  pr-14  f6 fw4">
					<view class="icon-dot dib bg-white br-100 mr2"></view>什么是抑郁症
				</view>
			</template>
			<template v-slot:body>
				<view class="f6 fw4 lh-26">
					抑郁症是世界四大疾病，但到2020年上升为世界第二大疾病；到目前为止，抑郁症的病因还不是很清楚，但可以肯定是，生物、心理、社会环境等多种因素参与了抑郁症的发病过程。生物学因素主要涉及遗传、神经生化、神经内分泌、神经再生等方面。
				</view>
			</template>
		</ui-block>
		<!--  -->
		<ui-block :lock="!detail.is_pay">
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
					<view v-for="(item,index) in speed" :key="index" class="f6 flex items-center justify-between">
						<view class="color-4c5264 lh-26 fw5">{{item.label}}</view>
						<view class="lh-17 color-6e9fff">{{item.value}}</view>
					</view>
				</view>
			</template>
		</ui-block>
		<!--  -->
		<ui-block :lock="!detail.is_pay">
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
		<ui-block :lock="!detail.is_pay">
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
		<ui-block :lock="!detail.is_pay">
			<template v-slot:h1>
				<view class="flex items-center pt2 pb2 pr-30 pl3 white">
					<text class="font-30 lh-35 b">05</text>
					<text class="pl-10">|</text>
					<view class="pl-12">
						<view class="lh-18">引言</view>
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
							<view class="color-50545e f6 pre-wrap  fw4 lh-28">{{item.content}}</view>
						</view>
					</view>
				</view>
			</template>
		</ui-block>
		<!--  -->
		<ui-block :lock="!detail.is_pay">
			<template v-slot:h1>
				<view class="flex items-center pt2 pb2 pr-30 pl3 white">
					<text class="font-30 lh-35 b">06</text>
					<text class="pl-10">|</text>
					<view class="pl-12">
						<view class="lh-18">结果分析</view>
						<view class="font-10">Result analysis</view>
					</view>
				</view>
			</template>
			<template v-slot:body>
				<l-echart ref="chart"></l-echart>
				<view class="f6 fw4 lh-28 color-50545e">
					<view>在 <text class="color-6fa0ff">心理健康方面</text> 得分较高，<text class="color-6fa0ff">{{detail.report?.top_factor}}</text> 表现较为明显，且部分项目接近或超过阳性标准，这些行为和情感表现或多或少已经影响了你的生活和工作，可以根据以下内容的分析来进行针对性的调节。</view>
				</view>
			</template>
		</ui-block>
		<!--  -->
		<ui-block :lock="!detail.is_pay">
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
				<view class="f6 fw4 lh-28 color-50545e">根据缩合分析，你的总分为<text class="color-5c93ff">{{detail.report?.total_sum}}</text>，平均分为<text class="color-5c93ff">{{detail.report?.total_avg}}</text>;阴性因子数<text class="color-5c93ff">{{detail.report?.negative_total}}</text>个，阳性项目数为<text class="color-5c93ff">{{detail.report?.positive_total}}</text>个，阳性项目平均分为<text class="color-5c93ff">{{detail.report?.positive_avg}}</text>，按照从高到低排列顺序为: {{detail.report?.top_factor}}。</view>
			</template>
		</ui-block>
		<!--  -->
		<ui-block :lock="!detail.all_unlock">
			<template v-slot:h1>
				<view class="flex items-center pt2 pb2 pr-30 pl3 white">
					<text class="font-30 lh-35 b">08</text>
					<text class="pl-10">|</text>
					<view class="pl-12">
						<view class="lh-18">因子分析</view>
						<view class="font-10">factor analysis</view>
					</view>
				</view>
			</template>
			<template v-slot:h2>
				<view class="pl-24 mt-24 pr-24" :class="{'relative z-999':detail.is_pay&&!detail.all_unlock}">
					<l-echart ref="lineChart"></l-echart>
				</view>
				<view class="x-body-h1 width-fit white lh-20  pt2 pb2  pl-14  pr-14  f6 fw4" :class="{'relative z-999':detail.is_pay&&!detail.all_unlock}">
					<view class="icon-dot dib bg-white br-100 mr2"></view>因子详情分析
				</view>
			</template>
			<template v-slot:body>
				<view>
					<view v-for="(item,index) in  factorList?.config" :key="index" class="x-factor-item">
						<view class="flex items-center">
							<view class="x-factor-title f6 fw6 lh-28 border-box pl-10 pr-10 width-fit color-5b92ff">{{item.factor}}<text class="ml2">均分{{item.avg}}分</text></view>
							<view class="color-5b92ff b f6 lh-20 ml-auto">得分：{{item.sum}}</view>
						</view>
						<view class="color-6a9cff lh-20 mt3"><text class="bg-6a9cff dib circle br-100 f6 fw5 mr1" />说明</view>
						<view class="color-50545e pre-wrap f6 fw4 lh-28 mt-12">{{item.suggest}}</view>
						<view class="color-6a9cff lh-20 mt3"><text class="bg-6a9cff dib circle br-100 f6 fw5 mr1" />指导建议</view>
						<view class="color-50545e pre-wrap f6 fw4 lh-28 mt-12">{{item.content}}</view>
						<view class="color-6a9cff lh-20 mt3"><text class="bg-6a9cff dib circle br-100 f6 fw5 mr1" />改善方式</view>
						<view class="color-50545e pre-wrap f6 fw4 lh-28 mt-12">{{item.instruction}}</view>
					</view>
				</view>
			</template>
		</ui-block>
		<!--  -->
		<ui-block :lock="!detail.all_unlock">
			<template v-slot:h1>
				<view class="flex items-center pt2 pb2 pr-30 pl3 white">
					<text class="font-30 lh-35 b">09</text>
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
							<view class="color-50545e pre-wrap  f6 fw4 lh-28">{{item.content}}</view>
						</view>
					</view>
				</view>
			</template>
		</ui-block>
		<!--  -->
		<ui-block :lock="!detail.all_unlock">
			<template v-slot:h1>
				<view class="flex items-center pt2 pb2 pr-30 pl3 white">
					<text class="font-30 lh-35 b">10</text>
					<text class="pl-10">|</text>
					<view class="pl-12">
						<view class="lh-18">科学调节抑郁情绪</view>
						<view class="font-10">Regulating depression</view>
					</view>
				</view>
			</template>
			<template v-slot:nopadding>
				<view class="pb-30">
					<view v-for="(item,index) in science?.section" :key="index" class="x-illustrate-item">
						<view v-if="item.h1" class="x-body-h1 mt-30 width-fit white lh-20  pt2 pb2  pl-14  pr-14  f6 fw4">
							<view class="icon-dot dib bg-white br-100 mr2"></view>{{item.h1}}
						</view>
						<view class="pt-22 pl-20 pr-20" v-if="item.content">
							<view class="color-53555c pre-wrap f6 fw4 lh-26">{{item.content}}</view>
						</view>
					</view>
				</view>
			</template>
		</ui-block>
		<!--  -->
		<ui-block :lock="!detail.all_unlock">
			<template v-slot:h1>
				<view class="flex items-center pt2 pb2 pr-30 pl3 white">
					<text class="font-30 lh-35 b">11</text>
					<text class="pl-10">|</text>
					<view class="pl-12">
						<view class="lh-18">参考建议</view>
						<view class="font-10">recommendation</view>
					</view>
				</view>
			</template>
			<template v-slot:nopadding>
				<view class="pb-30">
					<view v-for="(item,index) in refer?.section" :key="index" class="x-illustrate-item">
						<view v-if="item.h1" class="x-body-h1 mt-30 width-fit white lh-20  pt2 pb2  pl-14  pr-14  f6 fw4">
							<view class="icon-dot dib bg-white br-100 mr2"></view>{{item.h1}}
						</view>
						<view class="pt-26 pl-20 pr-20" v-if="item.h2">
							<view class="x-factor-title bg-dce8ff f6 fw6 lh-20 pt1 pb1 pl-10 pr-10 width-fit color-5b92ff">{{item.h2}}</view>
						</view>
						<view class="pt-12 pl-20 pr-20" v-if="item.content">
							<view class="color-53555c pre-wrap f6 fw4 lh-26">{{item.content}}</view>
						</view>
						<view class="pt-12 pl-20 pr-20" v-if="item.h3">
							<view class="color-357aff pre-wrap f6 fw4 lh-26">{{item.h3}}</view>
						</view>
					</view>
				</view>
			</template>
		</ui-block>
	</view>
</template>

<script setup>
	import uiBlock from './components/ui-block.vue'
	import LEchart from '@/uni_modules/lime-echart/components/l-echart/l-echart.vue'
	import { radar } from './radar'
	import line from './line'
	import { inject, computed, onMounted, watch, ref, nextTick } from 'vue'
	const chart = ref('')
	const lineChart = ref('')
	const detail = inject('detail')
	const factorList = inject('factorList')
	const illustrate = inject('illustrate')
	const appendix = inject('appendix')
	const speed = inject('speed')
	const refer = inject('refer')
	const science = inject('science')
	const reportDesc = inject('reportDesc')
	const total_avg_text = computed(() => detail.value.is_pay ? detail.value?.report?.total_avg_text : '???')
	const total_avg = computed(() => detail?.value?.is_pay ? detail?.value?.report?.total_avg : '???')
	const chat = computed(() => {
		if (!detail.value?.is_pay) {
			return '快来查看结果吧';
		}
		const total_avg = detail?.value?.report?.total_avg
		if (total_avg <= 2.9) {
			return '需要注意身心哦';
		}
		if (total_avg >= 3 && total_avg <= 3.8) {
			return '需要改善身心哦';
		}
		if (total_avg >= 3.9) {
			return '需要及时就医哦';
		}
	})
	const drawradar = () => {
		try {
			const module = detail.value.report.detail.find(item => item.componentName === 'factor')
			const config = module?.config
			const avg = config.map(item => item.avg)
			const standard = config.map(item => item.standard)
			const factor = config.map(item => item.factor)
			const maxNumber = Math.max(...config.map(item => item.sum))
			const charData = factor.map(item => config.find(i => i.factor == item)?.sum)
			const indicator = factor.map(item => {
				return {
					name: item,
					max: maxNumber
				}
			})
			radar([{ value: charData }], maxNumber, chart.value, indicator)
			line(avg, factor, lineChart.value, standard)
		} catch (e) {
			//TODO handle the exception
		}
	}
	watch(detail, () => {
		nextTick(() => {
			setTimeout(() => drawradar(), 1000)
		})
	}, { immediate: true })
</script>

<style scoped lang="scss">
	.x-bubble-chat {
		height: 17px;
		background: url(https://res.vkunshan.com/depressed/report/chat.png) left 0 top 0 / 100% 100% no-repeat;
	}

	.x-header-ip {
		background: url(https://res.vkunshan.com/depressed/report/ip.png) 0 0 / 100% no-repeat;
		width: 47px;
		height: 90px;
	}

	.circle {
		padding: 3px;
	}
</style>