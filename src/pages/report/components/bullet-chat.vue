<template>
	<block v-if="chat.length">
		<view class="x-bullet-chat fixed z-3 top-0" :style="{'--delay':detail.is_pay ? '10s':'3s','--finish':chat.length}">
			<view :style="{top:`${2+((index%2)*2.5)}rem`,'--index':index}" v-for="(item,index) in chat" :key="index" class="x-bullet-chat-item   absolute  f7 lh-17 flex items-center color-242142">
				<image :src="item.url" class="img-avatar br-100 mr1" />
				{{item.text}}
			</view>
		</view>
	</block>
</template>

<script setup>
	import { isMobile } from '@/common/lib.js'
	import { computed, inject } from 'vue'
	const list = [
		{ "url": "https://res.vkunshan.com/static/report/chat/1.png", "text": "妍妍1分钟前已解锁报告" },
		{ "url": "https://res.vkunshan.com/static/report/chat/2.png", "text": "别抢小朋友的枕头3分钟前已解锁报告" },
		{ "url": "https://res.vkunshan.com/static/touxiang/touxiang001.png", "text": "萌萌兔刚刚已解锁报告" },
		{ "url": "https://res.vkunshan.com/static/touxiang/touxiang002.png", "text": "火星小兵5分钟前已解锁报告" },
		{ "url": "https://res.vkunshan.com/static/touxiang/touxiang003.png", "text": "小良人10分钟前已解锁报告" },
		{ "url": "https://res.vkunshan.com/static/touxiang/touxiang003.png", "text": "快乐熊猫1分钟前已解锁报告" },
		{ "url": "https://res.vkunshan.com/static/report/chat/4.jpeg", "text": "热爱旅行3分钟前已解锁报告" },
		{ "url": "https://res.vkunshan.com/static/report/chat/5.jpeg", "text": "喵女孩5分钟前已解锁报告" },
		{ "url": "https://res.vkunshan.com/static/report/chat/6.jpeg", "text": "小良人10分钟前已解锁报告" },
	]
	const normal = [
		{ "url": "https://res.vkunshan.com/static/report/chat/1.png", "text": "妍妍1分钟前已升级报告" },
		{ "url": "https://res.vkunshan.com/static/report/chat/2.png", "text": "别抢小朋友的枕头3分钟前已升级报告" },
		{ "url": "https://res.vkunshan.com/static/report/chat/10.jpeg", "text": "萌萌兔刚刚已升级报告" },
		{ "url": "https://res.vkunshan.com/static/report/chat/4.jpeg", "text": "火星小兵5分钟前已升级报告" },
		{ "url": "https://res.vkunshan.com/static/report/chat/5.jpeg", "text": "小良人10分钟前已升级报告" },
		{ "url": "https://res.vkunshan.com/static/report/chat/6.jpeg", "text": "快乐熊猫1分钟前已升级报告" },
		{ "url": "https://res.vkunshan.com/static/report/chat/7.jpeg", "text": "热爱旅行3分钟前已升级报告" },
		{ "url": "https://res.vkunshan.com/static/report/chat/8.jpeg", "text": "喵女孩5分钟前已升级报告" },
		{ "url": "https://res.vkunshan.com/static/report/chat/9.jpeg", "text": "小良人10分钟前已升级报告" },
	]
	const detail = inject('detail')
	const chat = computed(() => !detail.value?.all_unlock && detail.value?.is_pay ? normal : list)
</script>

<style scoped lang="scss">
	.img-avatar {
		width: 18px;
		height: 18px;
	}

	@keyframes move {
		to {
			transform: translateX(calc(var(--finish) * -50vw));
		}
	}

	.x-bullet-chat {
		left: 100vw;
		animation: calc((var(--finish) * 1s) + 6s) linear var(--delay, 3s) move;
		animation-iteration-count: 3;
	}

	.x-bullet-chat-item {
		background: rgba(255, 255, 255, .8);
		padding: 1px 7px 1px 2px;
		border-radius: 20px;
		--left: calc(var(--index) * 130px);
		left: var(--left);
		width: max-content;
	}
</style>