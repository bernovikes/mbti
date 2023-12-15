<template>
	<view class="x-bg min-h-100">
		<view class="x-header flex justify-center flex-column items-center">
			<view class="white x-title f6 color-606670">您的心理健康报告报告正在生成中<view class="x-loadding dib">...</view>
			</view>
		</view>
		<!--  -->
		<view class="bg-white-50 x-card">
			<view class="flex x-tab bg-white-50 justify-between items-center  font-18">
				<view v-for="(item,index) in tab" :key="index" class="h-100 grid place-center w-100" :class="curtab===item.value ? 'x-tab__active white' : 'color-8d909b'">
					{{item.label}}
				</view>
			</view>
			<!--  -->
			<view class="x-ask-item" v-for="(item,index) in tab[curtab].ask" :key="index">
				<view class="mb-10 f5 color-606670">{{item.ask}}</view>
				<view :style="'--progress:'+item.progress+'%'" class="x-progress"></view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import 'url-search-params-polyfill';
	import { requestAnimationFrame } from '@/common/lib.js'
	import { ref, reactive, onMounted } from 'vue'
	const curtab = ref(0)
	const tab = reactive([{
			label: '症状分析',
			value: 0,
			ask: [{
					ask: '正在分析您的抑郁症状指标',
					progress: 0
				}, {
					ask: '正在分析您的焦虑症状指标',
					progress: 0
				}, {
					ask: '正在分析您的恐惧心理症状指标',
					progress: 0
				},
				{
					ask: '正在分析您的强迫心症状指标',
					progress: 0
				},
				{
					ask: '正在分析您是否存在思维异常情况',
					progress: 0
				}
			]
		},
		{
			label: '影响分析',
			value: 1,
			ask: [{
					ask: '正在生成您的各项因子',
					progress: 0
				}, {
					ask: '正在生成您的精神性因子',
					progress: 0
				}, {
					ask: '正在生成您的躯体性障碍因子',
					progress: 0
				},
				{
					ask: '正在生成您的运动性障碍因子',
					progress: 0
				},
				{
					ask: '正在生成您的抑郁心理障碍因子',
					progress: 0
				}
			]
		},
		{
			label: '评估建议',
			value: 2,
			ask: [{
					ask: '正在评估您的抑郁食疗建议',
					progress: 0
				}, {
					ask: '正在评估您的睡眠剥夺疗法',
					progress: 0
				}, {
					ask: '正在评估您的认知行为疗法',
					progress: 0
				},
				{
					ask: '正在评估您的预防建议',
					progress: 0
				},
				{
					ask: '报告生成结束...',
					progress: 0
				}
			]
		},
	])
	const goPay = () => {
		const qs = new URLSearchParams(getCurrentPages().slice(-1)[0].$page.options)
		uni.redirectTo({
			url: `/pages/report/index?${qs}`
		})
	}
	const runing = () => {
		const last_ask = tab[tab.length - 1].ask
		const finsh = 100 //进度条完成
		// 所有tab下的问题都完成时,停时调用
		if (last_ask[last_ask.length - 1].progress === finsh) {
			goPay()
			return false
		}
		let current = 0
		// 获取不同tab下的问题列表
		let question = tab[curtab.value].ask
		const state = (handle) => {
			return new Promise((resolve) => {
				let i = 0;
				const raf = () => {
					/*
					 * 调用callback修改进度条进度
					 */
					handle(i++)
					/**
					 * 如果进度条为完成时,修改promise状态
					 */
					if (i > finsh) {
						resolve(true)
						return false
					}
					requestAnimationFrame(raf)
				}
				requestAnimationFrame(raf)
			})
		}
		const run = async () => {
			/*
			 * 如果当前为最后一题,则 切换到下一个tab的问题列表
			 */
			if (current >= question.length) {
				if (curtab.value < tab.length - 1) {
					curtab.value++
				}
				runing()
				return false
			}
			/*
			 * 获取列表中的题目
			 */
			const item = question[current]
			/**
			 * 如果promise的状态为成功,则自增获取下一题
			 */
			const status = await state((i) => {
				item.progress = i //更新视图进度条进度
			})
			current++
			run()
		}
		run()
	}
	onMounted(() => {
		runing()
	})
</script>

<style lang="scss" scoped>
	.x-bg {
		background: url(https://res.vkunshan.com/depressed/generate/bg.png?t=2) 0 0 / 100% 300px no-repeat;
	}

	.x-header {		
		padding-top: 200px;
	}

	.img-logo {
		width: 85.4%;
	}

	.x-title {
		margin: 14px 0 22px 0;
	}

	@keyframes loadding {
		to {
			clip-path: inset(0 -1ch 0 0)
		}
	}

	.x-loadding {
		font-family: monospace;
		animation: loadding 1s steps(4) infinite;
		clip-path: inset(0 3ch 0 0);
	}

	.x-card {
		border-radius: 28px 28px 0 0;
		padding: 24px 22px 22px;
		border: 1px solid rgba(255, 255, 255, 0.96);
		backdrop-filter: blur(19px);
	}

	.x-tab {
		height: 36px;
		padding: 6px 5px;
		border-radius: 24px;
		margin-bottom: 28px;
		border: 1px solid rgba(255, 255, 255, 0.96);
		backdrop-filter: blur(4px);
	}

	.x-tab__padding {
		padding: 6px 0;
	}

	.x-tab__active {
		background: #70A1FF;
		border-radius: 18px;
	}

	.x-progress {
		background: #F3F2FF linear-gradient(to right, #70A1FF 100%, #70A1FF 0) no-repeat;
		height: 9px;
		border-radius: 6px;
		background-size: var(--progress) 100%;
	}

	.x-ask-item {
		margin-bottom: 22px;
		padding: 0 5px;
	}

	.x-bg-icon {
		width: 131px;
		height: 128px;
	}
</style>