<template>
	<view class="relative">
		<view v-if="lock" class="bg-white x-lock-bg flex items-center justify-center absolute z-2 top-0 left-0 right-0 bottom-0">
			<view @click="openPayDialog" class="white btn flex items-center justify-center lh-22">
				<view class="icon-lock mr2" />
				{{btn_text}}
			</view>
		</view>
		<slot></slot>
	</view>
</template>

<script setup>
	import { inject, ref, watch, computed } from 'vue'
	defineProps({
		lock: {
			type: Boolean,
			default: true
		}
	})
	const detail = inject('detail')
	const openPayDialog = () => {
		uni.$emit('open_pay_dialog', true)
	}
	const btn_text = computed(() => {
		const val = detail.value
		return val?.is_pay && !val?.all_unlock ? '升级专属报告' : '解锁专属报告'
	})
</script>

<style lang="scss" scoped>
	.x-lock-bg {
		background: url(https://res.vkunshan.com/depressed/report/blur_v5.png) repeat rgba(255, 255, 255, .9);
		transform: translateX(0);
	}

	.btn {
		background: linear-gradient(to left, rgba(110, 160, 255, 0.48), rgba(109, 159, 255, 0.77), rgba(110, 159, 255, 1));
		border-radius: 9px;
		height: 38px;
		width: 192px;
	}

	.icon-lock {
		background: url("data:image/svg+xml,%3Csvg width='13' height='16' viewBox='0 0 13 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11.451 6.258H1.55C.693 6.258 0 6.957 0 7.818v6.621C0 15.301.693 16 1.549 16h9.902c.856 0 1.549-.699 1.549-1.56V7.818c0-.862-.693-1.561-1.549-1.561zm-4.299 4.826v1.738a.655.655 0 0 1-.652.659.656.656 0 0 1-.652-.66v-1.737a1.318 1.318 0 0 1-.653-1.14A1.31 1.31 0 0 1 6.5 8.627c.72 0 1.305.59 1.305 1.317 0 .488-.263.912-.653 1.14zM6.5 0C3.978 0 1.934 2.035 1.934 4.71v2.045l9.132.439V4.709C11.066 2.035 9.022 0 6.5 0zM3.24 6.64V4.663C3.24 2.845 4.7 1.37 6.5 1.37c1.8 0 3.26 1.474 3.26 3.293v2.021L3.24 6.64z' fill='%23FFF' fill-rule='nonzero'/%3E%3C/svg%3E") no-repeat;
		width: 13px;
		height: 16px;
	}

	.x_theme_eq,
	.x_theme_iq {
		.btn {
			background: linear-gradient(to left, #9CD3FF, #5EADFF) no-repeat;
		}

		.x-lock-bg {
			border-radius: 12px;
		}
	}
</style>