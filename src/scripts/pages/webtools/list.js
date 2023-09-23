const base = "https://smtdfcwebtools.github.io"
async function loadSource() {
  let response = await axios({
    url: `${base}/webtools/data/sources.json`,
  })
  return response.data.sources
}

async function loadContent(source) {
  let response = await axios({
    url: `${source.repository}/list.json`,
  })
  return response.data.list
}

Turtle.component("webtools-list-page", function($) {
  let tools = [{ tag: "shsh" }]
  $.state = {}
  $.tags = {}
  $.addTag = function(name, source,open = false) {
    let id = generateKey("tag_")
    let div = document.createElement("div")
    div.className = `accordion ${open ? "active":""}`
    div.id = id
    div.innerHTML = `
      <div class="accordion-header" data-toggle="accordion" data-accordion="#${id}" >${name}</div>
      <div class="fade accordion-body"></div>
    `
    div.addEventListener("click", function() {
      if (!$.states[name]) {
        $.states[name] = true
        loadContent(source)
          .then((list) => {
            list.forEach(info => {
              $.addItem(name, info)
            })
          })
      }
    })
    $.refs.list.appendChild(div)
    $.states[name] = false
    $.tags[name] = div.querySelector(".accordion-body")
  }

  $.addItem = function(tag, item) {
    let div = document.createElement("div")
    div.id = generateKey()
    $.tags[tag].appendChild(div)
    div.innerHTML = `
      <div class="tool-info mb-5 d-flex align-items-center justify-content-sb p-4 shadow">
        <div class="d-flex align-items-center">
           <span class="material-symbols-outlined icon">${item.icon ?? "construction" }</span> ${item.name ?? "No name"} 
        </div>
        <span class="material-symbols-outlined">arrow_right_alt</span>      
      </div>
    `
  }

  showLoader()
  $.onRender = function() {
    loadSource()
      .then((source) => {
        $.addTag(source.name, source)
      })
      .catch((err) => {
        app.ui.addMsg("Cannot load content ", "error", 4000)
      })
      .finally(()=>{
        hideLoader()
      })
    
  }

  return `
  <h1>List Tools </h1>
  <div class="" ${Turtle.ref("list")}></div>
  `
})