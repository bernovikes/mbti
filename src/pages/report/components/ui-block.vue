<template>
	<view class="x-block-bg  mb-30">
		<view class="x-body-h1 width-fit">
			<slot name="h1"></slot>
		</view>
		<lock :lock="lock">
			<slot name="h2"></slot>
			<view class="pl-20 pr-20 pb-30 pt-22" v-if="bodySlot">
				<slot name="body"></slot>
			</view>
			<slot name="nopadding"></slot>
		</lock>
	</view>
</template>

<script>
	import { ref } from 'vue'
	import lock from './pay/lock.vue'
	export default {
		components: {
			lock
		},
		props: {
			lock: {
				type: Boolean,
				default: true
			}
		},
		setup(ctx, props) {
			const bodySlot = ref(props.slots.body)
			return {
				bodySlot
			}
		}
	}
</script>

<style lang="scss" scoped>
	.x-block-bg {
		background: linear-gradient(to bottom, #D6E4FF, #FFFFFF 100px) no-repeat;
		border-radius: 14px;
	}
</style>