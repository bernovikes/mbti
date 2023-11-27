const request = (api, random = true) => {
	return new Promise((resolve, reject) => {
		const t = Math.ceil((+new Date()) / (1000 * 60))
		const url = random ? `${api}?t=${t}` : api
		uni.request({
			url,
			method: 'GET',
			enableCache: true,
			enableHttp2: true,
			success({
				data
			}) {
				resolve(data)
			},
			fail(err) {
				reject(err)
			}
		})
	})
}
export default request