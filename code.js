// Have the function TreeConstructor(strArr) take the array of strings stored in strArr, which will contain pairs of integers in the following format: (i1,i2), where i1 represents a child node in a tree and the second integer i2 signifies that it is the parent of i1. For example: if strArr is ["(1,2)", "(2,4)", "(7,2)"], then this forms the following tree:



// which you can see forms a proper binary tree. Your program should, in this case, return the string true because a valid binary tree can be formed. If a proper binary tree cannot be formed with the integer pairs, then return the string false. All of the integers within the tree will be unique, which means there can only be one node in the tree with the given integer value.
// Examples
// Input: ["(1,2)", "(2,4)", "(5,7)", "(7,2)", "(9,5)"]
// Output: true
// Input: ["(1,2)", "(3,2)", "(2,12)", "(5,2)"]
// Output: false

// This function returns the reason why it considers the input
// not a binary tree. "ok" otherwise.
function TreeConstructor(edgesStr) {
  const childToParent = new Map(edgesStr.map((edge) => edge.match(/\d+/g)));
  // No node should have 2 parents
  if (childToParent.size < edgesStr.length) return false;
  // No node should have 3 children
  const degree = {};
  for (const [child, parent] of childToParent) {
    if ((++degree[parent] || (degree[parent] = 1)) > 2) return false;
  }
  // All upward paths lead to the same root (no cycles)
  const nodes = {};
  let current = 0;
  let countRoots = 0;
  for (let node of childToParent.keys()) {
    current++;
    while (node && !nodes[node]) {
      nodes[node] = current;
      node = childToParent.get(node);
    }
    if (!node && countRoots++) return false;
    if (node && nodes[node] == current) return false;
  }
  return true;
}

const tests = [
  ['(1,2)', '(2,4)', '(5,7)', '(7,2)', '(9,5)'],
  ['(1,2)', '(3,2)', '(2,12)', '(5,2)'],
  [('(2,1)', '(3,1)', '(4,2)', '(5,2)', '(6,3)', '(7,3)')],
  ['(1,2)', '(3,2)', '(2,12)', '(5,2)'],
  ['(2,1)', '(3,1)', '(5,4)', '(5,2)'],
  ['(2,1)', '(4,3)'],
  ['(1,2)', '(3,4)', '(4,5)', '(5,3)'],
];

// for (const test of tests) {
//     console.log(isBinaryTree(test));
// }




console.log(TreeConstructor(['(1,2)', '(2,4)', '(5,7)', '(7,2)', '(9,5)']));
console.log(TreeConstructor(['(1,2)', '(3,2)', '(2,12)', '(5,2)']));