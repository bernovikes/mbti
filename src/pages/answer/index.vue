<template>
	<view class="x-bg min-vh-100 pl-18 pr-18 ">
		<view class="pt-30">
			<view class="white">
				<view class="font-20 x-title lh-28">抑郁程度测试（SdS）</view>
				<view class="f7 lh-17">测试去了解最真实的自己</view>
			</view>
		</view>
		<!--  -->
		<!--  -->
		<view class="bg-white x-body mt-26">
			<view class="b font-18 lh-25 color-dcdcde">
				<text class="color-1874cd lh-25">{{currentIndex}}</text>/{{total}}
			</view>
			<!--  -->
			<view class="bg-f5f6fa x-progress-bar mt2">
				<view class="x-progress" :style="{'--width':progress}"></view>
			</view>
			<view class="mt-22 font-17 fw5 lh-30 color-27282b">{{ask_item.name}}</view>
			<!--  -->
			<view class="mt-24">
				<view :class="{'active':choose_value===ask_item.id+'_'+item.value}" @click="chooseAnswer(ask_item.id,item.value)" v-for="item in ask_item.question_option" :key="item.id" class="x-answer-item flex pl-27 items-center fw5 f6 lh-20">{{item.title}}</view>
			</view>
			<!--  -->
		</view>
		<view class="flex items-center">
			<view v-if="chooseHistory.length" @click="getPrevResult" class="f6 fw5 mt3 lh-20 color-9095a4 bg-white btn flex items-center justify-center">上一题</view>
			<view v-if="doned" class="f6 fw5 mt3 lh-20 color-9095a4 bg-white btn flex items-center justify-center">查看结果</view>
		</view>
	</view>
</template>
<script setup>
	import { getQuestionBank } from '@/api/api.js'
	import { onMounted, reactive, ref, computed, toRaw } from 'vue'
	import http from '@/enum/http.js'
	let initHistory = ref([])
	let yieldfnCall = ''
	let ask_item = ref({})
	let total = ref(0)
	let currentIndex = ref(0)
	const clickPrev = ref(false)
	const doned = ref(false)
	const chooseHistory = ref([])
	const choose_value = ref('')
	let timer = ''
	const progress = computed(() => `${Math.floor((chooseHistory.value.length/initHistory.value.length)*100)}%`)
	const fetchDetail = async () => {
		try {
			const { data, code } = await getQuestionBank(6)
			if (code === http.SUCCESS) {
				const { question } = data
				total.value = question.length
				initStack(question)
				getQuestionList()
			}
		} catch (e) {
			//TODO handle the exception
		}
	}
	const getYieldNext = () => {
		const _next = yieldfnCall.next()
		const item = _next.value.q || {}
		ask_item.value = item.ask_item
		currentIndex.value = item.current
	}
	const getQuestionList = (init = 0) => {
		const yieldfn = function*() {
			for (let i = init; i <= initHistory.value.length; i++) {
				yield { q: initHistory.value[i], i }
			}
		}
		yieldfnCall = yieldfn()
		getYieldNext()
	}
	const initStack = (question) => {
		initHistory.value = question.map((item, index) => {
			return {
				ask_item: item,
				choose_value: '',
				current: index + 1
			}
		})
	}
	const historyStack = (value = '', index = 0, replace = false) => {
		const params = {
			ask_item: toRaw(ask_item.value),
			currentIndex: currentIndex.value,
			total: total.value,
			choose_value: value
		}
		const operate = structuredClone(params)
		if (!replace) {
			chooseHistory.value.push(operate)
		} else {
			chooseHistory.value[index] = operate
		}
		// console.log(chooseHistory.value)
	}
	const resetYieldAnswer = () => {
		if (clickPrev.value) {
			getQuestionList(chooseHistory.value.length)
			clickPrev.value = false
		}
	}
	const mountData = (object) => {
		ask_item.value = object.ask_item
		choose_value.value = object.choose_value
		currentIndex.value = object.currentIndex
		total.value = object.total
	}
	const getPrevResult = () => {
		const prev = doned.value ? chooseHistory.value.splice(-2).shift() : chooseHistory.value.pop()
		clickPrev.value = true
		doned.value = false
		prev && mountData(prev)
	}
	const chooseAnswer = (id, value) => {
		choose_value.value = `${id}_${value}`
		doned.value = chooseHistory.value.length >= initHistory.value.length - 1
		// 如果答题进行到最后一题,重新选择答案,则替换最后一题的记录
		if (doned.value) {
			historyStack(choose_value.value, total.value.length - 1, true)
			return false
		}
		resetYieldAnswer()
		if (timer) {
			return false
		}
		// 如果未完成答题
		if (!doned.value) {
			timer = setTimeout(() => {
				historyStack(choose_value.value)
				if (timer) {
					getYieldNext()
				}
				clearTimeout(timer)
				timer = ''
			}, 500)
		}
	}
	const submit = () => {
		
	}
	onMounted(() => {
		fetchDetail()
	})
</script>
<style lang="scss" scoped>
	.x-bg {
		background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(240, 244, 255, 0.3) 22%, rgba(240, 243, 255, 0.6) 52%, #F0F3FF 100%) top 148px left 0 / 100% 151px no-repeat,
			linear-gradient(133deg, #B7DBFF 0%, #91B7FF 43%, #76A5FF 69%, #A4C3FF 100%) 0 0 / 100% 299px no-repeat,
			linear-gradient(225deg, #D2E9FF 0%, #E9F0FF 34%, #F7F6FF 100%);
	}

	.x-title {
		text-transform: uppercase;
	}

	.x-body {
		box-shadow: 10px 10px 15px -5px rgba(149, 199, 246, 0.12);
		border-radius: 14px;
		padding: 24px 24px 30px 24px;
	}

	.x-progress-bar,
	.x-progress {
		height: 9px;
		border-radius: 5px;
	}

	.x-progress {
		background: linear-gradient(to left, #4B88FF 0%, #8BB2FF 100%) 0 0 / 100% no-repeat;
		width: var(--width, 0%);
	}

	.x-answer-item {
		border-radius: 8px;
		height: 46px;
		background: #f0f7fc;
		color: #27282b;
	}

	.x-answer-item:not(:last-child) {
		margin-bottom: 22px;
	}

	.active.x-answer-item {
		background: linear-gradient(270deg, #8BB2FF 0%, #5A92FF 100%);
		color: white;
	}

	.btn {
		width: 86px;
		height: 32px;
		box-shadow: 2px 2px 8px 0 rgba(105, 99, 122, 0.17);
		border-radius: 16px;
	}
</style>