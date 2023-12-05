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
			<template v-slot:h2>
				<view class="x-body-h1 width-fit white lh-20  pt2 pb2  pl-14  pr-14  f6 fw4">
					<view class="icon-dot dib bg-white br-100 mr2"></view>程度分析
				</view>
			</template>
			<template v-slot:body>
				<view class="font-13 fw4 lh-26">
					{{degree?.config}}
				</view>
			</template>
		</ui-block>
		<!--  -->
		<!--  -->
		<ui-block :lock="!detail.is_pay">
			<template v-slot:h2>
				<view class="x-body-h1 width-fit white lh-20  pt2 pb2  pl-14  pr-14  f6 fw4">
					<view class="icon-dot dib bg-white br-100 mr2"></view>什么是抑郁症
				</view>
			</template>
			<template v-slot:body>
				<view class="font-13 fw4 lh-26">
					抑郁症是世界四大疾病，但到2020年上升为世界第二大疾病；到目前为止，抑郁症的病因还不是很清楚，但可以肯定是，生物、心理、社会环境等多种因素参与了抑郁症的发病过程。生物学因素主要涉及遗传、神经生化、神经内分泌、神经再生等方面。
				</view>
			</template>
		</ui-block>
		<!--  -->
		<ui-block :lock="!detail.all_unlock">
			<template v-slot:h1>
				<view class="flex items-center mb-28 pt2 pb2 pr-30 pl3 white">
					<text class="font-30 lh-35 b">01</text>
					<text class="pl-10">|</text>
					<view class="pl-12">
						<view class="lh-18">量表简介</view>
						<view class="font-10">brief introduction</view>
					</view>
				</view>
			</template>
			<template v-slot:h2>
				<view class="x-body-h1 width-fit white lh-20  pt2 pb2  pl-14  pr-14  f6 fw4">
					<view class="icon-dot dib bg-white br-100 mr2"></view>量表介绍
				</view>
				<view class="pl-20 pr-20 pb-30 pt-22">
					<view class="color-53555c font-13 fw4 lh-26">
						<view>我们常说的抑郁症，其实是指临床上的重症抑郁症（major depression），人群中有16%的人在一生的某个时期会受其影响。患抑郁症除了付出严重的感情和社会代价之外，经济代价也是巨大的。据世界卫生组织统计，抑郁症已成为世界第4大疾患，预计到2022年，可能成为仅次于冠心病的第二大疾病。</view>
						<view class="mt3">美国权威的仲氏“抑郁自评量表”(SDS)，40年来经使用证实，该量表科学、方便。</view>
					</view>
				</view>
				<view class="x-body-h1 width-fit white lh-20  pt2 pb2  pl-14  pr-14  f6 fw4">
					<view class="icon-dot dib bg-white br-100 mr2"></view>各项因子分数
				</view>
			</template>
			<template v-slot:body>
				<view class="x-factor-list flex flex-column">
					<l-echart ref="lineChart"></l-echart>
					<l-echart ref="chart"></l-echart>
					<!--  -->
					<view v-for="(item,index) in  factorList?.config">
						<view class="x-factor-title bg-dce8ff f6 fw6 lh-20 pt1 pb1 pl-10 pr-10 width-fit color-5b92ff">{{item.factor}}:得分{{item.sum}}</view>
						<view class="x-factor-content color-53555c pre-wrap font-13 fw4 lh-28 mt-12">{{item.content}}</view>
					</view>
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
						<view class="lh-18">结果分析</view>
						<view class="font-10">Result analysis</view>
					</view>
				</view>
			</template>
			<template v-slot:nopadding>
				<view class="pb-30">
					<view v-for="(item,index) in result_analysis?.section" :key="index" class="x-illustrate-item">
						<view v-if="item.h1" class="x-body-h1 mt-30 width-fit white lh-20  pt2 pb2  pl-14  pr-14  f6 fw4">
							<view class="icon-dot dib bg-white br-100 mr2"></view>{{item.h1}}
						</view>
						<view class="pt-22 pl-20 pr-20" v-if="item.content">
							<view class="color-53555c pre-wrap font-13 fw4 lh-26">{{item.content}}</view>
						</view>
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
						<view class="lh-18">科学调节抑郁情绪</view>
						<view class="font-10">Regulating depression</view>
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
							<view class="color-53555c pre-wrap font-13 fw4 lh-26">{{item.content}}</view>
						</view>
					</view>
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
							<view class="color-53555c pre-wrap font-13 fw4 lh-26">{{item.content}}</view>
						</view>
						<view class="pt-12 pl-20 pr-20" v-if="item.h3">
							<view class="color-357aff pre-wrap font-13 fw4 lh-26">{{item.h3}}</view>
						</view>
					</view>
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
						<view class="lh-18">提示</view>
						<view class="font-10">prompt</view>
					</view>
				</view>
			</template>
			<template v-slot:nopadding>
				<view class="font-13 pt-20 pl-20 pr-20 pb-20 color-53555c lh-26 fw4">
					{{prompt?.content}}
				</view>
			</template>
		</ui-block>
		<!--  -->
	</view>
</template>

<script setup>
	import uiBlock from './components/ui-block.vue'
	import LEchart from '@/uni_modules/lime-echart/components/l-echart/l-echart.vue'
	import { inject, computed, onMounted, watch, ref, nextTick } from 'vue'
	import { radar } from './sds/radar.js'
	import line from './sds/line.js'
	const chart = ref('')
	const lineChart = ref('')
	const detail = inject('detail')
	const factorList = inject('factorList')
	const illustrate = inject('illustrate')
	const refer = inject('refer')
	const result_analysis = computed(() => detail.value?.report?.detail.find(item => item.componentName === 'result_analysis'))
	const degree = computed(() => detail.value?.report?.detail.find(item => item.componentName === 'degree'))
	const prompt = computed(() => detail.value?.report?.detail.find(item => item.componentName === 'alert'))
	const total_sum = computed(() => detail.value.is_pay ? `${detail.value.report?.total_sum}分` : '???')
	const degree_title = computed(() => detail.value.is_pay ? detail.value?.degree_title : '???')
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
		console.log(chart.value)
		radar([{ value: charData }], maxNumber, chart.value, indicator)
		line(charData, factor, lineChart.value)
	}
	watch(factorList, (nval) => {
		nextTick(() => drawradar())
	}, { immediate: true })
</script>

<style lang="scss" scoped>
	.x-circle {
		width: 97px;
		height: 97px;
		border-radius: 100%;
		background: radial-gradient(closest-side, #fff 70%, transparent 71%), conic-gradient(currentColor var(--width, 10%), #f2f0ff 0);
	}
</style>