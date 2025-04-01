## **Rust Technical Documentation for Binary Tree Level Order Traversal II**

### **Problem Breakdown (Like Explaining to a 5-Year-Old)**
Imagine a **tree** where each branch has smaller branches and leaves. Your task is to **collect all leaves first**, then go **one level up**, collect the nodes, and continue **until you reach the root**.

For example, if you have this tree:

```
        3
       / \
      9   20
         /  \
        15   7
```

The output should be:
```
[
  [15,7],  // Bottom level
  [9,20],  // Middle level
  [3]      // Top level (root)
]
```

### **Approach and Solutions**
We will explore **three solutions** to solve this problem:

1. **Breadth-First Search (BFS) with Queue (Best Approach)**
2. **Recursive Depth-First Search (DFS)**
3. **DFS with Level Tracking in Reverse Order**

---

## **1️⃣ BFS Using a Queue (Best Approach)**
### **🔍 Pseudo-Code Explanation**
1. Start with an **empty queue**.
2. Add the **root node** to the queue.
3. Process **all nodes level by level**.
4. For each level:
   - Store the node values in a list.
   - Add child nodes (left and right) to the queue.
5. **Insert each level at the beginning** of the final result (to reverse order).

---

### **🦀 Rust Implementation**
```rust
use std::rc::Rc;
use std::cell::RefCell;
use std::collections::VecDeque;

impl Solution {
    pub fn level_order_bottom(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<Vec<i32>> {
        let mut result = Vec::new();
        let mut queue = VecDeque::new();

        if let Some(node) = root {
            queue.push_back(node);
        }

        while !queue.is_empty() {
            let level_size = queue.len();
            let mut level = Vec::new();

            for _ in 0..level_size {
                if let Some(node) = queue.pop_front() {
                    let node_ref = node.borrow();
                    level.push(node_ref.val);

                    if let Some(left) = &node_ref.left {
                        queue.push_back(left.clone());
                    }
                    if let Some(right) = &node_ref.right {
                        queue.push_back(right.clone());
                    }
                }
            }

            result.insert(0, level); // Insert at beginning for reverse order
        }

        result
    }
}
```

### **⏳ Complexity Analysis**
- **Time Complexity:** \(O(N)\) → We visit each node once.
- **Space Complexity:** \(O(N)\) → Queue stores up to N/2 nodes.

---

## **2️⃣ Recursive DFS Approach**
### **🔍 Pseudo-Code Explanation**
1. Use a helper function that tracks the **current depth** of recursion.
2. If the current level doesn't exist, **create a new list**.
3. Add node values **to the correct level index**.
4. Traverse **left child first**, then **right child**.
5. **Reverse the order** of levels at the end.

---

### **🦀 Rust Implementation**
```rust
use std::rc::Rc;
use std::cell::RefCell;

impl Solution {
    pub fn level_order_bottom(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<Vec<i32>> {
        let mut levels: Vec<Vec<i32>> = Vec::new();
        Self::dfs(root, 0, &mut levels);
        levels.reverse();
        levels
    }

    fn dfs(node: Option<Rc<RefCell<TreeNode>>>, depth: usize, levels: &mut Vec<Vec<i32>>) {
        if let Some(node) = node {
            let node_ref = node.borrow();
            
            if levels.len() == depth {
                levels.push(Vec::new());
            }
            
            levels[depth].push(node_ref.val);
            
            Self::dfs(node_ref.left.clone(), depth + 1, levels);
            Self::dfs(node_ref.right.clone(), depth + 1, levels);
        }
    }
}
```

### **⏳ Complexity Analysis**
- **Time Complexity:** \(O(N)\) → Each node is visited once.
- **Space Complexity:** \(O(H)\) → Recursion depth is tree height.

---

## **3️⃣ DFS with Reverse Level Tracking**
### **🔍 Pseudo-Code Explanation**
1. **Find max depth** of the tree.
2. Initialize an array of lists **from bottom to top**.
3. **Traverse tree in DFS order** while inserting into the correct depth level.
4. Return the **final reversed list**.

---

### **🦀 Rust Implementation**
```rust
use std::rc::Rc;
use std::cell::RefCell;

impl Solution {
    pub fn level_order_bottom(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<Vec<i32>> {
        let depth = Self::max_depth(&root);
        let mut result = vec![Vec::new(); depth];
        Self::dfs(&root, depth - 1, &mut result);
        result
    }

    fn max_depth(node: &Option<Rc<RefCell<TreeNode>>>) -> usize {
        match node {
            Some(n) => {
                let n = n.borrow();
                1 + usize::max(Self::max_depth(&n.left), Self::max_depth(&n.right))
            }
            None => 0,
        }
    }

    fn dfs(node: &Option<Rc<RefCell<TreeNode>>>, depth: usize, result: &mut Vec<Vec<i32>>) {
        if let Some(n) = node {
            let n = n.borrow();
            result[depth].push(n.val);
            Self::dfs(&n.left, depth - 1, result);
            Self::dfs(&n.right, depth - 1, result);
        }
    }
}
```

### **⏳ Complexity Analysis**
- **Time Complexity:** \(O(N)\)
- **Space Complexity:** \(O(H)\) for recursion depth.

---

## **📌 Non-Trivial Examples**
### **Example 1: Tree with Skewed Structure**
#### **Input**
```
        1
       /
      2
     /
    3
```
#### **Output**
```
[
  [3],
  [2],
  [1]
]
```
#### **Explanation**
Each level has **only one node**, and we collect levels **from bottom to top**.

---

### **Example 2: Unbalanced Tree**
#### **Input**
```
        4
       / \
      2   7
     /   / \
    1   5   9
```
#### **Output**
```
[
  [1, 5, 9],
  [2, 7],
  [4]
]
```
#### **Explanation**
- **First level**: 1, 5, 9 (bottom-most)
- **Second level**: 2, 7
- **Third level**: 4 (root)

---

### **Example 3: Large Tree**
#### **Input**
```
        10
       /  \
      5    20
     / \   /  \
    3   7 15  25
```
#### **Output**
```
[
  [3, 7, 15, 25],
  [5, 20],
  [10]
]
```
#### **Explanation**
- **Bottom level**: 3, 7, 15, 25
- **Middle level**: 5, 20
- **Top level**: 10

---

## **🚀 Summary**
| Approach | Time Complexity | Space Complexity | Best For |
|----------|---------------|----------------|-----------|
| **BFS (Queue)** | \(O(N)\) | \(O(N)\) | Large trees |
| **Recursive DFS** | \(O(N)\) | \(O(H)\) | Balanced trees |
| **DFS with Reverse Tracking** | \(O(N)\) | \(O(H)\) | Deep trees |

**💡 Best Approach?** **BFS (Queue)** is the simplest and most efficient for **large trees**.

---
## **Final Takeaway**
- **Use BFS when order matters.**
- **Use DFS when recursion is natural.**
- **Reverse the order at the end to get bottom-up traversal.**

Happy Coding! 🚀


### **🔍 Line-by-Line Breakdown of All Solutions (Rust)**
We will go over each solution and explain every single line in **depth**, covering **Rust-specific concepts, syntax, and principles**.

---

## **1️⃣ Solution 1: BFS Using a Queue (Best Approach)**
### **🔹 Full Code**
```rust
use std::rc::Rc;
use std::cell::RefCell;
use std::collections::VecDeque;

impl Solution {
    pub fn level_order_bottom(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<Vec<i32>> {
        let mut result = Vec::new();
        let mut queue = VecDeque::new();

        if let Some(node) = root {
            queue.push_back(node);
        }

        while !queue.is_empty() {
            let level_size = queue.len();
            let mut level = Vec::new();

            for _ in 0..level_size {
                if let Some(node) = queue.pop_front() {
                    let node_ref = node.borrow();
                    level.push(node_ref.val);

                    if let Some(left) = &node_ref.left {
                        queue.push_back(left.clone());
                    }
                    if let Some(right) = &node_ref.right {
                        queue.push_back(right.clone());
                    }
                }
            }

            result.insert(0, level); // Insert at beginning for reverse order
        }

        result
    }
}
```

---

### **🔍 Step-by-Step Breakdown**
```rust
use std::rc::Rc;
use std::cell::RefCell;
use std::collections::VecDeque;
```
- **`use std::rc::Rc;`** → **Rc (Reference Counting)** is used to allow multiple ownership of a tree node.
- **`use std::cell::RefCell;`** → **RefCell** enables mutable access to `Rc`-wrapped data.
- **`use std::collections::VecDeque;`** → A **double-ended queue (VecDeque)** allows fast insertions/removals from both ends.

---

```rust
impl Solution {
```
- **`impl Solution {`** → Implements the `Solution` struct, allowing us to define associated functions.

---

```rust
pub fn level_order_bottom(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<Vec<i32>> {
```
- **`pub fn level_order_bottom`** → Declares a **public function** that returns a `Vec<Vec<i32>>`, i.e., a list of lists of integers.
- **`root: Option<Rc<RefCell<TreeNode>>>`** → The `root` node:
  - `Option<T>` → `Some(TreeNode)` if a tree exists, `None` if empty.
  - `Rc<RefCell<TreeNode>>` → Allows multiple references and internal mutation.

---

```rust
let mut result = Vec::new();
```
- **Creates an empty vector (`result`)** to store the bottom-up level order traversal.

---

```rust
let mut queue = VecDeque::new();
```
- **Creates an empty queue (`VecDeque`)** to process tree nodes **level-by-level**.

---

```rust
if let Some(node) = root {
    queue.push_back(node);
}
```
- **If the tree is not empty (`Some(node)`)**, add the root node to the queue.
- **`if let Some(node) = root { ... }`** → Pattern matching to handle `Option<T>`.

---

```rust
while !queue.is_empty() {
```
- **Loop while the queue is not empty**, meaning there are still nodes to process.

---

```rust
let level_size = queue.len();
let mut level = Vec::new();
```
- **Get the number of nodes at the current level (`level_size`)**.
- **Create an empty list (`level`)** to store values at this level.

---

```rust
for _ in 0..level_size {
```
- **Iterate through each node at this level** (`level_size` times).

---

```rust
if let Some(node) = queue.pop_front() {
```
- **Remove the front node from the queue**.

---

```rust
let node_ref = node.borrow();
```
- **Borrow the node's value immutably (`RefCell` borrow)**.

---

```rust
level.push(node_ref.val);
```
- **Add node value to the current level's list**.

---

```rust
if let Some(left) = &node_ref.left {
    queue.push_back(left.clone());
}
```
- **If a left child exists, clone and push it into the queue**.

---

```rust
if let Some(right) = &node_ref.right {
    queue.push_back(right.clone());
}
```
- **If a right child exists, clone and push it into the queue**.

---

```rust
result.insert(0, level);
```
- **Insert the current level at the beginning of `result`** (to reverse order).

---

```rust
result
```
- **Return the final list** after BFS traversal.

---

## **2️⃣ Solution 2: Recursive DFS**
### **🔹 Full Code**
```rust
impl Solution {
    pub fn level_order_bottom(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<Vec<i32>> {
        let mut levels: Vec<Vec<i32>> = Vec::new();
        Self::dfs(root, 0, &mut levels);
        levels.reverse();
        levels
    }

    fn dfs(node: Option<Rc<RefCell<TreeNode>>>, depth: usize, levels: &mut Vec<Vec<i32>>) {
        if let Some(node) = node {
            let node_ref = node.borrow();
            
            if levels.len() == depth {
                levels.push(Vec::new());
            }
            
            levels[depth].push(node_ref.val);
            
            Self::dfs(node_ref.left.clone(), depth + 1, levels);
            Self::dfs(node_ref.right.clone(), depth + 1, levels);
        }
    }
}
```

---

### **🔍 Step-by-Step Breakdown**
- **DFS (`dfs`) is a recursive function that traverses the tree**.
- **Tracks depth to insert values into the correct list**.
- **At the end, the list is reversed to get bottom-up order**.

---

## **3️⃣ Solution 3: DFS with Reverse Level Tracking**
### **🔹 Full Code**
```rust
impl Solution {
    pub fn level_order_bottom(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<Vec<i32>> {
        let depth = Self::max_depth(&root);
        let mut result = vec![Vec::new(); depth];
        Self::dfs(&root, depth - 1, &mut result);
        result
    }

    fn max_depth(node: &Option<Rc<RefCell<TreeNode>>>) -> usize {
        match node {
            Some(n) => {
                let n = n.borrow();
                1 + usize::max(Self::max_depth(&n.left), Self::max_depth(&n.right))
            }
            None => 0,
        }
    }

    fn dfs(node: &Option<Rc<RefCell<TreeNode>>>, depth: usize, result: &mut Vec<Vec<i32>>) {
        if let Some(n) = node {
            let n = n.borrow();
            result[depth].push(n.val);
            Self::dfs(&n.left, depth - 1, result);
            Self::dfs(&n.right, depth - 1, result);
        }
    }
}
```

---

### **🔍 Step-by-Step Breakdown**
1. **Compute the maximum depth (`max_depth`)**.
2. **Initialize `result` with empty lists for each level**.
3. **Use DFS to insert values at the correct depth level**.

---

## **🚀 Key Rust Concepts Used**
| Concept | Explanation |
|---------|------------|
| `Rc<RefCell<T>>` | Allows multiple owners of mutable data |
| `VecDeque<T>` | Efficient queue for BFS |
| `Option<T>` | Handles nullable values safely |
| `borrow()` | Grants temporary access to `RefCell` contents |
| `clone()` | Creates a new reference (`Rc<T>`) |
| `Vec<T>` | Dynamic array for storing results |

---

## **💡 Final Takeaway**
- **BFS (Queue) is the best approach** for general cases.
- **DFS (Recursion) works well for smaller trees**.
- **Reverse tracking DFS can be useful for deep trees**.

This **line-by-line breakdown** should give you deep insights into **Rust programming concepts** used in this problem! 🚀