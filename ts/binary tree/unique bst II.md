# **📖 Beginner-Friendly TypeScript Technical Documentation: "Unique Binary Search Trees II"**  

---

## **🌱 Understanding the Problem Like You're Five**  
Imagine you have **n** LEGO blocks, and each block has a **number** from `1` to `n`.  

A **Binary Search Tree (BST)** follows these rules:
1. **The smallest numbers go to the left.**
2. **The biggest numbers go to the right.**
3. **Each tree has a "root" (starting block), and every block follows rules 1 & 2.**

The goal is to find **ALL** possible trees that can be built using numbers `1` to `n`.  

For example, if **n = 3**, these are all the possible trees:

```
   1         1       2       3       3
    \         \     / \     /       /
     2         3   1   3   1       2
      \       /           \       /
       3     2             2     1
```
We must **generate all these trees** and return them.

---

## **💡 Solution 1: Recursive Approach (Divide & Conquer)**
### **🤔 How Does This Work? (Pseudo-Code)**
1. **Pick each number (1 to n) as the root** of the tree.
2. **Recursively create** all possible left subtrees using smaller numbers.
3. **Recursively create** all possible right subtrees using bigger numbers.
4. **Combine** all left and right subtrees with the current root.
5. **Return all unique trees.**

### **📝 TypeScript Code**
```typescript
function generateTrees(n: number): Array<TreeNode | null> {
    if (n === 0) return [];

    function generate(start: number, end: number): Array<TreeNode | null> {
        const allTrees: Array<TreeNode | null> = [];
        
        if (start > end) {
            allTrees.push(null);
            return allTrees;
        }
        
        for (let i = start; i <= end; i++) {
            const leftTrees = generate(start, i - 1);
            const rightTrees = generate(i + 1, end);
            
            for (const left of leftTrees) {
                for (const right of rightTrees) {
                    const currentTree = new TreeNode(i);
                    currentTree.left = left;
                    currentTree.right = right;
                    allTrees.push(currentTree);
                }
            }
        }
        
        return allTrees;
    }
    
    return generate(1, n);
}
```

---

## **💡 Solution 2: Memoization (Caching)**
### **🤔 How Does This Work? (Pseudo-Code)**
1. This is similar to the recursive solution, **but we store results** so we don’t repeat calculations.
2. If we already computed trees for a given range `(start, end)`, **use the stored result**.
3. This makes the solution **faster**.

### **📝 TypeScript Code**
```typescript
function generateTrees(n: number): Array<TreeNode | null> {
    if (n === 0) return [];

    const memo: Map<string, Array<TreeNode | null>> = new Map();

    function generate(start: number, end: number): Array<TreeNode | null> {
        const key = `${start}-${end}`;
        if (memo.has(key)) return memo.get(key)!;

        const allTrees: Array<TreeNode | null> = [];
        
        if (start > end) {
            allTrees.push(null);
            return allTrees;
        }
        
        for (let i = start; i <= end; i++) {
            const leftTrees = generate(start, i - 1);
            const rightTrees = generate(i + 1, end);
            
            for (const left of leftTrees) {
                for (const right of rightTrees) {
                    const currentTree = new TreeNode(i);
                    currentTree.left = left;
                    currentTree.right = right;
                    allTrees.push(currentTree);
                }
            }
        }

        memo.set(key, allTrees);
        return allTrees;
    }
    
    return generate(1, n);
}
```
### **🚀 Why is this Faster?**
- Instead of recalculating trees **for the same range**, we **store** results.
- If the function **calls the same range again**, we **return the stored value** instead of recalculating.

---

## **💡 Solution 3: Bottom-Up Dynamic Programming**
### **🤔 How Does This Work? (Pseudo-Code)**
1. **Start with small trees (n = 1) and build larger trees.**
2. **Use results from smaller trees** to construct bigger trees.
3. **Store trees for each size** in an array.
4. **Combine smaller trees to form bigger trees**.

### **📝 TypeScript Code**
```typescript
function generateTrees(n: number): Array<TreeNode | null> {
    if (n === 0) return [];

    const dp: Array<Array<TreeNode | null>> = new Array(n + 1).fill(null).map(() => []);
    dp[0].push(null);

    for (let nodes = 1; nodes <= n; nodes++) {
        for (let root = 1; root <= nodes; root++) {
            const leftTrees = dp[root - 1];
            const rightTrees = dp[nodes - root];

            for (const left of leftTrees) {
                for (const right of rightTrees) {
                    const currentTree = new TreeNode(root);
                    currentTree.left = left;
                    currentTree.right = right;
                    dp[nodes].push(currentTree);
                }
            }
        }
    }
    
    return dp[n];
}
```

---

# **🚀 Deep Dive into TypeScript Syntax & Concepts**
## **1️⃣ Recursive Function Calls**
- The function **calls itself** to solve smaller problems before solving the full problem.
- Example:
  ```typescript
  function generate(start: number, end: number): Array<TreeNode | null> {
      const leftTrees = generate(start, i - 1);
      const rightTrees = generate(i + 1, end);
  }
  ```
- This **divides the problem into subproblems** (Divide & Conquer).

## **2️⃣ Dynamic Programming**
- Instead of recalculating the same **subproblem**, store results in an **array (`dp[]`)**.
- Example:
  ```typescript
  dp[0].push(null); // Base case: No nodes = Empty tree
  ```
- We **build trees step-by-step**, starting with small trees and using those results for bigger trees.

## **3️⃣ Using `Map` for Memoization**
- A **map** stores already computed results to avoid duplicate work.
- Example:
  ```typescript
  const memo: Map<string, Array<TreeNode | null>> = new Map();
  if (memo.has(key)) return memo.get(key)!;
  ```

---

# **📊 Time & Space Complexity**
| Approach                | Time Complexity | Space Complexity | Best For |
|-------------------------|----------------|------------------|----------|
| **Recursive (Brute Force)** | **O(4ⁿ / n^(3/2))** | **O(4ⁿ / n^(3/2))** | Small `n` (≤ 8) |
| **Memoization (Top-Down DP)** | **O(4ⁿ / n^(3/2))** | **O(4ⁿ / n^(3/2))** | Medium `n` (≤ 8) |
| **Bottom-Up DP** | **O(4ⁿ / n^(3/2))** | **O(4ⁿ / n^(3/2))** | Best for larger `n` |

---

# **🎯 Which Approach Should You Use?**
1️⃣ **Recursive** – **Simple**, but recalculates results, making it slower.  
2️⃣ **Memoization** – **Faster**, avoids redundant calculations.  
3️⃣ **Dynamic Programming** – **Best performance**, but **harder to understand**.

---

# **🔥 Final Thought**
*"To solve problems like this, think **recursively** and use **memoization** or **dynamic programming** for optimization!" 🚀*