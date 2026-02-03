function download(url) {
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
}