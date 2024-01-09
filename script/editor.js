var top = "top", bottom = "bottom", inside = "inside"

var containers = []

var options = ["add-subchapter", "add-top", "add-bottom", "delete"]
var descriptions = ["Add a subchapter", "Add a chapter below", "Add a chapter above", "Delete the chapter"]

let parent = document.getElementById("chapters-container")

class System{
    constructor(){
        this.rescueButton = null
        this.colorTheme = "#ffbf66"
        this.todaysTint = 34
        this.tintRange = 15
        this.chapterArray = []
        this.jsonChapterArray = []
        this.rescueButtonId = "rescue-button"
        this.mode = "day"
        this.chapters = []
        this.addRescueButton()
        this.initMenu()
        this.initDrag()
        this.initColorMoodInput()
        this.initSelectionDealer()
        this.beforeClosing()
    }

    wtfColor(target){
        let color = this.colorTheme
        switch (target) {
            case "chapter":
                color += "88"
                break;
            case "border":
                color += "bb"
                break;
        
            default:
                break;
        }
        return color
    }

    setColorTheme(){

    }

    initMenu(){
        this.initFileReader()
        document.getElementById("import-button").onclick = () => {this.importStory()}
        document.getElementById("export-button").onclick = () => {this.exportStory()}
        document.getElementById("switch-mode-button").onclick = () => {this.switchMode()}
        document.getElementById("open-menu-button").addEventListener("click", this.openSidebar)
        document.getElementById("close-menu-button").addEventListener("click", this.closeSidebar)
        document.body.addEventListener('keydown', (e) => {this.manageKeys(e)})
    }

    manageKeys(e){
        if (e.key == "m") {this.openSidebar()}
        if (e.key == "Escape") {this.closeSidebar()}
    }

    initDrag(){
        const chaptersContainer = document.getElementById('chapters-container')
        new Sortable(chaptersContainer, { handle: ".drag-button", animation: 350, chosenClass: "chapter-chosen", dragClass: "chapter-drag" })
    }

    switchMode(){
        document.querySelector('label[for="switch-mode-button"]').innerHTML = "Switch to " + this.mode +" mode"

        switch (this.mode) {
            case "night":
                this.mode = "day"
                break;
            case "day":
                this.mode = "night"
                break;
            default:
                break;
        }
        document.getElementById("mode-img").src = "icons/" + this.mode + ".png"
        document.body.classList = this.mode
    }

    getSelectedText(){
        document.activeElement.style.backgroundColor = "#9900ff"
    }

    initSelectionDealer(){

    }

    beforeClosing(){
        window.onbeforeunload = function() {return ""}
    }

    closeSidebar(){
        document.getElementById("menu").classList.remove('opened') //style.width = "0px"
    }

    openSidebar(){
        document.getElementById("menu").classList.add('opened')// style.width = "400px"
    }

    initColorMoodInput(){
        this.colorMoodInput = document.getElementById("color-mood")
        this.colorMoodInput.value = this.colorTheme
        this.todaysTint = this.getHue(this.colorMoodInput.value)
        this.colorMoodInput.addEventListener("input", (event) => {
            this.colorTheme = event.target.value
            this.todaysTint = this.getHue(this.colorTheme)
            document.querySelectorAll('.chapter').forEach(element => {
                element.style.backgroundColor = this.wtfColor("chapter")
                element.style.borderColor = this.wtfColor("border")
                console.log(element.style.backgroundColor)
            });
        })
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
          if (hue < 0)
          console.warn("color is weird...")
        }
        return hue
    }

    raiseMessage(messageText){
        let message = document.createElement("div")
        message.classList.add("message")
        message.innerHTML = `<p>` + messageText +`</p>`
        document.querySelector("body").appendChild(message)
        setTimeout(() => {message.remove()}, 1000)
    }

    filterText(){
        
    }

    chaptersToJSON(){
        this.chapterArray = this.findMyKids(parent)
    }

    initFileReader(){
        let fileInput = document.getElementById("file-input")
        fileInput.addEventListener('change', (event) => {
            let file = event.target.files[0]
            let reader = new FileReader()

            reader.onload = () => {
                let content = reader.result
                this.chapterArray = (JSON.parse(reader.result))
                console.log(this.chapterArray)
                this.clearField()
                document.getElementById("story-title").firstChild.innerHTML = this.chapterArray.title
                this.colorTheme = this.chapterArray.colorTheme
                this.appendChapters(this.chapterArray.chapters)
                document.getElementById("file-input").value = null
            }

            reader.onerror = () => { console.error('Error reading the file') }

            reader.readAsText(file, 'utf-8')
        })
    }

    clearField(){
        document.getElementById('chapters-container').querySelectorAll('.chapter').forEach(element => {element.remove()});
    }

    importStory(){
        this.closeSidebar()
        document.getElementById("file-input").click()
    }

    exportStory(){
        this.chapterArray = {title: document.getElementById("story-title").firstChild.innerHTML, chapters: this.findMyKids(parent),
                            colorTheme: this.colorTheme} 
        this.writeFile(this.chapterArray)
    }
    
    appendChapters(chapters){
        for (let chapter of chapters){
            new Chapter(parent, chapter.id, chapter.title, chapter.text, null, null, chapter.children)
        }
    }

    findMyKids(subchapterContainer){
        let kids = subchapterContainer.children
        let kidsArray = []
        if (kids.length != 0){
            for (let chapter of kids){
                let id = chapter.dataset.id// getAttribute('id')
                let chapterEl = {id: id,
                                title: chapter.querySelector('.chapter-header').innerHTML,
                                text: chapter.querySelector('.chapter-text').innerHTML,
                                children: this.findMyKids(chapter.querySelector('.subchapter'))}
                kidsArray.push(chapterEl)
            } return kidsArray
        }
        else return []
    }

    writeFile(chaptersArr){
        let jsonData = JSON.stringify(chaptersArr)
        let blob = new Blob([jsonData], { type: "application/json" })
        let dat = document.createElement('a')
        dat.href = URL.createObjectURL(blob);
        let title = document.getElementById("story-title").querySelector('p').innerHTML
        dat.download = title + ".json"
        dat.click()
    }

    addRescueButton(){ 
        this.rescueButton = document.createElement("p")
        this.rescueButton.innerHTML = `There is no chapters. Click this and start writing ^_^`
        this.rescueButton.id = this.rescueButtonId
        this.rescueButton.classList.add("info-empty")
        this.rescueButton.onclick = () => { new Chapter(parent, null, "", "", "first", null) }
        document.getElementById("message-empty").appendChild(this.rescueButton)
     }

    showRescueButton(){ document.getElementById("message-empty").style.visibility = "visible" }

    removeRescueButton(){ document.getElementById("message-empty").style.visibility = "hidden" }

    removeChapter(container){
        container.classList.add('to-be-removed')
        setTimeout(() => {container.remove()
        if (document.getElementsByClassName("chapter").length < 1)
            this.showRescueButton()}, 500)            
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
                new Chapter(ct, null, "", "", bottom, id);
                break;
            case "add-top":
                new Chapter(ct, null, "", "", top, id);
                break;
            case "delete":
                sy.removeChapter(button.parentNode.parentNode)
                break;
            case "add-subchapter":
                new Chapter(this.chapterContainer, null, "", "", inside, id);
                break;
        }
    }
}

var sy = new System()


let headers = ["chapter 1"]
let texts = ["This is a web app for writers, which helps to organize stories through sections. More functionality soon! QvQ"]


class Chapter{
    constructor(master, id, title, text, order, prevId, kids){
        id != null? this.id = id : this.id = Date.now(); //"chapter-" + i        
        this.title = title
        this.text = text
        this.chapterOsnova = document.createElement("div");
        this.master = master
        this.prevId = prevId
        this.prev = document.getElementById("chapter-" + prevId)

        this.chapterOsnova.classList.add('chapter')
        this.chapterOsnova.id = "chapter-" + this.id //i

        this.foldButton = document.createElement("button")
        this.foldButton.classList.add("fold-button")
        this.foldButton.id = "fold-button-" + this.id
        this.foldButton.dataset.id = this.id
        this.foldButton.innerHTML = `<img src = "./icons/arrow.png" width="20px">`
        this.chapterOsnova.appendChild(this.foldButton)

        this.chapterOsnova.innerHTML += 
        `<div class="chapter-header" id="chapter-header-` + this.id + `" contenteditable>` + title + `</div>
        <div class="chapter-text" id="chapter-text-` + this.id + `" width="100%" contenteditable>` + text + `</div>`
        this.chapterOsnova.dataset.id = this.id 
        this.chapterOsnova.style.backgroundColor = sy.wtfColor("chapter")
        this.chapterOsnova.style.borderColor = sy.wtfColor("border")
        this.chapterOsnova.firstChild.setAttribute("placeholder", "title");
        this.chapterOsnova.lastChild.setAttribute("placeholder", "text");

        this.buttonContainer = document.createElement("div");
        this.buttonContainer.classList.add('chapter-button-container')

        this.subChapterContainer = document.createElement("div");
        this.subChapterContainer.classList.add("subchapter")
        this.subChapterContainer.id = "subchapter-" + this.id

        this.dragButton = document.createElement("div")
        this.dragButton.classList.add("drag-button")
        this.dragButton.innerHTML = `<img src = "./icons/drag.png" height="30px">`
        
        this.chapterOsnova.appendChild(this.dragButton)
        this.chapterOsnova.appendChild(this.subChapterContainer)
        this.chapterOsnova.appendChild(this.buttonContainer)
        

        for (let c = 0; c < options.length; c++)
            new Button(this.chapterOsnova, this.buttonContainer, this.id, options[c]);

   
        this.chapterOrder(order, prevId)
        this.dragMeOn()
        if (kids != null) if (kids.length != 0)
            this.takeCareOfKids(kids, this)
        sy.removeRescueButton()
        document.getElementById(this.foldButton.id).addEventListener("click", this.foldButtonDoYourJob.bind(this))

        //containers.push(this)
    }

    takeCareOfKids(kids, chapter){
        for (let kid of kids){
            new Chapter(chapter, kid.id, kid.title, kid.text, inside, chapter.id, kid.children)
        }
    }

    chapterOrder(order, prevId) {
        switch (order) {
        case top:
            this.prev.parentNode.insertBefore(this.chapterOsnova, this.prev);
            break;
        case bottom:
            this.prev.insertAdjacentElement("afterend", this.chapterOsnova);
            break;
        case inside:
            document.getElementById("subchapter-" + prevId).appendChild(this.chapterOsnova);
            break;
        default:
            this.master.appendChild(this.chapterOsnova);
            break;
        }
    }
    
    dragMeOn(){
        const thisChapter = document.getElementById("subchapter-" + this.id)
        new Sortable(thisChapter, { handle: ".drag-button", animation: 350, chosenClass: "chapter-chosen", dragClass: "chapter-drag" })

    }

    foldButtonDoYourJob(){
        const button = event.currentTarget;
        let id = button.dataset.id
        let ct = document.getElementById("chapter-" + id)

        if (!(ct.classList.contains("folded"))){
            ct.classList.add("folded")
        }
        else {
            ct.classList.remove("folded")
        }
    }
}

// DEFAULT
for (i = 0; i < headers.length; i++){
    containers.push(new Chapter(parent, null, headers[i], texts[i], null, null, null))
}
