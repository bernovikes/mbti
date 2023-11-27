import request from './request.js'
export function kefuConfig() {
	return request('https://res.vkunshan.com/config/kefu.json')
}
export function mbtiConfig(type = 'isfp') {
	return request(`https://res.vkunshan.com/config/new_mbti/${type}.json`)
}
export function indexConfig() {
	return request(`https://res.vkunshan.com/config/index.json`)
}
export function weiboConfig() {
	return request(`https://res.vkunshan.com/config/weibo.json`)
}
export function douyinConfig() {
	return request('https://res.vkunshan.com/config/douyin.json')
}