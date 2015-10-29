var squares = [];
var $lifegrid = $("#lifegrid");
var squarecounter = Math.floor((Math.random() * squares.length - 1) + 1);
var setbaselifeButton = document.getElementById("setbaselife");
var startbutton = document.getElementById("start");
var clearbutton = document.getElementById("clear");

setbaselifeButton.addEventListener("click", setbaselife);
startbutton.addEventListener("click", RunSimulation);
clearbutton.addEventListener("click", cleargrid)

function createsquares(numberofsquares) {
    var counter = 0;
    for (i = 0; i < numberofsquares; i++) {
        var squareinprogess = {};
        squareinprogess.squarenumber = counter;
        squareinprogess.status = "dead";
        squareinprogess.neighbors = [];
        squareinprogess.relatedvisual = ""
        squareinprogess.changestate = function () {if (this.status == "dead") {this.relatedvisual.className = "alive square";this.status = "alive";}else if (this.status == "alive") {this.relatedvisual.className = "dead square";this.status = "dead";}}
        
         counter = counter + 1;
        squares.push(squareinprogess);
    }
}
function addSquareElements() {
    for (i = 0; i < squares.length; i++) {
        $($lifegrid).append($("<p class ='" + squares[i].status + " square" + "'" + "" + "id ='" + squares[i].squarenumber + "'" + "" +"></p>"))
        
        }
}
createsquares(6136);
addSquareElements();
function setrelationship(){
    for (i = 0; i < squares.length; i++) {
        squares[i].relatedvisual = document.getElementById(i);
    }
}
setrelationship()

var $blockclick = $(".square")
$($blockclick).on("click", function () {
    squares[this.id].changestate();
    console.log(this.id);
})

function getneighbors(target) {
    var neighbors = [];
    var nA = target - 105;
    var nB = target - 104;
    var nC = target - 103;
    var nD = target - 1;
    var nE = target + 1;
    var nF = target + 103;
    var nG = target + 104;
    var nH = target + 105;
   
if (squares[nA] != undefined) { neighbors.push(nA);}
if (squares[nB] != undefined) { neighbors.push(nB);}
if (squares[nC] != undefined) { neighbors.push(nC);}
if (squares[nD] != undefined) { neighbors.push(nD);}
if (squares[nE] != undefined) { neighbors.push(nE);}
if (squares[nF] != undefined) { neighbors.push(nF);}
if (squares[nG] != undefined) { neighbors.push(nG);}
if (squares[nH] != undefined) { neighbors.push(nH);}

    squares[target].neighbors = neighbors;
}
for (i = 0; i < squares.length; i++) {
    getneighbors(i)
};

function getliveNeighbors(target) {
    var neighborlist = squares[target].neighbors;
    var count = 0;
    for (i = 0; i < neighborlist.length; i++) {
        if (squares[neighborlist[i]].status == "alive"){
            count = count + 1
        }
    }
    return count;
}

function checkChangeEligability() {
    if (squarecounter > squares.length){squarecounter = 0}
    var liveNeighbors = getliveNeighbors(squarecounter)
    if (squares[squarecounter].status = "dead") {
        if (liveNeighbors > 2) {
            squares[squarecounter].changestate()
        }
    }
    if (squares[squarecounter].status = "alive") {
        if (liveNeighbors == squares[squarecounter].neighbors.length) {
            squares[squarecounter].changestate()
        }
        if (liveNeighbors == 0) {
            squares[squarecounter].changestate()
        }
    }
    squarecounter = Math.floor((Math.random() * squares.length - 1) + 1);
}


function RunSimulation() {
   
  setInterval(checkChangeEligability, 5)

}
function setbaselife() {
    for (i = 0; i < squares.length; i++) {
        if (squares[i].status != "dead") {
            squares[i].changestate();
        }
    }

    var basecount = squares.length / 8;
    var pickedsquare;
    for (i = 0; i < basecount; i++) {
        pickedsquare = Math.floor((Math.random() * squares.length) + 1);
        pickedsquare = Math.round(pickedsquare);
        squares[pickedsquare].changestate();
    }
}

function cleargrid(){
    for (i = 0; i < squares.length; i++) {
        if (squares[i].status != "dead") {
            squares[i].changestate();
        }
    }
}