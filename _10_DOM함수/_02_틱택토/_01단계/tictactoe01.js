var turn = true;
var nodeList = [];
var body = document.body;
var table = document.createElement("table");

var nodeEvent = function(e) {
    var target = e.target;

    if(target.textContent == "") {
        if(turn) {
            target.textContent = "O";
            turn = false;
        } else {
            target.textContent = "X";
            turn = true;
        }
    }
    
}

for(var i=0; i<3; i++) {
    var line = document.createElement("tr");
    nodeList.push([]);
    for(var j=0; j<3; j++) {
        var node = document.createElement("td");
        node.textContent = "";
        node.addEventListener("click", nodeEvent);
        line.append(node);

        nodeList[i].push(node);
    }
    table.append(line);
}
body.append(table);