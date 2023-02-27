var nodeList = [];
var numberFrontList = [];
var numberBackList = [];
var body = document.body;
var table = document.createElement("table");
var gameNum = 1;

function setNumber() {
    var frontList = [];
    var backList = [];
    for(var i=0; i<9; i++) {
        frontList.push(i + 1);
        backList.push(i + 10);
    }

    for(var i=0; i<50; i++) {
        var r = Math.floor(Math.random() * 9);
        var temp = frontList[0];
        frontList[0] = frontList[r];
        frontList[r] = temp;

        r = Math.floor(Math.random() * 9);
        temp = backList[0];
        backList[0] = backList[r];
        backList[r] = temp;
    }

    console.log(frontList);
    console.log(backList);

    var index = 0;
    for(var i=0; i<3; i++) {
        numberFrontList.push([]);
        numberBackList.push([]);
        for(var j=0; j<3; j++) {
            numberFrontList[i].push(frontList[index]);
            numberBackList[i].push(backList[index]);
            index += 1;
        }
    }

    for(var i=0; i<nodeList.length; i++) {
        for(var j=0; j<nodeList[i].length; j++) {
            nodeList[i][j].textContent = numberFrontList[i][j];
            index += 1;
        }
    }
}

var nodeEvent = function(e) {
    var target = e.target;

    var y = -1;
    var x = -1;
    for(var i=0; i<nodeList.length; i++) {
        for(var j=0; j<nodeList[i].length; j++) {
            if(target.textContent == nodeList[i][j].textContent) {
                y = i;
                x = j;
                break;
            }
        }
    }

    if(target.textContent == gameNum) {
        if(0 <= gameNum && gameNum <= 9) {
            nodeList[y][x].textContent = numberBackList[y][x];
        } else {
            nodeList[y][x].textContent = "";
        }
        
        gameNum += 1;
    }
    
}

function init() {
    for(var i=0; i<3; i++) {
        var line = document.createElement("tr");
        nodeList.push([]);
        for(var j=0; j < 3; j++) {
            var node = document.createElement("td");
            node.textContent = "";
            node.addEventListener("click", nodeEvent);
            line.append(node);
    
            nodeList[i].push(node);
        }
        table.append(line);
    }
    body.append(table);

    setNumber();
}

init();
