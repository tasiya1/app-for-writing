# <img src="https://github.com/tasiya1/story-cell/blob/main/icons/logo-small.png?raw=true" height="30"/> StoryCell



## Description

StoryCell is a web editor that provides user with tools for writing and organizing stories in so-called cells. The user can add cells in the desired order, hide or remove them, and create inner-cells(or subchapters) of a story. The design of the website is mobile-friendly an is accessible through all the modern browsers.



### Preview

![image](https://github.com/tasiya1/story-cell/assets/89709254/2f74f373-ad63-450e-8b8d-73b616e3d2d8)

**The tool is available via this [link](https://storycell.netlify.app/).**



## Features

StoryCell is a simple editor with next features:

- Organize your stories with cells
- Set custom color theme
- Paste images
- Place chapters in the desired order
- Import and export stories as JSON



The project is being frequently updated, so there is going to be a lot more features! These include creating a multi-story project, tabs interface, user registration, cloud storage feature and more. 

![GitHub last commit (by committer)](https://img.shields.io/github/last-commit/tasiya1/story-cell)

## How to use StoryCell

The interface of the StoryCell editor is very simple and intuitive.

1. Adding cells.

   On the start you see a chapter with a default message. You can remove  To add new chapter you can click the next buttons:

    - ![image](https://github.com/tasiya1/story-cell/assets/89709254/b628cbe3-30b3-4fa7-a73a-6f0bbf639c4f) - add a cell above
    - ![image](https://github.com/tasiya1/story-cell/assets/89709254/305ba991-f67c-4dae-843b-6f93a01a649c) - add a cell below
    - ![image](https://github.com/tasiya1/story-cell/assets/89709254/9477224e-cf36-4b08-8d40-45923e154ae8) - add a cell inside

2. In the created cell you can write text, paste images and paste any stylized html elements you want.

3. To remove a cell you can click ![image](https://github.com/tasiya1/story-cell/assets/89709254/13157a42-06ef-4313-8fca-ea2552df2762)
 . When there is no cells left, the message appears. Click on a message to create a first cell.

4.  On the left there is menu button. The menu sidebar contains the next options:

   - ![image](https://github.com/tasiya1/story-cell/assets/89709254/d280741a-62a7-46e9-b103-f9092e01996c) - Load a story from device and edit it.
   - ![image](https://github.com/tasiya1/story-cell/assets/89709254/c262b665-cffe-4361-b867-4f8374cede28) - Download story to your device as JSON file.
   - ![image](https://github.com/tasiya1/story-cell/assets/89709254/8187839c-b1f4-41d3-9244-6aaaf133e010) - Set any color theme you want with a color picker.

5. Easily collapse the unused cells by clicking on the small arrows.
   ![image](https://github.com/tasiya1/story-cell/assets/89709254/fb243a47-2e26-4fe3-ba0f-1636fd9e073e)


## Structure of story

StoryCell saves stories in accessible human-readable JSON-files.
The structure of saved data is shown below.

| Property   | Description                 |
| :--------- | --------------------------- |
| title      | The title of document       |
| chapters   | Array of Chapter objects    |
| colorTheme | The color theme of document |

And each Chapter object is structured like:

| Property | Description                      |
| -------- | -------------------------------- |
| title    | The title of chapter             |
| text     | The contents of chapter          |
| children | Array of derived Chapter objects |

As you can see this structure is tree-like and is visually understandable.


## Technologies used

StoryCell is supported by all modern browsers and uses the standard tools:

- HTML
- CSS
- JavaScript

![GitHub top language](https://img.shields.io/github/languages/top/tasiya1/simple-write)

For production environment I've used the Microsoft Visual Studio Code and for the cross-platform testing the website I've used [BrowserStack](www.browserstack.com). For the hosting platform I've chosen [Netlify](https://www.netlify.com/).

