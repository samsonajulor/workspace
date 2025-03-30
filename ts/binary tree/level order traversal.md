# 📖 **Beginner-Friendly TypeScript Documentation: "Binary Tree Level Order Traversal"**  

---

## **🌱 Understanding the Problem Like You're Five**  

Imagine you have a **Christmas tree 🎄** with different levels:  

- The **top** has 1 light.  
- The **next level** has 2 lights.  
- The **next level** has 3 lights.  

Our job is to **go through each level** and **list the lights at that level** from left to right.  

For example, if the tree looks like this:  

```
       3
      / \
     9   20
        /  \
       15   7
```

We should return:  
```
[
  [3], 
  [9, 20], 
  [15, 7]
]
```
Each **sublist** represents a level.

---

## **💡 Solution 1: Using a Queue (Breadth-First Search - BFS)**
### **🤔 How Does This Work? (Pseudo-Code)**
1. **Start at the root** (top of the tree).  
2. **Use a queue** (like a line at a store) to visit nodes level by level.  
3. **For each level**:
   - Store the node values.
   - Add their left and right children to the queue.
4. **Move to the next level** and repeat until all nodes are visited.

### **📝 TypeScript Code**
```typescript
function levelOrder(root: TreeNode | null): number[][] {
    if (!root) return [];

    const result: number[][] = [];
    const queue: TreeNode[] = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel: number[] = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift()!;
            currentLevel.push(node.val);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        result.push(currentLevel);
    }

    return result;
}
```

---

## **💡 Solution 2: Recursive Approach**
### **🤔 How Does This Work? (Pseudo-Code)**
1. Start from the root.
2. Use recursion (a function calling itself) to visit **each level** of the tree.
3. Store node values **at the correct level** in an array.
4. When you visit a node:
   - Add its value to the array at the correct level.
   - Recursively visit left and right children.

### **📝 TypeScript Code**
```typescript
function levelOrder(root: TreeNode | null): number[][] {
    const result: number[][] = [];
    
    function traverse(node: TreeNode | null, level: number) {
        if (!node) return;

        if (!result[level]) {
            result[level] = [];
        }

        result[level].push(node.val);

        traverse(node.left, level + 1);
        traverse(node.right, level + 1);
    }

    traverse(root, 0);
    return result;
}
```

---

## **💡 Solution 3: Using a Map (Level-wise Storage)**
### **🤔 How Does This Work? (Pseudo-Code)**
1. Use a **map** to store values for each level.
2. Start at the root, and use a queue to track nodes and their levels.
3. When visiting a node:
   - Store its value at its level.
   - Add its left and right children to the queue.
4. Convert the map into an array.

### **📝 TypeScript Code**
```typescript
function levelOrder(root: TreeNode | null): number[][] {
    if (!root) return [];

    const map = new Map<number, number[]>();
    const queue: [TreeNode, number][] = [[root, 0]];

    while (queue.length > 0) {
        const [node, level] = queue.shift()!;

        if (!map.has(level)) {
            map.set(level, []);
        }

        map.get(level)!.push(node.val);

        if (node.left) queue.push([node.left, level + 1]);
        if (node.right) queue.push([node.right, level + 1]);
    }

    return Array.from(map.values());
}
```

---

# **🚀 Deep Dive into TypeScript Syntax & Concepts**
## **1️⃣ Queue (First-In-First-Out - FIFO)**
- A **queue** stores nodes as we visit them.
- **We remove elements from the front (`shift()`) and add new ones at the back (`push()`).**
- Example:
  ```typescript
  const queue: TreeNode[] = [root];
  queue.shift(); // Removes first node
  queue.push(newNode); // Adds new node to the back
  ```

## **2️⃣ Recursion**
- **A function calls itself** to break the problem into smaller pieces.
- Example:
  ```typescript
  function traverse(node: TreeNode | null, level: number) {
      if (!node) return;
      traverse(node.left, level + 1);
      traverse(node.right, level + 1);
  }
  ```

## **3️⃣ Map for Level Storage**
- **A `Map` is a key-value store** that keeps track of levels.
- Example:
  ```typescript
  const map = new Map<number, number[]>();
  map.set(0, [3]); // Level 0 → [3]
  map.set(1, [9, 20]); // Level 1 → [9, 20]
  ```

---

# **🎯 Which Approach Should You Use?**
1️⃣ **Queue (BFS)** → **Best for efficiency**, simple & easy to implement.  
2️⃣ **Recursion** → **Elegant**, but **uses more memory** for deep trees.  
3️⃣ **Map-Based Approach** → Useful for **fast access to levels**, but requires extra storage.

---

# **🔥 Final Thought**
*"Solving tree problems is easier if you **think in levels** and **use recursion or queues**!" 🚀*

