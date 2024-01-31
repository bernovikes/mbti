<template>
	<view>
		<view @click="item.fn" v-for="(item,index) in links" :key="index" class="bg-white x-index-item pt-13 pb-13 pl3 pr3 flex items-center">
			<img :src="item.icon" class="img-index-item db">
			<view class="ml-12">
				<view class="color-22396b f6 b lh-18">{{item.title}}</view>
				<view class="font-11 fw4 color-aeb1b8">{{item.desc}}</view>
			</view>
			<view class="color-6fa7ff f7 ml-auto fw5 lh-25 pl-12 pr-12 btn-index-item bg-e5f2ff">进入测试</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	interface linksType {
		icon : string;
		title : string;
		desc : string;
		fn : () => null
	}
	const { links } = defineProps<{ links ?: linksType[] }>()
</script>

<style lang="scss" scoped>
	.x-index-item {
		box-shadow: 3px 3px 5px 0px rgba(7, 40, 104, 0.06);
		border-radius: 8px;
	}

	.x-index-item:not(:last-child) {
		margin-bottom: 12px;
	}

	.btn-index-item {
		border-radius: 12px;
	}

	.img-index-item {
		width: 40px;
		height: 40px;
	}
</style>