// My Solution:

(function() {
    function buildChangeFontSize(percent) {
        return function(node) {
            const oldFontSize = parseFloat(node.style.fontSize.slice(0, -2));
            const unit = node.style.fontSize.slice(-2);
            const newFontSize = oldFontSize + oldFontSize * (percent / 100);
            const newFontSizeWithUnit = newFontSize + unit;
            node.style.fontSize = newFontSizeWithUnit;
            return node;
        };
    }
    const grow = buildChangeFontSize(10);
    const shrink = buildChangeFontSize(-10);
    const balloon = document.getElementById('balloon');
    const handleArrowKeys = event => {
        if (event.key === 'ArrowUp') {
            if (parseFloat(balloon.style.fontSize.slice(0, -2)) >= 25) {
                balloon.textContent = '💥';
                document.removeEventListener('keydown', handleArrowKeys);
            }
            grow(balloon);
        } else if (event.key === 'ArrowDown') {
            shrink(balloon);
        }
    };
    document.addEventListener('keydown', handleArrowKeys);
})();

/* Solution Haverbeke:

He used a preventDefault which I forgot about. He did not overload his
code with a generic changeFontSize Function Constructor (which I did
mainly for practice purposes). Also, in contrast to Haverbeke my code
only works if I put a starting style tag into the index.html!

let p = document.querySelector('p');
let size;
function setSize(newSize) {
    size = newSize;
    p.style.fontSize = size + 'px';
}
setSize(20);

function handleArrow(event) {
    if (event.key == 'ArrowUp') {
        if (size > 70) {
            p.textContent = '💥';
            document.body.removeEventListener('keydown', handleArrow);
        } else {
            setSize(size * 1.1);
            event.preventDefault();
        }
    } else if (event.key == 'ArrowDown') {
        setSize(size * 0.9);
        event.preventDefault();
    }
}
document.body.addEventListener('keydown', handleArrow);

*/
