window.Turtle.createComponent("logout-confirm", {
	render: function() {
		return `
			<div class="modal active" >
				<div class="modal-content">
					<div class="modal-header">
						<div class="modal-header-text">Logout?</div>
					</div>
					<hr>
					<div class = "modal-body" >
						<p>You definitely want to continue ?</p> 
						<button ref="logout"  class ="btn btn-danger"> Logout </button> 
						<button ref="cancel" class ="btn"> Cancel </button> 
					</div>
				</div>
			</div>
		`
	},
	onRender: function() {
		this.ref("logout").on("click", async function() {
			try {
				await Authentication.logout()
				window.location ="./login.html"
			} catch {
				alert("An error occurred !")
				window.location ="./index.html"
			}
		})
		
		this.ref("cancel").on("click",function(){
			window.location ="./index.html"
		})

	}
})