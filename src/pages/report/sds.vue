<template>
	<view>
		<view class="x-header-block mb-30 pb-22 pt3 w-100">
			<view class="x-body-h1 pr-20 width-fit flex pl-10 pt-6 pb-6 items-center">
				<view class="icon-header-block"></view>
				<view class="white lh-22 ml2">结果总览</view>
			</view>
			<!--  -->
			<view class="pl-20 b">
				<view class="flex pr-30 mt-20">
					<view class="flex flex-column">
						<view class="color-77797f  lh-22">结果分：{{total_sum}}</view>
						<view class="mt2 font-19 color-404246 lh-26 b">结果：{{degree_title}}</view>
						<view class="f7 lh-17 fw5 mt-auto color-848587">关注您的身心健康</view>
					</view>
					<view :style="{'--width':detail.report?.total_sum+'%'}" class="color-5992ff x-circle ml-auto grid place-center font-18 lh-25">{{total_sum}}</view>
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
				<view class="f6 fw4 lh-28 color-50545e">
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
						<view class="font-10">prompt</view>
					</view>
				</view>
			</template>
			<template v-slot:nopadding>
				<view class="f6 pt-20 pl-20 pr-20 pb-20 color-53555c lh-26 fw4 pre-wrap">
					{{prompt?.content}}
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
						<view class="lh-18">程度分析</view>
						<view class="font-10">cehngdufenxi</view>
					</view>
				</view>
			</template>
			<template v-slot:h2>
				<l-echart ref="chart"></l-echart>
			</template>
			<template v-slot:body>
				<view class="f6 fw4 lh-26 pre-wrap">
					{{degree?.config}}
				</view>
			</template>
		</ui-block>
		<!--  -->
		<ui-block :lock="!detail.all_unlock">
			<template v-slot:h1>
				<view class="flex items-center pt2 pb2 pr-30 pl3 white">
					<text class="font-30 lh-35 b">05</text>
					<text class="pl-10">|</text>
					<view class="pl-12">
						<view class="lh-18">因子分析</view>
						<view class="font-10">factor analysis</view>
					</view>
				</view>
			</template>
			<template v-slot:h2>
				<view :class="{'relative z-999':detail.is_pay&&!detail.all_unlock}">
					<l-echart ref="lineChart"></l-echart>
					<view class="x-body-h1 width-fit white mt-30 lh-20  pt2 pb2  pl-14  pr-14  f6 fw4">
						<view class="icon-dot dib bg-white br-100 mr2"></view>因子详情分析
					</view>
				</view>
			</template>
			<template v-slot:body>
				<view class="x-factor-list flex flex-column">
					<!--  -->
					<view v-for="(item,index) in  factorList?.config" class="x-factor-item" :key=" index">
						<view class="x-factor-title bg-dce8ff f6 fw6 lh-20 pt1 pb1 pl-10 pr-10 width-fit color-5b92ff">{{item.factor}}:得分{{item.sum}}</view>
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
					<text class="font-30 lh-35 b">06</text>
					<text class="pl-10">|</text>
					<view class="pl-12">
						<view class="lh-18">特别说明</view>
						<view class="font-10">Specification</view>
					</view>
				</view>
			</template>
			<template v-slot:nopadding>
				<view class="pb-30">
					<view v-for="(item,index) in result_analysis?.section" :key="index" class="x-illustrate-item">
						<view v-if="item.h1" class="x-body-h1 mt-30 width-fit white lh-20  pt2 pb2  pl-14  pr-14  f6 fw4">
							<view class="icon-dot dib bg-white br-100 mr2"></view>{{item.h1}}
						</view>
						<view class="pt-22 pl-20 pr-20 color-53555c pre-wrap f6 fw4 lh-26" v-if="item.content">
							{{item.content}}
						</view>
					</view>
				</view>
			</template>
		</ui-block>
		<!--  -->
		<ui-block :lock="!detail.all_unlock">
			<template v-slot:h1>
				<view class="flex items-center pt2 pb2 pr-30 pl3 white">
					<text class="font-30 lh-35 b">07</text>
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
					<text class="font-30 lh-35 b">08</text>
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
	import { radar } from './sds/radar.js'
	import line from './sds/line.js'
	import { inject, computed, onMounted, watch, ref, nextTick } from 'vue'
	const chart = ref('')
	const lineChart = ref('')
	const detail = inject('detail')
	const factorList = inject('factorList')
	const science = inject('science')
	const refer = inject('refer')
	const reportDesc = inject('reportDesc')
	const speed = inject('speed')
	const result_analysis = computed(() => detail.value?.report?.detail.find(item => item.componentName === 'result_analysis'))
	const degree = computed(() => detail.value?.report?.detail.find(item => item.componentName === 'degree'))
	const prompt = computed(() => detail.value?.report?.detail.find(item => item.componentName === 'alert'))
	const total_sum = computed(() => detail.value.is_pay ? `${detail.value.report?.total_sum}分` : '???')
	const degree_title = computed(() => detail.value.is_pay ? detail.value?.report?.degree_title : '???')
	const drawradar = () => {
		const { config } = factorList.value
		const charData = config.map(item => item.sum)
		const maxNumber = Math.max(...charData)
		const factor = config.map(item => item.factor)
		const indicator = config.map(item => {
			return {
				name: item.factor,
				max: maxNumber
			}
		})
		line(charData, factor, lineChart?.value)
		radar([{ value: charData }], maxNumber, chart?.value, indicator)
	}
	onMounted(() => {
		watch(factorList, (nval) => {
			nextTick(() => {
				setTimeout(() => drawradar(), 1000)
			})
		}, { immediate: true })
	})
</script>

<style lang="scss" scoped>
	.x-circle {
		width: 97px;
		height: 97px;
		border-radius: 100%;
		background: radial-gradient(closest-side, #fff 70%, transparent 71%), conic-gradient(currentColor var(--width, 10%), #f2f0ff 0);
	}

	.circle {
		padding: 3px;
	}
</style>