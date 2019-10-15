// // My solution:

(function() {
    function asTabs(node) {
        Array.from(node.children).forEach((child, _, allChildren) => {
            child.style.display = 'none';
            const tab = document.createElement('button');
            tab.textContent = child.getAttribute('data-tabname');
            tab.addEventListener('click', () => {
                allChildren.forEach(child => {
                    child.style.display = 'none';
                });
                child.style.display = '';
                Array.from(document.querySelectorAll('button')).forEach(tab => {
                    tab.style.fontSize = '';
                });
                tab.style.fontSize = '1.2em';
            });
            node.appendChild(tab);
        });
        node.children[0].style.display = '';
        document.querySelector('button').style.fontSize = '1.2em';
    }
    asTabs(document.querySelector('tab-panel'));
})();

/*

Solution Haverbeke:

It is far more concise than my solution, especially because of the
explicit selectTab function. I tried to do all at once which created a
messy overload of dom interactions and element selections.

function asTabs(node) {
    let tabs = Array.from(node.children).map(node => {
        let button = document.createElement('button');
        button.textContent = node.getAttribute('data-tabname');
        let tab = { node, button };
        button.addEventListener('click', () => selectTab(tab));
        return tab;
    });

    let tabList = document.createElement('div');
    for (let { button } of tabs) tabList.appendChild(button);
    node.insertBefore(tabList, node.firstChild);

    function selectTab(selectedTab) {
        for (let tab of tabs) {
            let selected = tab == selectedTab;
            tab.node.style.display = selected ? '' : 'none';
            tab.button.style.color = selected ? 'red' : '';
        }
    }
    selectTab(tabs[0]);
}

asTabs(document.querySelector('tab-panel'));

*/
