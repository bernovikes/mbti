<template>
	<view class="x-bg min-vh-100 pl-17 pr-17  pb-60">
		<view class="font-19 color-282a2c lh-27">智商—情商测试</view>
		<view class="f7 lh-16 color-5a5c62">智商决定下限，情商却能提高上限</view>
		<view @click="goTest(topic[1].id)" class="x-blue-iq mt-27 flex flex-column border-box">
			<view class="white">
				<view class="b">智商测试</view>
				<view class="f7 fw5 lh-16 mt2">IQ TEST</view>
			</view>
			<view class="font-11 mt-auto color-7766ff bg-d7d1ff width-fit x-question-num lh-17 pl-12 pr-12">60题</view>
		</view>
		<view @click="goTest(topic[0].id)" class="x-blue-iq x-blue-eq mt-13 flex flex-column border-box">
			<view class="white">
				<view class="b">情商测试</view>
				<view class="f7 fw5 lh-16 mt2">EQ TEST</view>
			</view>
			<view class="font-11 mt-auto color-ff4c89 bg-ffe0eb width-fit x-question-num lh-17 pl-12 pr-12">60题</view>
		</view>
		<!--  -->
		<image class="x-rec-title mt-33" src="https://res.vkunshan.com/depressed/iq/title.png"></image>
		<!--  -->
		<view class="mt-23">
			<view @click="callfn(item.fn)" class="bg-white x-list-item mb-12 pt-12 pb-13 pl-12 pr-12 flex" v-for="(item,index) in list" :key="index">
				<image :src="item.img" class="x-list-item__cover flex-shrink-0"></image>
				<view class="ml-13 flex w-100 flex-column">
					<view class="flex items-center">
						<view class="color-262939 font-13 lh-19">{{item.title}}</view>
						<view class="ml-auto  color-55565b f7 lh-13">
							<image class="icon-star v-mid" src="https://res.vkunshan.com/depressed/iq/stat.png" />
							4.7
						</view>
					</view>
					<view class="color-9c9ea7 font-10">
						<image class="x-list-avatar v-mid mr1" :src="item.avatar"></image>
						{{item.username}}
					</view>
					<view class="font-11 lh-15 color-7a7c84 mt2">{{item.desc}}</view>
					<view class="font-10 color-1ccaff mt-auto flex items-center">
						<view class="x-blue-tag x-people-icon lh-13  pr1 width-fit">{{item.tag}}</view>
						<view class="x-blue-tag ml-6 lh-13 pl1 pr1 width-fit bg-d1f1ff">{{item.tag}}</view>
					</view>
				</view>
			</view>
		</view>
		<!--  -->
		<!--  -->
		<view @click="goOrderQuery" class="white fw5 mt-20 lh-17 center font-10 x-order-btn width-fit pl-12 pr-12 mb2">报告丢失 点击此处找回</view>
		<!--  -->
		<view class="font-11 fw4 color-cedef3 lh-18 tc">本测评可免费作答 测评结果需付费查看，测评为虚拟商品服务 购买后概不退费，敬请谅解</view>
		<!--  -->
		<!--  -->
		<xTabBar theme="iq" />
	</view>
</template>

<script setup>
	import { fetchTopic, fetchAnswerList } from '@/api/api.js'
	import { ref, onMounted } from 'vue'
	import { statusBarHeight } from '@/common/lib.js'
	const topic = ref([])
	const list = [{
			img: 'https://res.vkunshan.com/depressed/iq/avatar1.png',
			title: '抑郁测试',
			star: '4.7',
			tag: '智商情商',
			desc: '你啦啦啦啦？',
			people: '22827人已测',
			username: 'Depression test',
			avatar: 'https://res.vkunshan.com/depressed/iq/list-avatar.png',
			fn() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			}
		},
		{
			img: 'https://res.vkunshan.com/depressed/iq/avatar2.png',
			title: '智商/情商测试',
			star: '4.7',
			tag: '智商情商',
			desc: '你啦啦啦啦？',
			people: '22827人已测',
			username: 'Depression test',
			avatar: 'https://res.vkunshan.com/depressed/iq/list-avatar.png',
		},
		{
			img: 'https://res.vkunshan.com/depressed/iq/avatar3.png',
			title: '九型人格测试',
			star: '4.7',
			tag: '智商情商',
			desc: '你啦啦啦啦？',
			people: '22827人已测',
			username: 'Depression test',
			avatar: 'https://res.vkunshan.com/depressed/iq/list-avatar.png',
		},
		{
			img: 'https://res.vkunshan.com/depressed/iq/avatar4.png',
			title: 'MBTI恋爱测试',
			star: '4.7',
			tag: '智商情商',
			desc: '你啦啦啦啦？',
			people: '22827人已测',
			username: 'Depression test',
			avatar: 'https://res.vkunshan.com/depressed/iq/list-avatar.png',
		}
	]
	const goOrderQuery = () => {
		uni.navigateTo({
			url: '/pages/order/index'
		})
	}
	onMounted(() => {
		fetchTopic(6).then(({ data }) => {
			topic.value = data
		})
	})
	const goTest = (id) => {
		uni.navigateTo({
			url: `/pages/answer/index?id=${id}`
		})
	}
	const callfn = (fn) => {
		fn()
	}
</script>

<style lang="scss" scoped>
	.x-bg {
		background: url(https://res.vkunshan.com/depressed/iq/bg.png) 0 0 / 100% 256px no-repeat #F4F6FC;		
		/* #ifndef APP-PLUS */
		padding-top: 30px;
		/* #endif */
		/* #ifdef APP-PLUS || MP-WEIXIN */
		padding-top: 60px;
		/* #endif */
	}

	.x-blue-iq {
		background: url(https://res.vkunshan.com/depressed/iq/blue-bg.png) 0 0 / 100% no-repeat;
		height: 112px;
		padding: 23px 0 17px 25px;
	}

	.x-blue-eq {
		background: url(https://res.vkunshan.com/depressed/iq/red-bg.png) 0 0 / 100% no-repeat;
	}

	.x-question-num {
		border-radius: 4px;
	}

	.x-list-item {
		border-radius: 12px;
	}

	.x-list-item__cover {
		width: 89px;
		height: 89px;
	}

	.x-rec-title {
		width: 85px;
		height: 25px;
	}

	.x-list-avatar {
		width: 18px;
		height: 18px;
	}

	.x-blue-tag {
		border-radius: 7px;
	}

	.x-people-icon {
		background: url("data:image/svg+xml,%3Csvg width='6.8' height='8.1' viewBox='0 0 6.8 8.1' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='translate(.4)' stroke='%231CCAFF' stroke-width='.8' fill='none' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='2.5' r='2.1'/%3E%3Cpath d='M6 7.7a3 3 0 1 0-6 0' stroke-linecap='round'/%3E%3C/g%3E%3C/svg%3E") left 5px center / 7px 9px no-repeat #d1f1ff;
		padding-left: 16px;
	}

	.icon-star {
		width: 14px;
		height: 14px;
	}

	.x-order-btn {
		background: rgba(207, 231, 255, 1);
		border-radius: 14px;
	}
</style>