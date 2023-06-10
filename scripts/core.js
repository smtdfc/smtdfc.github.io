const configs={
	base:"https://glen-oasis-approach.glitch.me"
}
function getParameterByName(name, url = window.location.href) {
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
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

class Authentication {
	static async login(username, password){
		let res = await fetch(`${configs.base}/auth/login`,{
			method:"post",
			body:JSON.stringify({
				username:username,
				password:password,
				device:{
					userAgent:window.navigator.userAgent
				}
			})
		})
		
		let results = await res.json()
		if(res.ok && results.status == "success"){
			let tokens = results.tokens
			CookieManager.setCookie("at",tokens.accessToken)
			CookieManager.setCookie("rt",tokens.refreshToken)
			return {results}
		}else{
			if(!res.ok){
				throw {
					err:"Unable to send request to server !"
				}
			}else{
				throw{
					err:results.err
				}
			}
		}
	}
	static async register(username, password) {
		let res = await fetch(`${configs.base}/auth/register`, {
			method: "post",
			body: JSON.stringify({
				username: username,
				password: password,
				device: {
					userAgent: window.navigator.userAgent
				}
			})
		})
	
		let results = await res.json()
		if (res.ok && results.status == "success") {
			
			return { results }
		} else {
			if (!res.ok) {
				throw {
					err: "Unable to send request to server !"
				}
			} else {
				throw {
					err: results.err
				}
			}
		}
	}
	static async info(username, password) {
		let headers = {}
		if(CookieManager.getCookie("at") != null){
			headers = {
				"Authorization": `B ${CookieManager.getCookie("at")}`
			}
		}
		let res = await fetch(`${configs.base}/auth/info`, {
			method: "post",
			headers:headers
		})
	
		let results = await res.json()
		if (res.ok && results.status == "success") {
			
			return results.info
		} else {
			if (!res.ok) {
				throw {
					err: "Unable to send request to server !"
				}
			} else {
				throw {
					err: results.err
				}
			}
		}
	}
}