# **Rust Technical Documentation: Binary Tree Inorder Traversal**  

## **Introduction**  
A **binary tree** is a data structure where each node has at most **two children** (left and right).  

**Inorder traversal** means visiting the nodes in this order:  
1. **Left subtree** (visit all nodes in the left branch)  
2. **Root node** (visit the current node)  
3. **Right subtree** (visit all nodes in the right branch)  

### **Example**
Given the tree:
```
      1
       \
        2
       /
      3
```
The **inorder traversal** would be `[1, 3, 2]`.  

---

## **Approaches to Solve This Problem**  
We will solve the problem using **three different methods**:  
1. **Recursive Approach** (Simple, but uses extra memory)  
2. **Iterative Approach with a Stack** (Efficient, avoids recursion)  
3. **Morris Traversal (Threaded Binary Tree)** (Most efficient, no extra memory)

---

## **1️⃣ Recursive Approach (Simple but Uses More Memory)**  

### **How does this work?**  
1. Start from the **root node**.  
2. **Recursively** visit the **left subtree**.  
3. Print the **current node**.  
4. **Recursively** visit the **right subtree**.  

### **Pseudo-Code Explanation**  
```
Define a function that takes the root of the tree.
If the root is empty (None), return an empty list.
Otherwise:
    - Visit the left subtree and get the values.
    - Visit the current node and store its value.
    - Visit the right subtree and get the values.
Return all these values combined.
```

### **Rust Code**
```rust
use std::rc::Rc;
use std::cell::RefCell;

impl Solution {
    pub fn inorder_traversal(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<i32> {
        let mut res = Vec::new();
        Self::helper(&root, &mut res);
        res
    }
    
    fn helper(node: &Option<Rc<RefCell<TreeNode>>>, res: &mut Vec<i32>) {
        if let Some(ref n) = node {
            let n_borrow = n.borrow();
            Self::helper(&n_borrow.left, res);
            res.push(n_borrow.val);
            Self::helper(&n_borrow.right, res);
        }
    }
}
```

### **Pros & Cons**  
✅ **Simple and easy to understand**  
✅ **Uses the natural recursive structure of a tree**  
❌ **Uses extra memory due to recursive function calls** (O(N) for recursion stack)  

---

## **2️⃣ Iterative Approach with a Stack (Avoids Recursion, More Efficient)**  

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

While `current` is not None OR the stack is not empty:
    - Move left while possible, pushing each node to the stack.
    - When there are no more left nodes, pop the top node from the stack.
    - Store its value in `result`.
    - Move to the right node.

Return `result`.
```

### **Rust Code**
```rust
use std::rc::Rc;
use std::cell::RefCell;

impl Solution {
    pub fn inorder_traversal(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<i32> {
        let mut result = Vec::new();
        let mut stack = Vec::new();
        let mut current = root;

        while current.is_some() || !stack.is_empty() {
            while let Some(node) = current {
                stack.push(node.clone());
                current = node.borrow().left.clone();
            }
            
            if let Some(node) = stack.pop() {
                result.push(node.borrow().val);
                current = node.borrow().right.clone();
            }
        }

        result
    }
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
While `current` is not None:
    - If there is no left child, add the value of `current` to `result` and move to the right.
    - Otherwise, find the predecessor (rightmost node in the left subtree).
    - If the predecessor does NOT have a link to `current`, create the link and move left.
    - If the predecessor already has a link, remove it, add `current` value to `result`, and move right.
Return `result`.
```

### **Rust Code**
```rust
use std::rc::Rc;
use std::cell::RefCell;

impl Solution {
    pub fn inorder_traversal(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<i32> {
        let mut result = Vec::new();
        let mut current = root;

        while let Some(node) = current.clone() {
            if node.borrow().left.is_none() {
                result.push(node.borrow().val);
                current = node.borrow().right.clone();
            } else {
                let mut predecessor = node.borrow().left.clone();
                while let Some(pred) = predecessor.clone() {
                    if pred.borrow().right.is_some() && pred.borrow().right != current {
                        predecessor = pred.borrow().right.clone();
                    } else {
                        break;
                    }
                }

                if let Some(pred) = predecessor {
                    if pred.borrow().right.is_none() {
                        pred.borrow_mut().right = current.clone();
                        current = node.borrow().left.clone();
                    } else {
                        pred.borrow_mut().right = None;
                        result.push(node.borrow().val);
                        current = node.borrow().right.clone();
                    }
                }
            }
        }

        result
    }
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

🚀 **Now you understand binary tree inorder traversal in Rust like a pro!** 🚀



# **Understanding Rust Syntax and Programming Dynamics in Each Solution**  

Rust is a **systems programming language** focused on **performance, memory safety, and concurrency**. Let's break down each solution, explaining Rust syntax and unique programming concepts along the way.

---

## **1️⃣ Recursive Approach**
```rust
use std::rc::Rc;
use std::cell::RefCell;

impl Solution {
    pub fn inorder_traversal(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<i32> {
        let mut res = Vec::new();
        Self::helper(&root, &mut res);
        res
    }
    
    fn helper(node: &Option<Rc<RefCell<TreeNode>>>, res: &mut Vec<i32>) {
        if let Some(ref n) = node {
            let n_borrow = n.borrow();
            Self::helper(&n_borrow.left, res);
            res.push(n_borrow.val);
            Self::helper(&n_borrow.right, res);
        }
    }
}
```

### **Rust Syntax & Concepts Explained**
#### **1. `use std::rc::Rc;` & `use std::cell::RefCell;`**
- `Rc<T>`: A **reference-counted pointer** that allows **multiple ownership** of a value.
- `RefCell<T>`: A **mutable interior** data structure that allows **borrow checking at runtime**.

#### **2. `Option<Rc<RefCell<TreeNode>>>`**
- **`Option<T>`** is used because the left/right children can be **None** (null in other languages).
- **`Rc<RefCell<TreeNode>>`** allows multiple parts of the program to reference a node **while maintaining mutability**.

#### **3. `if let Some(ref n) = node`**
- **Pattern matching** shorthand.
- It checks if `node` is `Some(TreeNode)`, and binds `n` to the inner value.

#### **4. `n.borrow()`**
- `borrow()` is used instead of `&n` because `RefCell<T>` **controls interior mutability at runtime**.
- If multiple borrows occur, Rust panics to prevent data races.

---

## **2️⃣ Iterative Approach (Stack)**
```rust
use std::rc::Rc;
use std::cell::RefCell;

impl Solution {
    pub fn inorder_traversal(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<i32> {
        let mut result = Vec::new();
        let mut stack = Vec::new();
        let mut current = root;

        while current.is_some() || !stack.is_empty() {
            while let Some(node) = current {
                stack.push(node.clone());
                current = node.borrow().left.clone();
            }
            
            if let Some(node) = stack.pop() {
                result.push(node.borrow().val);
                current = node.borrow().right.clone();
            }
        }

        result
    }
}
```

### **Rust Syntax & Concepts Explained**
#### **1. `Vec::new()`**
- Rust uses `Vec<T>` as a **dynamic array**.
- `Vec::new()` creates an **empty vector**.

#### **2. `while let Some(node) = current`**
- **Pattern matching inside a loop**.
- Equivalent to:
  ```rust
  while current.is_some() {
      let node = current.unwrap();
  }
  ```
- `unwrap()` would cause a panic if `None` was encountered, but `while let` safely handles it.

#### **3. `stack.push(node.clone())`**
- `Rc<T>` allows **cloning** without duplicating the actual data.
- `node.clone()` increases the **reference count** instead of copying the entire `TreeNode`.

#### **4. `current = node.borrow().left.clone();`**
- Since `TreeNode.left` is an `Option<Rc<RefCell<TreeNode>>>`, we need `.clone()` to maintain ownership.

---

## **3️⃣ Morris Traversal (Threaded Binary Tree)**
```rust
use std::rc::Rc;
use std::cell::RefCell;

impl Solution {
    pub fn inorder_traversal(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<i32> {
        let mut result = Vec::new();
        let mut current = root;

        while let Some(node) = current.clone() {
            if node.borrow().left.is_none() {
                result.push(node.borrow().val);
                current = node.borrow().right.clone();
            } else {
                let mut predecessor = node.borrow().left.clone();
                while let Some(pred) = predecessor.clone() {
                    if pred.borrow().right.is_some() && pred.borrow().right != current {
                        predecessor = pred.borrow().right.clone();
                    } else {
                        break;
                    }
                }

                if let Some(pred) = predecessor {
                    if pred.borrow().right.is_none() {
                        pred.borrow_mut().right = current.clone();
                        current = node.borrow().left.clone();
                    } else {
                        pred.borrow_mut().right = None;
                        result.push(node.borrow().val);
                        current = node.borrow().right.clone();
                    }
                }
            }
        }

        result
    }
}
```

### **Rust Syntax & Concepts Explained**
#### **1. `while let Some(node) = current.clone()`**
- Since `current` is an `Option<Rc<RefCell<TreeNode>>>`, we **clone** it to maintain ownership.
- If `current` is `None`, the loop stops.

#### **2. `if node.borrow().left.is_none()`**
- **Borrowing rules** apply here.
- `borrow()` allows **read-only access** to the `TreeNode`.

#### **3. `mut predecessor = node.borrow().left.clone();`**
- This finds the **inorder predecessor** (rightmost node of the left subtree).
- We use `.clone()` to preserve ownership.

#### **4. `pred.borrow_mut().right = None;`**
- `borrow_mut()` allows **modifying the structure** inside `RefCell<T>`.
- This restores the original tree structure.

---

## **Rust Programming Dynamics in These Solutions**
### **1️⃣ Ownership and Borrowing**
- **`Rc<RefCell<T>>`** is necessary because:
  - `Rc<T>` allows **shared ownership**.
  - `RefCell<T>` allows **mutable access** inside an immutable reference.
- Without `RefCell<T>`, Rust would **not allow modifying `left` or `right`** while traversing.

### **2️⃣ Pattern Matching (`if let`, `while let`)**
- Used extensively for handling `Option<T>` safely.
- Example:
  ```rust
  if let Some(node) = current {
      // `node` is now available inside the block
  }
  ```

### **3️⃣ Cloning vs. Borrowing**
- `node.clone()` creates a **new reference** to an existing `TreeNode` without copying it.
- `node.borrow()` allows **temporary read access**.
- `node.borrow_mut()` allows **modifying** the structure.

### **4️⃣ Performance Considerations**
| **Approach** | **Time Complexity** | **Space Complexity** | **Memory Safe?** | **Best For** |
|--------------|--------------------|--------------------|--------------|-------------|
| **Recursive** | O(N) | O(N) (recursion stack) | ✅ Yes | Small trees, easy implementation |
| **Iterative (Stack)** | O(N) | O(N) (explicit stack) | ✅ Yes | Large trees, avoids recursion limits |
| **Morris Traversal** | O(N) | O(1) | ⚠️ Temporarily modifies the tree | Best for memory efficiency |

---

## **Final Thoughts**
Rust **ensures memory safety** without garbage collection, which makes it different from languages like C++ or Python. To efficiently work with **binary trees**, we need:
- `Rc<T>` for **shared ownership**.
- `RefCell<T>` for **interior mutability**.
- **Pattern matching** to handle `Option<T>` values safely.

Each solution here **prioritizes different trade-offs** between **simplicity, performance, and memory usage**. 🚀