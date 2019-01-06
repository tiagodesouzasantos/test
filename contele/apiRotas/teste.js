var startRoutes = [];

function getStartPoints(routes, start, final) {
    var rotasfinais = [];
    for (var i = 0; i < routes.length; i++) {
        if (start == routes[i].spot_one) {
            rotasfinais.push(routes[i]);
        }
    }

    return startRoutes;
}



var routes = [
    { 'spot_one': 'A', 'spot_two': 'B', 'distance': '10', 'map_id': 1 },
    { 'spot_one': 'B', 'spot_two': 'D', 'distance': '15', 'map_id': 1 },
    { 'spot_one': 'A', 'spot_two': 'C', 'distance': '20', 'map_id': 1 },
    { 'spot_one': 'C', 'spot_two': 'D', 'distance': '30', 'map_id': 1 },
    { 'spot_one': 'B', 'spot_two': 'E', 'distance': '50', 'map_id': 1 },
    { 'spot_one': 'D', 'spot_two': 'E', 'distance': '30', 'map_id': 1 }
];
var spotOne = "A";
var spotTwo = "E";
var startPoints = getStartPoints(routes, spotOne, spotTwo);
// console.log(startPoints);
// var finalRoutes = runStartRoutes(startPoints, spotOne, spotTwo, routes);
// console.log(finalRoutes);

var factor = function(number) {
    var result = 1;
    var count;
    for (count = number; count > 1; count--) {
        result *= count;
    }
    return result;
};
console.log(factor(9));