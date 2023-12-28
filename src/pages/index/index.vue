<template>
	<view class="x-bg min-vh-100 pl3 pr3 pt-58 pb-50">
		<view class="flex justify-between">
			<view>
				<view class="font-18 color-414141 lh-25 b">Hi，今天又是美好的一天</view>
				<view class="color-414141 font-11 lh-16">放下抑郁焦虑吧，愿您在这里找到自我</view>
			</view>
			<image class="icon-emoji" src="https://res.vkunshan.com/depressed/index/emoji.png"></image>
		</view>
		<swiper class="x-header-swiper mt-20" circular autoplay>
			<swiper-item v-for="(item,index) in mock" :key="index" class="x-header-swiper-item f7 flex items-center white fw4 lh-20 regular">
				<view class="pl3 pr3" v-text="item" />
			</swiper-item>
		</swiper>
		<!--  -->
		<view class="flex mb-28 mt-22 x-grid justify-between">
			<view @click="goTest(detail[0].id)" class="x-grid-left pt3 pl3 pb-14  border-box flex flex-column relative">
				<view class="absolute x-grid-rec lh-18 font-11 white fw5 tc">热门推荐</view>
				<view class="color-22396b f6 lh-17 b">
					<view>焦虑与抑郁自评</view>
					<view>
						（SCL-90）
					</view>
				</view>
				<view class="white width-fit version font-10 lh-16  mt-10">专业版</view>
				<view class="color-2e72f5 bg-e5f2ff x-grid-num flex place-center font-11 mt-auto lh-16 fw5">90题</view>
			</view>
			<view class="x-grid-right flex flex-column h-100">
				<view @click="goTest(detail[1].id)" class="x-grid-right-top  pt3 pl3 pb-14  border-box flex flex-column  w-100">
					<view class="color-22396b f6 lh-17 b">
						<view>抑郁风险自测</view>
						<view>（SDS）</view>
					</view>
					<view class="white width-fit version font-10 lh-16  mt2">标准版</view>
					<view class="tr">
						<view class="x-grid-num inline-flex place-center font-10 lh-16 fw5">20题</view>
					</view>
				</view>
				<view @click="goTest(detail[2].id)" class="x-grid-right-bottom pt3 pl3 pb-14  border-box flex flex-column mt-auto w-100">
					<view class="color-22396b f6 lh-17 b">
						<view>抑郁程度测试</view>
						<view>（SDS）</view>
					</view>
					<view class="white width-fit version font-10 lh-16  mt2">专业版</view>
					<view class="tr">
						<view class="x-grid-num inline-flex place-center font-10 lh-16 fw5">50题</view>
					</view>
				</view>
			</view>
		</view>
		<!--  -->
		<view v-if="!comp_version">
			<view class="font-18 fw6 color-27282b"><text class="x-list-line v-mid mr1 dib" />推荐测评</view>
			<view class="mt-18 pb-38">
				<view @click="gombti" v-for="(item,index) in 1" :key="index" class="bg-white x-index-item pt-13 pb-13 pl3 pr3 flex items-center">
					<img src="https://res.vkunshan.com/depressed/index/logo.png" class="img-index-item db">
					<view>
						<view class="color-22396b f6 b lh-18">MBTI人格测试</view>
						<view class="font-11 fw4 color-aeb1b8">深入地了解自己的人格类型</view>
					</view>
					<view class="color-6fa7ff f7 ml-auto fw5 lh-25 pl-12 pr-12 btn-index-item bg-e5f2ff">进入测试</view>
				</view>
			</view>
		</view>
		<!--  -->
		<view>
			<view class="font-18 fw6 color-27282b"><text class="x-list-line v-mid mr1 dib" />看Ta们说</view>
			<view class="mt3 overflow-x-hidden x-comment relative">
				<view :class="{'x-comment-move':chatWidth}" class="absolute x-comment-item" :style="{'--width':chatWidth}">
					<view :style="[!index%2 ? '' :'margin-top:16px;margin-left:50px;']" class="x-bullet-chat flex items-center" v-for="(item,index) in chat" :key="index">
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
		<loginDialog />
	</view>
</template>

<script setup>
	import { comment } from '@/pages/report/mock.js'
	import { fetchTopic, fetchAnswerList } from '@/api/api.js'
	import { onMounted, ref } from 'vue'
	import xpops from '@/pages/index/components/pops/pops.vue'
	import loginDialog from '@/pages/index/components/login/index.vue'
	import { compVersion } from '@/common/lib.js'
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
	const comp_version = ref(false)
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
		// #ifdef APP-PLUS
		compVersion().then(res => {
			comp_version.value = res
		})
		// #endif
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
		const query = uni.createSelectorQuery()
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
		const url = 'https://mbti.xinli10.com/#/?channel=yiyu'
		// #ifdef H5
		window.open(url)
		// #endif
		// #ifdef APP-PLUS
		plus.runtime.openURL(url);
		// #endif
	}
	const goTest = (id) => {
		uni.navigateTo({
			url: `/pages/answer/index?id=${id}`
		})
	}
</script>

<style lang="scss" scoped>
	.x-bg {
		background: url(https://res.vkunshan.com/depressed/index/bg.png) 0 0 / 100% 159px no-repeat #F6F9FF;
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
		background: url("https://res.vkunshan.com/depressed/index/v1/grid_left.png") bottom center / 100% 221px no-repeat;

		.version {
			background: linear-gradient(270deg, rgba(139, 178, 255, 0.6) 0%, rgba(90, 146, 255, 0.6) 100%);
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
			background: linear-gradient(270deg, rgba(172, 159, 255, 0.6) 0%, rgba(149, 137, 255, 0.6) 100%);
		}

		.x-grid-num {
			color: #9C8DFF;
		}
	}

	.x-grid-right-bottom {
		background: url("https://res.vkunshan.com/depressed/index/v1/grid_right_bottom.png") 0 0 / 100% 100% no-repeat;

		.version {
			background: linear-gradient(270deg, rgba(255, 167, 151, 0.6) 0%, rgba(255, 133, 90, 0.6) 100%);
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
		left: 100%;
		animation: 20s linear 0s move infinite;
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

	.icon-emoji {
		width: 47px;
		height: 39px;
	}

	.x-grid-rec {
		width: 60px;
		background: linear-gradient(270deg, #FF616C 0%, #FF959C 100%);
		border-radius: 11px 11px 11px 0px;
		top: -8px;
		right: -6px;
	}
</style>