const request = (url, method, data) => {
	return new Promise((resolve, reject) => {
		const domain = import.meta.env.VITE_APP_BASE_API
		let httpUrl = `${domain}${url}`
		try {
			uni.request({
				url: httpUrl,
				data: data,
				method: method,
				enableHttp2: true,				
				success(res) {
					if (res.statusCode !== 200) {
						reject(res.data)
					} else {
						resolve(res.data);
					}
				},
				fail(err) {
					reject(err)
				}
			})
		} catch (e) {
			//TODO handle the exception
		}
	})
}
export default request