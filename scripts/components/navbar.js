const BASE_LINK = window.location.origin
window.Turtle.createComponent("page-navbar", {
	render: function() {
		return `
	<nav class="navbar" style="--navbar-title-font-size:20px;" id="nav1">
		<div class="d-flex flex-flow-row ">
			<button class="navbar-open-btn" data-action="toggle-navbar" data-navbar="#nav1"></button>
			<h1 class="p-0 navbar-brand">smtdfc</h1>
		</div>
		<div class="navbar-content">
			<button class="navbar-close-btn" data-action="toggle-navbar" data-navbar="#nav1"></button>
			<ul class="navbar-items">
				<li class="navbar-item"><a href="${BASE_LINK}">Home</a></li>
			</ul>
			<div ref="login-btn" class="d-flex d-none justify-content-center">
				<a class="btn" href="${BASE_LINK}/login.html ">Login</a>
			</div>
			<div ref="dropdown1" class="d-none navbar-avatar dropdown" style="--dropdown-bg:transparent;">
				<button class="dropbtn">
					<div class="avatar avatar-sm">
						<img src="${BASE_LINK}/Assets/images/avatar.jpg" alt="">
					</div>
					<span class="pl-5" ref="username" ></span>
				</button>
				<ul class="dropdown-content">
					<a href="#">Profile</a>
					<a href="#" data-action="toggle-offcanvas" data-offcanvas="#offcanvas1">Settings</a>
					<a href="#">Logout</a>
				</ul>
			</div>
		</div>
	</nav>
		<div class="offcanvas offcanvas-right" style="transition: 0.2s;" id="offcanvas1">
			<div class="offcanvas-header">
				<h2 class="offcanvas-title">Settings</h2>
				<button class="offcanvas-close-btn icon icon-close" data-action="toggle-offcanvas" data-offcanvas="#offcanvas1"></button>
			</div>
			<div class="offcanvas-body">
				<div class="p-10 d-flex align-items-center">
					<label class="switch">
						<input type="checkbox" id="dark-mode">
						<span class="switch-slider"></span>
					</label>
					<label class="ml-5">Dark Mode</label>
				</div>
			</div>
		</div>
		`
	},
	onRender: async function(arg) {
		let data = await Authentication.info()
		if (!data) {

			this.ref("login-btn").classList.remove("d-none")
		} else {
			this.ref("dropdown1").classList.remove("d-none")
			this.ref("username").text = data.name
		}
		if (mode == "dark") {
			selector.byId("dark-mode").checked = true
		} else {
			selector.byId("dark-mode").checked = false
		}
		selector.byId("dark-mode").on("change", async function(event) {
			let value = event.target.checked

			if (value) {
				await theme.set("mode", "dark")
				document.body.style.setProperty("--body-bg", "#1F1B24")
				document.body.style.setProperty("--body-color", "white")
			} else {
				await theme.set("mode", "light")
				document.body.style.setProperty("--body-bg", "#ffffff")
				document.body.style.setProperty("--body-color", "black")
			}
		})
	},
	onMount: async function() {

	}
})