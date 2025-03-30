# **🦀 Beginner-Friendly Rust Technical Documentation: "Same Tree" Problem**  

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
1. **If both trees are empty** (`None`), they are the same. → ✅ `true`  
2. **If one tree is empty but the other is not**, they are different. → ❌ `false`  
3. **If the numbers in the current blocks don’t match**, they are different. → ❌ `false`  
4. **Check the left sides of both trees**.  
5. **Check the right sides of both trees**.  
6. If **both left and right sides are the same**, the trees are the same!  

### **📝 Rust Code**
```rust
use std::rc::Rc;
use std::cell::RefCell;

impl Solution {
    pub fn is_same_tree(p: Option<Rc<RefCell<TreeNode>>>, q: Option<Rc<RefCell<TreeNode>>>) -> bool {
        match (p, q) {
            (None, None) => true, // Both trees are empty -> They are the same
            (Some(node1), Some(node2)) => {
                let n1 = node1.borrow();
                let n2 = node2.borrow();
                n1.val == n2.val  // Check if current values are equal
                    && Self::is_same_tree(n1.left.clone(), n2.left.clone()) // Check left subtree
                    && Self::is_same_tree(n1.right.clone(), n2.right.clone()) // Check right subtree
            }
            _ => false, // One tree is empty but the other is not -> They are different
        }
    }
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

### **📝 Rust Code**
```rust
use std::collections::VecDeque;
use std::rc::Rc;
use std::cell::RefCell;

impl Solution {
    pub fn is_same_tree(p: Option<Rc<RefCell<TreeNode>>>, q: Option<Rc<RefCell<TreeNode>>>) -> bool {
        let mut queue = VecDeque::new();
        queue.push_back((p, q));

        while let Some((node1, node2)) = queue.pop_front() {
            match (node1, node2) {
                (None, None) => continue,
                (Some(n1), Some(n2)) => {
                    let (n1, n2) = (n1.borrow(), n2.borrow());
                    if n1.val != n2.val {
                        return false;
                    }
                    queue.push_back((n1.left.clone(), n2.left.clone()));
                    queue.push_back((n1.right.clone(), n2.right.clone()));
                }
                _ => return false,
            }
        }
        true
    }
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

### **📝 Rust Code**
```rust
use std::rc::Rc;
use std::cell::RefCell;

impl Solution {
    pub fn is_same_tree(p: Option<Rc<RefCell<TreeNode>>>, q: Option<Rc<RefCell<TreeNode>>>) -> bool {
        let mut stack = vec![(p, q)];

        while let Some((node1, node2)) = stack.pop() {
            match (node1, node2) {
                (None, None) => continue,
                (Some(n1), Some(n2)) => {
                    let (n1, n2) = (n1.borrow(), n2.borrow());
                    if n1.val != n2.val {
                        return false;
                    }
                    stack.push((n1.right.clone(), n2.right.clone()));
                    stack.push((n1.left.clone(), n2.left.clone()));
                }
                _ => return false,
            }
        }
        true
    }
}
```

---

# **🚀 Deep Dive into Rust Syntax & Concepts**
## **1️⃣ `Option<Rc<RefCell<TreeNode>>>` → Why So Complicated?**
- `Option<T>` means **it can be empty (`None`) or contain a value (`Some`)**.
- `Rc<T>` (Reference Counted) is used because **multiple parts of the program need to share the tree nodes**.
- `RefCell<T>` allows **mutable borrowing**, since Rust does not allow direct modification of borrowed values.

## **2️⃣ `match (p, q) { (None, None) => true, ... }`**
- This pattern **matches both trees** at the same time.
- If both are `None` (empty), return `true`.

## **3️⃣ `let n1 = node1.borrow();`**
- `borrow()` gives **read access** to a `RefCell<T>` without taking ownership.
- This is necessary because trees use `Rc<RefCell<T>>` to manage memory safely.

## **4️⃣ `queue.push_back((n1.left.clone(), n2.left.clone()));`**
- `.clone()` creates a new reference to the left child without affecting the original.
- We must use `.clone()` because `Rc<T>` does not allow multiple mutable accesses.

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
## **🔥 Final Thought**
"Rust makes trees safe by ensuring memory is managed correctly. **Choose recursion for simplicity, BFS for wide trees, and DFS for deep trees.** 🚀"