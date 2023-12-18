<template>
	<div class="x-bg min-h-100">
		<div class="relative">
			<img src="https://res.vkunshan.com/depressed/follow/body-bg.png?v=3" class="x-body-img db center">
			<div class="x-copy absolute tc w-100">
				<span @click="copy" class="x-copy-content bg-e4edff f6 lh-20   color-5d94ff">点击复制公众号名称</span>
			</div>
		</div>
		<div class="tc color-c3c3c3 f7 lh-17 mt-26">截图二维码或复制公众号名称，进入微信公众号</div>
		<div class="pl-20 pr-20 mt-34 flex justify-between pb-30">
			<span @click="goHome" class="bg-e9e9e9 tc dib  f6 fw5 color-747474 btn">返回首页</span>
			<span @click="back" class="btn-back bg-e9e9e9 tc dib  f6 fw5 white btn">返回支付</span>
		</div>
	</div>
</template>

<script setup>
	const back = () => uni.navigateBack()
	const goHome = () => uni.switchTab({
		url: '/pages/index/index'
	})
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
	.x-bg {
		background: url(https://res.vkunshan.com/depressed/follow/follow-bg.png) 0 0 /100% auto no-repeat #F7F8F9;
		padding-top: 29%;
	}

	.x-body-img {
		width: 335px;
		height: 392px;
	}

	.x-copy {
		top: 223px;
	}

	.x-copy-content {
		border-radius: 2px;
		padding: 0 6px;
	}

	.btn {
		border-radius: 20px;
		padding: 10px 53px;
	}

	.btn-back {
		background: linear-gradient(270deg, #8BB2FF 0%, #5A92FF 100%);
	}
</style>