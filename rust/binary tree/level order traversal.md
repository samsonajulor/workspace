# 📖 **Beginner-Friendly Rust Documentation: "Binary Tree Level Order Traversal"**  

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

### **📝 Rust Code**
```rust
use std::rc::Rc;
use std::cell::RefCell;
use std::collections::VecDeque;

impl Solution {
    pub fn level_order(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<Vec<i32>> {
        let mut result = Vec::new();
        if root.is_none() {
            return result;
        }

        let mut queue = VecDeque::new();
        queue.push_back(root);

        while !queue.is_empty() {
            let level_size = queue.len();
            let mut current_level = Vec::new();

            for _ in 0..level_size {
                if let Some(Some(node)) = queue.pop_front() {
                    let node = node.borrow();
                    current_level.push(node.val);

                    if node.left.is_some() {
                        queue.push_back(node.left.clone());
                    }
                    if node.right.is_some() {
                        queue.push_back(node.right.clone());
                    }
                }
            }

            result.push(current_level);
        }

        result
    }
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

### **📝 Rust Code**
```rust
use std::rc::Rc;
use std::cell::RefCell;

impl Solution {
    pub fn level_order(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<Vec<i32>> {
        let mut result = Vec::new();
        Self::traverse(&root, 0, &mut result);
        result
    }

    fn traverse(node: &Option<Rc<RefCell<TreeNode>>>, level: usize, result: &mut Vec<Vec<i32>>) {
        if let Some(node) = node {
            let node = node.borrow();
            
            if result.len() == level {
                result.push(Vec::new());
            }
            
            result[level].push(node.val);

            Self::traverse(&node.left, level + 1, result);
            Self::traverse(&node.right, level + 1, result);
        }
    }
}
```

---

## **💡 Solution 3: Using a HashMap for Level Storage**
### **🤔 How Does This Work? (Pseudo-Code)**
1. Use a **HashMap** to store values for each level.
2. Start at the root, and use a queue to track nodes and their levels.
3. When visiting a node:
   - Store its value at its level.
   - Add its left and right children to the queue.
4. Convert the HashMap into an array.

### **📝 Rust Code**
```rust
use std::rc::Rc;
use std::cell::RefCell;
use std::collections::{VecDeque, HashMap};

impl Solution {
    pub fn level_order(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<Vec<i32>> {
        if root.is_none() {
            return Vec::new();
        }

        let mut map: HashMap<usize, Vec<i32>> = HashMap::new();
        let mut queue = VecDeque::new();
        queue.push_back((root, 0));

        while let Some((node, level)) = queue.pop_front() {
            if let Some(node) = node {
                let node = node.borrow();
                map.entry(level).or_insert(Vec::new()).push(node.val);

                queue.push_back((node.left.clone(), level + 1));
                queue.push_back((node.right.clone(), level + 1));
            }
        }

        let mut result: Vec<Vec<i32>> = Vec::new();
        for level in 0..map.len() {
            if let Some(values) = map.get(&level) {
                result.push(values.clone());
            }
        }

        result
    }
}
```

---

# **🚀 Deep Dive into Rust Syntax & Concepts**
## **1️⃣ Queue (First-In-First-Out - FIFO)**
- A **queue** stores nodes as we visit them.
- **We remove elements from the front (`pop_front()`) and add new ones at the back (`push_back()`).**
- Example:
  ```rust
  let mut queue = VecDeque::new();
  queue.push_back(root.clone()); // Adds new node to the back
  queue.pop_front(); // Removes first node
  ```

## **2️⃣ Recursion**
- **A function calls itself** to break the problem into smaller pieces.
- Example:
  ```rust
  fn traverse(node: &Option<Rc<RefCell<TreeNode>>>, level: usize, result: &mut Vec<Vec<i32>>) {
      if let Some(node) = node {
          let node = node.borrow();
          traverse(&node.left, level + 1, result);
          traverse(&node.right, level + 1, result);
      }
  }
  ```

## **3️⃣ HashMap for Level Storage**
- **A `HashMap` is a key-value store** that keeps track of levels.
- Example:
  ```rust
  let mut map = HashMap::new();
  map.insert(0, vec![3]); // Level 0 → [3]
  map.insert(1, vec![9, 20]); // Level 1 → [9, 20]
  ```

---

# **🎯 Which Approach Should You Use?**
1️⃣ **Queue (BFS)** → **Best for efficiency**, simple & easy to implement.  
2️⃣ **Recursion** → **Elegant**, but **uses more memory** for deep trees.  
3️⃣ **HashMap-Based Approach** → Useful for **fast access to levels**, but requires extra storage.

---

# **🔥 Final Thought**
*"Solving tree problems is easier if you **think in levels** and **use recursion or queues**!" 🚀*