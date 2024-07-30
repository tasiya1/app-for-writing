let pParent = document.getElementById("theme-container")

class Palette{
    constructor(title, colors){
        this.title = title
        this.colors = colors
        this.appendPalette()
    }
    
    appendPalette(){
        let c = document.createElement("div")
        let h = document.createElement("h4")
        h.innerText = this.title
        c.appendChild(h)

        let p = document.createElement("div")
        p.classList.add("palette-cell-container")

        for (let c of this.colors){
            p.innerHTML += "<div class=\"palette\" data-palette=\"" + c + "\" style=\"background-color: " + c +"\"></div>"
        }
        c.appendChild(p)
        c.style.display = "flex"
        c.style.alignItems = "center"
        c.style.flexDirection = "column"
        pParent.appendChild(c)
    }
}

new Palette("Classic", ["#ffb861", "#bef084", "#84f0e9", "#f57fb0", "#f4f495", "#afabbf", "#c5adff", "#6ab0fb", "#ffff14", "#fb4b8f", "#0084ff", "#2ad100"])
new Palette("Spring", ["#FFF5E3", "#CD4536", "#BC9678", "#FFCBA2", "#8AC6D1", "#E69618", "#FFE9B2", "#ECE874", "#EE9797", "#6DA3DD", "#889B5E", "#C9B984"])
new Palette("Contrast", ["#0800f0", "#f00000", "#00f02c", "#f08c00", "#f000dc", "#00a4f0", "#a800f0", "#d0f000", "#f0dc00", "#94004a", "#01fefa", "#90fe01"])
new Palette("Monochrome", ["#d6d6d6", "#9c9c9c", "#787878", "#616161", "#404040", "#2e2e2e", "#000000", "#a3a3a3", "#4f4f4f", "#f5f5f5", "#8f8f8f", "#141415"])


let palette = document.querySelectorAll(".palette")
        palette = Array.from(palette)
        palette.forEach(palette_color => {
            palette_color.addEventListener("click", (event) => {
                sy.colorTheme = palette_color.dataset.palette

                document.querySelectorAll('.chapter').forEach(element => {
                    element.style.backgroundColor = sy.wtfColor("chapter")
                    element.style.borderColor = sy.wtfColor("border")
                    console.log(element.style.backgroundColor)
                });
            })    
        })