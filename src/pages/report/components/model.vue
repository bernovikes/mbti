<template>
	<uni-popup ref="model" :mask-click="false">
		<div class="tc bg-white center x-model">
			<div class="font-18 fw5 lh-25 color-5a92ff">{{title}}</div>
			<div class="fw4 f6 color-767676 lh-24 mt-20">{{content}}</div>
			<div class="flex items-center mt-36 white f6 fw5 justify-between lh-36">
				<div @click="cancel" class="bg-e9e9e9 color-7c7d7f btn">{{cancelText}}</div>
				<div @click="confirm" class="btn-confirm btn">{{confirmText}}</div>
			</div>
		</div>
	</uni-popup>
</template>

<script setup>
	import { ref, onMounted,defineEmits } from 'vue'
	const emits = defineEmits(['confirm','cancel'])
	const model = ref('')
	const props = defineProps({
		title: {
			type: String,
			default: ''
		},
		content: {
			type: String,
			default: ''
		},
		confirmText: {
			type: String,
			default: ''
		},
		cancelText: {
			type: String,
			default: ''
		}
	})
	const open = () => {
		model.value.open('center')		
	}
	const confirm = () => {
		emits('confirm')
		model.value.close()
	}
	const cancel = () => {
		emits('cancel')
		model.value.close()
	}
	defineExpose({
		open
	})
</script>

<style lang="scss" scoped>
	.btn-confirm {
		background: linear-gradient(270deg, #8BB2FF 0%, #5A92FF 100%);
	}

	.btn {
		border-radius: 4px;
		padding: 0 37px;
	}

	.x-model {
		padding: 24px 18px 20px 18px;
		border-radius: 12px;
		width: 82%;
	}
</style>