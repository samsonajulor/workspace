# **Beginner-Friendly TypeScript Technical Documentation: "Same Tree" Problem**  
## **📌 Problem Explanation (Like You're Five)**  
Imagine you have **two trees** made of LEGO blocks. Each LEGO block has a **number** written on it.  

You want to **check if both trees look exactly the same**:
- Do they have the **same shape**?  
- Do they have the **same numbers** in the same places?  

If both answers are **yes**, they are the **same tree** (`true`).  
If they are **different in shape or numbers**, they are **not the same** (`false`).  

---

## **💡 Solution 1: Recursive Approach**
### **🤔 How Does This Work? (Pseudo-Code)**
1. **If both trees are empty** (`null`), they are the same. → ✅ `true`  
2. **If one tree is empty but the other is not**, they are different. → ❌ `false`  
3. **If the numbers in the current blocks don’t match**, they are different. → ❌ `false`  
4. **Check the left sides of both trees**.  
5. **Check the right sides of both trees**.  
6. If **both left and right sides are the same**, the trees are the same!  

### **📝 TypeScript Code**
```typescript
function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    if (!p && !q) return true;
    if (!p || !q || p.val !== q.val) return false;
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}
```

---

## **💡 Solution 2: Iterative Approach (Using a Queue)**
### **🤔 How Does This Work? (Pseudo-Code)**
1. **Use a queue** (a line where we check nodes one by one).  
2. Start by **adding both tree roots to the queue**.  
3. **Keep checking** until the queue is empty:  
   - Take out **two nodes** (one from each tree).  
   - If both are **empty**, continue.  
   - If one is **empty and the other is not**, return `false`.  
   - If the numbers **don’t match**, return `false`.  
   - Add the **left children** of both trees to the queue.  
   - Add the **right children** of both trees to the queue.  
4. If we **never return `false`**, the trees are the same!  

### **📝 TypeScript Code**
```typescript
function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    let queue: (TreeNode | null)[] = [p, q];

    while (queue.length > 0) {
        let node1 = queue.shift()!;
        let node2 = queue.shift()!;

        if (!node1 && !node2) continue;
        if (!node1 || !node2 || node1.val !== node2.val) return false;

        queue.push(node1.left, node2.left);
        queue.push(node1.right, node2.right);
    }

    return true;
}
```

---

## **💡 Solution 3: Iterative Approach (Using a Stack)**
### **🤔 How Does This Work? (Pseudo-Code)**
1. **Use a stack** (like a to-do list where we check nodes).  
2. Start by **adding both tree roots to the stack**.  
3. **Keep checking** until the stack is empty:  
   - Take out **two nodes** (one from each tree).  
   - If both are **empty**, continue.  
   - If one is **empty and the other is not**, return `false`.  
   - If the numbers **don’t match**, return `false`.  
   - Add the **right children** of both trees to the stack.  
   - Add the **left children** of both trees to the stack.  
4. If we **never return `false`**, the trees are the same!  

### **📝 TypeScript Code**
```typescript
function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    let stack: (TreeNode | null)[] = [p, q];

    while (stack.length > 0) {
        let node1 = stack.pop()!;
        let node2 = stack.pop()!;

        if (!node1 && !node2) continue;
        if (!node1 || !node2 || node1.val !== node2.val) return false;

        stack.push(node1.right, node2.right);
        stack.push(node1.left, node2.left);
    }

    return true;
}
```

---

# **🚀 Deep Dive into TypeScript Syntax & Concepts**
## **1️⃣ `TreeNode | null` → Why do we use `null`?**
- In TypeScript, `TreeNode | null` means a **TreeNode that might be empty**.
- `null` represents a missing branch.

## **2️⃣ `!p && !q` → Why Check If Both Trees Are `null`?**
- If both trees are empty, they are **the same** (`true`).
- Example:
  ```typescript
  isSameTree(null, null); // ✅ True
  ```

## **3️⃣ `if (!p || !q || p.val !== q.val) return false;`**
- If **one tree is empty** but the other is not → ❌ `false`.
- If **the numbers don’t match** → ❌ `false`.
- Example:
  ```typescript
  isSameTree(new TreeNode(1), new TreeNode(2)); // ❌ False
  ```

## **4️⃣ `return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);`**
- **Recursively checks** left and right sides.
- Uses **logical AND (`&&`)** to ensure **both must be the same**.

## **5️⃣ `queue.shift()` and `stack.pop()`**
- `.shift()` → Removes **first** item (FIFO: Queue).
- `.pop()` → Removes **last** item (LIFO: Stack).
- These help process nodes in **different orders**.

---

# **📊 Time & Space Complexity**
| Approach  | Time Complexity | Space Complexity | Best For |
|-----------|---------------|----------------|----------|
| **Recursive** | O(N) | O(H) (H = tree height) | Simple & elegant |
| **Iterative (Queue)** | O(N) | O(N) | BFS (Breadth-first) |
| **Iterative (Stack)** | O(N) | O(H) | DFS (Depth-first) |

---

# **🎯 Which Approach Should You Use?**
1️⃣ **Recursive** – **Easy to read**, but uses extra space for recursion stack.  
2️⃣ **Queue (BFS)** – Good for **wide trees**, but extra memory for queue.  
3️⃣ **Stack (DFS)** – **Best for deep trees**, but harder to understand.  

---
## **🚀 Summary**
- **Recursive** is the easiest.
- **Queue (BFS)** and **Stack (DFS)** are **better for large trees**.
- **Choose the right tool for the job!** 🎯  

---
## **🔥 Final Thought**
"TypeScript makes trees safe by ensuring nodes exist before using them. **Understand memory, choose the best method, and practice more!** 🚀"