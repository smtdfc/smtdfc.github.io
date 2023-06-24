function isServerError(err) {
	return err.response.status == 500
}

function shouldRetryWithNewToken(err){
	return ["Authentication Error","Token Error"].includes(err.name)
}

axios.interceptors.response.use(function(response) {
	return response;
}, function(err) {
	if (isServerError(err)) {
		return Promise.reject({
			name: "ServerError",
			message: "Unable to send request to server "
		})
	}
	return Promise.reject({
		name: err.response.data.err.name,
		message: err.response.data.err.message
	})
});

function getBrowserName(userAgent) {
	// The order matters here, and this may report false positives for unlisted browsers.
	if (userAgent.includes("Firefox")) {
		// "Mozilla/5.0 (X11; Linux i686; rv:104.0) Gecko/20100101 Firefox/104.0"
		return "Mozilla Firefox";
	} else if (userAgent.includes("SamsungBrowser")) {
		// "Mozilla/5.0 (Linux; Android 9; SAMSUNG SM-G955F Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/9.4 Chrome/67.0.3396.87 Mobile Safari/537.36"
		return "Samsung Internet";
	} else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
		// "Mozilla/5.0 (Macintosh; Intel Mac OS X 12_5_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36 OPR/90.0.4480.54"
		return "Opera";
	} else if (userAgent.includes("Edge")) {
		// "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
		return "Microsoft Edge (Legacy)";
	} else if (userAgent.includes("Edg")) {
		// "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36 Edg/104.0.1293.70"
		return "Microsoft Edge (Chromium)";
	} else if (userAgent.includes("Chrome")) {
		// "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"
		return "Google Chrome or Chromium";
	} else if (userAgent.includes("Safari")) {
		// "Mozilla/5.0 (iPhone; CPU iPhone OS 15_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6 Mobile/15E148 Safari/604.1"
		return "Apple Safari";
	} else {
		return "unknown";
	}
}

class CookieManager {
	static setCookie(cname, cvalue, exdays) {
		const d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		let expires = "expires=" + d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}
	static getCookie(cname) {
		let name = cname + "=";
		let decodedCookie = decodeURIComponent(document.cookie);
		let ca = decodedCookie.split(';');
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return null;
	}

	static eraseCookie(name) {
		document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}
}


class UserInfo {
	constructor(auth) {
		this.auth = auth
		this.username = "unknown"
		this.rule = "unknown"
	}
}

class Authentication {
	constructor(app) {
		this.user = new UserInfo(this)
		this.app = app
	}

	async login(username, password) {
		let response = await axios({
			method: "post",
			url: `${this.app.configs.base}/auth/login`,
			data: {
				device: {
					browserName: getBrowserName(window.navigator.userAgent),
					userAgent: window.navigator.userAgent
				},
				username: username,
				password: password
			}
		})
		let info = response.data.info
		let tokens = response.data.tokens
		this.user.username = info.username
		this.user.rule = info.rule
		CookieManager.setCookie("at", tokens.accessToken,"0,0208333333")
		CookieManager.setCookie("rt", tokens.refreshToken)
		return this.user
	}

	async register(username, password) {
		let response = await axios({
			method: "post",
			url: `${this.app.configs.base}/auth/register`,
			data: {
				device: {
					browserName: getBrowserName(window.navigator.userAgent),
					userAgent: window.navigator.userAgent
				},
				username: username,
				password: password
			}
		})
		return {
			username: username
		}
	}a

	async getUser() {
		try {
			let response = await axios({
				method: "post",
				headers: {
					"Authorization": `Token ${CookieManager.getCookie("at")}`
				},
				url: `${this.app.configs.base}/auth/info`,
			})
			let user = new UserInfo(this)
			user.username = response.data.info.name
			user.rule = response.data.info.rule
			return user
		} catch (err) {
			if(shouldRetryWithNewToken(err)){
				let res = await this.getNewTokenAndRetry(this,this.getUser)
				if(res.success)
					return res.data
				else
					return null
			}else{
				return null
			}
		}
	}

	async getNewToken() {
		let response = await axios({
			method: "post",
			url: `${this.app.configs.base}/auth/newToken`,
			data: {
				refreshToken: CookieManager.getCookie("rt")
			}
		})

		let tokens = response.data.tokens
		CookieManager.setCookie("at", tokens.accessToken)
		CookieManager.setCookie("rt", tokens.refreshToken)
		return true
	}

	async getNewTokenAndRetry(context,callback, ...args) {
		let res = {
			success: false,
			data: {},
			err: null
		}

		try {
			await this.getNewToken()
			res.data = await callback.apply(context,args)
			res.success = true
			return res
		} catch (err) {
			res.err = err
			return res
		}
	}
	async logout(){
		let response = await axios({
			method: "post",
			url: `${this.app.configs.base}/auth/logout`,
			data: {
				refreshToken: CookieManager.getCookie("rt")
			}
		})
		CookieManager.eraseCookie("at")
		CookieManager.eraseCookie("rt")
		return true
	}
}

function initApp(configs = {}) {
	const instance = axios.create({
		baseURL: configs.base,
		headers: {}
	});

	const app = {
		configs: configs
	}

	app.auth = new Authentication(app)
	return app
}

window.initApp = initApp