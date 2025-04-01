### **Recover a Tree From Preorder Traversal - In-depth TypeScript Guide**

---

## **Problem Breakdown (For a 5-Year-Old)**  

Imagine you are making a family tree by reading a special coded message. Each person in the family has a number, and each child is shown with dashes (`-`) before their number.  

For example, the message `"1-2--3--4-5--6--7"` means:
- `1` is the main person (the root).
- `-2` is a child of `1` (one dash = child of the previous number).
- `--3` and `--4` are children of `2` (two dashes = children of `2`).
- `-5` is another child of `1`.
- `--6` and `--7` are children of `5`.  

Your goal is to **build a tree from this coded message**.

---

## **Approach 1: Recursive Parsing (DFS)**
### **Pseudo Code Explanation**
1. Start reading the string from the beginning.
2. If you find `-`, count how many `-` appear in a row (this tells you the depth of the node).
3. Read the number after the dashes (this is the node's value).
4. If the number belongs at this depth, create a new tree node.
5. Try to add left and right children by calling the function again (recursively).
6. If the depth doesn't match, return back to the previous step.

---

### **TypeScript Code**
```typescript
class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val ?? 0;
        this.left = left ?? null;
        this.right = right ?? null;
    }
}

function recoverFromPreorder(traversal: string): TreeNode | null {
    let index = 0;

    function parseNode(depth: number): TreeNode | null {
        let dashCount = 0;
        while (index < traversal.length && traversal[index] === '-') {
            dashCount++;
            index++;
        }
        if (dashCount !== depth) {
            index -= dashCount;
            return null;
        }

        let value = 0;
        while (index < traversal.length && traversal[index] >= '0' && traversal[index] <= '9') {
            value = value * 10 + (traversal.charCodeAt(index) - '0'.charCodeAt(0));
            index++;
        }

        let node = new TreeNode(value);
        node.left = parseNode(depth + 1);
        node.right = parseNode(depth + 1);
        return node;
    }

    return parseNode(0);
}
```
---

## **Approach 2: Using a Stack (Iterative Solution)**
### **Pseudo Code Explanation**
1. Read the string character by character.
2. If you find `-`, count how many `-` are in a row (this tells you the depth).
3. Read the number after the dashes (this is the node value).
4. Use a stack to track parent-child relationships.
5. If the new node is deeper, it becomes the left child.
6. If it's at the same level, it becomes the right child of the last node.
7. Return the root node.

---

### **TypeScript Code**
```typescript
function recoverFromPreorder(traversal: string): TreeNode | null {
    let stack: TreeNode[] = [];
    let index = 0;

    while (index < traversal.length) {
        let depth = 0;
        while (index < traversal.length && traversal[index] === '-') {
            depth++;
            index++;
        }

        let value = 0;
        while (index < traversal.length && traversal[index] >= '0' && traversal[index] <= '9') {
            value = value * 10 + (traversal.charCodeAt(index) - '0'.charCodeAt(0));
            index++;
        }

        let node = new TreeNode(value);
        while (stack.length > depth) {
            stack.pop();
        }

        if (stack.length > 0) {
            if (!stack[stack.length - 1].left) {
                stack[stack.length - 1].left = node;
            } else {
                stack[stack.length - 1].right = node;
            }
        }

        stack.push(node);
    }

    return stack[0] ?? null;
}
```
---

## **Approach 3: Using a Queue for Level Processing**
### **Pseudo Code Explanation**
1. Read the input and split it into values based on their depth.
2. Use a queue to keep track of the nodes at each depth.
3. Process each node one by one and add its left and right children.
4. Return the root node.

---

### **TypeScript Code**
```typescript
function recoverFromPreorder(traversal: string): TreeNode | null {
    let queue: [number, number][] = [];
    let index = 0;

    while (index < traversal.length) {
        let depth = 0;
        while (index < traversal.length && traversal[index] === '-') {
            depth++;
            index++;
        }

        let value = 0;
        while (index < traversal.length && traversal[index] >= '0' && traversal[index] <= '9') {
            value = value * 10 + (traversal.charCodeAt(index) - '0'.charCodeAt(0));
            index++;
        }

        queue.push([depth, value]);
    }

    let root = new TreeNode(queue[0][1]);
    let nodes = new Map<number, TreeNode>();
    nodes.set(0, root);

    for (let i = 1; i < queue.length; i++) {
        let [depth, value] = queue[i];
        let node = new TreeNode(value);
        let parent = nodes.get(depth - 1);

        if (parent) {
            if (!parent.left) {
                parent.left = node;
            } else {
                parent.right = node;
            }
        }

        nodes.set(depth, node);
    }

    return root;
}
```
---

## **Three Non-Trivial Examples**
### **Example 1**
#### **Input**
```typescript
recoverFromPreorder("1-2--3--4-5--6--7");
```
#### **Output**
```
       1
     /   \
    2     5
   / \   / \
  3   4 6   7
```

### **Example 2**
#### **Input**
```typescript
recoverFromPreorder("1-2--3---4-5--6---7");
```
#### **Output**
```
       1
     /   \
    2     5
   /     /
  3     6
 /       \
4         7
```

### **Example 3**
#### **Input**
```typescript
recoverFromPreorder("1-401--349---90--88");
```
#### **Output**
```
       1
      /
    401
   /    \
  349    88
 /
90
```
---

## **Final Thoughts**
- The **recursive** approach is elegant but can be slower due to function calls.
- The **stack-based iterative** method is faster and works efficiently with large inputs.
- The **queue-based level processing** is another structured way to approach the problem.

Each solution has trade-offs, and the best one depends on the constraints and input size.

---
This guide walks through the problem from **basic understanding to optimized solutions** with **multiple approaches** and **examples** to ensure clarity.