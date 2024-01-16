<template>
	<view>
		<!--  -->
		<ui-block :lock="false">
			<template v-slot:h1>
				<view>作答情况</view>
			</template>
			<template v-slot:body>
				<view class="mt-28 flex items-center">
					<view class="x-accuracy-chart br-100 flex-shrink-0" :style="{'--radio':'80%'}" />
					<view class="ml-35 w-100">
						<view class="bg-f5f8fb mb-6 x-answer-accuracy flex justify-center flex-column pl-13">
							<view class="font-11 fw5 lh-15 mb2 color-4c5264">
								<text class="x-accuracy-correct-color v-mid dib" />
								答题率
							</view>
							<view class="font-13 fw6 color-28292c lh-14">
								<text>75%</text>
								<text class="ml-55">56题</text>
							</view>
						</view>
						<view class="bg-f5f8fb mb-6 x-answer-accuracy flex justify-center flex-column pl-13">
							<view class="font-11 fw5 lh-15 mb2 color-4c5264">
								<text class="x-accuracy-error-color v-mid dib" />
								答题率
							</view>
							<view class="font-13 fw6 color-28292c lh-14">
								<text>75%</text>
								<text class="ml-55">56题</text>
							</view>
						</view>
					</view>
				</view>
				<view class="pl-18 pr-28 mt-30">
					<view v-for="(item,index) in speedList" :key="index" class="font-13 lh-17 flex items-center justify-between" :class="{'mb-18':(index+1)<speedList.length}">
						<view class="color-4c5264 fw5">{{item.label}}</view>
						<view class="color-3a9bff">{{item.value}}</view>
					</view>
				</view>
			</template>
		</ui-block>
		<!--  -->
		<!--  -->
		<ui-block :lock="false">
			<template v-slot:h1>
				<view>你的智商值</view>
			</template>
			<template v-slot:body>
				<view class="tc font-38 lh-54 b color-e2772e">{{detail.report.total_sum}}</view>
				<view class="color-e2772e tc lh-24 mt2 fw5">{{iq_value.config.result}}</view>
				<view class="x-iq-progress-bar white mt-25 flex items-center pl-20 pr-20">
					<image src="https://res.vkunshan.com/depressed/report/iq/icon-cup.png" class="icon-cup" />
					<view class="ml2 w-100">
						<view class="font-11 white fw5 lh-15">{{iq_value.config.ranking_progress_text}}</view>
						<view class="relative x-iq-progress-track">
							<view class="x-iq-progress-wrap flex items-center">
								<view class="w-100 bg-bfeafe x-iq-progress"></view>
							</view>
						</view>
					</view>
				</view>
				<view class="f7 fw5 color-585858 tc mt3">{{iq_value.config.ranking}}</view>
				<view class="pre-wrap font-13 fw4 lh-25 color-50545e mt3">{{iq_value.config.analysis}}</view>
				<view class="f6 fw5 color-28292c mb3 x-eq-text-line width-fit mt-30">辅导建议</view>
				<view class="pre-wrap lh-25 fw5 font-13">{{iq_value.config.h2}}</view>
				<view class="pre-wrap font-13 fw4 lh-25">{{iq_value.config.content}}</view>
				<view class="font-13 fw4 color-50545e bg-f4f6fc lh-25 pt-20 pb-20 pl-14 pr-14 mt3   x-use-section">
					<view>1、本测试依据斯皮尔曼C,Spearman的智力二因素论，是测量智力“G” 因素的有效工具，标准的智商还受其他多种因素影响。</view>
					<view>2、本测试结果会因受测者的心理状态和环境等因素，导致测试结果有所偏差。您可以点击页面顶部“我要重测”按钮再次重测校对。请注意重测时间建议间隔48小时以上。</view>
					<view>3、本报告的有效期为6-12个月，如果受测者的生活或工作状况发生重大变化，应考虑再次参与测评。</view>
					<view>4、本测试是依据瑞文标准推理测验编制，由于瑞文智力测验主要强调推理方面的能力，并非完全的智力，测试结果仅可作为参考，不可绝对化。</view>
				</view>
			</template>
		</ui-block>
		<!--  -->
		<!--  -->
		<ui-block :lock="false">
			<template v-slot:h1>
				<view>相同智商天赋从事的职业</view>
			</template>
			<template v-slot:body>
				<view class="font-13 fw5 color-28292c lh-25 mt-23">
					<view>以下是根据不同智商值从事的各种职业大数据统计，分析得出与您智商相同的人都在从事什么样的工作。</view>
					<view>此数据仅供参考对比，了解自己是否在浪费自己的天赋。这个智商段的人就业一般需要受到一定职业训练：</view>
				</view>
				<view class="pre-wrap font-13 fw5 color-50545e lh-25 mt-12 mb-15">{{iq_career.config}}</view>
				<view class="font-13 fw4 color-50545e bg-f4f6fc lh-25 pt-20 pb-20 pl-14 pr-14 mt3   x-use-section">
					<view class="f6 fw5 color-28292c mb3 x-eq-text-line width-fit mb-12">注意事项</view>
					<view>1、本测试依据斯皮尔曼C,Spearman的智力二因素论，是测量智力“G” 因素的有效工具，标准的智商还受其他多种因素影响。</view>
					<view>2、本测试结果会因受测者的心理状态和环境等因素，导致测试结果有所偏差。您可以点击页面顶部“我要重测”按钮再次重测校对。请注意重测时间建议间隔48小时以上。</view>
					<view>3、本报告的有效期为6-12个月，如果受测者的生活或工作状况发生重大变化，应考虑再次参与测评。</view>
					<view>4、本测试是依据瑞文标准推理测验编制，由于瑞文智力测验主要强调推理方面的能力，并非完全的智力，测试结果仅可作为参考，不可绝对化。</view>
				</view>
			</template>
		</ui-block>
		<!--  -->
		<!--  -->
		<ui-block :lock="false">
			<template v-slot:h1>
				<view>智力维度分布图</view>
			</template>
			<template v-slot:body>
			</template>
		</ui-block>
		<!--  -->
		<!--  -->
		<ui-block :lock="false" v-for="(item,index) in factorList.config" :key="index">
			<template v-slot:h1>
				<view>{{item.factor}}</view>
			</template>
			<template v-slot:body>
				<view class="mt-23">
					<image mode="widthFix" class="x-cover-image w-100" :src="item.img" />
					<view class="f7 color-585858 fw5 mt-13">以下是你的智力五维度的具体表现与针对性的解析：</view>
					<view class="mt-20 font-15 fw5 color-585858">
						{{item.factor}}能力：<text class="color-fc4b37">你的得分</text>
					</view>
					<view class="x-iq-progress-bar white mt-25 flex items-center pl-20 pr-20">
						<image src="https://res.vkunshan.com/depressed/report/iq/icon-cup.png" class="icon-cup" />
						<view class="ml2 w-100">
							<view class="font-11 white fw5 lh-15">你：{{item.sum}}分</view>
							<view class="relative x-iq-progress-track">
								<view class="x-iq-progress-wrap flex items-center">
									<view class="w-100 bg-bfeafe x-iq-progress"></view>
								</view>
							</view>
						</view>
					</view>
					<!--  -->
					<view class="font-13 mt-23">
						<block v-for="(child,cindex) in item.section.filter(item=>!item.is_use)" :key="cindex">
							<view class="pre-wrap lh-25 mb-20 color-50545e" v-if="child.content">{{child.content}}</view>
							<view v-if="child.h1" class="f6 fw5 color-28292c mb3 x-eq-text-line width-fit mb-12">{{child.h1}}</view>
							<view v-if="child.h2" class="color-3a9bff lh-17 fw5 mb-6">{{child.h2}}</view>
						</block>
						<view class="bg-f4f6fc pl-14 pr-14 pt-20 pb3 x-use-section">
							<block v-for="(child,cindex) in item.section.filter(item=>item.is_use)" :key="cindex">
								<view class="pre-wrap lh-25 color-50545e mb-20" v-if="child.content">{{child.content}}</view>
								<view v-if="child.h1" class="f6 fw5 color-28292c mb3 x-eq-text-line width-fit mb-12">{{child.h1}}</view>
								<view v-if="child.h2" class="color-3a9bff mb-6 lh-17 fw5">{{child.h2}}</view>
							</block>
						</view>
					</view>
				</view>
			</template>
		</ui-block>
		<!--  -->
		<!--  -->
		<ui-block :lock="false">
			<template v-slot:h1>
				<view>如何理解测试所得到的智商分数</view>
			</template>
			<template v-slot:body>
				<view class="mt-23">
					<image mode="widthFix" class="x-cover-image w-100" :src="iq_understand.config.cover"></image>
					<view class="pre-wrap font-13 fw4 lh-25 color-50545e mt-23">{{iq_understand.config.content}}</view>
				</view>
			</template>
		</ui-block>
		<!--  -->
		<!--  -->
		<ui-block :lock="false">
			<template v-slot:h1>
				<view>影响智商的七种能力因素</view>
			</template>
			<template v-slot:body>
				<view class="mt-23 font-13 lh-25">
					<image mode="widthFix" class="x-cover-image w-100" :src="iq_effect.config.cover"></image>
					<block v-for="(item,index) in iq_effect.config.section" :key="index">
						<view class="pre-wrap mb-23 color-50545e" v-if="item.content">{{item.content}}</view>
						<view class="lh-17 color-3a9bff mb-6" v-if="item.h1">{{item.h1}}</view>
					</block>
				</view>
			</template>
		</ui-block>
		<!--  -->
		<!--  -->
		<ui-block :lock="false">
			<template v-slot:h1>
				<view>提高智力的方法</view>
			</template>
			<template v-slot:body>
				<view class="mt-23 font-13 lh-25">
					<image mode="widthFix" class="x-cover-image w-100" :src="iq_improve.config.cover"></image>
					<block v-for="(item,index) in iq_improve.config.section" :key="index">
						<view class="pre-wrap mb-23 color-50545e" v-if="item.content">{{item.content}}</view>
						<view class="lh-17 color-3a9bff mb-6" v-if="item.h1">{{item.h1}}</view>
					</block>
				</view>
			</template>
		</ui-block>
		<!--  -->
		<!--  -->
		<ui-block :lock="false">
			<template v-slot:h1>
				<view>瑞文智力到底准不准？</view>
			</template>
			<template v-slot:body>
				<view class="mt-23 font-13 lh-25">
					<image mode="widthFix" class="x-cover-image w-100" :src="iq_accurate.config.cover"></image>
					<block v-for="(item,index) in iq_accurate.config.section" :key="index">
						<view class="pre-wrap mb-23 color-50545e" v-if="item.content">{{item.content}}</view>
						<view class="lh-17 color-3a9bff mb-6" v-if="item.h1">{{item.h1}}</view>
						<view class="lh-25 color-fc4f3b mb-6" v-if="item.h2">{{item.h2}}</view>
						<image mode="widthFix" :src="item.img" class="x-cover-image mb-23" v-if="item.img" />
					</block>
				</view>
			</template>
		</ui-block>
		<!--  -->
		<!--  -->
		<ui-block :lock="false">
			<template v-slot:h1>
				<view>智商与遗传的关系？</view>
			</template>
			<template v-slot:body>
				<view class="mt-23 font-13 lh-25">
					<block v-for="(item,index) in iq_inheritance.config" :key="index">
						<view class="pre-wrap color-50545e mb-23" v-if="item.content">{{item.content}}</view>
						<view class="lh-17 color-50545e fw5 mb-6" v-if="item.h1">{{item.h1}}</view>
						<image mode="widthFix" :src="item.img" class="x-cover-image mb-23" v-if="item.img" />
					</block>
				</view>
			</template>
		</ui-block>
		<!--  -->
		<btns />
	</view>
</template>

<script setup>
	import uiBlock from './components/eq/ui-block.vue'
	import btns from './components/iq/btn.vue'
	import { inject, computed } from 'vue'
	const detail = inject('detail')
	const speed = inject('speed')
	const factorList = inject('factorList')
	const iq_value = computed(() => detail.value?.report?.detail.find(item => item.componentName === 'iq_value'))
	const iq_career = computed(() => detail.value?.report?.detail.find(item => item.componentName === 'iq_career'))
	const iq_understand = computed(() => detail.value?.report?.detail.find(item => item.componentName === 'iq_understand'))
	const iq_effect = computed(() => detail.value?.report?.detail.find(item => item.componentName === 'iq_effect'))
	const iq_improve = computed(() => detail.value?.report?.detail.find(item => item.componentName === 'iq_improve'))
	const iq_accurate = computed(() => detail.value?.report?.detail.find(item => item.componentName === 'iq_accurate'))
	const iq_inheritance = computed(() => detail.value?.report?.detail.find(item => item.componentName === 'iq_inheritance'))
	const speedList = computed(() => speed.value.slice(1))
</script>

<style scoped lang="scss">
	@import url("./eq-ui.scss");

	.x-iq-progress-bar {
		background: linear-gradient(270deg, #1C9FFF 0%, #6DB1FF 100%);
		border-radius: 2px;
		height: 60px;
	}

	.icon-cup {
		width: 27px;
		height: 26px;
	}

	.x-iq-progress-track {
		height: 8px;
		background: url("data:image/svg+xml,%3Csvg width='300' height='10' xmlns='http://www.w3.org/2000/svg'%3E%3Crect rx='4' height='8' width='300' y='1' fill='%23008aea'/%3E%3C/svg%3E") left center / 100% 8px no-repeat;
	}

	.x-iq-progress {
		height: 8px;
		border-radius: 4px;
	}

	.x-iq-progress-wrap,
	.x-iq-progress-track {
		height: 16px;
	}

	.x-iq-progress-wrap {
		width: 100px;
		background: url(https://res.vkunshan.com/depressed/report/iq/progress-light.png) top right / 19px 16px no-repeat;
	}

	.x-use-section {
		border-radius: 6px;
	}

	.x-cover-image {
		height: 154px;
	}

	.x-answer-accuracy {
		height: 50px;
		border-radius: 4px;
	}

	.x-accuracy-error-color,
	.x-accuracy-correct-color {
		width: 12px;
		height: 12px;
		border-radius: 4px;
	}

	.x-accuracy-correct-color {
		background: linear-gradient(#6CCBFF, #3A9BFF);
	}

	.x-accuracy-error-color {
		background: linear-gradient(#FFBEDB, #FF89B4);
	}

	.x-accuracy-chart {
		background: radial-gradient(circle, white 45%, white 46%, transparent 47%), conic-gradient(#3A9BFF var(--radio, 10%), transparent 0), radial-gradient(circle, #FFBEDB, #FF89B4 65%, white 66%, transparent 51%);
		background-repeat: no-repeat;
		width: 106px;
		height: 106px;
	}
</style>