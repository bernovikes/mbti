import request from './request.js'
/**
 * 获取临时用户
 */
export function getVisitorToken() {
	return request('/api/login/generateVisitorToken', 'POST')
}
/*
 * 获取题库
 */
export function getQuestionBank(id) {
	return request(`/api/front_question_banks/${id}`, 'GET')
}

/**
 * 提交答题数据
 */
export function postAnswerData(data) {
	return request(`/api/front_question_banks`, 'POST', data)
}

/**
 * 获取答题数据
 */
export function fetchAnswerData(no) {
	return request(`/api/answers/${no}`, 'GET')
}
/*
 * 创建商品订单
 */
export function createOrder(data) {
	return request(`/api/orders`, 'POST', data)
}

/**
 * 创建支付配置信息
 */
export function createPayConfig(data) {
	return request(`/api/pay/create/order`, 'POST', data)
}
/**
 * 查询支付流水状态
 */
export function traceCheck(no) {
	return request(`/api/pay/check/${no}`, 'get')
}
/*
 * 订单查询
 */
export function fetchOrderDetail(no) {
	return request(`/api/orders/${no}`, 'GET')
}
/** 
 * 答题列表
 */
export function fetchAnswerList(data) {
	return request(`/api/answers`, 'GET', data)
}
/*
 * 发送短信验证码
 */
export function sendSms(phone) {
	return request(`/api/login/sms/${phone}`, 'POST')
}

/*
 * 发送短信验证码
 */
export function phoneLogin(data) {
	return request(`/api/login/phone/login`, 'POST', data)
}

/** 
 * 获取专题详情
 */
export function fetchTopic(id) {
	return request(`/api/topics/${id}`, 'GET')
}

/** 
 * 提交意见反馈
 */
export function postFeedback(data) {
	return request(`/api/feedback`, 'POST', data)
}

/** 
 * app登录
 */
export function appLogin(data) {
	return request(`/api/login/app/login`, 'POST', data)
}


/** 
 * 微信小程序登录
 */
export function miniLogin(data) {
	return request(`/api/login/mini/login`, 'POST', data)
}

/** 
 * 赠送订单查询
 */
export function fetchFriendOrder(data) {
	return request(`/api/answer/friend_list`, 'GET', data)
}

/*
 * 兑换码订单查询
 */
export function fetchRedeemOrderDetail(no) {
	return request(`/api/order/redeem_code/${no}`, 'GET')
}
