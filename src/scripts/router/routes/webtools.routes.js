export const webtools_routes = {
  "/webtools/list":{
    title:"Webtools",
    component:"webtools-list-page",
    loader:async ()=>await import("../../pages/webtools/list.js")
  }
}