<template>
	<view class="x-block-bg bg-white  mb-30">
		<view class="x-body-eq-h1 white center width-fit">
			<slot name="h1"></slot>
		</view>
		<view class="pl3 pr3 pb-22" v-if="bodySlot">
			<slot name="body"></slot>
		</view>
		<!-- <lock :lock="lock">
			<slot name="h2"></slot>
			<view class="pl-20 pr-20 pb-30 pt-22" v-if="bodySlot">
				<slot name="body"></slot>
			</view>
			<slot name="nopadding"></slot>
		</lock> -->
	</view>
</template>

<script>
	import { ref } from 'vue'
	import lock from '../pay/lock.vue'
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
		border-radius: 12px;
		box-shadow: 3px 6px 12px 0px rgba(0, 86, 179, 0.06);
	}
</style>