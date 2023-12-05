<template>
	<view class="fixed right-0 z-9999">
		<!-- preload -->
		<view class="dn">
			<image src="https://res.vkunshan.com/depressed/report/poster/person-bg.png" />
			<image src="https://res.vkunshan.com/depressed/report/poster/bg.png"></image>
		</view>
		<view class="tr">
			<view @click="openPoster" class="x-red-top-share"></view>
			<view v-if="detail.is_pay">
				<view @click="openPersonPoster" class="x-block-share dib"></view>
			</view>
		</view>
		<poster ref="posterRef" />
		<person ref="personRef" />
	</view>
</template>

<script setup>
	import poster from './share/poster.vue'
	import person from './share/person.vue'
	import { ref, inject } from 'vue'
	const posterRef = ref('')
	const personRef = ref('')
	const detail = inject('detail')
	const openPoster = () => {
		posterRef.value.open()
	}
	const openPersonPoster = () => {
		personRef.value.open()
	}
</script>

<style lang="scss" scoped>
	.x-red-top-share {
		background: url("data:image/svg+xml,%3Csvg width='71' height='34' viewBox='0 0 71 34' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cdefs%3E%3ClinearGradient x1='15.826%25' y1='28.865%25' x2='45.309%25' y2='57.53%25' id='c'%3E%3Cstop stop-color='%23FFB6C0' offset='0%25'/%3E%3Cstop stop-color='%23FF808C' offset='100%25'/%3E%3C/linearGradient%3E%3Cpath d='M13 0h54v26H13C5.82 26 0 20.18 0 13S5.82 0 13 0z' id='b'/%3E%3Cfilter x='-10.4%25' y='-19.2%25' width='120.9%25' height='153.8%25' filterUnits='objectBoundingBox' id='a'%3E%3CfeOffset dy='2' in='SourceAlpha' result='shadowOffsetOuter1'/%3E%3CfeGaussianBlur stdDeviation='2' in='shadowOffsetOuter1' result='shadowBlurOuter1'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0.155181804 0 0 0 0 0.559471241 0 0 0 0.105441434 0' in='shadowBlurOuter1'/%3E%3C/filter%3E%3Ctext id='e' font-family='PingFangSC-Semibold, PingFang SC' font-size='13' font-weight='500' fill='%23FFF'%3E%3Ctspan x='11' y='18.5'%3E分享%3C/tspan%3E%3C/text%3E%3Cfilter x='-9.6%25' y='-14.7%25' width='126.9%25' height='141.2%25' filterUnits='objectBoundingBox' id='d'%3E%3CfeOffset dx='1' dy='1' in='SourceAlpha' result='shadowOffsetOuter1'/%3E%3CfeGaussianBlur stdDeviation='1' in='shadowOffsetOuter1' result='shadowBlurOuter1'/%3E%3CfeColorMatrix values='0 0 0 0 0.998216712 0 0 0 0 0.160213021 0 0 0 0 0.239394473 0 0 0 0.5957441 0' in='shadowBlurOuter1'/%3E%3C/filter%3E%3Cpath id='g' d='M59 0h8v26h-8z'/%3E%3Cfilter x='-56.2%25' y='-9.6%25' width='175%25' height='119.2%25' filterUnits='objectBoundingBox' id='f'%3E%3CfeOffset dx='-2' in='SourceAlpha' result='shadowOffsetOuter1'/%3E%3CfeGaussianBlur stdDeviation='.5' in='shadowOffsetOuter1' result='shadowBlurOuter1'/%3E%3CfeColorMatrix values='0 0 0 0 0.938547328 0 0 0 0 0.106176743 0 0 0 0 0.184825932 0 0 0 0.147536058 0' in='shadowBlurOuter1'/%3E%3C/filter%3E%3Cfilter x='-28.5%25' y='-30.8%25' width='175.1%25' height='177.4%25' filterUnits='objectBoundingBox' id='h'%3E%3CfeOffset dx='1' dy='1' in='SourceAlpha' result='shadowOffsetOuter1'/%3E%3CfeGaussianBlur stdDeviation='1' in='shadowOffsetOuter1' result='shadowBlurOuter1'/%3E%3CfeColorMatrix values='0 0 0 0 0.998216712 0 0 0 0 0.160213021 0 0 0 0 0.239394473 0 0 0 0.5957441 0' in='shadowBlurOuter1' result='shadowMatrixOuter1'/%3E%3CfeMerge%3E%3CfeMergeNode in='shadowMatrixOuter1'/%3E%3CfeMergeNode in='SourceGraphic'/%3E%3C/feMerge%3E%3C/filter%3E%3C/defs%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg transform='translate(4 2)'%3E%3Cuse fill='%23000' filter='url(%23a)' xlink:href='%23b'/%3E%3Cuse fill='url(%23c)' xlink:href='%23b'/%3E%3C/g%3E%3Cg fill-rule='nonzero' fill='%23FFF' transform='translate(4 2)'%3E%3Cuse filter='url(%23d)' xlink:href='%23e'/%3E%3Cuse xlink:href='%23e'/%3E%3C/g%3E%3Cg fill-rule='nonzero' transform='translate(4 2)'%3E%3Cuse fill='%23000' filter='url(%23f)' xlink:href='%23g'/%3E%3Cuse fill='%23FFCDD2' xlink:href='%23g'/%3E%3C/g%3E%3Cg filter='url(%23h)' transform='translate(47 9)' stroke='%23FFF' stroke-linecap='round' stroke-width='1.26'%3E%3Cpath d='M7.944 3h1.223C10.179 3 11 3.716 11 4.6v4.8c0 .884-.82 1.6-1.833 1.6H1.833C.821 11 0 10.284 0 9.4V4.6C0 3.716.82 3 1.833 3h1.223M3.772 1.745L5.037.467a.651.651 0 0 1 .926 0l1.265 1.278M5.5 1.318v6.364'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
		width: 71px;
		height: 34px;
	}

	.x-block-share {
		background: url("data:image/svg+xml,%3Csvg width='26' height='98' viewBox='0 0 26 98' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M4 0h22v98H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z' fill-opacity='.556' fill='%23000D21' opacity='.96'/%3E%3Cg fill='%23FFF' fill-rule='nonzero'%3E%3Cpath d='M16.857 87.182v.659a.222.222 0 0 1-.063.155.212.212 0 0 1-.151.065H9.357a.212.212 0 0 1-.151-.065.222.222 0 0 1-.063-.155v-.659a.868.868 0 0 0-.857-.879h-.429a.868.868 0 0 0-.857.879v1.5C7 89.41 7.576 90 8.286 90h9.428c.71 0 1.286-.59 1.286-1.318v-1.5a.868.868 0 0 0-.857-.879h-.429a.868.868 0 0 0-.857.879z'/%3E%3Cpath d='M13.954 79.851c0-.47-.244-.851-.545-.851h-.818c-.301 0-.545.381-.545.851v3.263c0 .118-.061.213-.137.213h-.638c-.105 0-.201.097-.246.247a.624.624 0 0 0 .04.453l1.728 2.597c.052.091.126.144.204.144.079 0 .153-.053.205-.144l1.734-2.597a.624.624 0 0 0 .039-.453c-.045-.15-.14-.246-.246-.247h-.638c-.076 0-.137-.095-.137-.213v-3.263z'/%3E%3C/g%3E%3Ctext fill-rule='nonzero' font-family='PingFangSC-Medium, PingFang SC' font-size='14' font-weight='400' fill='%23FFF'%3E%3Ctspan x='6' y='23'%3E保%3C/tspan%3E %3Ctspan x='6' y='40'%3E存%3C/tspan%3E %3Ctspan x='6' y='57'%3E报%3C/tspan%3E %3Ctspan x='6' y='74'%3E告%3C/tspan%3E%3C/text%3E%3C/g%3E%3C/svg%3E");
		width: 26px;
		height: 98px;
		margin-top: 218px;
	}
</style>