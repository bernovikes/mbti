<template>
	<view class="x-bg min-vh-100 pl3 pr3 pt-58 pb-50">
		<view class="font-18 color-414141 lh-25 b">抑郁测试</view>
		<view class="color-414141 font-11 lh-16">放下抑郁焦虑吧，愿您在这里找到自我</view>
		<swiper class="x-header-swiper mt-20" circular autoplay>
			<swiper-item v-for="(item,index) in mock" :key="index" class="x-header-swiper-item f7 flex items-center white fw4 lh-20 regular">
				<view class="pl3 pr3" v-text="item" />
			</swiper-item>
		</swiper>
		<!--  -->
		<view class="flex mt-22 x-grid justify-between">
			<view @click="goTest(detail[0].id)" class="x-grid-left pt-12 pl-14 pb-14  border-box flex flex-column">
				<view class="color-22396b f6 lh-17 b">
					<view>焦虑与抑郁症状</view>
					<view>
						自评量表（SCL-90）
					</view>
				</view>
				<view class="white width-fit version font-10 lh-16  mt-10">专业版</view>
				<view class="color-2e72f5 bg-e5f2ff x-grid-num flex place-center font-11 mt-auto lh-16 fw5">90题</view>
			</view>
			<view class="x-grid-right flex flex-column h-100">
				<view @click="goTest(detail[1].id)" class="x-grid-right-top  pt-12 pl-12 pb-14  border-box flex flex-column  w-100">
					<view class="color-22396b f6 lh-17 b">
						<view>抑郁风险自</view>												
						<view>测量表（SDS）</view>
					</view>
					<view class="white width-fit version font-10 lh-16  mt-10">标准版</view>
					<view class="tr mt-6">
						<view class="x-grid-num inline-flex place-center font-10 lh-16 fw5">20题</view>
					</view>
				</view>
				<view @click="goTest(detail[2].id)" class="x-grid-right-bottom pt-12 pl-12 pb-14  border-box flex flex-column mt-auto w-100">
					<view class="color-22396b f6 lh-17 b">
						<view>抑郁程度测</view>
						<view>试量表（SDS）</view>
					</view>
					<view class="white width-fit version font-10 lh-16  mt-10">专业版</view>
					<view class="tr mt-6">
						<view class="x-grid-num inline-flex place-center font-10 lh-16 fw5">60题</view>
					</view>
				</view>
			</view>
		</view>
		<!--  -->
		<view class="mt-28">
			<view class="font-18 fw6 color-27282b"><text class="x-list-line v-mid mr1 dib"/>推荐测评</view>
			<view class="mt-18 pb-38">
				<view @click="gombti" v-for="(item,index) in 1" :key="index" class="bg-white x-index-item pt-13 pb-13 pl3 pr3 flex items-center">
					<img src="https://res.vkunshan.com/depressed/index/logo.png" class="img-index-item db">
					<view>
						<view class="color-22396b f6 b lh-18">MBTI人格测试</view>
						<view class="font-11 fw4 color-aeb1b8">深入地了解自己的人格类型</view>
					</view>
					<view class="color-6fa7ff f7 ml-auto fw5 lh-22 pl-13 pr-13 btn-index-item bg-e5f2ff">进入测试</view>
				</view>
			</view>
		</view>
		<!--  -->
		<view>
			<view class="font-18 fw6 color-27282b"><text class="x-list-line v-mid mr1 dib"/>看Ta们说</view>
			<view class="mt3 overflow-x-hidden x-comment relative">
				<view :class="{'x-comment-move':chatWidth}" class="absolute x-comment-item" :style="{'--width':chatWidth}">
					<view :style="[!index%2 ? '' :'margin-top:16px;margin-left:50px;']" class="x-bullet-chat flex items-center" v-for="(item,index) in chat">
						<view class="x-bullet-chat-item pl3  mr3 pr3 pt2 pb2 f7 fw5 color-3e3f44 nowrap  bg-white width-fit flex items-center border-box" v-for="(citem,cindex) in item" :key="cindex">
							<image :src="citem.img" class="img-avatar flex-shrink-0 br-100 mr1" />
							{{citem.cp}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<!--  -->
		<view @click="goOrderQuery" class="white fw5 lh-17 center font-10 x-order-btn width-fit pl-12 pr-12 mb2">报告丢失 点击此处找回</view>
		<!--  -->
		<view class="font-11 fw4 color-cedef3 lh-18 tc">本测评可免费作答 测评结果需付费查看，测评为虚拟商品服务 购买后概不退费，敬请谅解</view>
		<!--  -->
		<xpops ref="unpaydialog">
			<view class="f7 fw4 lh-17">亲，您有测评报告未解锁，快去</view>
			<view class="f7 fw4 lh-17">查看你的专属报告吧！</view>
			<template v-slot:btn>
				<view @click="goUnpayOrder()" class="white font-13 fw5 cm-dialog-btn width-fit center">立即查看</view>
			</template>
		</xpops>
		<!--  -->
		<xTabBar />
	</view>
</template>

<script setup>
	import { comment } from '@/pages/report/mock.js'
	import { fetchTopic, fetchAnswerList } from '@/api/api.js'
	import { onMounted, ref } from 'vue'
	import xpops from '@/pages/index/components/pops/pops.vue'
	const mock = [
		'日日重复同样的事，遵循着与昨日相同的惯例；若能避开猛烈的欢喜，自然也不会有悲痛的来袭。',
		'山上吹来每一股气息都是如此洋溢着生命，仿佛无论谁吸进了它，即使是气息奄奄的人，也会复活起来。',
		'我是一个内向的人，就算一个人也能自处，我会走出户外，牵着我的狗狗们散步，感受树、天空和花朵。',
		'每个人都不是一座孤岛，一个人必须是这世界上最坚固的岛屿，然后才能成为大陆的一部分。',
		'你不愿意种花，你说，我不愿意看见它一点点凋落。是的，为了避免结束，你避免了一切开始。'
	]
	const detail = ref({})
	const unpaydialog = ref('')
	const chatWidth = ref('')
	let unpaid_no = ''
	const tempUser = uni.getStorageSync('tempUser') || '';
	const chat = [
		[],
		[]
	]
	comment.map((item, index) => chat[index % 2].push(item))
	const goOrderQuery = () => {
		uni.navigateTo({
			url: '/pages/order/index'
		})
	}
	onMounted(() => {
		fetchTopic(5).then(({ data }) => {
			detail.value = data
		})
		if (!uni.getStorageSync('idx_unpay_dialog') && tempUser) {
			fetchAnswerList({ tempUser }).then(({ data }) => {
				if (data.length) {
					const firstOrder = data[0]
					if (!firstOrder.order.length) {
						unpaydialog.value.open()
						unpaid_no = firstOrder.order_no
						uni.setStorageSync('idx_unpay_dialog', true)
					}
				}
			})
		}
		// 
		const query = uni.createSelectorQuery().in(this)
		query.select('.x-comment-item').boundingClientRect(({ width }) => {
			if (width) {
				chatWidth.value = `-${width}px`
			}
		}).exec()
	})
	const goUnpayOrder = () => {
		uni.navigateTo({
			url: `/pages/report/index?no=${unpaid_no}`
		})
		unpaydialog.value.close()
	}
	const gombti = () => {
		window.open('https://mbti.xinli10.com/#/?channel=yiyu')
	}
	const goTest = (id) => {
		uni.navigateTo({
			url: `/pages/answer/index?id=${id}`
		})
	}
</script>

<style lang="scss" scoped>
	.x-bg {
		--svg: url("data:image/svg+xml,%3Csvg width='375' height='159' viewBox='0 0 375 159' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cdefs%3E%3ClinearGradient x1='2.009%25' y1='41.011%25' y2='58.989%25' id='b'%3E%3Cstop stop-color='%238EC8FF' offset='0%25'/%3E%3Cstop stop-color='%236F9FFA' offset='40.729%25'/%3E%3Cstop stop-color='%23709FF9' offset='65.979%25'/%3E%3Cstop stop-color='%23A4C3FF' offset='100%25'/%3E%3C/linearGradient%3E%3Cpath id='a' d='M0 0h375v159H0z'/%3E%3ClinearGradient x1='50%25' y1='0%25' x2='50%25' y2='100%25' id='d'%3E%3Cstop stop-color='%23F6F9FF' stop-opacity='0' offset='0%25'/%3E%3Cstop stop-color='%23F5F9FF' stop-opacity='.296' offset='28.794%25'/%3E%3Cstop stop-color='%23F6F9FF' stop-opacity='.622' offset='58.487%25'/%3E%3Cstop stop-color='%23F6F9FF' offset='100%25'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='none' fill-rule='evenodd' opacity='.2'%3E%3Cmask id='c' fill='%23fff'%3E%3Cuse xlink:href='%23a'/%3E%3C/mask%3E%3Cuse fill='url(%23b)' xlink:href='%23a'/%3E%3Ccircle stroke-opacity='.373' stroke='%23FFF' fill-opacity='.073' fill='%23FFF' opacity='.78' mask='url(%23c)' cx='45.5' cy='-21.5' r='85'/%3E%3Ccircle stroke-opacity='.373' stroke='%23FFF' fill-opacity='.073' fill='%23FFF' opacity='.6' mask='url(%23c)' cx='351' cy='-21' r='70.5'/%3E%3Cpath fill='url(%23d)' d='M0 79h375v80H0z'/%3E%3C/g%3E%3C/svg%3E");
		background: var(--svg) 0 0 / 100% 159px no-repeat #F6F9FF;
	}

	.x-grid {
		height: 221px;
	}

	.x-grid-left,
	.x-grid-right {
		width: calc(50% - 5px);
	}

	.x-grid .version {
		border-radius: 9px;
		padding: 0 9px;
	}

	.x-grid-left {
		background: url("https://res.vkunshan.com/depressed/index/v1/grid_left.png") bottom center / 167px 221px no-repeat;

		.version {
			background: linear-gradient(270deg, #8BB2FF 0%, #5A92FF 100%);
		}

		.x-grid-num {
			width: 40px;
			height: 15px;
			background: rgba(255, 255, 255, .6);
			border-radius: 8px;
		}
	}

	.x-grid-right-top {
		background: url("https://res.vkunshan.com/depressed/index/v1/grid_right_top.png") 0 0 / 100% 100% no-repeat;

		.version {
			background: linear-gradient(270deg, #AC9FFF 0%, #9589FF 100%);
		}

		.x-grid-num {
			color: #9C8DFF;
		}
	}

	.x-grid-right-bottom {
		background: url("https://res.vkunshan.com/depressed/index/v1/grid_right_bottom.png") 0 0 / 100% 100% no-repeat;

		.version {
			background: linear-gradient(270deg, #FFA797 0%, #FF855A 100%);
		}

		.x-grid-num {
			color: #FF885F;
		}
	}

	.x-grid-right-top,
	.x-grid-right-bottom {
		height: calc(50% - 5px);
	}

	.x-grid-num {
		width: 38px;
		height: 14px;
		border-radius: 8px 0px 0px 8px;
		background: rgba(255, 255, 255, .7);
	}

	.x-order-btn {
		background: rgba(157, 205, 255, .9);
		border-radius: 15px;
	}

	.img-index-item {
		width: 54px;
		height: 54px;
	}

	.x-index-item {
		box-shadow: 3px 3px 5px 0px rgba(7, 40, 104, 0.06);
		border-radius: 8px;
	}

	.x-index-item:not(:last-child) {
		margin-bottom: 12px;
	}

	.btn-index-item {
		border-radius: 12px;
	}

	.cm-dialog-btn {
		background: linear-gradient(247deg, #7FBFFE 0%, #9D91FE 100%);
		box-shadow: 0 2px 7px 0 rgba(100, 100, 197, 0.13);
		border-radius: 14px;
		padding: 5px 44px;
	}

	.img-avatar {
		width: 14px;
		height: 14px;
	}

	.x-bullet-chat-item {
		box-shadow: 0 2px 8px 0px rgba(173, 177, 186, 0.16);
		border-radius: 20px;
	}

	.x-comment {
		height: 130px;
	}

	@keyframes move {
		to {
			transform: translateX(var(--width));
		}
	}

	.x-comment-move {
		left: 95vw;
		animation: 13s linear 0s move infinite;
	}

	.x-header-swiper {
		height: 67px;
		border-radius: 9px;
		background: linear-gradient(348deg, #6FA7FF 0%, #B1CFFF 100%);
	}

	.x-list-line {
		width: 4px;
		height: 15px;
		background: linear-gradient(360deg, #8BB2FF 0%, #5A92FF 100%);
		border-radius: 2px;
	}
</style>