const { VillageState, findRoute, roadGraph } = require('./07_robot.js');
const { compareRobots } = require('./measuringARobot.js');

// My solution:

function myMostEfficientRobot({ place, parcels }, route) {
    const availableRoutes = [];
    if (route.length === 0) {
        let finalRoute;
        for (let parcel of parcels) {
            let currentRoute;
            if (parcel.place != place) {
                currentRoute = findRoute(roadGraph, place, parcel.place);
            } else {
                currentRoute = findRoute(roadGraph, place, parcel.address);
            }
            availableRoutes.push(currentRoute);
        }
        finalRoute = availableRoutes.reduce(
            (shortestRoute, currentRoute) => {
                return currentRoute.length >= shortestRoute.length
                    ? shortestRoute
                    : currentRoute;
            },
            [1, 2, 3, 4, 5, 6, 7]
        );
        route = finalRoute;
    }
    return { direction: route[0], memory: route.slice(1) };
}

// Solution Haverbeke, the lazy Robot:

function lazyRobot({ place, parcels }, route) {
    if (route.length == 0) {
        // Describe a route for every parcel
        let routes = parcels.map(parcel => {
            if (parcel.place != place) {
                return {
                    route: findRoute(roadGraph, place, parcel.place),
                    pickUp: true,
                };
            } else {
                return {
                    route: findRoute(roadGraph, place, parcel.address),
                    pickUp: false,
                };
            }
        });

        // This determines the precedence a route gets when choosing.
        // Route length counts negatively, routes that pick up a package
        // get a small bonus.
        function score({ route, pickUp }) {
            return (pickUp ? 0.5 : 0) - route.length;
        }
        route = routes.reduce((a, b) => (score(a) > score(b) ? a : b)).route;
    }

    return { direction: route[0], memory: route.slice(1) };
}

// Compare mine and Haverbekes Robots:
console.log(compareRobots(myMostEfficientRobot, [], lazyRobot, []));

// Sadly, Haverbekes Robot is still more efficient, as he introduced a
// scoring system which I did not.
