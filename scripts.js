/*function download(url) {
    console.log("awawawa")
    const a = document.createElement('a')
    a.href = url;
    a.download = url.split('/').pop()
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    console.log("bewh")
}

function loadDoc(url, dest) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        document.getElementById(dest).innerHTML = this.responseText;
    }
    xhttp.open("GET", url, tru);
    xhttp.send();
} */

/*import {readFile} from 'node:fs/promises';

const fs = require('node:fs');

fs.readFile('project_timeline.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
});*/

/*
function readTimeline() {
    //https://developer.mozilla.org/en-US/docs/Web/API/FileSystemDirectoryEntry/getFile
    const reader = new FileReader();

    reader.readAsText("project_timeline.txt");
    //reader.addEventListener("load",)
    console.log(reader.result);
    
    timeline = FileSystemDirectoryEntry.getFile("project_timeline.txt").file();

    console.log(timeline);
} */

//Read and return text from file
/* 
 * @param fp : path of file to read
 * @return   : string from the read file, or null
 *
 * */
async function readPublicTextFile(fp) {
    try {
        //Files in /public are served from root URL
        const response = await fetch(fp);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        //await the HTTP response
        text = await response.text();
        //output string to console
        console.log(text);
        //return string
        return text;
        
    } catch (error) {
        console.error('Failed to read the file:', error);
        return null;
    }
}

//Build HTML unordered list from text
/*
 * @param str  : text to split and put into unordered list
 * @param delim: delimiter to search for in text when splitting
 * @return     : string of HTML-tagged text
 * 
 * */
async function buildUnorderedListFromText(str, delim) {

    //Split raw text by newlines
    const splitText = str.split(delim);
    console.log(splitText);

    //Init the HTML string starting tag
    var liFag = false;
    var HTMLStr = "";
    //Concat the strings with list element tags
    //TODO: nest the <ul></ul> cases within the content cases?
    splitText.forEach(e => {
        eTrim = e.trim()
        if (eTrim.charAt(0) == '-' && !liFag) {
            liFag = true;
            HTMLStr = HTMLStr.concat("<ul><li>", eTrim, "<li>");
        }
        else if (eTrim.charAt(0) == '-' && liFag) {
            HTMLStr = HTMLStr.concat("<li>", eTrim, "</li>"); 
        } else if (liFag) {
            liFag = false;
            HTMLStr = HTMLStr.concat("</ul><p>", eTrim, "</p>")
        } else {
            liFag = false;
            HTMLStr = HTMLStr.concat("<p>", eTrim, "</p>");
        }
    });
    console.log(HTMLStr);

    
    return HTMLStr;
}

//Build HTML from text file at file path fp
async function buildHTMLFromFile(fp) {

    //Read raw text from file
    const text = await readPublicTextFile(fp);
    //Embed raw text in html tags
    const HTMLStr = await buildUnorderedListFromText(text, /\r?\n/);
    console.log(HTMLStr);

    return HTMLStr;
}

//const fp = '/project_timeline.txt'
//buildHTMLFromFile(fp);

console.log("scripts file has been read and loaded")