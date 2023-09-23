window.app = new Turtle.TurtleApp(
  document.querySelector("#root")
)

app.use(TurtleUI.TurtleUIModule)

window.addEventListener("offline",function(e){
  app.ui.addMsg(`
  <div class="d-flex align-items-center">
    <span class="material-symbols-outlined">wifi_off</span>
    <span class="ml-4" >No internet connection ! </span>
  </div>
  `,"error",1500)
})

function showLoader(){
  document.querySelector("#main-loader").classList.remove("d-none")
}

function hideLoader(){
  document.querySelector("#main-loader").classList.add("d-none")
}

function generateKey(prefix="_"){
  return `${prefix}${(Math.floor(Math.random()*1000000)*Date.now()).toString(16)}`
}

window.addEventListener("online", function(e) {
  app.ui.addMsg(`
  <div class="d-flex align-items-center">
    <span class="material-symbols-outlined">wifi</span>
    <span class="ml-4" >Internet connected ! </span>
  </div>
  `, "success", 1000)
})

app.render(`
  <page-content>
    <div class="d-flex justify-content-center" >
      <div class="line-loader loader-info">
        <span></span>
      </div>
    </div>
  </page-content>
`)

async function init() {
  await import("./components/page.js")
  await import("./router/main.js")
}

init()
  .then(() => {

  })
''