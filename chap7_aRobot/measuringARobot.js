const {
    VillageState,
    runRobot,
    routeRobot,
    goalOrientedRobot,
} = require('./07_robot.js');

function countSteps(robot1, memory1, robot2, memory2) {
    const totalTurnAmount = { robot1: 0, robot2: 0 };
    for (let i = 0; i < 100; i += 1) {
        let state = new VillageState.random(5);
        totalTurnAmount.robot1 += runRobot(state, robot1, memory1);
        totalTurnAmount.robot2 += runRobot(state, robot2, memory2);
    }
    totalTurnAmount.robot1 /= 100;
    totalTurnAmount.robot2 /= 100;
    return totalTurnAmount;
}

function compareRobots(robot1, memory1, robot2, memory2) {
    return countSteps(robot1, memory1, robot2, memory2);
}

console.log(compareRobots(routeRobot, [], goalOrientedRobot, []));

module.exports.compareRobots = compareRobots;

// const { mostEfficientRobot, lazyRobot } = require('./moreEfficientRobot');
// const totalTurnAmount = compareRobots(mostEfficientRobot, [], lazyRobot, []);
// console.log(totalTurnAmount);
// const state = new VillageState.random();
// runRobot(state, mostEfficientRobot, []);

/* 

Solution Haverbeke:

function countSteps(state, robot, memory) {
  for (let steps = 0;; steps++) {
    if (state.parcels.length == 0) return steps;
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
  }
}

function compareRobots(robot1, memory1, robot2, memory2) {
  let total1 = 0, total2 = 0;
  for (let i = 0; i < 100; i++) {
    let state = VillageState.random();
    total1 += countSteps(state, robot1, memory1);
    total2 += countSteps(state, robot2, memory2);
  }
  console.log(`Robot 1 needed ${total1 / 100} steps per task`)
  console.log(`Robot 2 needed ${total2 / 100}`)
}

*/
