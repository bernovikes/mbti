<template>
	<view class="w-80 center mb-50">
		<view class="x-bottom-trapezoid border-box" />
		<view class="x-bottom-mp-bg relative pa1">
			<view class="x-bottom-content">
				<view class="x-bottom-title color-6e9fff lh-17 width-fit center f7 pl-10 pr-10 grid place-center">微信搜索【小熊心理测试】公众号了解更多</view>
				<view @click="copy" class="color-6e9fff f7 bg-d4e2ff pl-12 pr-12 tc width-fit lh-17 center mt-13 ">点击复制公众号名称</view>
				<!--  -->
				<view class="x-bottom-qrcode tc">
					<image class="w-100 h-100" src="https://res.vkunshan.com/static/report/qrcode.jpg" />
				</view>
				<!--  -->
				<view class="x-bottom-arrow mt-14 center" />
				<view class="f7  width-fit center  white x-bottom-save x-page-container grid place-center">截图保存二维码，识别上方二维码</view>
				<view class="f7  mt-9 color-a6aaaf tc lh-18">关注公众号回复“客服”即可联系我们</view>
			</view>
		</view>
	</view>
</template>
<script setup>
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
<style scoped lang="scss">
	.x-bottom-mp-bg {
		border: solid 2px #6E9FFF;
	}

	.x-bottom-trapezoid {
		width: 100%;
		height: 0;
		border-left: 40px solid transparent;
		border-right: 40px solid transparent;
		border-bottom: 25px solid #6E9FFF;
	}

	.x-bottom-content {
		border: 1px dashed #6E9FFF;
		padding: 28px 0;
	}

	.x-bottom-title {
		border-radius: 2px;		
	}

	.x-bottom-qrcode {
		border: solid 3px #70A1FF;
		width: 112px;
		height: 112px;
		margin: 13px auto 14px auto;
	}

	.x-bottom-arrow {
		width: 0;
		border-left: 6px solid transparent;
		border-right: 6px solid transparent;
		border-bottom: 6px solid rgba(110, 159, 255, 1);
	}

	.x-bottom-save {
		background: linear-gradient(to left, rgba(110, 160, 255, 1), rgba(109, 159, 255, 0.77), rgba(110, 159, 255, 1));
		border-radius: 2px;
		height: 25px;
	}
</style>