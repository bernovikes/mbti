<script setup>
	import { getVisitorToken } from '@/api/api'
	import { onLaunch } from '@dcloudio/uni-app'
	onLaunch(async () => {
		try {
			const { data: { temp } } = await getVisitorToken()
			uni.setStorageSync('tempUser', temp)
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
</style>