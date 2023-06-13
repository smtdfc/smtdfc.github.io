window.Turtle.createComponent("auth-page-navbar", {
	render:function(){
		return  `
			<nav class="navbar">
				<div class="navbar-brand">
					smtdfc
				</div>
				<div>
					<label class="ml-5">Dark </label>
					<label class="switch">
						<input ref="dark-mode" type="checkbox" id="dark-mode">
						<span class="switch-slider"></span>
					</label>
				</div>
			</nav>
		`
	},
	onRender:async function(){
		let mode = await configs.theme.get("mode")
		if (mode == "dark") {
			selector.byId("dark-mode").checked = true
		} else {
			selector.byId("dark-mode").checked = false
		}
		
		selector.byId("dark-mode").on("change", async function(event) {
			let value = event.target.checked
			if (value) {
				await configs.theme.set("mode", "dark")
				document.body.style.setProperty("--body-bg", "#1F1B24")
				document.body.style.setProperty("--body-color", "white")
			} else {
				await configs.theme.set("mode", "light")
				document.body.style.setProperty("--body-bg", "#ffffff")
				document.body.style.setProperty("--body-color", "black")
			}
		})
	}
})