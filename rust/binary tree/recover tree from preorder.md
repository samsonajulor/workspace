### **Rust Technical Documentation: Recover a Tree From Preorder Traversal**  
This document provides a structured and beginner-friendly explanation of solving **Leetcode 1028: Recover a Tree From Preorder Traversal** in Rust.  

We will break down the problem into simple concepts, introduce three different approaches, and explain the Rust code line by line.  

---

## **Understanding the Problem Like a 5-Year-Old**  

Imagine you have a tree that has been flattened into a single string. Each node is written in a special way:  

1. A **number** represents the value of a node.  
2. A **dash (`-`)** before a number tells us how deep the node is in the tree.  
3. The **first number** in the string is always the root of the tree.  

For example, this string:  
```plaintext
1-2--3--4-5--6--7
```
Means that:  
- `1` is the root.  
- `2` is a child of `1`, and `5` is also a child of `1`.  
- `3` and `4` are children of `2`.  
- `6` and `7` are children of `5`.  

This means we must **rebuild** the tree from this string!

---

## **Approach 1: Recursive Parsing with Index Tracking**  

### **Pseudo Code Explanation**  
1. Convert the input string into an array of characters (`bytes`).  
2. Create a recursive function `parse_node` that reads numbers and dashes.  
3. **For each node:**
   - Count how many dashes (`-`) are before the number to determine depth.  
   - Extract the number.  
   - Create a new tree node with the extracted number.  
   - Recursively call `parse_node` for the left and right child (with increased depth).  
4. The function returns the reconstructed tree.

---

### **Rust Code Solution**
```rust
use std::rc::Rc;
use std::cell::RefCell;

impl Solution {
    pub fn recover_from_preorder(traversal: String) -> Option<Rc<RefCell<TreeNode>>> {
        let bytes = traversal.as_bytes();
        let mut index = 0;

        // Recursive function to build the tree
        fn parse_node(bytes: &[u8], index: &mut usize, depth: usize) -> Option<Rc<RefCell<TreeNode>>> {
            let start = *index;
            let mut dashes = 0;

            // Count number of dashes (depth indicator)
            while *index < bytes.len() && bytes[*index] == b'-' {
                dashes += 1;
                *index += 1;
            }

            // If we are at the wrong depth, backtrack
            if dashes != depth {
                *index = start;
                return None;
            }

            // Read the number
            let mut value = 0;
            while *index < bytes.len() && bytes[*index].is_ascii_digit() {
                value = value * 10 + (bytes[*index] - b'0') as i32;
                *index += 1;
            }

            // Create the tree node
            let node = Rc::new(RefCell::new(TreeNode::new(value)));

            // Recursively parse left and right children
            node.borrow_mut().left = parse_node(bytes, index, depth + 1);
            node.borrow_mut().right = parse_node(bytes, index, depth + 1);

            Some(node)
        }

        parse_node(bytes, &mut index, 0)
    }
}
```

---

## **Line-by-Line Breakdown**  

### **TreeNode Definition**
```rust
use std::rc::Rc;
use std::cell::RefCell;
```
- `Rc<RefCell<TreeNode>>`: Rust requires **reference-counted smart pointers** (`Rc`) because multiple parents may hold references to child nodes.  
- `RefCell<TreeNode>` allows **interior mutability**, letting us modify the tree structure inside an `Rc`.  

---

### **Function: `recover_from_preorder`**
```rust
pub fn recover_from_preorder(traversal: String) -> Option<Rc<RefCell<TreeNode>>> {
    let bytes = traversal.as_bytes();
    let mut index = 0;
```
- Converts the input string into a byte array (`bytes`) for fast traversal.  
- Uses `index` to track our current position while parsing.  

---

### **Recursive Parsing Function**
```rust
fn parse_node(bytes: &[u8], index: &mut usize, depth: usize) -> Option<Rc<RefCell<TreeNode>>> {
```
- **`bytes`**: Reference to the input string.  
- **`index`**: A mutable reference to track position while parsing.  
- **`depth`**: Expected depth of the current node.  

---

### **Step 1: Count Dashes (Depth)**
```rust
let start = *index;
let mut dashes = 0;

while *index < bytes.len() && bytes[*index] == b'-' {
    dashes += 1;
    *index += 1;
}
```
- **Counts consecutive dashes (`-`)** to determine the depth of the node.  

---

### **Step 2: Check Depth Validity**
```rust
if dashes != depth {
    *index = start;
    return None;
}
```
- If the number of dashes doesn’t match the expected depth, we **backtrack** and return `None`.  

---

### **Step 3: Read Node Value**
```rust
let mut value = 0;
while *index < bytes.len() && bytes[*index].is_ascii_digit() {
    value = value * 10 + (bytes[*index] - b'0') as i32;
    *index += 1;
}
```
- Extracts a number **character by character**, converting ASCII digits into an integer.  

---

### **Step 4: Create a Tree Node**
```rust
let node = Rc::new(RefCell::new(TreeNode::new(value)));
```
- Creates a new `TreeNode` wrapped in `Rc<RefCell<>>` to allow shared mutability.  

---

### **Step 5: Recursively Parse Left and Right Children**
```rust
node.borrow_mut().left = parse_node(bytes, index, depth + 1);
node.borrow_mut().right = parse_node(bytes, index, depth + 1);
```
- **Left child** is parsed first (because it always comes before the right child).  
- **Right child** is parsed next (if present).  

---

## **Alternative Approaches**  

### **Solution 2: Stack-Based Iterative Approach**  
Instead of using recursion, we can simulate **preorder traversal using a stack**. This approach is useful when dealing with very deep recursion.

```rust
impl Solution {
    pub fn recover_from_preorder(traversal: String) -> Option<Rc<RefCell<TreeNode>>> {
        let mut stack: Vec<Rc<RefCell<TreeNode>>> = Vec::new();
        let mut i = 0;
        let bytes = traversal.as_bytes();

        while i < bytes.len() {
            let mut depth = 0;
            while i < bytes.len() && bytes[i] == b'-' {
                depth += 1;
                i += 1;
            }

            let mut value = 0;
            while i < bytes.len() && bytes[i].is_ascii_digit() {
                value = value * 10 + (bytes[i] - b'0') as i32;
                i += 1;
            }

            let node = Rc::new(RefCell::new(TreeNode::new(value)));
            while stack.len() > depth {
                stack.pop();
            }

            if let Some(parent) = stack.last() {
                if parent.borrow().left.is_none() {
                    parent.borrow_mut().left = Some(Rc::clone(&node));
                } else {
                    parent.borrow_mut().right = Some(Rc::clone(&node));
                }
            }

            stack.push(node.clone());
        }

        stack.first().cloned()
    }
}
```
- Uses a **stack** to track nodes and their depth.  
- **Pops elements** when necessary to maintain tree structure.  
- Avoids recursion, preventing potential stack overflow.  

---

## **Conclusion**  
- **Recursive Parsing** is a **clean** and **intuitive** way to solve this problem.  
- **Stack-Based Iterative** approach is an **efficient** way to avoid recursion depth issues.  

Each method ensures we correctly reconstruct the tree from preorder traversal! 🚀