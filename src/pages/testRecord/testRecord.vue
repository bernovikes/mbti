<template>
	<record :data="list" :loadding="loadding" nav="测评记录">
		<template v-slot:title="{item}">
			{{item.question_bank.title}}
		</template>
		<template v-slot:no="{item}">
			{{item.order_no}}
		</template>
		<template v-slot:time="{item}">
			{{item.created_at}}
		</template>
		<template v-slot:status="{item}">
			<span :class="{'color-b0b0b0':item.order.length,'color-fe657a':!item.order.length}" class="f7 fw4  ml-auto">{{item.order.length ? '已支付':'未支付'}}</span>
		</template>
		<template v-if="virtualPayment" v-slot:btn="{item}">
			<span class="btn white f7 fw5 lh-16" @click="handle(item)">
				{{!item.order.length ? '去支付' : '查看报告'}}
				<span v-if="!item.order.length" class="icon-arrow dib ml1" />
			</span>
		</template>
		<template v-slot:empty>
			<view class="mt-30">
				<image class="img-empty center db" src="https://res.vkunshan.com/static/images/test-record-empty.png" />
				<view class="f7 fw4 color-a0a0a2 tc mt-20">空空如也，快去测一测吧～</view>
				<view @click="goIndex" class="btn-empty bg-white width-fit color-656a6a center font-15 fw5">去测试</view>
			</view>
		</template>
	</record>
</template>
<script setup>
	import 'url-search-params-polyfill';
	import { fetchAnswerList } from '@/api/api.js'
	import { ref, onMounted } from 'vue'
	import { getUserId } from '@/common/lib.js'
	const list = ref([])
	const loadding = ref(true)
	const virtualPayment = ref(true)
	const tempUser = uni.getStorageSync('tempUser') || '';
	const goIndex = () => {
		uni.switchTab({
			url: '/pages/index/index'
		})
	}
	const handle = (item) => {
		let data = {
			no: item.order_no,
			tempUser: tempUser
		}
		const qs = new URLSearchParams(data)
		uni.navigateTo({
			url: `/pages/report/index?${qs}`
		})
	}
	onMounted(async () => {
		const params = { tempUser }
		const user_id = getUserId()
		if (user_id) {
			params['user_id'] = user_id
		}
		try {
			const { data } = await fetchAnswerList(params)
			loadding.value = false
			list.value = data
		} catch (e) {
			//TODO handle the exception
		}
	})
</script>

<style scoped lang="scss">
	.icon-arrow {
		background: url("data:image/svg+xml,%3Csvg width='6' height='10' viewBox='0 0 6 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4-4 4' stroke='%23FEFEFE' stroke-width='1.2' fill='none' fill-rule='evenodd' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
		width: 6px;
		height: 10px;
	}

	.img-empty {
		width: 222px;
		height: 114px;
	}

	.btn-empty {
		padding: 7px 49px;
		border-radius: 15px;
		box-shadow: 0px 2px 11px 0px rgba(206, 208, 210, 0.3);
		margin-top: 38px;
	}

	.btn {
		background: linear-gradient(315deg, #5790FF 0%, #73A2FF 53%, #8EB4FF 100%);
		border-radius: 2px;
		padding: 5px 13px;
	}
</style>