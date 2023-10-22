import "../pages/errors/notfound.js"

const router = app.use(Turtle.RouterModule)

router.define({
	element:"#contents",
	type:"hash",
	routes:{
		"/":{
			callback:function({router}){
				router.redirect("/tools/list",true)
			}
		},
		"/tools/list":{
			loader:async ()=>await import("../pages/tools/list.js"),
			component:"list-tool-page"
		}
	}
})

router.on("notfound",function(err){
	err.router.element.innerHTML =`
		<page-not-found></page-not-found>
	`
})
router.start()