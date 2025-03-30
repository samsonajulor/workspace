# **Technical Documentation: Binary Tree Inorder Traversal (TypeScript)**  

## **Introduction**  
A **binary tree** is a structure where each node has at most **two children** (left and right). **Inorder traversal** means visiting the nodes in this order:  
1. **Left subtree** (visit all nodes in the left branch)  
2. **Root node** (visit the current node)  
3. **Right subtree** (visit all nodes in the right branch)  

For example, if we have this tree:  
```
      1
       \
        2
       /
      3
```
The inorder traversal would be: `[1, 3, 2]`.  

---

## **Approaches to Solve This Problem**  
We will solve the problem using **three different methods**:  
1. **Recursive Approach** (Simple, but uses extra memory)  
2. **Iterative Approach with a Stack** (Efficient, avoids recursion)  
3. **Morris Traversal (Threaded Binary Tree)** (Most efficient, no extra memory)

---

## **1️⃣ Recursive Approach (Simple and Clear but Uses More Memory)**  
### **How does this work?**  
1. Start from the **root node**.  
2. **Recursively** visit the **left subtree**.  
3. Print the **current node**.  
4. **Recursively** visit the **right subtree**.  

### **Pseudo-Code Explanation**  
```
Define a function that takes the root of the tree.
If the root is empty (null), return an empty list.
Otherwise:
    - Visit the left subtree and get the values.
    - Visit the current node and store its value.
    - Visit the right subtree and get the values.
Return all these values combined.
```

### **TypeScript Code**
```typescript
function inorderTraversal(root: TreeNode | null): number[] {
    if (!root) return [];
    return [...inorderTraversal(root.left), root.val, ...inorderTraversal(root.right)];
}
```

### **Pros & Cons**  
✅ **Simple and easy to understand**  
✅ **Uses the natural recursive structure of a tree**  
❌ **Uses extra memory due to recursive function calls** (O(N) for recursion stack)  

---

## **2️⃣ Iterative Approach with a Stack (More Efficient than Recursion)**  
### **How does this work?**  
Since recursion uses extra memory, we can simulate the call stack using our own **stack**.  
1. Use a **stack** to keep track of nodes.  
2. Start from the **root node** and move **left** until we reach a null node.  
3. Once we reach null, pop the last node from the stack, print it, and move to the **right**.  
4. Repeat until all nodes are visited.  

### **Pseudo-Code Explanation**  
```
Create an empty list `result` to store values.
Create an empty stack to keep track of nodes.
Set `current` as the root node.

While `current` is not null OR the stack is not empty:
    - Move left while possible, pushing each node to the stack.
    - When there are no more left nodes, pop the top node from the stack.
    - Store its value in `result`.
    - Move to the right node.

Return `result`.
```

### **TypeScript Code**
```typescript
function inorderTraversal(root: TreeNode | null): number[] {
    const result: number[] = [];
    const stack: TreeNode[] = [];
    let current: TreeNode | null = root;

    while (current !== null || stack.length > 0) {
        while (current !== null) {
            stack.push(current);
            current = current.left;
        }
        current = stack.pop()!;
        result.push(current.val);
        current = current.right;
    }

    return result;
}
```

### **Pros & Cons**  
✅ **Avoids recursion (no extra memory for function calls)**  
✅ **Faster than the recursive approach**  
❌ **Still uses extra memory for the stack (O(N) in the worst case)**  

---

## **3️⃣ Morris Traversal (Most Efficient, No Extra Memory)**  
### **How does this work?**  
Morris Traversal **modifies the tree temporarily** to avoid extra memory usage.  
1. If there is a **left subtree**, find the **rightmost node** in the left subtree (called the **predecessor**).  
2. If the predecessor **does not have a link** to the current node, create a link and move left.  
3. If the predecessor **already has a link**, remove the link, process the node, and move right.  
4. Repeat until all nodes are visited.  

### **Pseudo-Code Explanation**  
```
Set `current` as the root node.
While `current` is not null:
    - If there is no left child, add the value of `current` to `result` and move to the right.
    - Otherwise, find the predecessor (rightmost node in the left subtree).
    - If the predecessor does NOT have a link to `current`, create the link and move left.
    - If the predecessor already has a link, remove it, add `current` value to `result`, and move right.
Return `result`.
```

### **TypeScript Code**
```typescript
function inorderTraversal(root: TreeNode | null): number[] {
    const result: number[] = [];
    let current: TreeNode | null = root;

    while (current !== null) {
        if (current.left === null) {
            result.push(current.val);
            current = current.right;
        } else {
            let predecessor: TreeNode | null = current.left;
            while (predecessor.right !== null && predecessor.right !== current) {
                predecessor = predecessor.right;
            }
            
            if (predecessor.right === null) {
                predecessor.right = current;
                current = current.left;
            } else {
                predecessor.right = null;
                result.push(current.val);
                current = current.right;
            }
        }
    }

    return result;
}
```

### **Pros & Cons**  
✅ **Most efficient (O(1) extra memory)**  
✅ **Does not use recursion or a stack**  
❌ **Modifies the tree temporarily, which may not always be acceptable**  
❌ **Harder to understand for beginners**  

---

## **Final Thoughts**  
| **Approach**  | **Time Complexity** | **Space Complexity** | **Best For** |
|--------------|-------------------|-------------------|--------------|
| **Recursive** | O(N) | O(N) (recursion stack) | Simple solutions |
| **Iterative (Stack)** | O(N) | O(N) (explicit stack) | Avoiding recursion |
| **Morris Traversal** | O(N) | O(1) (no extra memory) | Memory-efficient traversal |

### **Which one should you use?**  
- If you need a **quick and easy solution**, use **recursion**.  
- If recursion is a problem, use the **iterative stack-based approach**.  
- If you need **maximum efficiency**, use **Morris Traversal**.  

🚀 **Now you understand binary tree inorder traversal like a pro!** 🚀

### **What is this line doing?**  
```typescript
return [...inorderTraversal(root.left), root.val, ...inorderTraversal(root.right)];
```
This line is **recursively** performing an **inorder traversal** on the tree and combining the results using the **spread operator (`...`)**.

---

### **Breaking it Down Step by Step**
Let's analyze the components of this statement:

1. **`inorderTraversal(root.left)`**  
   - This recursively calls `inorderTraversal` on the **left subtree**.
   - It returns an array of numbers representing the inorder traversal of the left subtree.

2. **`root.val`**  
   - This represents the **current node's value**.

3. **`inorderTraversal(root.right)`**  
   - This recursively calls `inorderTraversal` on the **right subtree**.
   - It returns an array of numbers representing the inorder traversal of the right subtree.

4. **`[...inorderTraversal(root.left), root.val, ...inorderTraversal(root.right)]`**  
   - The **spread operator (`...`)** is used to **combine** the three parts into a **single array**.
   - It expands each of the arrays and inserts their values in the correct order.

---

### **Why does it work?**
This works because of **recursion** and **array spreading**. Let's see an example:

#### **Example Tree**
```
      1
     / \
    2   3
```
- **Step 1:** Call `inorderTraversal(1)`  
  - Calls `inorderTraversal(2)`, returns `[2]`
  - `root.val = 1`
  - Calls `inorderTraversal(3)`, returns `[3]`
  - Combines: `[... [2], 1, ... [3]] → [2, 1, 3]`

#### **Visualization**
Each call follows the same structure:
```
inorderTraversal(1) → [... inorderTraversal(2), 1, ... inorderTraversal(3)]
                    → [... [2], 1, ... [3]]
                    → [2, 1, 3]
```

---

### **Key Takeaways**
✅ **Recursion ensures we traverse the left subtree first, then the root, then the right subtree.**  
✅ **The spread operator (`...`) helps flatten and merge arrays efficiently.**  
✅ **The function stops when it reaches `null`, returning an empty array (`[]`).**  

This is a very **concise** and **elegant** way to implement inorder traversal! 🚀


### **Does This Work for Complex Trees?**  
Yes! The recursive approach using:  
```typescript
return [...inorderTraversal(root.left), root.val, ...inorderTraversal(root.right)];
```  
**works for all binary trees**, no matter how complex they are.  

#### **Example 1: A Larger Tree**  
Consider this tree:
```
        1
       / \
      2   3
     / \    \
    4   5    6
       / \
      7   8
```
### **Step-by-Step Execution**
1. **Start at `root = 1`**
   - Recursively call `inorderTraversal(2)`
   - Store `root.val = 1`
   - Recursively call `inorderTraversal(3)`

2. **Left Subtree (`2`)**
   - Recursively call `inorderTraversal(4)` → returns `[4]`
   - Store `root.val = 2`
   - Recursively call `inorderTraversal(5)`

3. **Left Subtree of `5`**
   - Recursively call `inorderTraversal(7)` → returns `[7]`
   - Store `root.val = 5`
   - Recursively call `inorderTraversal(8)` → returns `[8]`
   - Combine `[7, 5, 8]`  

4. **Return from `2`**
   - Combine `[4, 2, 7, 5, 8]`

5. **Right Subtree (`3`)**
   - Recursively call `inorderTraversal(6)` → returns `[6]`
   - Combine `[3, 6]`

6. **Final Combination**
```
[4, 2, 7, 5, 8, 1, 3, 6]
```

---

### **Can This Cause Stack Overflow?**  
✅ **For small or medium-sized trees (≤ 1000 nodes), this works perfectly.**  
❌ **For very deep trees (100,000+ nodes), recursion may cause a** `Maximum call stack size exceeded` **error.**  
✅ **If trees are very deep, use an** **iterative** **approach (stack-based or Morris traversal) instead.**  

---

### **Conclusion**  
- **This approach is simple, elegant, and works for all trees**  
- **For very large trees, recursion might hit memory limits**  
- **For deep trees, switch to an iterative method** (stack-based traversal or Morris traversal)
