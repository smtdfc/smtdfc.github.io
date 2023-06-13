window.Turtle.createComponent("user-avatar",{
	render:function(){
		return `
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
					<a href="./logout.html">Logout</a>
				</ul>
			</div>
		`
	},
	onRender:function(){
		if (!user) {
			this.ref("login-btn").classList.remove("d-none")
		} else {
			this.ref("dropdown1").classList.remove("d-none")
			this.ref("username").text = user.name
		}
	}
})