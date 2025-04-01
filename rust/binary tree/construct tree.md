### **Construct Binary Tree from Preorder and Inorder Traversal**  
#### **Problem Statement**  
We are given two lists:  
- `preorder`: The preorder traversal of a binary tree.  
- `inorder`: The inorder traversal of the same binary tree.  

Our task is to reconstruct the binary tree from these traversals.

---

## **Understanding Preorder and Inorder Traversals**  
### **Tree Traversals Refresher**  
1. **Preorder Traversal (Root → Left → Right)**
   - Visit the root first.
   - Recursively visit the left subtree.
   - Recursively visit the right subtree.
   
2. **Inorder Traversal (Left → Root → Right)**
   - Recursively visit the left subtree.
   - Visit the root.
   - Recursively visit the right subtree.

### **Example**
#### Given:  
- `preorder = [3, 9, 20, 15, 7]`
- `inorder = [9, 3, 15, 20, 7]`

#### Step-by-Step Breakdown:
1. **First element in `preorder` is always the root** → `3`  
2. **Find `3` in `inorder`** to separate left and right subtrees:
   - Left Subtree: `[9]`
   - Right Subtree: `[15, 20, 7]`
3. **Next `preorder` element is `9`** → It must be the left child of `3`.
4. **Next `preorder` element is `20`** → It must be the right child of `3`.
5. **Continue splitting using `inorder` until tree is fully built.**

---

## **Approach 1: Recursive Construction (DFS)**
### **Step-by-Step Plan**
1. **Base Case:** If `preorder` is empty, return `None`.
2. **Find the Root:** The first element in `preorder` is the root.
3. **Find Left and Right Subtrees:** Locate the root in `inorder` to separate left and right subtrees.
4. **Recursively Build the Tree:** Call the function on left and right subtree elements.

---

### **📝 Pseudo Code**
```
function build_tree(preorder, inorder):
    if preorder is empty:
        return None
    
    root_value = preorder[0]
    root = new TreeNode(root_value)
    
    root_index = find root_value in inorder
    
    left_subtree = inorder[0:root_index]
    right_subtree = inorder[root_index+1:]
    
    root.left = build_tree(preorder[1 : 1+len(left_subtree)], left_subtree)
    root.right = build_tree(preorder[1+len(left_subtree):], right_subtree)
    
    return root
```

---

### **🦀 Rust Implementation**
```rust
use std::rc::Rc;
use std::cell::RefCell;
use std::collections::HashMap;

#[derive(Debug, PartialEq, Eq)]
pub struct TreeNode {
    pub val: i32,
    pub left: Option<Rc<RefCell<TreeNode>>>,
    pub right: Option<Rc<RefCell<TreeNode>>>,
}

impl TreeNode {
    #[inline]
    pub fn new(val: i32) -> Self {
        TreeNode {
            val,
            left: None,
            right: None,
        }
    }
}

impl Solution {
    pub fn build_tree(preorder: Vec<i32>, inorder: Vec<i32>) -> Option<Rc<RefCell<TreeNode>>> {
        let mut inorder_map = HashMap::new();
        for (i, &val) in inorder.iter().enumerate() {
            inorder_map.insert(val, i);
        }

        let mut pre_index = 0;

        fn helper(
            preorder: &Vec<i32>,
            inorder_map: &HashMap<i32, usize>,
            left: usize,
            right: usize,
            pre_index: &mut usize,
        ) -> Option<Rc<RefCell<TreeNode>>> {
            if left > right {
                return None;
            }

            let root_val = preorder[*pre_index];
            *pre_index += 1;

            let root = Rc::new(RefCell::new(TreeNode::new(root_val)));
            let inorder_index = *inorder_map.get(&root_val).unwrap();

            if inorder_index > left {
                root.borrow_mut().left = helper(preorder, inorder_map, left, inorder_index - 1, pre_index);
            }
            if inorder_index + 1 <= right {
                root.borrow_mut().right = helper(preorder, inorder_map, inorder_index + 1, right, pre_index);
            }

            Some(root)
        }

        helper(&preorder, &inorder_map, 0, inorder.len() - 1, &mut pre_index)
    }
}
```

---

## **Approach 2: Iterative Solution using Stack**
### **Key Observations**
- A stack can be used to **keep track of nodes**.
- When moving **left**, push nodes onto the stack.
- When moving **right**, pop nodes from the stack until we find the correct parent.

---

### **📝 Pseudo Code**
```
function build_tree(preorder, inorder):
    if preorder is empty:
        return None
    
    root = new TreeNode(preorder[0])
    stack = [root]
    inorder_index = 0
    
    for i in range(1, len(preorder)):
        node = stack.top()
        
        if node.val != inorder[inorder_index]:
            node.left = new TreeNode(preorder[i])
            stack.push(node.left)
        else:
            while stack is not empty and stack.top().val == inorder[inorder_index]:
                last_node = stack.pop()
                inorder_index += 1
            
            last_node.right = new TreeNode(preorder[i])
            stack.push(last_node.right)
    
    return root
```

---

### **🦀 Rust Implementation**
```rust
use std::rc::Rc;
use std::cell::RefCell;
use std::collections::VecDeque;

impl Solution {
    pub fn build_tree(preorder: Vec<i32>, inorder: Vec<i32>) -> Option<Rc<RefCell<TreeNode>>> {
        if preorder.is_empty() {
            return None;
        }

        let mut stack = VecDeque::new();
        let mut inorder_index = 0;

        let root = Rc::new(RefCell::new(TreeNode::new(preorder[0])));
        stack.push_back(root.clone());

        for &val in preorder.iter().skip(1) {
            let mut node = stack.back().unwrap().clone();

            if node.borrow().val != inorder[inorder_index] {
                node.borrow_mut().left = Some(Rc::new(RefCell::new(TreeNode::new(val))));
                stack.push_back(node.borrow().left.as_ref().unwrap().clone());
            } else {
                while !stack.is_empty() && stack.back().unwrap().borrow().val == inorder[inorder_index] {
                    node = stack.pop_back().unwrap();
                    inorder_index += 1;
                }

                node.borrow_mut().right = Some(Rc::new(RefCell::new(TreeNode::new(val))));
                stack.push_back(node.borrow().right.as_ref().unwrap().clone());
            }
        }

        Some(root)
    }
}
```

---

## **Three Non-Trivial Examples**
### **Example 1**
#### **Input**
```rust
preorder = [1, 2, 4, 5, 3, 6]
inorder  = [4, 2, 5, 1, 3, 6]
```
#### **Expected Output**
```
        1
       / \
      2   3
     / \   \
    4   5   6
```

---

### **Example 2**
#### **Input**
```rust
preorder = [8, 4, 2, 6, 10, 20]
inorder  = [2, 4, 6, 8, 10, 20]
```
#### **Expected Output**
```
        8
       / \
      4   10
     / \    \
    2   6    20
```

---

### **Example 3**
#### **Input**
```rust
preorder = [3, 9, 1, 2, 20, 15, 7]
inorder  = [1, 9, 2, 3, 15, 20, 7]
```
#### **Expected Output**
```
        3
       / \
      9   20
     / \  /  \
    1   2 15   7
```

---

This documentation ensures that **beginners** understand the problem and provides **deep insights** for advanced developers. 🚀


### **Rust Solution: Construct Binary Tree from Preorder and Inorder Traversal**  
This breakdown will analyze the recursive and iterative Rust solutions **line by line**, explaining every **syntax, concept, and principle**.

---

## **Recursive Approach (Depth-First Search - DFS)**  
**Key Idea:**  
- **Preorder traversal** always starts with the root.  
- **Inorder traversal** helps us determine the left and right subtrees.  
- We recursively reconstruct the left and right subtrees.

---

### **Full Code Implementation**
```rust
use std::rc::Rc;
use std::cell::RefCell;
use std::collections::HashMap;

#[derive(Debug, PartialEq, Eq)]
pub struct TreeNode {
    pub val: i32,
    pub left: Option<Rc<RefCell<TreeNode>>>,
    pub right: Option<Rc<RefCell<TreeNode>>>,
}

impl TreeNode {
    #[inline]
    pub fn new(val: i32) -> Self {
        TreeNode {
            val,
            left: None,
            right: None,
        }
    }
}

impl Solution {
    pub fn build_tree(preorder: Vec<i32>, inorder: Vec<i32>) -> Option<Rc<RefCell<TreeNode>>> {
        let mut inorder_map = HashMap::new();
        for (i, &val) in inorder.iter().enumerate() {
            inorder_map.insert(val, i);
        }

        let mut pre_index = 0;

        fn helper(
            preorder: &Vec<i32>,
            inorder_map: &HashMap<i32, usize>,
            left: usize,
            right: usize,
            pre_index: &mut usize,
        ) -> Option<Rc<RefCell<TreeNode>>> {
            if left > right {
                return None;
            }

            let root_val = preorder[*pre_index];
            *pre_index += 1;

            let root = Rc::new(RefCell::new(TreeNode::new(root_val)));
            let inorder_index = *inorder_map.get(&root_val).unwrap();

            if inorder_index > left {
                root.borrow_mut().left = helper(preorder, inorder_map, left, inorder_index - 1, pre_index);
            }
            if inorder_index + 1 <= right {
                root.borrow_mut().right = helper(preorder, inorder_map, inorder_index + 1, right, pre_index);
            }

            Some(root)
        }

        helper(&preorder, &inorder_map, 0, inorder.len() - 1, &mut pre_index)
    }
}
```

---

### **Line-by-Line Breakdown**
#### **Struct Definitions**
```rust
use std::rc::Rc;
use std::cell::RefCell;
use std::collections::HashMap;
```
- **`use std::rc::Rc;`**  
  - `Rc<T>` (Reference Counting Pointer) allows multiple owners for the same data.  
  - Required because a binary tree node can have multiple references.

- **`use std::cell::RefCell;`**  
  - `RefCell<T>` provides interior mutability (allows mutation even if references exist).  
  - Allows modifying `TreeNode` children inside an `Rc<T>` wrapper.

- **`use std::collections::HashMap;`**  
  - `HashMap<K, V>` stores the indices of elements from the `inorder` array for quick lookup.

---

#### **Defining the TreeNode Structure**
```rust
#[derive(Debug, PartialEq, Eq)]
pub struct TreeNode {
    pub val: i32,
    pub left: Option<Rc<RefCell<TreeNode>>>,
    pub right: Option<Rc<RefCell<TreeNode>>>,
}
```
- **`#[derive(Debug, PartialEq, Eq)]`**  
  - Enables debugging (`Debug`), comparison (`PartialEq, Eq`).

- **`pub struct TreeNode`**  
  - Represents a single node in the tree.

- **`pub val: i32,`**  
  - The value stored in the node.

- **`pub left: Option<Rc<RefCell<TreeNode>>>`**  
  - Stores the left child.
  - **`Option<T>`** allows `None` (empty child) or `Some(node)`.
  - **`Rc<RefCell<T>>`** enables multiple references and mutability.

- **`pub right: Option<Rc<RefCell<TreeNode>>>`**  
  - Stores the right child (same explanation as `left`).

---

#### **TreeNode Constructor**
```rust
impl TreeNode {
    #[inline]
    pub fn new(val: i32) -> Self {
        TreeNode {
            val,
            left: None,
            right: None,
        }
    }
}
```
- **`impl TreeNode {}`**  
  - Implements functions for `TreeNode`.

- **`pub fn new(val: i32) -> Self`**  
  - Creates a new node with a given value.

- **`#[inline]`**  
  - Suggests the compiler to inline this function for performance.

---

#### **Building the Tree**
```rust
impl Solution {
    pub fn build_tree(preorder: Vec<i32>, inorder: Vec<i32>) -> Option<Rc<RefCell<TreeNode>>> {
```
- **`impl Solution {}`**  
  - Implements the `Solution` struct containing our function.

- **`pub fn build_tree(preorder: Vec<i32>, inorder: Vec<i32>) -> Option<Rc<RefCell<TreeNode>>> {`**  
  - The function signature:
    - Takes two `Vec<i32>` lists (`preorder` and `inorder`).
    - Returns the root of the constructed tree (`Option<Rc<RefCell<TreeNode>>>`).

---

#### **Creating the Inorder Index Map**
```rust
let mut inorder_map = HashMap::new();
for (i, &val) in inorder.iter().enumerate() {
    inorder_map.insert(val, i);
}
```
- **`let mut inorder_map = HashMap::new();`**  
  - Creates a hashmap to store the index of each value in `inorder`.

- **`for (i, &val) in inorder.iter().enumerate()`**  
  - Loops through `inorder`, extracting both index (`i`) and value (`val`).

- **`inorder_map.insert(val, i);`**  
  - Stores `{ value → index }` mappings for quick lookup.

---

#### **Recursive Helper Function**
```rust
fn helper(
    preorder: &Vec<i32>,
    inorder_map: &HashMap<i32, usize>,
    left: usize,
    right: usize,
    pre_index: &mut usize,
) -> Option<Rc<RefCell<TreeNode>>> {
```
- **Why a Helper Function?**  
  - Manages recursion efficiently by maintaining state across function calls.

- **Parameters Explained:**
  - `preorder: &Vec<i32>` → Reference to `preorder` array.
  - `inorder_map: &HashMap<i32, usize>` → Quick lookup for inorder indices.
  - `left: usize, right: usize` → Left and right boundaries of the current subtree.
  - `pre_index: &mut usize` → Tracks the current index in `preorder`.

---

#### **Base Case: No Nodes to Construct**
```rust
if left > right {
    return None;
}
```
- If the left boundary exceeds the right boundary, return `None` (no subtree exists).

---

#### **Extracting Root from Preorder**
```rust
let root_val = preorder[*pre_index];
*pre_index += 1;
```
- **`let root_val = preorder[*pre_index];`**  
  - Picks the root value from `preorder` using `pre_index`.

- **`*pre_index += 1;`**  
  - Moves to the next element in `preorder`.

---

#### **Creating the Root Node**
```rust
let root = Rc::new(RefCell::new(TreeNode::new(root_val)));
```
- **`Rc::new(RefCell::new(TreeNode::new(root_val)))`**  
  - Wraps the node in `Rc<RefCell<TreeNode>>` for shared mutability.

---

#### **Splitting Left and Right Subtrees**
```rust
let inorder_index = *inorder_map.get(&root_val).unwrap();
```
- Finds `root_val` in `inorder` using `HashMap` lookup.

---

#### **Recursive Calls**
```rust
if inorder_index > left {
    root.borrow_mut().left = helper(preorder, inorder_map, left, inorder_index - 1, pre_index);
}
if inorder_index + 1 <= right {
    root.borrow_mut().right = helper(preorder, inorder_map, inorder_index + 1, right, pre_index);
}
```
- Calls `helper()` to build left and right subtrees recursively.

---

## **Conclusion**
- **Time Complexity:** **O(N)** (each node is processed once).
- **Space Complexity:** **O(N)** (recursion + hashmap storage).

This solution is **efficient** and ensures that the **binary tree is correctly reconstructed** from its traversals. 🚀