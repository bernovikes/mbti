<template>
	<view class="x-bg min-h-100">
		<view class="x-header flex justify-center flex-column items-center">			
			<view class="white x-title f6">你的心理健康报告报告正在生成中<view class="x-loadding dib">...</view>
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
	import { requestAnimationFrame } from '@/common/lib.js'
	import { ref, reactive, onMounted } from 'vue'
	import { useRoute } from 'vue-router'
	const route = useRoute()
	const curtab = ref(0)
	const tab = reactive([{
			label: '症状分析',
			value: 0,
			ask: [{
					ask: '正在分析性格内外向、直觉、情感',
					progress: 0
				}, {
					ask: '正在分析你的天赋能力、行为风格',
					progress: 0
				}, {
					ask: '正在分析你的性格优势与性格劣势',
					progress: 0
				},
				{
					ask: '正在综合评估你的MBTI人格类型',
					progress: 0
				}
			]
		},
		{
			label: '影响分析',
			value: 1,
			ask: [{
					ask: '正在评估你的恋爱特质和爱情基因',
					progress: 0
				}, {
					ask: '正在分析你喜欢的人性格类型',
					progress: 0
				}, {
					ask: '正在根据性格判断你未来的爱情婚姻走向',
					progress: 0
				},
				{
					ask: '正在生成专属你的异性魅力锦囊',
					progress: 0
				}
			]
		},
		{
			label: '评估建议',
			value: 2,
			ask: [{
					ask: '正在分析你的职场性格优势与劣势',
					progress: 0
				}, {
					ask: '正在分析你的性格对人际关系的影响',
					progress: 0
				}, {
					ask: '正在生成与你天赋相匹配的岗位和职业',
					progress: 0
				},
				{
					ask: '正在生成你的求职规划与晋升建议',
					progress: 0
				}
			]
		},
	])
	const goPay = () => {
		const qs = new URLSearchParams(route.query)
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
		background: url(https://res.vkunshan.com/depressed/generate/bg.png) 0 0 / 100% no-repeat;
	}

	.x-header {
		padding-top: 150px;
	}

	.img-logo {
		width: 85.4%;
	}

	.x-title {
		margin: 13px 0 23px 0
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
		// grid-template-columns: repeat(3, 100px);
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
</style>