class Container{
    constructor(i, title, text){
        this.id = i
        this.title = title
        this.text = text
    }
}

let headers = ["chapter 1", "chapter 2"]
let texts = ["I am so tired today. but this feels so awesome. I am writing a web app fow writers, which helps to organize stories and its chapters. More functionality soon! QvQ", "Hello Elven World!"]
var containers = []

parent = document.getElementById("main-page")

for (i = 0; i < headers.length; i++){
    containers.push(new Container(i, headers[i], texts[i]))

    /*let container = parent
    let header = document.createElement("div");
    header.classList.add("chapter-header")
    header.textContent = containers[i].header;

    let text = document.createElement("div");
    text.classList.add("chapter-text")
    text.textContent = containers[i].text;
    container.appendChild(text);
    */

    parent = document.getElementById("main-page")
    let newChapter = document.createElement("div");
    newChapter.classList.add('chapter')
    newChapter.innerHTML = 
    `<div class="chapter-header" id="chapter-header-` + i + `" contenteditable>` + containers[i].title + `</div>
    <div class="chapter-text" id="chapter-text-` + i + `" width="100%" contenteditable>` + containers[i].text + `</div>`

    parent.appendChild(newChapter);
}