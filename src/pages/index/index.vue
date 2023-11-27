<template>
	<view class="x-bg min-vh-100 pl3 pr3 pt-58 pb-30">
		<view class="font-18 white lh-25 b">抑郁症测试</view>
		<view class="white font-11 lh-16">放下抑郁焦虑吧，愿您在这里找到自我</view>
		<!--  -->
		<view class="flex mt-22 x-grid justify-between">
			<view class="x-grid-left pt-12 pl-14 pb-14  border-box flex flex-column">
				<view class="color-22396b f6 lh-17 b">
					<view>SCL-90</view>
					<view>
						<view class="dib">焦虑与抑郁</view>
						<view class="icon-arrow dib v-mid ml-12"></view>
					</view>
				</view>
				<view class="color-c9d0d6 font-10 lh-14 mt1">10909人测过</view>
				<view class="color-2e72f5 bg-e5f2ff x-grid-num flex place-center font-11 mt-auto lh-16 fw5">90题</view>
			</view>
			<view class="x-grid-right flex flex-column h-100">
				<view class="x-grid-right-top  pt-12 pl-12 pb-14  border-box flex flex-column  w-100">
					<view class="color-22396b f6 lh-17 b">
						<view>SDS-抑郁</view>
						<view>
							<view class="dib">症自测量表</view>
							<view class="icon-arrow dib v-mid ml-12"></view>
						</view>
					</view>
					<view class="color-c9d0d6 font-10 lh-14 mt1">10909人测过</view>
					<view class="color-2e72f5 bg-e5f2ff x-grid-num flex place-center font-11 mt-auto lh-16 fw5">90题</view>
				</view>
				<view class="x-grid-right-bottom pt-12 pl-12 pb-14  border-box flex flex-column mt-auto w-100">
					<view class="color-22396b f6 lh-17 b">
						<view>PDQ-4人</view>
						<view>
							<view class="dib">格障碍测试</view>
							<view class="icon-arrow dib v-mid ml-12"></view>
						</view>
					</view>
					<view class="color-c9d0d6 font-10 lh-14 mt1">10909人测过</view>
					<view class="color-2e72f5 bg-e5f2ff x-grid-num flex place-center font-11 mt-auto lh-16 fw5">90题</view>
				</view>
			</view>
		</view>
		<!--  -->
		<view class="mt-28">
			<view class="font-18 fw6 color-27282b">推荐测评</view>
			<view class="mt-18 pb-38">
				<view v-for="(item,index) in 4" :key="index" class="bg-white x-index-item pt-13 pb-13 pl3 pr3 flex items-center">
					<img src="https://res.vkunshan.com/depressed/index/logo.png" class="img-index-item db">
					<view>
						<view class="color-22396b f6 fw5 lh-18">MBTI测试</view>
						<view class="font-11 fw4 color-aeb1b8">深入地了解自己的人格类型</view>
					</view>
					<view class="color-6fa7ff f7 ml-auto fw5 lh-22 pl-13 pr-13 btn-index-item bg-e5f2ff">跳转</view>
				</view>
			</view>
		</view>
		<!--  -->
		<view @click="goOrderQuery" class="white fw5 lh-17 center font-10 x-order-btn width-fit pl-12 pr-12 mb2">报告丢失 点击此处找回</view>
		<!--  -->
		<view class="font-11 fw4 color-cedef3 lh-18 tc">本测评可免费作答 测评结果需付费查看，测评为虚拟商品服务 购买后概不退费，敬请谅解</view>
		<!--  -->
		<xTabBar />
	</view>
</template>

<script setup>
	const goOrderQuery = () => {
		uni.navigateTo({
			url: '/pages/order/index'
		})
	}
</script>

<style lang="scss" scoped>
	.x-bg {
		background: url(https://res.vkunshan.com/depressed/report/emoji.png) top 58px right 26px / 47px 39px no-repeat,
			linear-gradient(180deg, rgba(246, 249, 255, 0) 0%, rgba(245, 249, 255, 0.3) 29%, rgba(246, 249, 255, 0.62) 58%, #F6F9FF 100%) top 248px left 0 / 100% 251px no-repeat,
			linear-gradient(136deg, #8EC8FF 0%, #6F9FFA 41%, #709FF9 66%, #A4C3FF 100%) 0 0 / 100% 499px no-repeat #F6F9FF;
	}

	.x-grid {
		height: 221px;
	}

	.x-grid-left,
	.x-grid-right {
		width: calc(50% - 5px);
	}

	.x-grid-left {
		background: url("https://res.vkunshan.com/depressed/index/grid_left.png") 0 0 / 100% 100% no-repeat;
	}

	.x-grid-right-top {
		background: url("https://res.vkunshan.com/depressed/index/grid_right_top.png") 0 0 / 100% 100% no-repeat;
	}

	.x-grid-right-bottom {
		background: url("https://res.vkunshan.com/depressed/index/grid_right_bottom.png") 0 0 / 100% 100% no-repeat;
	}

	.x-grid-right-top,
	.x-grid-right-bottom {
		height: calc(50% - 5px);
	}

	.icon-arrow {
		background: url("data:image/svg+xml,%3Csvg width='15' height='15' viewBox='0 0 15 15' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Ccircle fill='%23C2D7FF' cx='7.5' cy='7.5' r='7.5'/%3E%3Cpath stroke='%23FFF' stroke-linecap='round' stroke-linejoin='round' d='M6 4.5l3 3-3 3'/%3E%3C/g%3E%3C/svg%3E") no-repeat;
		width: 15px;
		height: 16px;
	}

	.x-grid-num {
		width: 43px;
		height: 16px;
		border-radius: 8px;
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
</style>