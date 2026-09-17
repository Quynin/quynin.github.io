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

var selectedTower = -1;
var destinationTower = -1;

function selectTower(i) {

    console.log("ssssss");

    /*if (getTower(i).length == 0) {
        deselectTower(i);
        console.log(`Tower ${i} cannot be selected`);
        return;
    }*/

    if (selectedTower == -1) {
        console.log(`Tower ${i} has been selected`);
        selectedTower = i;
    } else {
        moveRing(selectedTower, i);
        deselectTower(i);
        console.log(`Tower ${i} has been deselected`);
    }
}

//Get the tower that contains the parameterised ring id
//TODO: GET THIS WORKING? addEventListener on software.html
/*
function selectTowerByRingId(ringId) {
    console.log("AAAAAAAAA");
    //Use JS easy conversion to convert number character into int
    //ringId syntax is "ring-n"
    const n = ringId.charAt(4);
    for(var i = 0; i < towers.length; i++) {
        if (towers[i].contains(n)) {
            selectTower(i);
            return;
        }
    }
    
}*/

function deselectTower(i) {
    selectedTower = -1;


}

function getTower(i) {
    return towers[i];
}

//If it exists return the top ring (integer value) of the tower; this corresponds to the last element of the array
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
function isValidMove(selectedTower, destinationTower) {

    //If top-ring on selected tower is lesser than top-ring on destination tower
    //This also includes empty selected tower case
    return getTopRing(getTower(selectedTower)) < getTopRing(getTower(destinationTower))
}

function moveRing(selectedTower, destinationTower) {

    console.log("IN moveRing()")

    //Error check to ensure both towers selected; if no tower selected, exit function
    if (selectedTower == null) {
        console.log('No origin tower selected!');
        return;
    }
    if (destinationTower == null) {
        console.log('No destination tower selected!');
        return;
    }

    //Check if move is valid
    if (!isValidMove(selectedTower, destinationTower)) {
        console.log("INVALID MOVE:");
        console.log(`ST: ${getTopRing(getTower(selectedTower))}`);
        console.log(`DT: ${getTopRing(getTower(destinationTower))}`);
        console.log(`BOOL: ${isValidMove(selectedTower, destinationTower)}`);
        return;
    }

    //Move ring from one tower to another
    originTower = getTower(selectedTower);
    resultTower = getTower(destinationTower);
    ringValue = originTower.splice(towers[selectedTower].length - 1, 1)
    resultTower.push(ringValue)

    //Deselect tower
    deselectTower();

    updateRingById(ringValue, destinationTower);
    printTowers();
    return;
}

function updateRingById(i, destinationTower) {
    const ring = document.getElementById("ring-" + i);
    console.log("\nX: " + ring.getAttribute("x") + "\n Y: " +ring.getAttribute("Y"));
    ring.setAttribute("x", destinationTower * 200 + 200 - ring.getAttribute("width")/2);
    ring.setAttribute("y", 585 - getTower(destinationTower).length * 85);
    console.log("\nX: " + ring.getAttribute("x") + "\n Y: " +ring.getAttribute("Y"));

}

function printTowers() {
    console.log(towers)
}
