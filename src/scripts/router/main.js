import {help_routes} from "./routes/help.routes.js"
import {webtools_routes} from "./routes/webtools.routes.js"
const router = app.use(Turtle.RouterModule)

router.define({
  element:"#contents",
  routes:{
    "/":{
      title:"Home",
      component:"home-page"
    },
    ...help_routes,
    ...webtools_routes
  }
})

router.on("notfound",function(err){
  err.router.element.innerHTML=`
    <div class="d-flex align-items-center flex-col">
      <h1 style="margin-bottom:0;font-size:100px;">404</h1>
      <br>
      <h1 class="mt-2 m-0">Page not found</h1>
      <br>
      <a class="btn btn-primary" href="#/">Goto home page</a>
    </div>
  `
})

router.start()