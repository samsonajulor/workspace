# 📖 **Beginner-Friendly Rust Technical Documentation: "Unique Binary Search Trees II"**  

---

## **🌱 Understanding the Problem Like You're Five**  

Imagine you have **n** toy blocks, and each block is numbered from **1** to **n**.  

A **Binary Search Tree (BST)** follows these rules:  
1. **Smaller numbers go on the left.**  
2. **Bigger numbers go on the right.**  
3. **Each tree has a "root" (starting block) that follows these rules.**  

The task is to **find all the different ways to arrange these blocks** as BSTs.  

For example, if `n = 3`, these are all the possible trees:

```
   1         1       2       3       3
    \         \     / \     /       /
     2         3   1   3   1       2
      \       /           \       /
       3     2             2     1
```

We must **generate all these trees** and return them.

---

## **💡 Solution 1: Recursive Approach (Divide & Conquer)**
### **🤔 How Does This Work? (Pseudo-Code)**
1. **Pick each number (1 to n) as the root** of the tree.
2. **Recursively create** all possible left subtrees using smaller numbers.
3. **Recursively create** all possible right subtrees using bigger numbers.
4. **Combine** all left and right subtrees with the current root.
5. **Return all unique trees.**

### **📝 Rust Code**
```rust
use std::rc::Rc;
use std::cell::RefCell;

impl Solution {
    pub fn generate_trees(n: i32) -> Vec<Option<Rc<RefCell<TreeNode>>>> {
        if n == 0 {
            return vec![];
        }
        Self::generate(1, n)
    }
    
    fn generate(start: i32, end: i32) -> Vec<Option<Rc<RefCell<TreeNode>>>> {
        let mut all_trees = Vec::new();
        if start > end {
            all_trees.push(None);
            return all_trees;
        }
        
        for i in start..=end {
            let left_trees = Self::generate(start, i - 1);
            let right_trees = Self::generate(i + 1, end);
            
            for left in left_trees {
                for right in &right_trees {
                    let current = Some(Rc::new(RefCell::new(TreeNode {
                        val: i,
                        left: left.clone(),
                        right: right.clone(),
                    })));
                    all_trees.push(current);
                }
            }
        }
        
        all_trees
    }
}
```

---

## **💡 Solution 2: Memoization (Caching)**
### **🤔 How Does This Work? (Pseudo-Code)**
1. This is similar to the recursive solution, **but we store results** so we don’t repeat calculations.
2. If we already computed trees for a given range `(start, end)`, **use the stored result**.
3. This makes the solution **faster**.

### **📝 Rust Code**
```rust
use std::collections::HashMap;
use std::rc::Rc;
use std::cell::RefCell;

impl Solution {
    pub fn generate_trees(n: i32) -> Vec<Option<Rc<RefCell<TreeNode>>>> {
        if n == 0 {
            return vec![];
        }
        let mut memo = HashMap::new();
        Self::generate(1, n, &mut memo)
    }
    
    fn generate(
        start: i32,
        end: i32,
        memo: &mut HashMap<(i32, i32), Vec<Option<Rc<RefCell<TreeNode>>>>>,
    ) -> Vec<Option<Rc<RefCell<TreeNode>>>> {
        if let Some(trees) = memo.get(&(start, end)) {
            return trees.clone();
        }
        
        let mut all_trees = Vec::new();
        if start > end {
            all_trees.push(None);
            return all_trees;
        }
        
        for i in start..=end {
            let left_trees = Self::generate(start, i - 1, memo);
            let right_trees = Self::generate(i + 1, end, memo);
            
            for left in left_trees {
                for right in &right_trees {
                    let current = Some(Rc::new(RefCell::new(TreeNode {
                        val: i,
                        left: left.clone(),
                        right: right.clone(),
                    })));
                    all_trees.push(current);
                }
            }
        }
        
        memo.insert((start, end), all_trees.clone());
        all_trees
    }
}
```
### **🚀 Why is this Faster?**
- Instead of recalculating trees **for the same range**, we **store** results.
- If the function **calls the same range again**, we **return the stored value** instead of recalculating.

---

## **💡 Solution 3: Bottom-Up Dynamic Programming**
### **🤔 How Does This Work? (Pseudo-Code)**
1. **Start with small trees (n = 1) and build larger trees.**
2. **Use results from smaller trees** to construct bigger trees.
3. **Store trees for each size** in an array.
4. **Combine smaller trees to form bigger trees**.

### **📝 Rust Code**
```rust
use std::rc::Rc;
use std::cell::RefCell;

impl Solution {
    pub fn generate_trees(n: i32) -> Vec<Option<Rc<RefCell<TreeNode>>>> {
        if n == 0 {
            return vec![];
        }

        let mut dp: Vec<Vec<Option<Rc<RefCell<TreeNode>>>>>> = vec![vec![]; (n + 1) as usize];
        dp[0].push(None);

        for nodes in 1..=n {
            for root in 1..=nodes {
                let left_trees = dp[(root - 1) as usize].clone();
                let right_trees = dp[(nodes - root) as usize].clone();

                for left in &left_trees {
                    for right in &right_trees {
                        let current_tree = Some(Rc::new(RefCell::new(TreeNode {
                            val: root,
                            left: left.clone(),
                            right: right.clone(),
                        })));
                        dp[nodes as usize].push(current_tree);
                    }
                }
            }
        }

        dp[n as usize].clone()
    }
}
```

---

# **🚀 Deep Dive into Rust Syntax & Concepts**
## **1️⃣ Recursive Function Calls**
- The function **calls itself** to solve smaller problems before solving the full problem.
- Example:
  ```rust
  fn generate(start: i32, end: i32) -> Vec<Option<Rc<RefCell<TreeNode>>>> {
      let left_trees = generate(start, i - 1);
      let right_trees = generate(i + 1, end);
  }
  ```
- This **divides the problem into subproblems** (Divide & Conquer).

## **2️⃣ Dynamic Programming**
- Instead of recalculating the same **subproblem**, store results in an **array (`dp[]`)**.
- Example:
  ```rust
  dp[0].push(None); // Base case: No nodes = Empty tree
  ```
- We **build trees step-by-step**, starting with small trees and using those results for bigger trees.

## **3️⃣ Using `HashMap` for Memoization**
- A **hashmap** stores already computed results to avoid duplicate work.
- Example:
  ```rust
  let mut memo = HashMap::new();
  if let Some(trees) = memo.get(&(start, end)) {
      return trees.clone();
  }
  ```

---

# **🎯 Which Approach Should You Use?**
1️⃣ **Recursive** – **Simple**, but recalculates results, making it slower.  
2️⃣ **Memoization** – **Faster**, avoids redundant calculations.  
3️⃣ **Dynamic Programming** – **Best performance**, but **harder to understand**.

---

# **🔥 Final Thought**
*"To solve problems like this, think **recursively** and use **memoization** or **dynamic programming** for optimization!" 🚀*