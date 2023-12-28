<template>
	<view class="h-100 flex flex-column">
		<view class="x-header">
			<uni-nav-bar color="white" backgroundColor="transparent" :border="false" :status-bar="true" left-icon="back" title="意见反馈" @clickLeft="back"></uni-nav-bar>
		</view>
		<view class="pl-18 mt-18 pr-18">
			<view class="f6 fw5 lh-20 color-3b3d40">问题与建议</view>
			<textarea v-model.trim="form.content" class="bg-f3f6f9 f7 fw5 lh-22 color-8c949c pt-12 pl-14 pr-14 w-100  mt-10 x-textarea" placeholder="请输入您所遇到的问题或意见建议。"></textarea>
			<view class="f6 fw5 lh-20 mt-28 color-3b3d40">联系电话</view>
			<input v-model.trim="form.phone" class="bg-f3f6f9 f7 fw5 pt2 pb2 pl-14 mt-10 color-8c949c x-textarea" maxlength="11" placeholder="请输入电话方便我们联系您" />
		</view>
		<view class="pl-20 pr-20 mt-auto pb-30">
			<view @click="submit" class="grid place-center btn white white fw6 lh-22">立即提交</view>
		</view>
	</view>
</template>

<script setup>
	import { postFeedback } from '@/api/api.js'
	import { reactive } from 'vue'
	import { HTTP_SUCCESS } from '../../enum/http';
	const message = {
		content: '请输入您的意见',
		phone: '请输入您的联系方式'
	}
	const form = reactive({
		content: '',
		phone: '',
	})
	const vaild = () => {
		return Object.keys(form).every(name => {
			const item = form[name];
			!item && uni.showToast({
				icon: 'none',
				title: message[name]
			})
			return !!item
		})
	}
	const successLocation = () => {
		uni.showModal({
			title: '提示',
			content: '提交成功，感谢您的反馈~',
			showCancel: false,
			success(res) {
				res.confirm && uni.switchTab({
					url: '/pages/index/index'
				})
			}
		})
	}
	const back = () => uni.switchTab({
		url: '/pages/index/index'
	})
	const submit = async () => {
		if (vaild()) {
			try {
				const { code } = await postFeedback(form)
				if (code === HTTP_SUCCESS) {
					successLocation()
				}
			} catch (e) {
				e?.msg && uni.showToast({
					title: e.msg
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.x-header {
		background: linear-gradient(315deg, #5790FF 0%, #73A2FF 53%, #8EB4FF 100%);
	}

	.x-textarea {
		border-radius: 2px;
	}

	.btn {
		height: 44px;
		background: linear-gradient(224deg, #75AEFF 0%, #3F8DFF 57%, #67A5FF 100%);
		border-radius: 22px;
	}
</style>