// My solution:
// Basic ten elements trail with random colors generated once.

(function() {
    const colors = ['blue', 'red', 'green', 'teal', 'black', 'orange'];
    const buildTrailElements = amount => {
        const allElements = [];
        for (let i = 0; i < amount; i += 1) {
            const element = document.createElement('div');
            element.className = 'trail';
            element.style.background =
                colors[Math.floor(Math.random() * Math.floor(colors.length))];
            allElements.push(element);
        }
        return allElements;
    };
    const trailElements = buildTrailElements(10);

    let lastPositions = [];
    function showTrail(trail, positions) {
        positions.forEach(([x, y], index) => {
            const current = trail[index];
            current.style.left = x + 'px';
            current.style.top = y + 'px';
            document.body.appendChild(current);
        });
    }

    let scheduled = null;
    document.addEventListener('mousemove', event => {
        if (!scheduled) {
            setTimeout(() => {
                lastPositions = [
                    ...lastPositions.slice(lastPositions.length - 9),
                    [scheduled.pageX, scheduled.pageY],
                ];
                scheduled = null;
                showTrail(trailElements, lastPositions);
            }, 10);
        }
        scheduled = event;
    });
})();

/*

Solution Haverbeke:

In contrast to my solution his mouse trail is well aligned, as he
takes care of centering the dots by substracting half of their height
and width from the pageX and pageY attributes which I forgot.

Also, he resets the trail positions more efficiently, as he only
changes one position value per mousemove event. I reassign all of them
every time.

let dots = [];
for (let i = 0; i < 12; i++) {
    let node = document.createElement('div');
    node.className = 'trail';
    document.body.appendChild(node);
    dots.push(node);
}
let currentDot = 0;

window.addEventListener('mousemove', event => {
    let dot = dots[currentDot];
    dot.style.left = event.pageX - 3 + 'px';
    dot.style.top = event.pageY - 3 + 'px';
    currentDot = (currentDot + 1) % dots.length;
});

*/
