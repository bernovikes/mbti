<template>
	<uni-popup ref="popup" :mask-click="false">
		<div class="bg-white x-login-dialog pl-20 pr-20 pb-20">
			<div class="absolute w-100 left-0">
				<view class="x-top lh-48 f6 white  tc center">
					<img class="icon-launch v-mid mr-13" src="https://res.vkunshan.com/depressed/index/lit-launch.png" />
					抑郁测试
				</view>
			</div>
			<div class="x-login-body">
				<radio-group class="flex" @change="changeLogin">
					<label :class="{'color-4390ff':activeLoginType===item.value,'color-bfbfc4':activeLoginType!==item.value}" class="f6 w-50 tc fw5  lh-20" v-for="(item,index) in loginType" :key="index">
						{{item.name}}
						<radio hidden :value="item.value" />
					</label>
				</radio-group>
				<!--  -->
				<div v-if="activeLoginType==='wechat'">
					<img class="db center icon-wechat mb-20 mt-30" src="https://res.vkunshan.com/depressed/index/wechat-login.png">
					<div class="bb color-e9e9e9 mb-17"></div>
					<div class="font-13 fw5 mb-10 lh-20 color-737373">申请获取以下权限</div>
					<div class="f7 fw5 lh-20 color-bcbcbc mb-20">获得你的公开信息（昵称，头像等）</div>
				</div>
				<!--  -->
				<div v-if="activeLoginType==='phone'">
					<div class="color-eaebf3  pb-13 bb db mt-34">
						<input v-model="form.phone" class="font-13 fw5 black" maxlength="11" placeholder-class="color-c4c5cb" type="number" placeholder="请输入您的手机号">
					</div>
					<!--  -->
					<div class="mt-35 font-15 b lh-20 color-2e3036">验证码</div>
					<div class="flex items-center mt3 mb-28 bb color-eaebf3 pb-13">
						<input v-model="form.code" class="font-13 fw5 black" placeholder-class="color-c4c5cb" type="number" maxlength="10" placeholder="请输入验证码">
						<span class="font-10 mr2 ml-auto">|</span>
						<span @click="!send ? sendCode() : ''" class="font-13 fw5 color-5098ff flex-shrink-0">
							{{send ? '验证码已发送' : '获取验证码'}}
							<span v-show="send" class="dib font-13 color-919090">({{countDown}}秒)</span>
						</span>
					</div>
				</div>
				<!--  -->
				<div @click="doLogin" class="btn white f6 fw5 tc">{{activeLoginType==='wechat'?'微信授权登录':'登录'}}</div>
				<label class="font-10 mt3 color-9b9ea1 flex items-center">
					<div class="x-radio br-100 mr2 border-box" :class="{'active':form.check}">
						<switch @change="switchChange" hidden />
					</div>
					我已阅读<span class="color-687b8a" @click.stop="agreement">《用户协议》</span>和<span class="color-687b8a" @click.stop="goPrivate">《隐私政策》</span>并理解相关条款内容
				</label>
			</div>
		</div>
	</uni-popup>
</template>

<script setup>
	import { agreement, goPrivate, wechatAppLogin } from '@/common/lib.js'
	import { ref, onMounted, reactive, onUnmounted } from 'vue'
	import { sendSms, phoneLogin } from '@/api/api.js'
	import { HTTP_SUCCESS } from '@/enum/http.js'
	import { compVersion } from '@/common/lib.js'
	const popup = ref('')
	const send = ref(false)
	const countDown = ref(0)
	const form = ref({
		phone: '',
		code: '',
		check: false
	})
	let timer = ''
	const loginType = [
		{ name: '微信登录', value: 'wechat' },
		{ name: '手机号登录', value: 'phone' },
	]
	const activeLoginType = ref('wechat')
	onMounted(async () => {
		// #ifdef APP-PLUS
		const login_user = uni.getStorageSync('login_user')
		if (!login_user) {
			const comp_version = await compVersion()
			if (comp_version) {
				popup.value?.open()
			}
		}
		// #endif		
	})
	const switchChange = ({ detail: { value } }) => {
		form.value.check = value
	}
	const doLogin = () => {
		const loginfn = () => {
			return {
				wechat() {
					popup.value?.close()
					wechatAppLogin()
				},
				async phone() {
					const { phone, code: sms_code } = form.value
					if (vaild()) {						
						try {
							const { code, msg, data } = await phoneLogin({ phone, code: sms_code })
							if (code === HTTP_SUCCESS) {
								popup.value?.close()
								uni.setStorageSync('login_user', data)
								uni.showToast({
									icon: 'none',
									title: msg,
								})
							}
						} catch (e) {
							if (e?.msg) {
								uni.showToast({
									icon: 'none',
									title: e.msg,
								})
							}
							//TODO handle the exception
						}
					}
				}
			}
		}
		if (!form.value.check) {
			uni.showModal({
				title: '提示',
				content: '我已阅读并同意用户协议和隐私协议',
				success: (res) => {
					if (res.confirm) {
						form.value.check = true
						loginfn()[activeLoginType.value]()

					}
				}
			})
			return false
		}
		loginfn()[activeLoginType.value]()
	}
	const changeLogin = ({ detail: { value } }) => {
		activeLoginType.value = value
	}
	const vaild = (field = ['phone', 'code', 'check', 'rule_phone']) => {
		const message = {
			phone: '请输入手机号',
			code: '请输入验证码',
			check: '请阅读并勾选用户协议',
			rule_phone: '请输入正确手机号'
		}
		return field.every(item => {
			const val = item === 'rule_phone' ? /^[1][3,4,5,7,8,9][0-9]{9}$/.test(form.value.phone) : form.value[item];
			!val && uni.showToast({
				icon: 'none',
				title: message[item]
			})
			return !!val
		})
	}
	onUnmounted(() => {
		clearInterval(timer)
	})
	const sendCode = async () => {
		if (!vaild(['phone', 'rule_phone']) || send.value) {
			return false
		}
		timer && clearInterval(timer)
		let t = 60
		const raf = () => {
			if (t <= 0) {
				clearInterval(timer)
				send.value = false
				t = 0
				return false
			}
			countDown.value = t--
			send.value = true
		}
		timer = setInterval(raf, 1000)
		try {
			const { msg, code } = await sendSms(form.value.phone)
			uni.showToast({
				icon: 'none',
				title: msg
			})
		} catch (e) {
			//TODO handle the exception
		}
	}
</script>

<style lang="scss" scoped>
	.x-login-dialog {
		border-radius: 17px;
	}

	.x-login-body {
		padding-top: 53px;
	}

	.btn {
		background: linear-gradient(to left, #6CA8FF, #4B94FF);
		line-height: 45px;
		border-radius: 10px;
		padding: 0 93px;
	}

	.x-radio {
		width: 13px;
		height: 13px;
		border: solid 1px gray;
	}

	.active.x-radio {
		background: url("data:image/svg+xml,%3Csvg width='13' height='13' viewBox='0 0 13 13' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient x1='100%25' y1='0%25' x2='1.425%25' y2='100%25' id='a'%3E%3Cstop stop-color='%236CA8FF' offset='0%25'/%3E%3Cstop stop-color='%234B94FF' offset='100%25'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Crect fill='url(%23a)' width='13' height='13' rx='6.5'/%3E%3Cpath stroke='%23FFF' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round' d='M3.28 6.709L5.9 9 10 5'/%3E%3C/g%3E%3C/svg%3E");
		border: none;
	}

	.icon-wechat {
		width: 60px;
		height: 60px;
	}

	.x-top {
		background: linear-gradient(to left, #6CA8FF, #4B94FF);
		width: 188px;
		border-radius: 25px;
		margin-top: -25px;
	}

	.icon-launch {
		width: 25px;
		height: 25px;
	}

	.uni-popup {
		z-index: 10;
	}
</style>