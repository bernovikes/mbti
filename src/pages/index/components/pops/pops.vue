<template>
	<uni-popup ref="pops">
		<view class="cm-dialog center flex flex-column relative bg-white tc pt3 pb-20">
			<view @click="close" class="cm-dialog-close absolute top-0 right-0" />
			<view class="font-14 fw5 color-304071 mb-12">温馨提示</view>
			<view class="pl-30 pr-30">
				<slot></slot>
			</view>
			<view class="mt-30 cm-dialog-btns">
				<slot name="btn"></slot>
			</view>
		</view>
	</uni-popup>
</template>

<script setup>
	import { ref } from 'vue'
	const pops = ref('')
	const open = () => pops.value.open('center')
	const close = () => pops.value.close()
	defineExpose({
		open,
		close
	})
</script>

<style scoped lang="scss">
	.cm-dialog-close {
		background: url("data:image/svg+xml,%3Csvg width='37' height='18' viewBox='0 0 37 18' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M.636 0H25c6.627 0 12 5.373 12 12v6H4.636a4 4 0 0 1-4-4V0z' fill='%23898989' opacity='.5'/%3E%3Cg stroke='%23E8E8E8' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M15.636 6l6 7M21.636 6l-6 7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") 0 0 / 100% 100% no-repeat;
		width: 37px;
		height: 18px;
	}

	.cm-dialog {
		border-radius: 12px;
		width: max-content;
	}
</style>