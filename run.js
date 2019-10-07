const _ = require("lodash");

function matrix(m, n) {
    var result = []
    for(var i = 0; i < n; i++) {
        result.push(new Array(m).fill(null))
    }
    return result
}

function fillDashboard(dashboard, { x, y }, iteration) {
    dashboard[x][y] = iteration;
    return dashboard;
}

let dashboard = matrix(8,8);
let currentPosition = { x: 0, y:0 };

dashboard = fillDashboard(dashboard, currentPosition, 0);
console.log(dashboard);

function possibleMovements(dashboard, { x, y }) {
    const result = [ 
        { x: x + 1, y: y - 2 }, { x: x - 1, y: y + 2 }, { x: x + 1, y: y - 2 }, { x: x + 1, y: y + 2 }, 
        { x: x - 2, y: y - 1 }, { x: x - 2, y: y + 1 }, { x: x + 2, y: y - 1 }, { x: x + 2, y: y + 1 }
    ];
    return result.filter( ({ x, y }) => x >= 0 && x < 8 && y >= 0 && y < 8 && dashboard[x][y] == null);
}

function bestPossibleNextPosition(dashboard, currentPosition) {
    const movements = possibleMovements(dashboard, currentPosition);
    return _.orderBy(movements, (position) => possibleMovements(dashboard, position).length, "asc")[0];
}

for(let i = 1; i < 64; i++) {
    currentPosition = bestPossibleNextPosition(dashboard, currentPosition);
    dashboard = fillDashboard(dashboard, currentPosition, i);
    console.log(dashboard);
}
