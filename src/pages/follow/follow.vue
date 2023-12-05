<template>
	<view class="x-bg min-vh-100 border-box">
		<view class="x-follow-header  left-0 right-0 flex flex-column items-center justify-center">
			<view class="color-5d4dde font-35">“关注公众号”</view>
		</view>
		<view class="x-follow-container  flex">
			<view class="x-follow-dot-container flex-shrink-0 flex flex-column">
				<view class="x-follow-dot" v-for="(item,index) in 18" :key="index" />
			</view>
			<view class="pl-20 w-100 border-box">
				<view class="x-follow-section">
					<view class="lh-29 width-fit font-13">
						<view class="color-8a83ff bb">关注公众号，更多测试量表</view>
						<view class="color-8a83ff bb">还有机会赢取专属福利</view>
						<view class="color-8a83ff bb">
							<view class="color-ff5b66">截图保存下方二维码</view>
						</view>
					</view>
				</view>
				<!--  -->
				<view class="flex items-center justify-center mt-25">
					<image class="img-enfj" src="https://res.vkunshan.com/static/report/redpack/folllow-enfj.png" />
					<view>
						<view class="color-8576ff font-18 lh-25">公众号名称：</view>
						<view class="font-23 pl-30 color-8576ff b">小熊心理测试</view>
					</view>
				</view>
				<!--  -->
				<view class="relative z-1 x-follow-bottom">
					<view class="x-bottom-trapezoid border-box" />
					<view class="x-bottom-mp-bg relative pa1">
						<view class="x-bottom-content">
							<view @click="copy" class="x-bottom-title  b heavy width-fit center f7 pl-10 pr-10 grid place-center">点击复制公众号名称</view>
							<!--  -->
							<view class="x-bottom-qrcode tc">
								<image class="w-100 h-100" src="https://res.vkunshan.com/static/report/qrcode.jpg" />
							</view>
							<!--  -->
							<view @click="back" class="center width-fit mt3 lh-29 btn-back white">返回支付</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	const back = () => uni.navigateBack()
	const copy = () => {
		uni.setClipboardData({
			data: '小熊心理测试',
			success() {
				uni.showToast({
					title: '复制成功',
					icon: 'none',
					position: 'bottom',
					mask: true
				})
			}
		});
	}
</script>

<style lang="scss" scoped>
	.x-follow-padding {
		margin-bottom: 45px;
	}

	.x-bg {
		--url: url("data:image/svg+xml,%3Csvg width='337' height='91' viewBox='0 0 337 91' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath fill='%23958BE0' d='M0 2l337 12.576v75.518H0z'/%3E%3Cpath fill='%23C2B2E6' d='M0 24.148L337 0l-23.802 79.95L0 62.489z'/%3E%3C/g%3E%3C/svg%3E");
		background: url(https://res.vkunshan.com/static/report/redpack/follow_bg_ip.png) top right / 59px 100px no-repeat,
			url(https://res.vkunshan.com/static/report/redpack/follow_h1.png) left top 10% / 100% auto no-repeat,
			url(https://res.vkunshan.com/static/report/redpack/follow-grid-bg.png?v=2) center bottom 20px / calc(100% - 40px) calc(100% - 70px) no-repeat,
			var(--url) center top 4% / calc(100% - 40px) auto no-repeat,
			linear-gradient(240deg, #BFB7FF 0%, #A7C0FF 100%) left top / 100% 100%;
	}

	.x-follow-container {
		padding: 20px 36px 0 33px;
	}

	.x-follow-header {
		height: 13vh;
		padding-top: 9vh;
	}

	.x-follow-dot {
		--url: url("data:image/svg+xml,%3Csvg width='102' height='102' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse ry='49.5' rx='49.5' cy='51' cx='51' fill='url(%23svg_3)'/%3E%3Cdefs%3E%3ClinearGradient x2='1' y1='.009' x1='.008' id='svg_3'%3E%3Cstop offset='0' stop-color='%23BFB7FF'/%3E%3Cstop offset='1' stop-color='%23A7C0FF'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E");
		width: 9px;
		height: 9px;
		background: var(--url) left top / 100% 100% no-repeat;
	}

	.x-follow-dot-container {
		row-gap: 20px;
	}

	.x-follow-section {
		background: url(https://res.vkunshan.com/static/report/redpack/follow-intj.png) top right / 85px 100% no-repeat;
	}

	.img-enfj {
		width: 89px;
		height: 91px;
	}

	.x-bottom-mp-bg {
		border: solid 2px var(--color-5d4dde);
	}

	.x-bottom-trapezoid {
		width: 100%;
		height: 0;
		border-left: 40px solid transparent;
		border-right: 40px solid transparent;
		border-bottom: 25px solid var(--color-beB7ff);
	}

	.x-bottom-content {
		border: 1px dashed var(--color-9891eb);
		padding: 10px 0;
	}

	.x-bottom-title {
		background: #D9D5FF;
		border-radius: 2px;
		height: 24px;
		color: var(--color-8576ff);
	}

	.x-bottom-qrcode {
		border: solid 3px var(--color-afa5ff);
		width: 112px;
		height: 112px;
		margin: 13px auto 14px auto;
	}

	.x-bottom-arrow {
		width: 0;
		border-left: 6px solid transparent;
		border-right: 6px solid transparent;
		border-bottom: 6px solid var(--color-9B91fe);
	}

	.x-bottom-save {
		background: var(--color-9B91fe);
		border-radius: 2px;
		height: 25px;
	}

	.btn-back {
		background: linear-gradient(to left, #9D91FE, #6F97FA);
		padding: 5px 66px;
		border-radius: 30px;
	}

	.x-follow-bottom {
		margin-top: -14px;
	}
</style>