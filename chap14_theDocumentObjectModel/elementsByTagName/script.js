(function() {
    // My solution:

    function byTagName(node, tagName) {
        const tagNameUpperCase = tagName.toUpperCase();
        const all = [];
        (function recur(node, tagNameUpperCase) {
            if (node.nodeName == tagNameUpperCase) {
                all.push(node);
            }
            if (node.childNodes) {
                for (let childNode of Array.from(node.childNodes)) {
                    recur(childNode, tagNameUpperCase);
                }
            }
        })(node, tagNameUpperCase);
        return all;
    }

    // Testing:
    console.log(byTagName(document.body, 'h1').length);
    // → 1
    console.log(byTagName(document.body, 'span').length);
    // → 3
    let para = document.querySelector('p');
    console.log(byTagName(para, 'span').length);
    // → 2

    /*

  Solution Haverbeke

  In contrast to my solution he also checks the nodeType. I am unsure
  if this is for performance or other reasons.
    
  function byTagName(node, tagName) {
    let found = [];
    tagName = tagName.toUpperCase();

    function explore(node) {
      for (let i = 0; i < node.childNodes.length; i++) {
        let child = node.childNodes[i];
        if (child.nodeType == document.ELEMENT_NODE) {
          if (child.nodeName == tagName) found.push(child);
          explore(child);
        }
      }
    }

    explore(node);
    return found;
  }

  */
})();
