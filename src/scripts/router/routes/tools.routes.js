export const tools_routes = {
  "/tools/list":{
    title:"Tools",
    component:"tools-list-page",
    loader:async ()=>await import("../../pages/tools/list.js")
  }
}