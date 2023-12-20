var top = "top", bottom = "bottom", inside = "inside"
let todaysTint = 290//Math.floor(350 * Math.random())//293//

var containers = []

var options = ["add-subchapter", "add-bottom", "add-top", "delete"]
var descriptions = ["Add a subchapter", "Add a chapter below", "Add a chapter above", "Delete the chapter"]

let parent = document.getElementById("chapters-container")

class System{
    constructor(){
        this.rescueButton = null
        this.todaysTint = 34
        this.rescueButtonId = "rescue-button"
        this.chapters = []
        this.addRescueButton()
        this.initFileButtons()
        this.initColorMoodInput()
    }

    wtfColor(){
    return "hsl(" + this.todaysTint + Math.floor(10 * Math.random()) + ',' +
    (50 + 50 * Math.random()) + '%,' + 
    (85 + 10 * Math.random()) + '%)'
    }

    initColorMoodInput(){
        this.colorMoodInput = document.getElementById("color-mood")
        this.colorMoodInput.value = "#ffbf66"
        this.todaysTint = this.getHue(this.colorMoodInput.value)
        this.colorMoodInput.addEventListener("change", (event) => {this.todaysTint = this.getHue(event.target.value)})
    }

    getHue(color){
        let value = color

        let r = parseInt(value.substr(1, 2), 16) / 255
        let g = parseInt(value.substr(3, 2), 16) / 255
        let b = parseInt(value.substr(5, 2), 16) / 255
        let hue = 0
        let max = Math.max(r, g, b)
        let min = Math.min(r, g, b)
        let amplisuda = max - min

        if (max == r) hue = (g - b) / amplisuda
        else if (max == g) hue = 2.0 + (b - r) / amplisuda
        else hue = 4.0 + (r - g) / amplisuda
        hue *= 60

        if (hue < 0) {
          hue += 360;
        }
        return hue
    }

    raiseSingleChapterMessage(){
        let message = document.createElement("div")
        message.classList.add("message")
        message.innerHTML = `<p>Document should have at least one chapter.</p>`
        document.querySelector("body").appendChild(message)
        setTimeout(() => {message.remove()}, 1000)
    }

    enoughChaptersLeft(){
        let e = document.getElementsByClassName("chapter")
        if (e.length > 1)
        return true

    }

    initFileButtons(){
        document.getElementById("import-button").onclick = () => {this.importStory()}
        document.getElementById("export-button").onclick = () => {this.exportStory()}
    }

    chaptersToJSON(){
        //document.get
    }

    importStory(){
        document.removeChild(parent)
    }

    exportStory(){

    }

    addRescueButton(){ 
        this.rescueButton = document.createElement("p")
        this.rescueButton.innerHTML = `There is no chapters. Click this and start writing ^_^`
        this.rescueButton.id = this.rescueButtonId
        this.rescueButton.classList.add("info-empty")
        this.rescueButton.onclick = () => { new Chapter(parent, "", "", "first", null) }
        parent.appendChild(this.rescueButton)
     }

    showRescueButton(){ this.rescueButton.style.visibility = "visible" }

    removeRescueButton(){ this.rescueButton.style.visibility = "hidden" }

    removeChapter(container){
        //if (this.enoughChaptersLeft()) 
        container.remove()
            //this.raiseSingleChapterMessage()
        if (document.getElementsByClassName("chapter").length < 1)
            this.showRescueButton()
    }
}

class Button {
    constructor(chapterContainer, container, id, role) {
        this.id = id;
        this.role = role;
        this.icon = "./icons/" + role + ".png";
        this.chapterContainer = chapterContainer;
        this.ct = container;
        this.leButton = document.createElement("button");
        this.leButton.classList.add('chapter-button');
        this.leButton.dataset.id = id;
        this.leButton.innerHTML = 
        `<img src=` + this.icon + `>`;
        this.leButton.title = descriptions[options.indexOf(this.role)]
        this.ct.appendChild(this.leButton);
        this.leButton.addEventListener("click", this.onClick.bind(this));
    }
  
    onClick() {
        const button = event.currentTarget;
        let id = button.dataset.id
        let ct = document.getElementById("chapter-" + id)

        switch (this.role) {
            case "add-bottom":
                new Chapter(ct, "", "", bottom, id);
                break;
            case "add-top":
                new Chapter(ct, "", "", top, id);
                break;
            case "delete":
                sy.removeChapter(button.parentNode.parentNode)
                //containers = containers.filter(o => o.id !== parseInt(id)); //to fix
                break;
            case "add-subchapter":
                new Chapter(ct, "", "", inside, id);
                //this.chapterContainer.appendChild(newChapter.chapterOsnova);
                break;
        }
    }
}

var sy = new System()


let headers = ["chapter 1"]
let texts = ["This is a web app for writers, which helps to organize stories through sections. More functionality soon! QvQ"]


class Chapter{
    constructor(master, title, text, order, prevId){
        this.id = Date.now(); //"chapter-" + i
        this.title = title
        this.text = text
        this.chapterOsnova = document.createElement("div");
        this.master = master
        this.prev = document.getElementById("chapter-" + prevId)

        //let parent = master
        this.chapterOsnova.classList.add('chapter')
        this.chapterOsnova.id = "chapter-" + this.id //i
        this.chapterOsnova.innerHTML = 
        `<div class="chapter-header" id="chapter-header-` + this.id + `" contenteditable>` + title + `</div>
        <div class="chapter-text" id="chapter-text-` + this.id + `" width="100%" contenteditable>` + text + `</div>`
        this.chapterOsnova.dataset.id = this.id 
        this.chapterOsnova.style.backgroundColor = sy.wtfColor()
        this.chapterOsnova.firstChild.setAttribute("placeholder", "title");
        this.chapterOsnova.lastChild.setAttribute("placeholder", "text");

        this.buttonContainer = document.createElement("div");
        this.buttonContainer.classList.add('chapter-button-container')

        this.subChapterContainer = document.createElement("div");
        this.subChapterContainer.classList.add("subchapter")
        this.subChapterContainer.id = "subchapter-" + this.id

        this.chapterOsnova.appendChild(this.buttonContainer)
        this.chapterOsnova.appendChild(this.subChapterContainer)

        for (let c = 0; c < options.length; c++)
            new Button(this.chapterOsnova, this.buttonContainer, this.id, options[c]);

   
        this.chapterOrder(order, prevId)
        sy.removeRescueButton()
        containers.push(this)
    }

    chapterOrder(order, prevId) {
        switch (order) {
        case top:
            this.prev.parentNode.insertBefore(this.chapterOsnova, this.prev);
            //document.getElementById("main-page").insertBefore(this.chapterOsnova, prev);
            break;
        case bottom:
            this.prev.insertAdjacentElement("afterend", this.chapterOsnova);
            break;
        case inside:
            document.getElementById("subchapter-" + prevId).appendChild(this.chapterOsnova);
            //master.appendChild(this.chapterOsnova);
            break;
        default:
            this.master.appendChild(this.chapterOsnova);
            break;
        }
    }

}

// DEFAULT
for (i = 0; i < headers.length; i++){
    containers.push(new Chapter(parent, headers[i], texts[i]), null, null)
}