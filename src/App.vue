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