const themeButton = document.getElementById("theme-button")
const body = document.getElementById("body")
const sidebar = document.getElementById("main")
const canvas = document.getElementById("canvas")
const table = document.getElementsByClassName("table")

// console.log("ITS HITITNG HERE ((#@HT(GS(GNS")
let DarkOrLight = true
themeButton.addEventListener("click", function() {

	console.log("TRYING TO CHANGE THEMES!!!_!_!_!_!")
	body.style.color = "black"
	body.style["background-color"] = "#9DCAD6"
	sidebar.style["background-color"] = "#F3F3F3"
	canvas.style["background-color"] = "#FFFFFF"
	table.style.border = "1px solid #8B8989"
	table.style["background-color"] = "#B4DAE5"
	table.style["box-shadow"] = "0 8px 6px -5x #757272"
	themeButton.style["background-color"] = ""
	themeButton.style.color = ""
	// else {
	// 	DarkOrLight = !DarkOrLight

	// 	body.style.("color", "#6e8798")
	// 	body.style.("background-color", "#1f2732")
	// 	sidebar.style.("background-color", "#1f2732")
	// 	table.style.("border", "1px solid #3b4752")
	// 	table.style.("background-color","#8A7DA0")
	// 	table.style.("box-shadow", "0 8px 6px -5px #615475")
	// }
})

// if (DarkOrLight) {
//   DarkOrLight = !DarkOrLight

//   console.log("TRYING TO CHANGE THEMES!!!_!_!_!_!")
//   body.css("color", "black")
//   body.css("background-color", "#9DCAD6")
//   sidebar.css("background-color", "#F3F3F3")
//   canvas.css("background-color", "#FFFFFF")
//   table.css("border", "1px solid #8B8989")
//   table.css("background-color", "#B4DAE5")
//   table.css("box-shadow", "0 8px 6px -5px #757272")
// }
// else {
//   DarkOrLight = !DarkOrLight

//   body.css("color", "#6e8798")
//   body.css("background-color", "#1f2732")
//   sidebar.css("background-color", "#1f2732")
//   table.css("border", "1px solid #3b4752")
//   table.css("background-color","#8A7DA0")
//   table.css("box-shadow", "0 8px 6px -5px #615475")
// }
