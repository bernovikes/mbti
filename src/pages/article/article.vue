<template>
	<view class="article-page">
		<!--#ifdef H5-->
		 <uni-nav-bar fixed="true" status-bar="true" left-icon="back" :title="title" @clickLeft="back" v-if="hide"></uni-nav-bar>
		<!--#endif-->
		<!-- <view class="title"> 法律政策</view> -->
		<view class="cont" v-html="data"></view>
	</view>
</template>

<script>
	import methodsApi from '../../api/methodsApi.js'
	export default {
		data() {
			return {
				type: 1,
				hide: '',
				title: '',
				typeData: ['about_us','user_agreement','privacy_policy'],
				data: ''
			}
		},
		onLoad(options) {
			this.type = options.type;
			this.hide = options.hide;
			uni.setNavigationBarTitle({
				title: options.title
			});
			this.getData()
		},
		mounted() {
			this.getData()
		},
		methods: {
			back(){
				
				let from = uni.getStorageSync('fromPage') ? uni.getStorageSync('fromPage'):'/pages/index/index';
				//登录后清空来源页面
				uni.setStorageSync('fromPage', '')
				uni.navigateTo({
				    url: from
				})
				
				// uni.navigateTo({
				// 	url:'../index/index'
				// })
			},
			getData(){
				methodsApi.getProtocol({}).then(res => {
					console.log(res.data)
					if(res.code == 1) {
						this.data = res.data[this.typeData[this.type]]
					}
				})
			},
			// 分享
			onNavigationBarButtonTap(e) {
				var index = e.index
				this.$uniShare({
					cancelText: "取消分享",
				}, e => { //callback
					console.log(e);
				})
			},
		}
	}
</script>

<style lang="scss">
  .article-page { padding: 40rpx;
	 .cont { font-size: 26rpx !important; line-height: 40rpx;}
  }
</style>
