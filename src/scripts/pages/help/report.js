Turtle.component("help-report-page",function($){
  $.onSubmit = function(e){
    e.preventDefault()
    showLoader()
    $.refs.offcanvas.classList.add("active")
    hideLoader()
    app.ui.addMsg(`
      <div class="d-flex align-items-center">
        <span class="material-symbols-outlined">done</span>
        <span class="ml-4" >Report has been submitted  ! </span>
      </div>
    `, "success", 2500)
  }
  return `
    <div class="fade d-grid offcanvas offcanvas-top" style="height:100%; place-content:center" ${Turtle.ref("offcanvas")}>
      <div class="p-4 text-align-center ">
        <h1>Thanks you !</h1>
        <h3>Your report has been sent to us successfully! Thank you for reporting this issue to us!</h3>
        <br><br>
        <a class="btn btn-primary" href="#/">Goto home page</a>
      </div>
    </div>
    <h1>Error report </h1>
    <h5>You find that our website is not working properly or error . Please fill out this form and send it to us:</h5>
    <br>
    <form class="fade" ${Turtle.events({submit:$.onSubmit})} >
      <input type="text" name="reportid" value="${(Date.now()*Math.floor((Math.random()*1000))).toString(36)}" hidden>
      <div class="form-group">
        <label class="form-label">Types </label>
        <select class="form-select" style="width:90%" >
          <option value="E01">Page failed to load </option>
          <option value="E02">The website is not responding  </option>
          <option value="E03">The page loads successfully but has no content  </option>
          <option value="E04">Other </option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Description :</label>
        <textarea class="form-input" style="min-width:90%; height:10vh;"></textarea>
      </div>
      <br>
      <button class="btn btn-outline-info">Send Report</button>
    </form>
  `
})