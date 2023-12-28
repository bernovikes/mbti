<script setup>
	import { getVisitorToken } from '@/api/api'
	import { onLaunch } from '@dcloudio/uni-app'
	import { isWechat, wechatNewAuth, getUserId } from '@/common/lib.js'
	// #ifdef H5
	import { useRoute } from 'vue-router'
	import { watch } from 'vue'
	const route = useRoute()
	watch(route, () => {
		const { query: { channel = '' } } = route
		channel && uni.setStorageSync('channel', channel)
	})
	// #endif
	// #ifdef APP-PLUS
	import.meta.env.VITE_APP_CHANNEL && uni.setStorageSync('channel', import.meta.env.VITE_APP_CHANNEL)
	// #endif
	onLaunch(async () => {
		// #ifdef H5 || APP-PLUS
		uni.hideTabBar()
		// #endif
		if (isWechat() && !getUserId()) {
			wechatNewAuth()
		}
		try {
			if (!uni.getStorageSync('tempUser')) {
				const { data: { temp } } = await getVisitorToken()
				uni.setStorageSync('tempUser', temp)
			}
		} catch (e) {
			//TODO handle the exception
		}
	})
</script>
<style>
	body {
		font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'PingFang SC', 'Microsoft YaHei light', 'Microsoft YaHei', 'Source Han Sans SC', ' Noto Sans CJK SC', sans-serif
	}

	uni-page-body {
		height: 100%;
	}

	uni-toast {
		z-index: 10001;
	}

	@media screen and (min-width: 768px) {
		body {
			max-width: 375px;
			margin: 0 auto;
		}
	}
</style>