<template>
	<view  v-if="show">
		<view class="bg-white x-age-choose">
			<view class="color-27282b f6 fw5">你的性别为</view>
			<view class="flex items-center x-choose mt-13">
				<view :class="{'active':sexActive===index}" @click="chooseSex(index)" class="x-choose-item width-fit font-13 fw5" v-for="(item,index) in sex" :key="index">{{item.name}}</view>
			</view>
			<view class="color-27282b f6 fw5 mt-37">你的年龄为</view>
			<view class="flex items-center x-choose mt-13 flex-wrap">
				<view :class="{'active':ageActive===index}" @click="chooseAge(index)" class="x-choose-item width-fit font-13 fw5" v-for="(item,index) in age" :key="index">{{item.name}}</view>
			</view>
		</view>
		<view @click="start" class="btn-start white lh-47 tc mt-30">开始答题</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	const emit = defineEmits(['start'])
	const props = defineProps({
		show: {
			type: Boolean,
			default: false
		}
	})
	const sexActive = ref(0)
	const ageActive = ref(0)

	const sex = [
		{ name: '男', value: 0 },
		{ name: '女', value: 1 }
	]
	const age = [
		{ name: '7岁', value: 2.60 },
		{ name: '8岁', value: 2.30 },
		{ name: '9岁', value: 2.20 },
		{ name: '10到11岁', value: 2.10 },
		{ name: '12到13岁', value: 2.00 },
		{ name: '14到15岁', value: 1.90 },
		{ name: '16到19岁', value: 1.89 },
		{ name: '20到24岁', value: 1.83 },
		{ name: '25到29岁', value: 1.83 },
		{ name: '30到34岁', value: 1.85 },
		{ name: '35到70岁', value: 1.85 },
	]
	const chooseSex = (index) => {
		sexActive.value = index
	}
	const chooseAge = (index) => {
		ageActive.value = index
	}
	const start = () => {
		emit('start', age[ageActive.value].value)
	}
</script>

<style lang="scss" scoped>
	.x-age-choose {
		border-radius: 12px;
		padding: 21px 0 31px 23px;
		margin-top: 27px;
	}

	.x-choose-item {
		border-radius: 19px;
		padding: 8px 30px;
		background: #F4F6FC;
		color: #8B8D91;
	}

	.active.x-choose-item {
		background: linear-gradient(to left, #9CD3FF, #5EADFF);
		color: white;
	}

	.x-choose {
		column-gap: 23px;
		row-gap: 25px;
	}

	.btn-start {
		background: linear-gradient(to left, #9CD3FF, #5EADFF);
		border-radius: 24px;
	}
</style>