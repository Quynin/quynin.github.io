/* 

Towers of hanoi: famous problem
    In this implementation,
        - rings are represented by their sizes
        - towers are arrays; the bottom is the first element; the top is the last element
        - towers populated by rings count down in ring size as they progress up the tower


*/

//max value for possible ring size: all rings must be less than this value
const max_value = 100;

//3 towers, all rings start on first tower
var towers = [[5, 4, 3, 2, 1], [], []] 
var numRings = 5;

var originTower = -1;
var destinationTower = -1;


//Function to handle cases for clicking a tower
function clickTower(i) {

    //Check: if select empty tower, terminate
    /*if (getTower(i).length == 0) {
        console.log(`Tower ${i} is empty!`)
        return;
    }*/

    //Initial case: nothing selected, then select origin tower
    if (originTower == -1 && getTower(i).length > 0) {
        setOriginTower(i);
    }

    //Else if origin tower selected, then select destination tower and attempt move
    else if (originTower != -1) {
        setDestinationTower(i);
        //Attempt move ring
        moveRing();
    }
}

function setOriginTower(i) {
    console.log(`Tower ${i} has been selected as origin`);
    originTower = i;
    highlightOriginTowerTopRing(i);
}

function setDestinationTower(i) {
    console.log(`Tower ${i} has been selected as destination`);
    destinationTower = i;
}

//Update CSS to highlight topmost ring of origin tower
function highlightOriginTowerTopRing(i) {
    //Get ringId of ring to highlight
    const ringId =  "ring-" + getTopRing(getTower(i));

    console.log("AAA: " + ringId);
    //Get the ring by ringId
    const ring = document.getElementById(ringId);
    //Highlight the selected ring
    ring.setAttribute("fill", "#FF4040");
    ring.setAttribute("stroke-width", "4px");

}


//Update CSS to unhighlight highlighted ring
function unhighlightRing(ringValue) {
    //Get ringId of ring to highlight
    //console.log(i + " " + getTower(t));
    const ringId =  "ring-" + getTopRing(ringValue);
    //Get the ring by ringId
    const ring = document.getElementById(ringId);
    //Unhighlight the selected ring
    ring.setAttribute("fill", "#FF0000");
    ring.setAttribute("stroke-width", "1px");
}

//Reset origin and destination towers to effective-null
function deselectTowers() {
    originTower = -1;
    destinationTower = -1;
}


//Get the tower (sub-array of towers) based on integer i
function getTower(i) {
    return towers[i];
}

//If it exists, return the top ring (integer value) of the tower; this corresponds to the last element of the array
//If tower is empty, return max_value
function getTopRing(tower) {

    //In case of empty tower, return max_value for easy comparison
    if (tower.length == 0) {
        return max_value;
    }
    else {
        return tower[tower.length - 1];
    }
}

//Boolean
//Evaluate whether move from origin to destination tower is acceptable based on the current ring arrangment
function isValidMove(originTower, destinationTower) {

    //If top-ring on selected tower is lesser than top-ring on destination tower
    //This also includes empty selected tower case
    var result = getTopRing(getTower(originTower)) <= getTopRing(getTower(destinationTower));
    console.log(`${(!result)? "IN": "  "}VALID MOVE: tower-${originTower} ring-${getTopRing(getTower(originTower))} -> tower-${destinationTower}`);
    return result;
}

function moveRing() {

    console.log("IN moveRing()")

    //Error check to ensure both towers selected; if no tower selected, exit function
    if (originTower == -1) {
        console.log('No origin tower selected!');
        //return;
    }
    else if (destinationTower == -1) {
        console.log('No destination tower selected!');
        //return;
    }

    //Check if move is invalid
    else if (!isValidMove(originTower, destinationTower)) {
        //return;
        var ringValue = getTopRing(getTower(originTower));
    }
    else {

        originTowerArr = getTower(originTower);
        resultTowerArr = getTower(destinationTower);
        //Move ring from one tower to another
        var ringValue = originTowerArr.splice(originTowerArr.length - 1, 1);
        resultTowerArr.push(ringValue)

        //Move the ring SVG element to destination tower
        updateRingById(ringValue);

        //Print new towers array
        printTowers();
        //return;
    }

    //Unhighlight moved ring
    unhighlightRing(ringValue);

    //Deselect towers
    deselectTowers();

    //Check for a win state; display win state if winning
    checkWinCondition();
}

//Move the ring SVG element to match towers array
function updateRingById(ringValue) {
    const ring = document.getElementById("ring-" + ringValue);
    console.log("\nX: " + ring.getAttribute("x") + "\n Y: " +ring.getAttribute("Y"));
    ring.setAttribute("x", destinationTower * 200 + 200 - ring.getAttribute("width")/2);
    ring.setAttribute("y", 600 - getTower(destinationTower).length * 65);
    console.log("\nX: " + ring.getAttribute("x") + "\n Y: " +ring.getAttribute("Y"));

}

//print towers array to console 
function printTowers() {
    console.log(towers)
}

//Check for and display win-condition text when winning
function checkWinCondition() {
    const winText = document.getElementById("hanoi-win-text");

    //Check for all rings on one non-starting ring: make win text visible
    for (var i = 1; i < towers.length; i++) {
        if (towers[i].length == numRings) {
            winText.classList.remove("invisible");
            return;
        }
    }

    //Else not all rings on one non-starting ring: make win text invisible again
    winText.classList.add("invisible");
    return;
}
