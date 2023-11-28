<template>
	<view class="bg-f5f6f7 h-100">
		<uni-nav-bar color="#fff" fixed="true" backgroundColor="transparent" :border="false" left-icon="back" title="设置" @clickLeft="goHome" />
		<view class="pt-14 pr-14 pl-14">
			<view class="bg-white pa3 mb-14 x-menu flex items-center">
				<view>
					<view class="dark-gray f6 fw5 lh-20">个性化推荐设置</view>
					<view class="color-8d8d8d lh-17 f7">依据您的行为特征为您提供个性化推荐服务</view>
				</view>
				<switch color="#9D91FE" class="x-m-switch ml-auto" />
			</view>
			<!--  -->
			<view v-for="(item,index) in range" :key="index" class="bg-white x-menu " :class="{'mb-14':!index}">
				<view @click="callfunc(citem)" v-for="(citem,cindex) in item" :key="cindex" class="x-menu-item flex items-center">
					<span class="icon" :class="citem.icon" />
					<span class="f6 fw4 dark-gray ml3">{{citem.label}}</span>
					<uni-icons class="ml-auto" type="forward" color="#B1AFC4"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { isWechat } from '@/common/lib.js'
	const range = ref([])
	const changeView = (url) => {
		uni.navigateTo({
			url
		})
	}
	const goHome = () => {
		uni.switchTab({
			url: '/pages/index/index'
		})
	}
	const logout = () => {
		uni.removeStorageSync('login_user')
		uni.showToast({
			icon: 'none',
			title
		})
		setTimeout(() => {
			goHome()
		}, 1500)
	}
	const callfunc = (item) => item.fn()
	const menu = ref([
		{ label: '服务协议', icon: 'icon-agreement', fn: () => changeView('/pages/article/article?type=1&title=服务协议') },
		{ label: '隐私政策', icon: 'icon-safe', fn: () => changeView('/pages/article/article?type=2&title=隐私政策') },
		{ label: '关于我们', icon: 'icon-aboutus', fn: () => changeView('/pages/aboutus/aboutus') },
		{ label: '退出登录', icon: 'icon-logout', fn: () => logout('退出登录成功') },
		{ label: '注销账号', icon: 'icon-off', fn: () => logout('注销成功') },
	])
	range.value.push(menu.value.slice(0, 3));
	if (!isWechat() && uni.getStorageSync('login_user')) {
		range.value.push(menu.value.slice(3))
	}
</script>

<style scoped lang="scss">
	:deep(.uni-navbar__content) {
		background: linear-gradient(247deg, #7FBFFE 0%, #9D91FE 100%);
	}

	.x-menu {
		border-radius: 8px;
	}

	.x-m-switch {
		transform: scale(.6);
	}

	.icon-logout {
		--img: url("data:image/svg+xml,%3Csvg width='15' height='15' viewBox='0 0 15 15' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%2327282B' stroke-width='1.3' fill='none' fill-rule='evenodd' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M14 10.856v1.064c0 1.15-.995 2.08-2.22 2.08H3.22C1.995 14 1 13.07 1 11.92V3.08C1 1.932 1.995 1 3.22 1h8.56C13.005 1 14 1.932 14 3.08v.918M14 7.469H6.886'/%3E%3Cpath d='M12.115 5.702L14 7.47l-1.954 1.83'/%3E%3C/g%3E%3C/svg%3E");
	}

	.icon {
		background: var(--img) 0 0 / 100% 100% no-repeat;
		width: 17px;
		height: 17px;
	}

	.icon-off {
		--img: url("data:image/svg+xml,%3Csvg width='15' height='16' viewBox='0 0 15 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%2327282B' stroke-width='1.292' fill='none' fill-rule='evenodd' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4.128 3.353C2.252 4.448 1 6.428 1 8.69c0 3.446 2.91 6.24 6.5 6.24s6.5-2.794 6.5-6.24c0-2.311-1.309-4.329-3.254-5.407M7.5 1.364v5.095'/%3E%3C/g%3E%3C/svg%3E");
	}

	.icon-aboutus {
		--img: url("data:image/svg+xml,%3Csvg width='17' height='17' viewBox='0 0 17 17' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%2327282B' stroke-width='1.237' fill='none' fill-rule='evenodd' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M16 8.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0z'/%3E%3Cpath d='M10.508 6.936a2.008 2.008 0 1 1-4.016 0 2.008 2.008 0 0 1 4.016 0zM5.552 11.891a2.948 2.948 0 1 1 5.896 0'/%3E%3C/g%3E%3C/svg%3E");
	}

	.icon-safe {
		--img: url("data:image/svg+xml,%3Csvg width='16' height='17' viewBox='0 0 16 17' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%2327282B' stroke-width='1.4' fill='none' fill-rule='evenodd' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M8.822 1.232a11.625 11.625 0 0 0 4.891 1.667c.735.079 1.287.665 1.287 1.356v4.41c0 .86-.203 1.714-.63 2.475-1.12 1.996-2.91 3.613-5.092 4.589a3.155 3.155 0 0 1-2.56 0c-2.177-.974-3.964-2.586-5.085-4.574A5.034 5.034 0 0 1 1 8.675v-4.42c0-.69.551-1.277 1.287-1.356a11.623 11.623 0 0 0 4.896-1.667c.5-.31 1.14-.31 1.639 0z'/%3E%3Cpath d='M10.078 6.619c0 1.071-.93 1.939-2.078 1.939-1.148 0-2.079-.868-2.079-1.94 0-1.07.931-1.938 2.079-1.938 1.148 0 2.078.868 2.078 1.939zM8 8.558v3.762'/%3E%3C/g%3E%3C/svg%3E");
	}

	.icon-agreement {
		--img: url("data:image/svg+xml,%3Csvg width='15' height='16' viewBox='0 0 15 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%232C2C2C' stroke-width='1.156' fill='none' fill-rule='evenodd' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12.697 6.173v8.07c0 .417-.377.757-.835.757H1.836c-.46 0-.836-.34-.836-.757V2.88c0-.424.376-.757.836-.757h6.416'/%3E%3Cpath d='M5.936 10.667l-2.98.343.377-2.701M3.333 8.309L9.665 2.57m2.603 2.358l-6.332 5.738M9.665 2.57l1.479-1.34a.93.93 0 0 1 1.226 0l1.376 1.247a.734.734 0 0 1 0 1.111l-1.478 1.34'/%3E%3C/g%3E%3C/svg%3E");
	}

	.x-menu-item {
		padding: 14px 20px 14px 15px;
	}

	.x-menu-item:not(:last-child) {
		background: linear-gradient(#F5F6F7, #F5F6F7) right 20px bottom / calc(calc(100% - 52px) - 1rem) 1px no-repeat;
	}
</style>