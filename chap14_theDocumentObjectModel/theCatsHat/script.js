// My solution:

// I used Tux instead of a Cat and a Hat.

(function() {
    let cat = document.querySelector('#cat');
    let hat = document.querySelector('#hat');
    let button = document.querySelector('button');
    let animationCounter = -1;
    button.addEventListener('click', () => {
        if (animationCounter >= hatAnimations.length - 1) {
            animationCounter = 0;
        } else {
            animationCounter++;
        }
        requestAnimationFrame(animate);
    });
    let angle = 0;
    let lastTime = null;
    const hatAnimations = [
        function(hat) {
            const catPositionTop = parseInt(cat.style.top.slice(0, -2));
            const catPositionLeft = parseInt(cat.style.left.slice(0, -2));
            hat.style.top =
                catPositionTop + -(Math.sin(angle * 3) * 200) + 'px';
            hat.style.left =
                catPositionLeft + -(Math.cos(angle * 3) * 200) + 'px';
        },
        function(hat) {
            hat.style.top = -(Math.sin(angle) * 40) + 240 + 'px';
            hat.style.left = -(Math.cos(angle) * 200) + 230 + 'px';
        },
    ];
    function animate(time) {
        if (lastTime != null) angle += (time - lastTime) * 0.001;
        lastTime = time;
        cat.style.top = Math.sin(angle) * 40 + 240 + 'px';
        cat.style.left = Math.cos(angle) * 200 + 230 + 'px';
        hatAnimations[animationCounter](hat);
        requestAnimationFrame(animate);
    }
})();

/* Solution Haverbeke:

  let cat = document.querySelector("#cat");
  let hat = document.querySelector("#hat");

  let angle = 0;
  let lastTime = null;
  function animate(time) {
    if (lastTime != null) angle += (time - lastTime) * 0.001;
    lastTime = time;
    cat.style.top = (Math.sin(angle) * 40 + 40) + "px";
    cat.style.left = (Math.cos(angle) * 200 + 230) + "px";
    hat.style.top = (Math.sin(angle + Math.PI) * 40 + 40) + "px";
    hat.style.left = (Math.cos(angle + Math.PI) * 200 + 230) + "px";

    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);

*/
