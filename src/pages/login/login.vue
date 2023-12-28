<template>
	<view class="x-bg border-box h-100">
		<view class="pl-27 white dib">
			<view class="b   font-30">Hello！</view>
			<view class="f6   mt3">很高兴认识您，欢迎来到小熊测试</view>
		</view>
		<view class="font-17 color-43464d  font-17 title-login">短信登录</view>
		<label class="form-item mt-60 db">
			<view class="f5">账号</view>
			<input v-model.trim="form.phone" placeholder-class="color-cfd9e0" placeholder="输入用户名/手机号/邮箱" class="input f6 medium mt2" />
		</label>
		<label class="form-item mt-27 db">
			<view class="f5">验证码</view>
			<view class="input mt2 f6  flex items-center">
				<input v-model.trim="form.code" placeholder-class="color-cfd9e0" placeholder="输入验证码" />
				<view @click="!send ? sendCode() : ''" class="color-8070ff flex-shrink-0 text-sendcode pl2">
					{{send ? '验证码已发送' : '发送验证码'}}
					<view v-show="send" class="dib font-13 color-919090 ">({{countDown}}秒)</view>
				</view>
			</view>
		</label>
		<!--  -->
		<view class="pl-30 pr-30">
			<view @click="login" class="btn-login grid place-center white font-17  center">登录</view>
		</view>
		<!--  -->
		<label class="color-b9c0c6 f6 mt-20 flex items-center agree" :class="{'active':form.check}">
			<switch @change="agree" type="checkbox" hidden />
			<view class="radio br-100 mr1"></view>
			我已阅读并同意<view class="color-687b8a" @click.stop="agreement">《用户协议》</view>和<view class="color-687b8a" @click.stop="goPrivate">《隐私协议》</view>
		</label>
		<!-- #ifdef APP-PLUS -->
		<view class="f7 color-5e6173 tc mt-75">第三方登录</view>
		<view class="flex items-center justify-center pt-12 pb3">
			<view v-for="(item,index) in sso" :key="index" class="login-sso-item" @click="item.fn">
				<image class="icon" :src="item.icon" />
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>
<script setup>
	import { sendSms, phoneLogin } from '@/api/api.js'
	import { ref } from 'vue'
	import { onUnload } from '@dcloudio/uni-app'
	import { HTTP_SUCCESS } from '@/enum/http.js'
	import { wechatAppLogin, goPrivate, agreement } from '@/common/lib.js'
	const login_user = uni.getStorageSync('login_user')
	const WechatLogin = () => {
		if (!form.value.check) {
			uni.showModal({
				title: '提示',
				content: '我已阅读并同意用户协议和隐私协议',
				success: (res) => {
					if (res.confirm) {
						form.value.check = true
						wechatAppLogin()
					}
				}
			})
		} else {
			wechatAppLogin()
		}
	}
	const sso = [{
		icon: 'https://res.vkunshan.com/login/login-wechat.png',
		fn: WechatLogin,
	}]
	if (login_user) {
		uni.switchTab({
			url: '/pages/index/index'
		})
	}
	const send = ref(false)
	const countDown = ref(0)
	let timer = ''
	const form = ref({
		phone: '',
		code: '',
		check: false,
	})
	onUnload(() => {
		clearInterval(timer)
	})

	const login = async () => {
		const { phone, code: sms_code } = form.value
		if (vaild()) {
			try {
				const { code, msg, data } = await phoneLogin({ phone, code: sms_code })
				if (code === HTTP_SUCCESS) {
					uni.setStorageSync('login_user', data)
					uni.switchTab({
						url: '/pages/index/index'
					})
				} else {
					uni.showToast({
						icon: 'none',
						title: msg,
					})
				}
			} catch (e) {
				if (e?.msg) {
					uni.showToast({
						title: e?.msg,
						icon: 'none'
					})
				}
				//TODO handle the exception
			}
		}
	}
	const agree = ({ detail: { value } }) => {
		form.value.check = value
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
	.x-bg {
		padding-top: 72px;
		--img: url("data:image/svg+xml,%3Csvg width='375' height='338' viewBox='0 0 375 338' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cdefs%3E%3Cpath id='a' d='M0 0h375v338H0z'/%3E%3ClinearGradient x1='100%25' y1='50%25' x2='0%25' y2='50%25' id='c'%3E%3Cstop stop-color='%239C91FE' offset='0%25'/%3E%3Cstop stop-color='%23D7A5FF' offset='100%25'/%3E%3C/linearGradient%3E%3ClinearGradient x1='71.72%25' y1='44.285%25' x2='2.857%25' y2='58.545%25' id='d'%3E%3Cstop stop-color='%23A796FE' offset='0%25'/%3E%3Cstop stop-color='%23D7A5FF' offset='100%25'/%3E%3C/linearGradient%3E%3ClinearGradient x1='50%25' y1='0%25' x2='50%25' y2='97.195%25' id='e'%3E%3Cstop stop-color='%23AFA2FE' stop-opacity='0' offset='0%25'/%3E%3Cstop stop-color='%23FFF' stop-opacity='.755' offset='52.592%25'/%3E%3Cstop stop-color='%23FFF' offset='100%25'/%3E%3C/linearGradient%3E%3Cfilter x='-40.3%25' y='-26.3%25' width='180.6%25' height='152.7%25' filterUnits='objectBoundingBox' id='f'%3E%3CfeGaussianBlur stdDeviation='18' in='SourceGraphic'/%3E%3C/filter%3E%3Cfilter x='-150%25' y='-164.8%25' width='400%25' height='429.7%25' filterUnits='objectBoundingBox' id='g'%3E%3CfeGaussianBlur stdDeviation='50' in='SourceGraphic'/%3E%3C/filter%3E%3C/defs%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cmask id='b' fill='%23fff'%3E%3Cuse xlink:href='%23a'/%3E%3C/mask%3E%3Cg mask='url(%23b)'%3E%3Cg transform='translate(-35.498 -58.809)'%3E%3Cpath fill='url(%23c)' d='M35.498 58.809h375v336h-375z'/%3E%3Cpath fill='url(%23d)' d='M72.498 51.206l269.476 158.938L207.236 395 0 361.108V0z'/%3E%3Cpath fill='url(%23e)' d='M35.498 296.809h375v100h-375z'/%3E%3Cellipse fill='%23A69AFE' filter='url(%23f)' cx='305.938' cy='222.309' rx='67' ry='102.5'/%3E%3Cellipse fill='%23FFF' opacity='.514' filter='url(%23g)' cx='85.498' cy='270.309' rx='50' ry='45.5'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
		--form: url("data:image/svg+xml,%3Csvg width='347' height='350' viewBox='0 0 347 350' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FFF' fill-rule='evenodd'%3E%3Cpath d='M326.977 1.5c5.385 0 10.26 2.183 13.788 5.711A19.439 19.439 0 0 1 346.477 21v37.5H124.5V24a22.43 22.43 0 0 1 6.59-15.91A22.43 22.43 0 0 1 147 1.5h179.977z' stroke-opacity='.96' stroke='%23FFF' fill-opacity='.516'/%3E%3Cpath d='M146.38.102c18.748-.894 30.895 4.096 36.441 14.968 8.32 16.308 12.737 37.215 36.485 37.215H347V350H0V20.102c0-11.046 8.954-20 20-20h126.38z'/%3E%3C/g%3E%3C/svg%3E");
		background: var(--form) center 10rem / calc(100% - 28px) auto no-repeat, url(https://res.vkunshan.com/login/login_bg_ip.png?x-oss-process=image/resize,w_276) top 94px right 40px / 92px 177px no-repeat, var(--img) left top / 100% auto no-repeat;
	}

	.title-login {
		margin-top: 2.5rem;
		padding-left: 10%;
	}

	.input {
		padding: 13px 26px 13px 23px;
		background: #f3f8fc;
		border-radius: 24px;
	}

	.form-item {
		padding: 0 40px;
	}

	.text-sendcode {
		background: linear-gradient(to bottom, #CED7DE, #CED7DE) left center / 1px 12px no-repeat;
	}

	.btn-login {
		margin-top: 46px;
		height: 45px;
		background: linear-gradient(to right, #7EA3FF, #9D91FE) no-repeat;
		box-shadow: 2px 6px 12px 0 rgba(71, 62, 217, 0.20);
		border-radius: 30px;
	}

	.radio {
		padding: 7px;
		border: solid 1px #979797;
		font: 0;
	}

	.agree.active .radio {
		background: url("data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Ccircle fill='%239D91FE' cx='7' cy='7' r='7'/%3E%3Cpath stroke='%23FFF' stroke-width='1.18' stroke-linecap='round' stroke-linejoin='round' d='M4 6.588L6.264 9 10 5'/%3E%3C/g%3E%3C/svg%3E") left top no-repeat;
	}

	.agree {
		padding-left: 55px;
	}

	.login-sso-item:not(:last-child) {
		margin-right: 30px;
	}

	.icon {
		width: 28px;
		height: 28px;
	}
</style>