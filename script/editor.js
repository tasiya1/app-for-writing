var top = "top", bottom = "bottom", inside = "inside"
let todaysTint = 293//Math.floor(350 * Math.random())

var containers = []

var options = ["add-subchapter", "add-bottom", "add-top", "delete"]
var descriptions = ["Add a subchapter", "Add a chapter below", "Add a chapter above", "Delete the chapter"]

let parent = document.getElementById("main-page")

function wtfColor(){
    return "hsl(" + todaysTint + Math.floor(10 * Math.random()) + ',' +
    (25 + 70 * Math.random()) + '%,' + 
    (85 + 10 * Math.random()) + '%)'
}

function raiseSingleChapterMessage(){
    let message = document.createElement("div")
    message.classList.add("message")
    message.innerHTML = `<p>Document should have at least one chapter.</p>`
    document.querySelector("body").appendChild(message)
    setTimeout(() => {message.remove()}, 1000)
}

function enoughChaptersLeft(){
    return document.getElementsByClassName("chapter").length > 1
}

function removeChapter(container){
    if (enoughChaptersLeft()) container.remove()
    else raiseSingleChapterMessage()
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
                new Chapter(ct, i, "", "", bottom, id);
                break;
            case "add-top":
                new Chapter(ct, i, "", "", top, id);
                break;
            case "delete":
                removeChapter(button.parentNode.parentNode)
                //containers = containers.filter(o => o.id !== parseInt(id)); //to fix
                break;
            case "add-subchapter":
                new Chapter(ct, i, "", "", inside, id);
                //this.chapterContainer.appendChild(newChapter.chapterOsnova);
                break;
        }
    }
}


let headers = ["chapter 1"]
let texts = ["I am so tired today. but this feels so awesome. I am writing a web app fow writers, which helps to organize stories and its chapters. More functionality soon! QvQ"]


class Chapter{
    constructor(master, i, title, text, order, prevId){
        this.id = Date.now(); //"chapter-" + i
        this.title = title
        this.text = text
        this.chapterOsnova = document.createElement("div");
        
        let prev = document.getElementById("chapter-" + prevId)

        //let parent = master
        this.chapterOsnova.classList.add('chapter')
        this.chapterOsnova.id = "chapter-" + this.id //i
        this.chapterOsnova.innerHTML = 
        `<div class="chapter-header" id="chapter-header-` + this.id + `" contenteditable>` + title + `</div>
        <div class="chapter-text" id="chapter-text-` + this.id + `" width="100%" contenteditable>` + text + `</div>`
        this.chapterOsnova.dataset.id = this.id 
        this.chapterOsnova.style.backgroundColor = wtfColor()
        this.chapterOsnova.firstChild.setAttribute("placeholder", "title");
        this.chapterOsnova.lastChild.setAttribute("placeholder", "text");

        this.buttonContainer = document.createElement("div");
        this.buttonContainer.classList.add('chapter-button-container')

        this.subChapterContainer = document.createElement("div");
        this.subChapterContainer.id = "subchapter-" + this.id

        this.chapterOsnova.appendChild(this.buttonContainer)
        this.chapterOsnova.appendChild(this.subChapterContainer)

        for (let c = 0; c < options.length; c++)
            new Button(this.chapterOsnova, this.buttonContainer, this.id, options[c]);

        switch (order) {
            case top:
                prev.parentNode.insertBefore(this.chapterOsnova, prev);
                //document.getElementById("main-page").insertBefore(this.chapterOsnova, prev);
                break;
            case bottom:
                prev.insertAdjacentElement("afterend", this.chapterOsnova);
                break;
            case inside:
                document.getElementById("subchapter-" + prevId).appendChild(this.chapterOsnova);
                //master.appendChild(this.chapterOsnova);
                break;
            default:
                master.appendChild(this.chapterOsnova);
                break;
        }
        containers.push(this)
    }

}

for (i = 0; i < headers.length; i++){
    containers.push(new Chapter(parent, i, headers[i], texts[i]), null, null)
}