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