// Environment Code Haverbeke:

var roads = [
    "Alice's House-Bob's House",
    "Alice's House-Cabin",
    "Alice's House-Post Office",
    "Bob's House-Town Hall",
    "Daria's House-Ernie's House",
    "Daria's House-Town Hall",
    "Ernie's House-Grete's House",
    "Grete's House-Farm",
    "Grete's House-Shop",
    'Marketplace-Farm',
    'Marketplace-Post Office',
    'Marketplace-Shop',
    'Marketplace-Town Hall',
    'Shop-Town Hall',
];

module.exports.roads = roads;

const buildGraph = function(edges) {
    let graph = Object.create(null);
    function addEdge(from, to) {
        if (graph[from] == null) {
            graph[from] = [to];
        } else {
            graph[from].push(to);
        }
    }
    for (let [from, to] of edges.map(r => r.split('-'))) {
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
};

var roadGraph = buildGraph(roads);

module.exports.roadGraph = roadGraph;

const VillageState = class {
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }
    move(destination) {
        if (!roadGraph[this.place].includes(destination)) {
            return this;
        } else {
            let parcels = this.parcels
                .map(p => {
                    if (p.place != this.place) return p;
                    return { place: destination, address: p.address };
                })
                .filter(p => p.place != p.address);
            return new VillageState(destination, parcels);
        }
    }
};

// let first = new VillageState('Post Office', [
//     { place: 'Post Office', address: "Alice's House" },
// ]);

// console.log(next.place);
// console.log(next.parcels);
// console.log(first.place);

module.exports.runRobot = function(state, robot, memory) {
    for (let turn = 0; ; turn++) {
        if (state.parcels.length == 0) {
            // console.log(`Done in ${turn} turns`);
            return turn;
        }
        // console.log(robot);
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        // console.log(`Moved to ${action.direction}`);
    }
};

const randomPick = function(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
};

module.exports.randomPick = randomPick;

module.exports.randomRobot = function(state) {
    return { direction: randomPick(roadGraph[state.place]) };
};

VillageState.random = function(parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
        let address = randomPick(Object.keys(roadGraph));
        let place;
        do {
            place = randomPick(Object.keys(roadGraph));
        } while (place == address);
        parcels.push({ place, address });
    }
    return new VillageState('Post Office', parcels);
};

module.exports.VillageState = VillageState;

var mailRoute = [
    "Alice's House",
    'Cabin',
    "Alice's House",
    "Bob's House",
    'Town Hall',
    "Daria's House",
    "Ernie's House",
    "Grete's House",
    'Shop',
    "Grete's House",
    'Farm',
    'Marketplace',
    'Post Office',
];

module.exports.mailRoute = mailRoute;

module.exports.routeRobot = function(state, memory) {
    if (memory.length == 0) {
        memory = mailRoute;
    }
    return { direction: memory[0], memory: memory.slice(1) };
};

const findRoute = function(graph, from, to) {
    let work = [{ at: from, route: [] }];
    for (let i = 0; i < work.length; i++) {
        let { at, route } = work[i];
        for (let place of graph[at]) {
            if (place == to) return route.concat(place);
            if (!work.some(w => w.at == place)) {
                work.push({ at: place, route: route.concat(place) });
            }
        }
    }
};

module.exports.findRoute = findRoute;

module.exports.goalOrientedRobot = function({ place, parcels }, route) {
    if (route.length == 0) {
        let parcel = parcels[0];
        if (parcel.place != place) {
            route = findRoute(roadGraph, place, parcel.place);
        } else {
            route = findRoute(roadGraph, place, parcel.address);
        }
    }
    return { direction: route[0], memory: route.slice(1) };
};
