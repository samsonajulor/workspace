# **Constructing a Binary Tree from Preorder and Inorder Traversals in TypeScript**  

## **Introduction**  
We are given two arrays:  
- `preorder`: This represents a preorder traversal of a binary tree. (Root → Left → Right)  
- `inorder`: This represents an inorder traversal of the same binary tree. (Left → Root → Right)  

Our task is to **reconstruct the binary tree** from these two traversals.  

---

## **Understanding the Problem (For a 5-Year-Old)**  
Imagine you have a **tree** and someone walks through it in two different ways:  
1. **Preorder:** They write down the **root** first, then go **left**, then **right**.  
2. **Inorder:** They write down the **left side** first, then the **root**, then the **right side**.  

If we have these two lists, can we **rebuild the tree**? YES! 🎉  

---

## **Example to Understand**  

Let’s say we are given:  
```ts
preorder = [3,9,20,15,7] 
inorder = [9,3,15,20,7]
```

We can reconstruct the tree step by step:

```
        3
       / \
      9   20
         /  \
        15   7
```

How did we figure this out?
1. **Preorder’s first element (`3`) is always the root**.
2. **Find `3` in inorder**, everything **left** of `3` is the **left subtree**, everything **right** is the **right subtree**.
3. **Repeat recursively** for left and right parts.

---

## **Approach 1: Recursion (Divide and Conquer)**
### **Pseudo-Code Explanation**
1. **Base Case:** If the arrays are empty, return `null` (no tree).  
2. **Find Root:** The first element of `preorder` is the root.  
3. **Find Left & Right Parts:**  
   - Look at `inorder` to find **left and right subtrees**.  
   - Recursively build the **left subtree** and **right subtree** using slices of the arrays.  

### **Actual Code**
```ts
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

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    if (!preorder.length || !inorder.length) return null;

    const rootValue = preorder[0]; // Root is always first in preorder
    const root = new TreeNode(rootValue);

    const rootIndex = inorder.indexOf(rootValue); // Find root in inorder

    // Left side of inorder is left subtree, right side is right subtree
    root.left = buildTree(preorder.slice(1, rootIndex + 1), inorder.slice(0, rootIndex));
    root.right = buildTree(preorder.slice(rootIndex + 1), inorder.slice(rootIndex + 1));

    return root;
}
```

### **Complexity Analysis**
- **Finding `rootIndex`:** `O(n)`
- **Slicing Arrays:** `O(n)`
- **Recursive Calls:** `O(n)`

**Total Complexity:** `O(n²)`

---

## **Approach 2: Optimized Recursion Using a Hash Map**
### **Why is Approach 1 Slow?**
- **Slicing arrays repeatedly (`preorder.slice(...)`) creates extra copies, which is inefficient.**  
- **Finding the index of `root` in `inorder` (`inorder.indexOf(...)`) takes O(n) time in every call.**  

### **Optimization Plan**
1. **Use a Hash Map (`Map<number, number>`) to store `inorder` indices.**  
2. **Use pointers instead of slicing arrays.**  
3. **Avoid extra memory usage.**  

### **Optimized Code**
```ts
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

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    let preIndex = 0;
    const inorderMap = new Map<number, number>();

    // Store inorder indices for quick lookup
    inorder.forEach((val, index) => inorderMap.set(val, index));

    function construct(left: number, right: number): TreeNode | null {
        if (left > right) return null;

        const rootValue = preorder[preIndex++];
        const root = new TreeNode(rootValue);

        const inorderIndex = inorderMap.get(rootValue)!;

        root.left = construct(left, inorderIndex - 1);
        root.right = construct(inorderIndex + 1, right);

        return root;
    }

    return construct(0, inorder.length - 1);
}
```

### **Time Complexity**
- **Building Hash Map:** `O(n)`
- **Recursive Calls:** `O(n)`
- **Total Complexity:** `O(n)`

### **Space Complexity**
- **Hash Map:** `O(n)`
- **Recursion Stack:** `O(n)` (in the worst case, a skewed tree)
- **Total Space:** `O(n)`

---

## **Approach 3: Iterative Stack-Based Approach**
### **Why Another Solution?**
- **Recursion can cause a deep stack (bad for large trees).**
- **We can simulate recursion using a stack.**

### **Iterative Code**
```ts
function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    if (!preorder.length) return null;

    const root = new TreeNode(preorder[0]);
    const stack: TreeNode[] = [root];
    let inorderIndex = 0;

    for (let i = 1; i < preorder.length; i++) {
        let node = stack[stack.length - 1];
        const value = preorder[i];

        if (node.val !== inorder[inorderIndex]) {
            node.left = new TreeNode(value);
            stack.push(node.left);
        } else {
            while (stack.length && stack[stack.length - 1].val === inorder[inorderIndex]) {
                node = stack.pop()!;
                inorderIndex++;
            }
            node.right = new TreeNode(value);
            stack.push(node.right);
        }
    }
    return root;
}
```

### **Time Complexity:** `O(n)`  
### **Space Complexity:** `O(n)`

---

## **Comparison of All Three Solutions**
| Approach  | Time Complexity | Space Complexity | Best For? |
|-----------|---------------|----------------|-----------|
| **Recursive (Naive)** | `O(n²)` | `O(n)` | Small trees |
| **Optimized Recursive (Hash Map + Pointers)** | `O(n)` | `O(n)` | Large trees |
| **Iterative (Stack-based)** | `O(n)` | `O(n)` | Avoiding deep recursion |

---

## **Three Non-Trivial Examples**
### **Example 1**
```ts
preorder = [10,5,2,7,15,12,20]
inorder = [2,5,7,10,12,15,20]
```
**Expected Output:**  
```
         10
        /  \
       5    15
      / \   /  \
     2   7 12  20
```

### **Example 2**
```ts
preorder = [8,4,2,6,10,9,12]
inorder = [2,4,6,8,9,10,12]
```
**Expected Output:**  
```
        8
       / \
      4   10
     / \  /  \
    2   6 9  12
```

### **Example 3**
```ts
preorder = [1,2,3]
inorder = [1,2,3]
```
**Expected Output:**  
```
1
 \
  2
   \
    3
```

---

## **Conclusion**
1. **Recursive solution is simple but slow.**  
2. **Optimized recursion using a hash map is best for large trees.**  
3. **Iterative solution avoids deep recursion issues.**  
4. **Understanding tree traversal is key to solving this problem efficiently.** 🚀