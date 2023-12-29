<template>
	<view class="x-bg h-100 fixed w-100 top-0 left-0 z-9999" v-if="show" :style="{'padding-top':statusBarHeight()}">
		<view class="pt-24 pl-20 mb-26">
			<view @click.stop="close" class="x-left-arrow" />
		</view>
		<view class="relative width-fit center" @click.stop="empty">
			<view class="tc">
				<image mode="widthFix" src="https://res.vkunshan.com/depressed/report/poster/person-bg.png?v=2" />
			</view>
			<view class="absolute top-0 pt-90 x-content left-0">
				<view class="pr-38 pl-38">
					<view class="white">
						<view class="font-18 lh-25 b">测试结果：{{detail?.report?.total_avg_text}}</view>
						<view class="f7 white-90 lh-17 tl">{{detail?.created_at}}</view>
					</view>
					<view class="x-bottom-text flex items-center">
						<view class="font-11 fw4 white ml-38 lh-18">愿大家在这里找到自我放下抑郁焦虑吧下抑郁焦虑吧</view>
					</view>
				</view>
				<view class="tr pr-20 x-qrcode mt-28">
					<uQRCode :id="qrcodeId" class="dib" :text="qrcode" :size="72"></uQRCode>
				</view>
			</view>
		</view>
		<!--  -->
		<view class="tc x-footer">
			<image mode="widthFix" class="x-bottom-line" src="https://res.vkunshan.com/depressed/report/poster/bottom_line.png" />
			<view class="font-13 fw5 lh-21 color-32373d mt-10">长按或者截屏保存测试分享卡片</view>
		</view>
	</view>
</template>

<script setup>
	import uQRCode from '@/components/uqrcode/uqrcode.vue'
	import { statusBarHeight } from '@/common/lib.js'
	import { inject, ref, computed } from 'vue'
	const detail = inject('detail')
	const show = ref(false)
	const qrcodeId = ref('')
	const open = () => {
		show.value = true
		setTimeout(() => {
			qrcodeId.value = `${+new Date}_person`
		}, 50)
	}
	const close = () => show.value = false
	const empty = () => {}
	defineExpose({
		open
	})
	const domain = import.meta.env.VITE_DOMAIN
	const qrcode = computed(() => `${domain}/pages/report/index?no=${detail.value?.order_no}`)
	const uqrcode = ref('')
</script>

<style lang="scss" scoped>
	.x-bg {
		background: linear-gradient(360deg, #FFFFFF 0%, #87B5FF 60%, #7FACFF 100%);
	}

	.x-left-arrow {
		background: url("data:image/svg+xml,%3Csvg width='12' height='20' viewBox='0 0 12 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 1L1 10l10 9' stroke='%23FFF' stroke-width='2' fill='none' fill-rule='evenodd' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") 0 0 / 100% 100% no-repeat;
		width: 9px;
		height: 15px;
	}

	.x-bottom-text {
		margin-top: 95%;
	}

	.img-launch {
		width: 31px;
		height: 31px;
	}

	.x-bottom-line {
		height: 19px;
	}

	.x-footer {
		margin-top: 5vw;
	}
</style>