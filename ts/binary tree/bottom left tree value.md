## **📖 Understanding the Problem**
We are given a **binary tree**, and we need to **find the leftmost value in the last row** of the tree.

- The **last row** means the **deepest level** of the tree.
- The **leftmost value** means the **first node** from the left in that level.

---

## **🛠️ Step-by-Step Approach**
To solve this, we need to **traverse the tree level by level** (also known as **level-order traversal**) and keep track of the **first node at each level**. The **leftmost node in the deepest level** is our answer.

---

## **👶 Explanation for a 5-Year-Old**
Imagine a **tree** like a **building with floors**. Each **row of nodes** is like a **floor** of the building.

We start at the **top floor** and move **downward**, checking **each row**.

- When we reach the **bottom floor** (deepest level), we look at the **first person (leftmost node)** standing there.
- That **person's number** is our answer!

---

## **🚀 Solution 1: Using BFS (Breadth-First Search)**
### **🔹 Pseudo-Code Explanation**
1. Start from the **root**.
2. Use a **queue** (like a line of people) to store the nodes **level by level**.
3. Process **each level**, and store the **first node** of the level.
4. Continue until we reach the **last level**.
5. The **first node** in the last level is our answer.

### **🔹 TypeScript Code**
```typescript
class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
}

function findBottomLeftValue(root: TreeNode | null): number {
    if (!root) return 0; // Edge case: Empty tree

    let queue: TreeNode[] = [root];
    let leftMostValue: number = root.val;

    while (queue.length > 0) {
        let levelSize = queue.length;
        leftMostValue = queue[0].val; // First node in this level

        for (let i = 0; i < levelSize; i++) {
            let node = queue.shift()!; // Get the first node in queue

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }

    return leftMostValue;
}
```

---

## **🚀 Solution 2: Using DFS (Depth-First Search)**
### **🔹 Pseudo-Code Explanation**
1. Start from the **root**.
2. Traverse the **left child first**, then the **right child**.
3. Keep track of the **deepest level** we have reached.
4. Update the **leftmost value** if we reach a deeper level.

### **🔹 TypeScript Code**
```typescript
function findBottomLeftValue(root: TreeNode | null): number {
    let maxDepth = -1;
    let leftMostValue = root!.val;

    function dfs(node: TreeNode | null, depth: number) {
        if (!node) return;

        if (depth > maxDepth) {
            maxDepth = depth;
            leftMostValue = node.val;
        }

        dfs(node.left, depth + 1);
        dfs(node.right, depth + 1);
    }

    dfs(root, 0);
    return leftMostValue;
}
```

---

## **🚀 Solution 3: Optimized BFS with Early Exit**
### **🔹 Pseudo-Code Explanation**
1. Use a **queue** to process nodes **level by level**.
2. Instead of storing **all levels**, keep track of only the **first node** in each level.
3. Stop once we reach the **last level**.

### **🔹 TypeScript Code**
```typescript
function findBottomLeftValue(root: TreeNode | null): number {
    let queue: TreeNode[] = [root!];
    let leftMostValue: number = root!.val;

    while (queue.length) {
        let node = queue.shift()!;
        leftMostValue = node.val;

        if (node.right) queue.push(node.right); // Push right first
        if (node.left) queue.push(node.left);   // Push left after right
    }

    return leftMostValue;
}
```

---

## **🔍 Three Non-Trivial Examples to Clarify the Idea**
### **Example 1: Simple Tree**
#### **Input:**
```
       2
      / \
     1   3
```
#### **Preorder Input:**
```typescript
const root = new TreeNode(2, new TreeNode(1), new TreeNode(3));
console.log(findBottomLeftValue(root)); 
```
#### **Output:**
```
1
```
#### **Explanation:**
- The **last row** is `[1, 3]`.
- The **leftmost value** is `1`.

---

### **Example 2: Unbalanced Tree**
#### **Input:**
```
        1
       /
      2
     /
    3
   /
  4
```
#### **Preorder Input:**
```typescript
const root = new TreeNode(1, new TreeNode(2, new TreeNode(3, new TreeNode(4))));
console.log(findBottomLeftValue(root));
```
#### **Output:**
```
4
```
#### **Explanation:**
- The **last row** contains only `4`.
- The **leftmost value** is `4`.

---

### **Example 3: Complex Tree**
#### **Input:**
```
        1
       / \
      2   3
     /   / \
    4   5   6
       /
      7
```
#### **Preorder Input:**
```typescript
const root = new TreeNode(
    1,
    new TreeNode(2, new TreeNode(4)),
    new TreeNode(3, new TreeNode(5, new TreeNode(7)), new TreeNode(6))
);
console.log(findBottomLeftValue(root));
```
#### **Output:**
```
7
```
#### **Explanation:**
- The **last row** is `[4, 7, 6]`.
- The **leftmost value** is `7`.

---

## **📌 Deep Insights for Experienced Developers**
1. **Why BFS for this problem?**
   - BFS naturally **processes level by level**, making it **easier** to track the last level's leftmost node.

2. **Why DFS for this problem?**
   - DFS allows **early pruning** and avoids unnecessary traversal.

3. **Why use a queue for BFS?**
   - A queue helps maintain **FIFO order**, ensuring we process nodes **from left to right** at each level.

4. **Why use recursion for DFS?**
   - Recursion simplifies **depth tracking**, but can lead to **stack overflow** for deep trees.

5. **Time Complexity Analysis:**
   - **BFS Approach** → **O(N)** (We visit each node once).
   - **DFS Approach** → **O(N)** (We explore each node once).

6. **Space Complexity Analysis:**
   - **BFS Approach** → **O(N)** (Queue stores nodes level by level).
   - **DFS Approach** → **O(H)** (H is tree height, due to recursion stack).

---

## **🎯 Final Summary**
- **Use BFS** if you want a **simple**, **straightforward** solution.
- **Use DFS** if you prefer **recursion** and **early pruning**.
- **Optimized BFS** minimizes queue size, making it **more memory-efficient**.

These solutions work for **any edge case** and handle **large trees** efficiently. 🚀