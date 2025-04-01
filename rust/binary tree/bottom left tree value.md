## **Understanding the Problem (For a 5-Year-Old)**  
We have a tree made of numbers, and we need to find the number in the bottom-left corner of the tree.  

Imagine you have a tree with different levels, and each level has numbers. Your job is to find the leftmost number in the last row of this tree.  

---

## **Approach 1: Breadth-First Search (BFS) Using a Queue**
### **How It Works (Pseudo-Code)**
1. Put the root (topmost node) into a **queue**.
2. Go through each level of the tree:
   - Start from the **left side**.
   - Keep track of the first number in the last row.
3. Return the leftmost number from the last row.

---

### **Rust Code**
```rust
use std::rc::Rc;
use std::cell::RefCell;
use std::collections::VecDeque;

impl Solution {
    pub fn find_bottom_left_value(root: Option<Rc<RefCell<TreeNode>>>) -> i32 {
        let mut queue = VecDeque::new();
        queue.push_back(root.unwrap());

        let mut bottom_left_value = 0;

        while let Some(node) = queue.pop_front() {
            let node = node.borrow();
            bottom_left_value = node.val;

            if let Some(right) = &node.right {
                queue.push_back(right.clone());
            }
            if let Some(left) = &node.left {
                queue.push_back(left.clone());
            }
        }

        bottom_left_value
    }
}
```

---

## **Approach 2: Depth-First Search (DFS) With Maximum Depth Tracking**
### **How It Works (Pseudo-Code)**
1. Use **DFS (Deep Exploration)** to go all the way down the left side first.
2. Keep track of the **maximum depth** reached so far.
3. If we find a deeper level, update the leftmost value.
4. Return the leftmost value from the last row.

---

### **Rust Code**
```rust
use std::rc::Rc;
use std::cell::RefCell;

impl Solution {
    pub fn find_bottom_left_value(root: Option<Rc<RefCell<TreeNode>>>) -> i32 {
        fn dfs(node: &Option<Rc<RefCell<TreeNode>>>, depth: i32, max_depth: &mut i32, result: &mut i32) {
            if let Some(n) = node {
                let n = n.borrow();
                if depth > *max_depth {
                    *max_depth = depth;
                    *result = n.val;
                }
                dfs(&n.left, depth + 1, max_depth, result);
                dfs(&n.right, depth + 1, max_depth, result);
            }
        }

        let mut max_depth = -1;
        let mut result = 0;
        dfs(&root, 0, &mut max_depth, &mut result);
        result
    }
}
```

---

## **Approach 3: Iterative DFS Using a Stack**
### **How It Works (Pseudo-Code)**
1. Use a **stack** to manually process nodes instead of recursion.
2. Start from the **root** and go **deep** into the tree.
3. Always **process left children before right** to ensure we store the leftmost number.
4. Track the depth while processing.

---

### **Rust Code**
```rust
use std::rc::Rc;
use std::cell::RefCell;
use std::collections::VecDeque;

impl Solution {
    pub fn find_bottom_left_value(root: Option<Rc<RefCell<TreeNode>>>) -> i32 {
        let mut stack = VecDeque::new();
        stack.push_back((root.unwrap(), 0));

        let mut max_depth = -1;
        let mut result = 0;

        while let Some((node, depth)) = stack.pop_back() {
            let node = node.borrow();

            if depth > max_depth {
                max_depth = depth;
                result = node.val;
            }

            if let Some(right) = &node.right {
                stack.push_back((right.clone(), depth + 1));
            }
            if let Some(left) = &node.left {
                stack.push_back((left.clone(), depth + 1));
            }
        }

        result
    }
}
```

---

## **Complexity Analysis**
| Approach | Time Complexity | Space Complexity |
|----------|---------------|----------------|
| BFS Using Queue | O(N) | O(N) |
| DFS Recursive | O(N) | O(H) (height of tree) |
| DFS Iterative | O(N) | O(H) |

---

## **Non-Trivial Examples**
### **Example 1**
#### **Input**
```
      1
     / \
    2   3
   /   / \
  4   5   6
```
#### **Output**
```
4
```

### **Example 2**
#### **Input**
```
        10
       /  \
      5    15
     / \     \
    2   7     20
   /         /
  1         18
```
#### **Output**
```
1
```

### **Example 3**
#### **Input**
```
      50
     /   \
    30    80
      \      \
       40     100
      /        /
     35       90
```
#### **Output**
```
35
```


### **Understanding the Code Line by Line (Rust Solutions)**  

I'll provide a **detailed breakdown** of each of the three solutions to **Find the Bottom Left Tree Value**.  

---

## **Solution 1: Breadth-First Search (BFS) Using a Queue**
This approach processes the tree **level by level** using a queue, ensuring that the **last seen leftmost value** is the answer.

---

### **Rust Code**
```rust
use std::rc::Rc;
use std::cell::RefCell;
use std::collections::VecDeque;

impl Solution {
    pub fn find_bottom_left_value(root: Option<Rc<RefCell<TreeNode>>>) -> i32 {
        let mut queue = VecDeque::new(); 
        queue.push_back(root.unwrap()); 

        let mut bottom_left_value = 0;

        while let Some(node) = queue.pop_front() {
            let node = node.borrow(); 
            bottom_left_value = node.val; 

            if let Some(right) = &node.right { 
                queue.push_back(right.clone());
            }
            if let Some(left) = &node.left {
                queue.push_back(left.clone()); 
            }
        }

        bottom_left_value
    }
}
```

---

### **Line-by-Line Breakdown**
1. **`use std::rc::Rc;`**
   - `Rc<T>` is a **reference-counting pointer** in Rust, used for **shared ownership** of data.  
   - In this case, it's needed because multiple parts of the tree will reference the same `TreeNode`.  

2. **`use std::cell::RefCell;`**
   - `RefCell<T>` allows **mutable access** to data inside an immutable structure.  
   - Since Rust enforces strict borrowing rules, we need `RefCell<T>` to modify the tree nodes.  

3. **`use std::collections::VecDeque;`**
   - `VecDeque<T>` is a **double-ended queue**, meaning we can efficiently add/remove items from both ends.  
   - We use it here for **BFS traversal**, which requires a queue.  

4. **`let mut queue = VecDeque::new();`**
   - Creates an empty queue to store nodes for BFS.  

5. **`queue.push_back(root.unwrap());`**
   - `root.unwrap()` extracts the `Some(TreeNode)`, ensuring we have a valid node.  
   - Adds the root node to the queue to start BFS traversal.  

6. **`let mut bottom_left_value = 0;`**
   - Stores the leftmost value of the last row.  

7. **`while let Some(node) = queue.pop_front() {`**
   - This loop **processes nodes level by level**.  
   - `pop_front()` retrieves the **first node** in the queue (FIFO order).  

8. **`let node = node.borrow();`**
   - Since `TreeNode` is wrapped in `Rc<RefCell<T>>`, we use `.borrow()` to access its contents.  

9. **`bottom_left_value = node.val;`**
   - We **update** `bottom_left_value` with the value of the current node.  

10. **`if let Some(right) = &node.right { queue.push_back(right.clone()); }`**
    - Adds the **right child** to the queue **before** the left child.  

11. **`if let Some(left) = &node.left { queue.push_back(left.clone()); }`**
    - Adds the **left child** to the queue **after** the right child.  

12. **Return `bottom_left_value`** after BFS completes.

---

## **Solution 2: Depth-First Search (DFS) With Maximum Depth Tracking**
This approach uses **recursion** to explore the tree **left-first** and keeps track of the **maximum depth reached**.

---

### **Rust Code**
```rust
use std::rc::Rc;
use std::cell::RefCell;

impl Solution {
    pub fn find_bottom_left_value(root: Option<Rc<RefCell<TreeNode>>>) -> i32 {
        fn dfs(node: &Option<Rc<RefCell<TreeNode>>>, depth: i32, max_depth: &mut i32, result: &mut i32) {
            if let Some(n) = node {
                let n = n.borrow();
                if depth > *max_depth {
                    *max_depth = depth;
                    *result = n.val;
                }
                dfs(&n.left, depth + 1, max_depth, result);
                dfs(&n.right, depth + 1, max_depth, result);
            }
        }

        let mut max_depth = -1;
        let mut result = 0;
        dfs(&root, 0, &mut max_depth, &mut result);
        result
    }
}
```

---

### **Line-by-Line Breakdown**
1. **`fn dfs(node: &Option<Rc<RefCell<TreeNode>>>, depth: i32, max_depth: &mut i32, result: &mut i32) {`**
   - A **recursive function** to traverse the tree.  
   - `node` is the **current node**.  
   - `depth` keeps track of the **current depth**.  
   - `max_depth` stores the **deepest level found so far**.  
   - `result` stores the **leftmost value of the last level**.  

2. **`if let Some(n) = node {`**
   - Ensures that the node is **not null** before proceeding.  

3. **`let n = n.borrow();`**
   - Extracts the actual `TreeNode` from `Rc<RefCell<T>>`.  

4. **`if depth > *max_depth { *max_depth = depth; *result = n.val; }`**
   - If the current depth is **greater than** the recorded maximum depth,  
     - Update `max_depth` to the current depth.  
     - Update `result` to the **current node’s value** (leftmost node of this level).  

5. **`dfs(&n.left, depth + 1, max_depth, result);`**
   - **Recursively explore the left child first** to guarantee leftmost selection.  

6. **`dfs(&n.right, depth + 1, max_depth, result);`**
   - Then, **explore the right child**.  

7. **`let mut max_depth = -1; let mut result = 0;`**
   - Initialize `max_depth` and `result` before calling DFS.  

---

## **Solution 3: Iterative DFS Using a Stack**
This approach simulates DFS **without recursion**, using a **stack**.

---

### **Rust Code**
```rust
use std::rc::Rc;
use std::cell::RefCell;
use std::collections::VecDeque;

impl Solution {
    pub fn find_bottom_left_value(root: Option<Rc<RefCell<TreeNode>>>) -> i32 {
        let mut stack = VecDeque::new();
        stack.push_back((root.unwrap(), 0));

        let mut max_depth = -1;
        let mut result = 0;

        while let Some((node, depth)) = stack.pop_back() {
            let node = node.borrow();

            if depth > max_depth {
                max_depth = depth;
                result = node.val;
            }

            if let Some(right) = &node.right {
                stack.push_back((right.clone(), depth + 1));
            }
            if let Some(left) = &node.left {
                stack.push_back((left.clone(), depth + 1));
            }
        }

        result
    }
}
```

---

### **Key Differences from Recursive DFS**
- Uses a **stack** instead of function calls.
- **Processes nodes right-first**, ensuring leftmost nodes are encountered last.

---

## **Final Complexity Analysis**
| Approach | Time Complexity | Space Complexity |
|----------|---------------|----------------|
| BFS Using Queue | **O(N)** | **O(N)** |
| DFS Recursive | **O(N)** | **O(H)** |
| DFS Iterative | **O(N)** | **O(H)** |

Here, **H is the tree height**, and **N is the number of nodes**.

---

### **Final Thoughts**
- **BFS is easiest** to understand and guarantees the correct answer.
- **Recursive DFS** provides a **concise but elegant solution**.
- **Iterative DFS** avoids recursion but can be **tricky** to implement. 🚀