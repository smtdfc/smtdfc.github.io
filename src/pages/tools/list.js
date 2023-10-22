Turtle.component("group-items", function($) {
	let items = $.props.list ?? []
	let title = $.props.title
	$.onRender = function() {
		items.forEach((item) => {
			const { list } = $.refs
			let div = document.createElement("div")
			div.className = "item"
			div.innerHTML = `
        <img class="icon" src="${item.img}" alt="tool_icon">
        <span>${item.title}</span>
      `

			div.onclick = function() {
				window.location = item.link
			}

			list.addChild(div)
		})
	}
	return `
    <div class="group">
      <h3>${title}</h3>
      <div class="menu" ${Turtle.ref("list")}></div>
    </div>
  `
})

Turtle.component("list-tool-page", function($) {
	return `
		<group-items 
			${Turtle.props({
				title:"Math tools",
				list:[
					{
						title:"Calculator",
						img:"./assets/image "
					}
				]
			})}
		></group-items>
		<br>
		<group-items 
			${Turtle.props({
				title:"Web tools",
				list:[
					{
						title:"Calculator",
						img:"./assets/image "
					}
				]
			})}
		></group-items>
	`
})