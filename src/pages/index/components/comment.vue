<template>
	<view>
		<view class="font-18 fw6 color-27282b"><text class="x-list-line v-mid mr1 dib" />看Ta们说</view>
		<view class="mt3 overflow-x-hidden x-comment relative">
			<view :class="{'x-comment-move':chatWidth}" class="absolute x-comment-item" :style="{'--width':chatWidth}">
				<view :style="[!index%2 ? '' :'margin-top:16px;margin-left:50px;']" class="x-bullet-chat flex items-center" v-for="(item,index) in chat" :key="index">
					<view class="x-bullet-chat-item pl3  mr3 pr3 pt2 pb2 f7 fw5 color-3e3f44 nowrap  bg-white width-fit flex items-center border-box" v-for="(citem,cindex) in item" :key="cindex">
						<image :src="citem.img" class="img-avatar flex-shrink-0 br-100 mr1" />
						{{citem.cp}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { onMounted, ref } from 'vue'
	const chatWidth = ref('')
	defineProps({
		chat: {
			type: Array,
			default () {
				return []
			}
		}
	})
	onMounted(() => {
		const query = uni.createSelectorQuery()
		query.select('.x-comment-item').boundingClientRect(({ width }) => {
			if (width) {
				chatWidth.value = `-${width}px`
			}
		}).exec()
	})
</script>

<style lang="scss" scoped>
	.x-list-line {
		width: 4px;
		height: 15px;
		background: linear-gradient(360deg, #8BB2FF 0%, #5A92FF 100%);
		border-radius: 2px;
	}

	.x-comment {
		height: 130px;
	}

	.img-avatar {
		width: 14px;
		height: 14px;
	}

	.x-bullet-chat-item {
		box-shadow: 0 2px 8px 0px rgba(173, 177, 186, 0.16);
		border-radius: 20px;
	}

	@keyframes move {
		to {
			transform: translateX(var(--width));
		}
	}

	.x-comment-move {
		left: 100%;
		animation: 20s linear 0s move infinite;
	}
</style>