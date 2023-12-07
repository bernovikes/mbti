<template>
	<view>
		<uni-popup ref="pop" class="popup" type="center">
			<view class="dialog-container">
				<image class="db img-kefu-bg w-100" src="https://res.vkunshan.com/depressed/kefu/kefu-top.png" />
				<view class="dialog-content bg-white">
					<view class="flex items-center mb3  kefu-dialog__item">
						<image class="icon" webp mode="widthFix" src="https://res.vkunshan.com/depressed/kefu/kefu01.png"></image>
						<view class="ml2">
							<view class="f7 color-9d9da9 fw4">客服微信号</view>
							<view class="f7 mt1 fw6 semibold color-151519">{{config.wechat}}</view>
						</view>
						<view @click="copy(config.wechat)" class="f7 ml-auto fw4 color-5b92ff">复制</view>
					</view>
					<view class="flex items-center  kefu-dialog__item">
						<image class="icon" webp mode="widthFix" src="https://res.vkunshan.com/depressed/kefu/kefu02.png">
						</image>
						<view class="ml2">
							<view class="f7 color-9d9da9 fw4">公众号</view>
							<view class="f6 mt1 fw6 semibold color-151519">{{config.mp}}</view>
						</view>
						<view @click="copy(config.mp)" class="f7 ml-auto fw4 color-5b92ff">复制</view>
					</view>

					<view @click="close()" class="grid place-center  center mt-22  font-15 fw5 medium  white dialog-bottom">
						关闭</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import { kefuConfig } from '@/api/json/config.js'
	import { ref, onMounted } from 'vue'
	const pop = ref('')
	const config = ref('')
	const open = () => pop.value.open()
	const close = () => pop.value.close()
	defineExpose({
		open,
		close
	})
	const copy = (content) => {
		uni.setClipboardData({
			data: content,
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
	onMounted(async () => {
		try {
			const res = await kefuConfig()
			config.value = res.h5
		} catch (e) {
			//TODO handle the exception
		}
	})
</script>

<style lang="scss" scoped>
	.dialog-container {
		border-radius: 13px;
		width: 80vw;
		max-width: 312px;
	}

	.dialog-content {
		border-radius: 0 0 16px 16px;
		padding: 21px 27px 20px 27px;
	}

	.dialog-bottom {
		background: linear-gradient(to left, #5790FF, #73A2FF, #8EB4FF);
		width: 172px;
		height: 35px;
		border-radius: 18px;
	}

	.icon {
		width: 43px;
		height: 43px;
	}

	.kefu-dialog__item {
		border: 1px solid rgba(0, 0, 0, .1);
		border-radius: 4px;
		padding: 8px 14px;
	}

	.img-kefu-bg {
		height: 127px;
	}
</style>