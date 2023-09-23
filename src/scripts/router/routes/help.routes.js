export const help_routes ={
  "/help/report":{
    title:"Report ",
    component:"help-report-page",
    loader:async()=>{await import("../../pages/help/report.js")}
  }
}