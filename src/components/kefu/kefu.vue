<template>
	<view>
		<uni-popup ref="pop" class="popup" type="center">
			<view class="dialog-container">
				<image class="db img-kefu-bg w-100" src="https://res.vkunshan.com/slide/kefu-top.png" />
				<view class="dialog-content bg-white">
					<view class="flex items-center mb3 kefu-dialog__item">
						<image class="icon" webp mode="widthFix" src="https://res.vkunshan.com/slide/kefu01.png">
						</image>
						<view class="ml2">
							<view class="f7 color-9d9da9 fw4 regular">公众号</view>
							<view class="f6 mt1 fw6 semibold color-151519">{{config.mp}}</view>
						</view>
						<view @click="copy(config.mp)" class="f7 ml-auto fw4 color-9a8dff regular">复制</view>
					</view>
					<view class="flex items-center kefu-dialog__item">
						<image class="icon" webp mode="widthFix" src="https://res.vkunshan.com/slide/kefu02.png"></image>
						<view class="ml2">
							<view class="f7 color-9d9da9 fw4 regular">客服微信</view>
							<view class="f7 mt1 fw6 semibold color-151519">{{config.wechat}}</view>
						</view>
						<view @click="copy(config.wechat)" class="f7 ml-auto fw4 color-9a8dff regular">复制</view>
					</view>
					<view @click="close()" class="grid place-center center mt-14  font-15 fw5 medium  white dialog-bottom">
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
		padding: 21px 27px 8px 27px;
	}

	.dialog-bottom {
		--url: url("data:image/svg+xml,%3Csvg width='192' height='55' viewBox='0 0 192 55' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cdefs%3E%3ClinearGradient x1='-5.619%25' y1='46.474%25' y2='52.696%25' id='c'%3E%3Cstop stop-color='%23BFB5FF' offset='0%25'/%3E%3Cstop stop-color='%239386FF' offset='100%25'/%3E%3Cstop stop-color='%239D91FE' offset='100%25'/%3E%3C/linearGradient%3E%3Crect id='b' x='102' y='481' width='172' height='35' rx='17.5'/%3E%3Cfilter x='-8.1%25' y='-40%25' width='118.6%25' height='191.4%25' filterUnits='objectBoundingBox' id='a'%3E%3CfeOffset dx='2' dy='2' in='SourceAlpha' result='shadowOffsetOuter1'/%3E%3CfeGaussianBlur stdDeviation='5' in='shadowOffsetOuter1' result='shadowBlurOuter1'/%3E%3CfeColorMatrix values='0 0 0 0 0.364180737 0 0 0 0 0.345180482 0 0 0 0 0.503028759 0 0 0 0.278299825 0' in='shadowBlurOuter1'/%3E%3C/filter%3E%3C/defs%3E%3Cg transform='translate(-94 -473)' fill='none' fill-rule='evenodd'%3E%3Cuse fill='%23000' filter='url(%23a)' xlink:href='%23b'/%3E%3Cuse fill='url(%23c)' xlink:href='%23b'/%3E%3C/g%3E%3C/svg%3E");
		background: var(--url) left top / 100% no-repeat;
		width: 192px;
		height: 55px;
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