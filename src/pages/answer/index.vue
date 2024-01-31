<template>
	<view class="x-bg min-vh-100 pl-18 pr-18 " :style="{'padding-top':statusBarHeight()}" :class="[themeStyle]">
		<view class="pt-30 flex justify-between">
			<view class="white">
				<view class="font-20 b x-title lh-28">{{title}}</view>
				<view class="f7 lh-17 x-subtitle">{{subtitle}}</view>
			</view>
			<image class="icon-emoji" src="https://res.vkunshan.com/depressed/index/emoji.png"></image>
		</view>
		<!--  -->
		<ageChoose :show="IQAgeChoose" @start="closePage" />
		<!--  -->
		<view class="bg-white x-body mt-26" v-if="!IQAgeChoose">
			<view class="b font-18 lh-25 color-dcdcde">
				<text class="color-1874cd x-current-number lh-25">{{currentIndex}}</text>/{{total}}
			</view>
			<!--  -->
			<view class="bg-f5f6fa x-progress-bar mt2">
				<view class="x-progress" :style="{'--width':progress}"></view>
			</view>
			<view class="mt-22" v-if="!chooseHistory.length">
				<img v-if="rule_type==='sds'" class="img-cover-sds db w-100" src="https://res.vkunshan.com/depressed/answer/sds.png" />
				<img v-if="rule_type==='scl90'" class="img-cover-scl90 db w-100" src="https://res.vkunshan.com/depressed/answer/scl90.png" />
			</view>
			<view class="mt-22 f5 fw5 lh-30 color-27282b">{{ask_item.name}}</view>
			<view v-if="ask_item.img_url" class="tc mt3">
				<image class="x-ask-question-cover" :src="ask_item.img_url" />
			</view>
			<!--  -->
			<view class="mt-24" v-if="ask_item.display_type==='text'">
				<view :class="{'active':choose_value===ask_item.id+'_'+item.value+'_'+index}" @click="chooseAnswer(ask_item.id,item.value,index)" v-for="(item,index) in ask_item.question_option" :key="item.id" class="x-answer-item flex pl-27 items-center fw5 f6 lh-20">{{item.title}}</view>
			</view>
			<!--  -->
			<view v-if="ask_item.display_type==='image'" class="flex mt-24 flex-wrap justify-between">
				<view :class="{'active':choose_value===ask_item.id+'_'+item.value+'_'+index}" @click="chooseAnswer(ask_item.id,item.value,index)" class="x-option-img bg-white width-fit dib" v-for="(item,index) in ask_item.question_option" :key="item.id">
					<image class="img-option" :src="item.img_url" />
				</view>
			</view>
			<!--  -->
			<view class="flex items-center justify-between mt-38">
				<view v-if="chooseHistory.length" @click="getPrevResult" class="f6 fw5 lh-20 color-9095a4 bg-white btn flex items-center justify-center">上一题</view>
				<view v-if="doned" @click="submit" class="f6 fw5  lh-20  white btn-submit flex items-center justify-center">查看结果</view>
			</view>
		</view>
	</view>
</template>
<script setup>
	import 'url-search-params-polyfill';
	import ageChoose from './componets/age.vue'
	import { structuredClone, statusBarHeight, compVersion } from '@/common/lib.js'
	import { getQuestionBank, postAnswerData } from '@/api/api.js'
	import { reactive, ref, computed, toRaw, watch } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { HTTP_SUCCESS } from '@/enum/http.js'
	import dayjs from 'dayjs'
	const onShareAppMessage = () => {}
	const login_user = uni.getStorageSync('login_user')
	let initHistory = ref([])
	let yieldfnCall = ''
	let ask_item = ref({})
	let total = ref(0)
	let currentIndex = ref(0)
	const clickPrev = ref(false)
	const doned = ref(false)
	const chooseHistory = ref([])
	const choose_value = ref('')
	const rule_type = ref('')
	let iq_age_ratio = +uni.getStorageSync('iq_age_ratio') //iq年龄系数
	const IQAgeChoose = ref(false)
	const themeStyle = computed(() => `x_theme_${rule_type.value}`)
	let disable_submit = false
	let timer = ''
	let detail = ''
	const title = ref('')
	const tempUser = uni.getStorageSync('tempUser')
	const progress = computed(() => `${Math.floor((chooseHistory.value.length/initHistory.value.length)*100)}%`)
	const entry_time = dayjs()
	const subtitle = computed(() => rule_type.value === 'eq' ? '广泛流行的国际标准情商测试题' : '测试去了解最真实的自己')
	let pay_redeem_code = ''
	const fetchDetail = async (id) => {
		try {
			const { data, code } = await getQuestionBank(id)
			if (code === HTTP_SUCCESS) {
				detail = data
				title.value = data.title
				uni.setNavigationBarTitle({
					title: data.title
				})
				const { question } = data
				total.value = question.length
				rule_type.value = data.rule_type.toLocaleLowerCase()
				if (!iq_age_ratio) {
					IQAgeChoose.value = rule_type.value === 'iq'
				}
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
	// 答题记录写入
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
	// 点击上一题
	const getPrevResult = () => {
		const prev = doned.value ? chooseHistory.value.splice(-2).shift() : chooseHistory.value.pop()
		clickPrev.value = true
		doned.value = false
		prev && mountData(prev)
	}
	const setDone = () => doned.value = chooseHistory.value.length >= initHistory.value.length - 1
	// 选择答案
	const chooseAnswer = (id, value, index) => {
		choose_value.value = `${id}_${value}_${index}`
		setDone()
		// 如果答题进行到最后一题,重新选择答案,则替换最后一题的记录
		if (doned.value) {
			historyStack(choose_value.value, initHistory.value.length - 1, true)
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
	// 提交数据
	const submit = async () => {
		uni.removeStorageSync('iq_age_ratio')
		const minute = dayjs().diff(entry_time, 'minute')
		const second = dayjs().subtract(minute, 'minute').diff(entry_time, 'second')
		const finish_time = `${minute}分${second}秒`
		if (disable_submit) {
			return false
		}
		disable_submit = true
		const options = chooseHistory.value.map(item => {
			const split = item.choose_value.split('_')
			const id = split[0]
			return {
				id,
				factor: detail.question.find(i => i.id === +id)?.question_tag,
				val: split[1],
			}
		})
		try {
			const params = {
				question_bank_id: detail.id,
				rule_type: detail.rule_type,
				options_data: {
					finish_time,
					options,
				},
				visitor_code: tempUser
			}
			if (rule_type.value === 'iq') {
				params['options_data']['iq_age_ratio'] = iq_age_ratio
			}
			// #ifdef APP-PLUS
			const comp_version = await compVersion()
			if (comp_version) {
				params['card_code'] = import.meta.env.VITE_APP_VERIFY_CARD
			}
			// #endif
			if (login_user) {
				params['user_id'] = login_user?.id
			}
			if (pay_redeem_code) {
				params['pay_redeem_code'] = pay_redeem_code
			}
			uni.removeStorageSync(_cache_key(detail.id))
			const { code, msg, data } = await postAnswerData(params)
			disable_submit = false
			const qs = new URLSearchParams({
				no: data,
				tempUser,
				theme: rule_type.value
			})
			if (code === HTTP_SUCCESS) {
				uni.redirectTo({
					url: `/pages/generate/generate?${qs}`
				})
			} else {
				uni.showToast({
					title: msg
				})
			}
		} catch (e) {
			e?.code && uni.showToast({
				icon: 'error',
				title: e.msg
			})
			//TODO handle the exception
		}
	}
	const initHistoryOperate = () => {
		const ask_time = chooseHistory.value.pop() //弹出history最后一个值,不弹出，如果进行选择则会同一题有多个操作
		doned.value = chooseHistory.value.length >= initHistory.value.length
		clickPrev.value = true
		resetYieldAnswer()
	}
	const _cache_key = (id) => `quesIndex_${id}_history`
	onLoad((option) => {
		pay_redeem_code = option?.pay_redeem_code
		fetchDetail(option?.id)
		const history = uni.getStorageSync(_cache_key(option?.id))
		watch(chooseHistory, (val) => {
			uni.setStorageSync(_cache_key(option?.id), toRaw(chooseHistory.value))
		}, { deep: true })
		if (history) {
			uni.showModal({
				title: '您有未完成的测试',
				content: '是否继续上次未完成的测试?',
				confirmText: '继续',
				cancelText: '重新测试',
			}).then(res => {
				if (res.confirm) {
					chooseHistory.value = history
					initHistoryOperate()
				} else {
					uni.removeStorageSync('iq_age_ratio')
					uni.removeStorageSync(_cache_key(option?.id))
				}
			})
		}
	})
	const closePage = (val) => {
		IQAgeChoose.value = false
		iq_age_ratio = val
		uni.setStorageSync('iq_age_ratio', val)
	}
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
		--width: 0%;
		background: linear-gradient(270deg, #8BB2FF 0%, #5A92FF 100%) 0 0 / var(--width) 100% no-repeat #f0f7fc;
		color: #27282b;
	}

	.x-answer-item:not(:last-child) {
		margin-bottom: 22px;
	}

	.active.x-answer-item {
		--width: 100%;
		color: white;
		transition: all .5s ease-in-out;
	}

	.btn-submit,
	.btn {
		border-radius: 18px;
		height: 36px;
	}

	.btn {
		width: 92px;
		background: rgba(240, 247, 252, .8);
	}

	.btn-submit {
		background: linear-gradient(270deg, #8BB2FF 0%, #5A92FF 100%);
		width: 177px;
	}

	.icon-emoji {
		width: 47px;
		height: 39px;
	}

	.img-cover-scl90,
	.img-cover-sds {
		height: 171px;
	}

	// eq theme
	.x_theme_eq.x-bg,
	.x_theme_iq.x-bg {
		background: url(https://res.vkunshan.com/depressed/answer/eq-bg.png) 0 0 / 100% no-repeat #F4F6FC;
	}

	.x_theme_eq,
	.x_theme_iq {
		.x-progress {
			background: linear-gradient(315deg, #7DBDFF 0%, #5EADFF 46%, #3598FF 100%);
		}

		.x-answer-item {
			background: linear-gradient(315deg, #8FC6FF 0%, #75B8FF 46%, #3598FF 100%) 0 0 / var(--width) 100% no-repeat #f0f7fc;
		}

		.icon-emoji {
			display: none;
		}

		.btn-submit {
			background: linear-gradient(315deg, #7DBDFF 0%, #5EADFF 46%, #3598FF 100%);
		}

		.x-subtitle {
			opacity: .8;
		}

		.x-current-number {
			color: #57A9FF
		}
	}

	.x-ask-question-cover {
		width: 215px;
		height: 117px;
	}

	.img-option {
		width: 73px;
		height: 38px;
	}

	.x-option-img {
		border-radius: 6px;
		border: 1px solid #F3F3F3;
		// padding: 12px 3vw;
		padding: 12px 4%;
		margin-bottom: 13px;
	}

	.active.x-option-img {
		background: linear-gradient(#8DC5FF, #54A8FF);
	}

	.x_theme_iq {
		padding: 0 13px 13px;

		.x-body {
			padding-left: 17px;
			padding-right: 17px;
		}
	}
</style>