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
				<li class="navbar-item">
					<a href="#">Tools</a>
					<ul class="navbar-subitems">
						<li><a href="${BASE_LINK}/webtool.html" >Web Tool</a></li>
					</ul>
				</li>
			</ul>
			<user-avatar></user-avatar>
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
	},
	onMount: async function() {

	}
})