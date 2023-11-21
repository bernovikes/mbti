<template>
	<view class="x-block-bg mb-30">
		<view class="x-body-h1 width-fit">
			<slot name="h1"></slot>
		</view>
		<slot name="h2"></slot>
		<view class="pl-20 pr-20 pb-30 pt-22" v-if="bodySlot">
			<slot name="body"></slot>
		</view>
		<slot name="nopadding"></slot>
	</view>
</template>

<script>
	import { ref } from 'vue'
	export default {
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
		background: linear-gradient(to bottom, #D6E4FF, #FFFFFF 23%) no-repeat;
		border-radius: 14px;
	}
</style>