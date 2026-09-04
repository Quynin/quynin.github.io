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
//This currently does not recognise sub-layers of a list
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
    var liFlag = false;
    var HTMLStr = "";
    //Concat the strings with list element tags
    //TODO: nest the <ul></ul> cases within the content cases?
    //replace REGEX from example https://stackoverflow.com/questions/26156292/trim-specific-character-from-a-string
    splitText.forEach(e => {
        eTrim = e.trim()
        if (eTrim.charAt(0) == '-' && !liFlag) {
            liFlag = true;
            HTMLStr = HTMLStr.concat("<ul><li>", eTrim.replace(/^\-+|\ +/, ""), "<li>");
        }
        else if (eTrim.charAt(0) == '-' && liFlag) {
            HTMLStr = HTMLStr.concat("<li>", eTrim.replace(/^\-+|\ +/, ""), "</li>"); 
        } else if (liFlag) {
            liFlag = false;
            HTMLStr = HTMLStr.concat("</ul><p>", eTrim, "</p>")
        } else {
            liFlag = false;
            HTMLStr = HTMLStr.concat("<p>", eTrim, "</p>");
        }
    });
    console.log(HTMLStr);

    
    return HTMLStr;
}

//Build HTML from text file at file path fp
/*
 * @param fp : path of file to read and whose contents to convert to HTML
 *
 * @return   : HTML string
 */
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

//Reads and returns the contents of the common header html file
/*
 * @param headerFP : path of common header elements file to read
 * 
 * @return         : HTML string
 */
async function getCommonHeaderElements(headerFP = "pages/header.html") {
    
    //Read raw file contents from header file
    const header = await readPublicTextFile(headerFP);
    console.log("BBBB: " + header);

    return header;
}


//Statiscally fills copyright div of the HTML page with copyright at correct location relative to bottom of page 
//Run this in a callback to make dynamic
function copyright() {
    const copyrightString = "<p> Cassiopeia Slavish © " + new Date().getFullYear() + "</p>";
    const copyrightDiv = document.getElementById('copyright-div');

    copyrightDiv.innerHTML = copyrightString;

    const hasVerticalOverflow = document.documentElement.scrollHeight > window.innerHeight;
    // - 
    if (hasVerticalOverflow) {
        copyrightDiv.style.cssText = "position: relative; bottom: 0px; width:100%; text-align: center"
    } else {
        copyrightDiv.style.cssText = "position: absolute; bottom: 0px; width:100%; text-align: center"
    }

}

//Init copyright bar--since every page loads this scripts file, every page runs init and sets up separate callback functions
//First call of positioning function to correctly position it on page
copyright();

//Callback function to keep copyright at bottom of page
window.addEventListener('resize', () => {
    console.log("Copyright recentered to bottom.")
    copyright();
});

console.log("scripts file has been read and loaded")