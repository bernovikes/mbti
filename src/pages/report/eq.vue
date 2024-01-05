<template>
	<div>
		<!-- 前言  -->
		<div class="x-eq-top-desc font-13 mb-20 fw4 color-50545e pt-20 pb-20 pl-20 pr-20 lh-26">
			<div class="mb1" v-for="(item,index) in reportDesc.section" :key="index">
				{{item.content}}
			</div>
		</div>
		<!-- end -->
		<!--  -->
		<ui-block :lock="!detail.is_pay">
			<template v-slot:h1>
				<view>作答情况</view>
			</template>
			<template v-slot:body>
				<view class="f6 fw5 color-28292c mb3 x-eq-text-line width-fit">游客</view>
				<view class="x-eq-answer-body pl-18 pr-28 pt-14 pb-14">
					<view v-for="(item,index) in speed" :key="index" class="f6  flex items-center justify-between" :class="{'mb-18':(index+1)<speed.length}">
						<view class="color-4c5264 lh-26 fw5">{{item.label}}</view>
						<view class="lh-17 color-3a9bff">{{item.value}}</view>
					</view>
				</view>
			</template>
		</ui-block>
		<!--  -->
		<!--  -->
		<ui-block :lock="!detail.is_pay">
			<template v-slot:h1>
				<view>01 总体概要</view>
			</template>
			<template v-slot:body>
				<view class="f6 fw5 color-28292c mb3 x-eq-text-line width-fit">结果分析</view>
				<view class="font-13 color-50545e fw4 lh-26">{{degree.config.result}}</view>
				<view class="f6 fw5 color-28292c mb3 mt-32 x-eq-text-line width-fit">情商结论介绍</view>
				<view class="font-13 color-50545e fw4 lh-26">{{degree.config.conclude}}</view>
			</template>
		</ui-block>
		<!--  -->
		<!--  -->
		<ui-block :lock="!detail.is_pay">
			<template v-slot:h1>
				<view>02 得分详情</view>
			</template>
			<template v-slot:body>
				<l-echart ref="chart"></l-echart>
				<view class="grid x-eq-grid tc">
					<view v-for="(item,index) in factorTable" :key="index">
						<view class="f7 fw5 color-4c5264 lh-40">{{item.name}}</view>
						<view class="f7 fw5 color-4c5264 lh-44">{{item.sum}}</view>
					</view>
				</view>
			</template>
		</ui-block>
		<!--  -->
		<!--  -->
		<ui-block :lock="!detail.is_pay" v-for="(item,index) in factorList.config">
			<template v-slot:h1>
				<view>3.{{index+1}} {{item.factor}}</view>
			</template>
			<template v-slot:body>
				<view class="x-progress-bar bg-e8f2fe mt-24 mb-18">
					<view :style="{'--width':((item.sum/30)*100)+'%'}" class="x-progress h-100"></view>
				</view>
				<view class="font-13 color-4c5264 mb-18 lh-18 b">得分：<text class="color-3a9bff">{{item.sum}}</text></view>
				<view class="font-13 color-4c5264 mb-30 lh-18 b">结果：<text class="color-3a9bff">{{item.result}}</text></view>
				<view class="f6 fw5 color-28292c mb3 x-eq-text-line width-fit">维度分析</view>
				<view class="lh-26 font-13 color-50545e mb-32">{{item.dimension}}</view>
				<view class="f6 fw5 color-28292c mb3 x-eq-text-line width-fit">各项分析</view>
				<view class="lh-26 font-13 color-50545e mb-32">{{item.option}}</view>
				<view class="f6 fw5 color-28292c mb3 x-eq-text-line width-fit">提升建议</view>
				<view class="lh-26 font-13 color-50545e">{{item.suggestion}}</view>
			</template>
		</ui-block>
		<!--  -->
	</div>
</template>

<script setup>
	import uiBlock from './components/eq/ui-block.vue'
	import { inject, computed, watch, ref, onMounted, nextTick, toRaw } from 'vue'
	import { radar } from './eq/radar.js'
	const reportDesc = inject('reportDesc')
	const detail = inject('detail')
	const speed = inject('speed')
	const factorList = inject('factorList')
	const chart = ref('')
	const degree = computed(() => detail.value?.report?.detail.find(item => item.componentName === 'degree'))
	const factorTable = computed(() => {
		return factorList.value.config.map(item => {
			return { name: item.factor, sum: item.sum }
		})
	})
	onMounted(() => {
		nextTick(() => {
			const charData = factorTable.value.map(item => item.sum).sort((a, b) => a - b)
			const maxNumber = Math.max(...charData)
			const indicator = factorTable.value.map(item => {
				return { name: item.name, max: maxNumber }
			})
			radar([{ value: charData }], maxNumber, chart?.value, indicator)
		})
	})
</script>

<style scoped lang="scss">
	.x-eq-top-desc {
		background: linear-gradient(to top, rgba(253, 255, 255, 1), rgba(253, 255, 255, .53));
		border-radius: 12px;
		box-shadow: 3px 0 13px 0 rgba(0, 86, 179, 0.06);
		border: solid 1px #fff;
	}

	.x-eq-answer-body {
		background: #F5F8FB;
		border-radius: 6px;
	}

	.x-eq-text-line {
		background: linear-gradient(to left, #B6DAFF, #9BCCFF, #8AC3FF) left bottom / 100% 5px no-repeat;
	}

	.x-eq-grid {
		grid-template-columns: repeat(5, 1fr);
		border-radius: 6px;
		background: linear-gradient(to bottom, #E2F0FF 40px, #F7FAFD 44px) 0 0 / 100% 100% no-repeat;
	}

	.x-progress-bar {
		border-radius: 9px;
		height: 17px;
	}

	.x-progress,
	.x-progress-bar {
		border-radius: 9px;
	}

	.x-progress {
		background: linear-gradient(90deg, #2E94FF 0%, #5BABFF 100%);
		width: var(--width);
	}
</style>