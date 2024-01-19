<template>
	<view class="fixed top-0 x-bg left-0 w-100 z-9999 h-100" v-if="show" :style="{'padding-top':statusBarHeight()}">
		<view class="pt-24 pl-20 mb-26">
			<view @click.stop="close" class="x-left-arrow" />
		</view>
		<view>
			<view class="pl-22 pr-22">
				<view @click.stop="empty" class="bg-white pl-10 pr-10 pt-10 x-body">
					<view class="relative">
						<view class="x-poster-illustration w-100 center"></view>
						<!-- <image mode="widthFix" class="db w-100 center" src="https://res.vkunshan.com/depressed/report/poster/bg.png"></image> -->
						<view class="f7 absolute x-date-text fw4 white lh-17">{{date}}</view>
					</view>
					<view class="flex items-center">
						<view class="x-logo"></view>
						<!-- <image class="x-logo" src="https://res.vkunshan.com/depressed/report/poster/logo.png" /> -->
						<view class="font-11 lh-18 color-656565">
							<view>关注公众号<text class="color-2b2b2b b">@小熊心理测试</text></view>
							<view>获取官方最新测试</view>
						</view>
						<view class="icon-arrow ml2" />
						<view class="ml-auto" v-if="qrcodeId">
							<uQRCode :id="qrcodeId" ref="uqrcode" :text="qrcode" :size="56"></uQRCode>
						</view>
					</view>
				</view>
			</view>
			<view class="tc white font-13 fw5 lh-21 mt-32">长按或者截屏保存测试分享卡片</view>
		</view>
	</view>
</template>

<script setup>
	import uQRCode from '@/components/uqrcode/uqrcode.vue'
	import { statusBarHeight } from '@/common/lib.js'
	import { ref, inject, computed, nextTick } from 'vue'
	const show = ref(false)
	const detail = inject('detail')
	const domain = import.meta.env.VITE_DOMAIN
	const qrcode = computed(() => `${domain}?channel=fenxiang`)
	const uqrcode = ref('')
	const qrcodeId = ref('')
	const date = computed(() => detail.value.created_date)
	const close = () => {
		show.value = false
		qrcodeId.value = ''
	}
	const empty = () => {}
	const open = () => {
		show.value = true
		nextTick(() => {
			setTimeout(() => {
				qrcodeId.value = `${+new Date}_postre`
			}, 50)
		})
	}
	defineExpose({
		open
	})
</script>

<style lang="scss" scoped>
	.x-bg {
		background: url(https://res.vkunshan.com/depressed/report/poster/cloud.png) top 16px right 11px / 172px 69px no-repeat, linear-gradient(44deg, #93B8FF 0%, #9CBEFF 52%, #B6CEFF 100%), linear-gradient(131deg, #98BBFF 0%, rgba(152, 205, 255, 0) 100%);
	}

	.x-body {
		border-radius: 12px
	}

	.x-logo {
		width: 71px;
		height: 71px;
		background: url("https://res.vkunshan.com/depressed/report/poster/logo.png");
	}

	.icon-arrow {
		background: url("data:image/svg+xml,%3Csvg width='4.8' height='8.8' viewBox='0 0 4.8 8.8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M.4.4l4 4-4 4' stroke='%234E4E4F' stroke-width='.8' fill='none' fill-rule='evenodd' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") no-repeat;
		width: 5px;
		height: 9px;
	}

	.x-left-arrow {
		background: url("data:image/svg+xml,%3Csvg width='12' height='20' viewBox='0 0 12 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 1L1 10l10 9' stroke='%23FFF' stroke-width='2' fill='none' fill-rule='evenodd' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") 0 0 / 100% 100% no-repeat;
		width: 12px;
		height: 20px;
	}

	.x-date-text {
		bottom: 15%;
		left: 18px;
	}

	.x-poster-illustration {
		background: url(https://res.vkunshan.com/depressed/report/poster/bg.png) 0 0 / 100% no-repeat;
		height: 391px;
	}

	.x_theme_eq,
	.x_theme_iq {
		.x-poster-illustration {
			background: url(https://res.vkunshan.com/depressed/report/eq/poster/share.png) 0 0 / 100% no-repeat;
		}

		.x-logo {
			background: url(https://res.vkunshan.com/depressed/report/eq/small-logo.png) center / 39px 39px no-repeat;
		}
	}
</style>