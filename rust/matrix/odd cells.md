# **Problem Explanation (Like You’re 5!)**  

Imagine you have a **chessboard** (a grid of boxes). Each box starts with **0**.  

Now, someone gives you a list of instructions:  
1. **"Add 1 to all the boxes in row 2"**  
2. **"Add 1 to all the boxes in column 1"**  
3. **"Add 1 to all the boxes in row 1"**  
4. **"Add 1 to all the boxes in column 2"**  

After following these instructions, we want to **count how many boxes have odd numbers**.  

---

## **Example 1**
### **Input:**  
```rust
m = 2, n = 3, indices = [[0,1],[1,1]]
```
This means:  
- First instruction **[0,1]** → Increase **row 0** and **column 1**  
- Second instruction **[1,1]** → Increase **row 1** and **column 1**  

### **Step-by-Step Execution**  
#### **Step 1: Start with a 2×3 grid filled with 0s**
```
0  0  0
0  0  0
```
#### **Step 2: Apply the first instruction [0,1]**
- Increase all numbers in **row 0**
- Increase all numbers in **column 1**
```
1  2  1
0  1  0
```
#### **Step 3: Apply the second instruction [1,1]**
- Increase all numbers in **row 1**
- Increase all numbers in **column 1**
```
1  3  1
1  3  1
```
#### **Step 4: Count the odd numbers**  
Odd numbers: `[1,3,1,1,3,1]`  
Total = **6**  

### **Output:**  
```rust
6
```

---

## **Solution 1: Brute Force (The Simple, Direct Approach)**  
### **Thought Process**
1. Create a **matrix (grid)** of size `m x n` and set everything to `0`.
2. Read each instruction and increase the numbers in the **specified row** and **specified column**.
3. Once all instructions are done, **count** how many numbers in the matrix are odd.

### **Pseudo-code**
```
Create a grid of m x n filled with 0
For each (row, column) instruction in indices:
    Increase all numbers in that row by 1
    Increase all numbers in that column by 1

Count all numbers that are odd in the grid
Return the count
```

### **Rust Code**
```rust
impl Solution {
    pub fn odd_cells(row_count: i32, col_count: i32, indices: Vec<Vec<i32>>) -> i32 {
        let mut grid = vec![vec![0; col_count as usize]; row_count as usize];

        for index in indices {
            let row = index[0] as usize;
            let col = index[1] as usize;

            for c in 0..col_count as usize {
                grid[row][c] += 1;
            }

            for r in 0..row_count as usize {
                grid[r][col] += 1;
            }
        }

        let mut odd_count = 0;
        for row in grid {
            for cell in row {
                if cell % 2 != 0 {
                    odd_count += 1;
                }
            }
        }

        odd_count
    }
}
```
### **Time Complexity**
- **O(m × n + indices.length × (m + n))**  
  (Each instruction updates an entire row and column)

- **Space Complexity: O(m × n)**  
  (We store the whole matrix)

---

## **Solution 2: Using Two Arrays (Optimized)**
### **Thought Process**
- Instead of storing the **whole matrix**, we **only track how many times each row and column has been incremented**.
- This saves space and makes it run faster.

### **Pseudo-code**
```
Create two arrays:
  row_count[] to track how many times each row is increased
  col_count[] to track how many times each column is increased

For each (row, column) instruction:
  Increase row_count[row] by 1
  Increase col_count[column] by 1

Count how many rows and columns are odd
Calculate total odd cells using math:
  odd_rows * even_cols + even_rows * odd_cols
```

### **Rust Code**
```rust
impl Solution {
    pub fn odd_cells(row_count: i32, col_count: i32, indices: Vec<Vec<i32>>) -> i32 {
        let mut row_increments = vec![0; row_count as usize];
        let mut col_increments = vec![0; col_count as usize];

        for index in indices {
            row_increments[index[0] as usize] += 1;
            col_increments[index[1] as usize] += 1;
        }

        let odd_rows = row_increments.iter().filter(|&&x| x % 2 != 0).count() as i32;
        let odd_cols = col_increments.iter().filter(|&&x| x % 2 != 0).count() as i32;
        let even_rows = row_count - odd_rows;
        let even_cols = col_count - odd_cols;

        odd_rows * even_cols + even_rows * odd_cols
    }
}
```

### **Time Complexity**
- **O(m + n + indices.length)**
  - Only tracks row and column changes instead of updating every cell.
- **Space Complexity: O(m + n)**  
  - Uses two arrays instead of storing the whole grid.

---

## **Solution 3: Bitwise XOR Trick (Super Optimized)**
### **Thought Process**
- We **only track odd/even counts** instead of actual values.
- Instead of storing row and column increments, use `XOR` operations to **flip odd/even status**.

### **Pseudo-code**
```
Create two boolean arrays row_toggle[] and col_toggle[] (initially false)

For each (row, column) instruction:
    Flip the status of row_toggle[row]
    Flip the status of col_toggle[column]

Count odd_rows and odd_columns
Calculate total odd cells using:
    odd_rows * even_cols + even_rows * odd_cols
```

### **Rust Code**
```rust
impl Solution {
    pub fn odd_cells(row_count: i32, col_count: i32, indices: Vec<Vec<i32>>) -> i32 {
        let mut row_toggle = vec![false; row_count as usize];
        let mut col_toggle = vec![false; col_count as usize];

        for index in indices {
            row_toggle[index[0] as usize] ^= true;
            col_toggle[index[1] as usize] ^= true;
        }

        let odd_rows = row_toggle.iter().filter(|&&x| x).count() as i32;
        let odd_cols = col_toggle.iter().filter(|&&x| x).count() as i32;
        let even_rows = row_count - odd_rows;
        let even_cols = col_count - odd_cols;

        odd_rows * even_cols + even_rows * odd_cols
    }
}
```

### **Time Complexity**
- **O(m + n + indices.length)**
  - Uses XOR for flipping odd/even.
- **Space Complexity: O(m + n)**
  - Uses two boolean arrays instead of integers.

---

## **Comparison of All Solutions**
| Approach | Time Complexity | Space Complexity | When to Use? |
|----------|---------------|-----------------|-------------|
| **Brute Force (Matrix Update)** | O(m × n + indices.length × (m + n)) | O(m × n) | Simple but slow for large matrices |
| **Using Two Arrays (Optimized)** | O(m + n + indices.length) | O(m + n) | Best for medium-sized matrices |
| **Bitwise XOR Trick (Super Optimized)** | O(m + n + indices.length) | O(m + n) | Fastest and memory efficient |

---

## **Conclusion**
- We **optimized from brute force to better solutions** by reducing unnecessary operations.
- The **Bitwise XOR Trick** is the fastest approach.
- For **real-world large data**, the optimized solutions **save time and memory**.






# **Understanding This Code Visually and Step-by-Step**  

## **What Is This Code Doing?**
```rust
for index in indices {
    row_increments[index[0] as usize] += 1;
    col_increments[index[1] as usize] += 1;
}
```
This loop **keeps track of how many times each row and column is incremented** instead of updating the entire matrix. It allows us to determine the number of odd-valued cells more efficiently.

---

## **Visual Explanation with Step-by-Step Execution**

### **🛠 Example Input**
```rust
let row_count = 3;
let col_count = 3;
let indices = vec![
    vec![0, 1],  // Increment row 0 and column 1
    vec![1, 2],  // Increment row 1 and column 2
    vec![2, 0]   // Increment row 2 and column 0
];
```

### **1️⃣ Initial State (Before Processing `indices`)**
We initialize two arrays:
```rust
row_increments = [0, 0, 0]; // 3 rows
col_increments = [0, 0, 0]; // 3 columns
```
Each value in these arrays represents how many times that row or column has been incremented.

---

### **2️⃣ Processing Each `indices[i]` Entry**

#### ✅ **First Update: `indices[0] = [0, 1]`**  
- Increment **row `0`** → `row_increments[0] += 1`
- Increment **column `1`** → `col_increments[1] += 1`
```
row_increments = [1, 0, 0]
col_increments = [0, 1, 0]
```
**Visual representation of the matrix change:**  
```
[ 0  1  0 ]  ⬅ Incremented row 0
[ 0  0  0 ]  
[ 0  0  0 ]  
```
```
[ 0  2  0 ]  ⬅ Incremented column 1
[ 0  1  0 ]  
[ 0  1  0 ]  
```
---
#### ✅ **Second Update: `indices[1] = [1, 2]`**  
- Increment **row `1`** → `row_increments[1] += 1`
- Increment **column `2`** → `col_increments[2] += 1`
```
row_increments = [1, 1, 0]
col_increments = [0, 1, 1]
```
**Visual representation of the matrix change:**
```
[ 0  2  0 ]  
[ 1  2  1 ]  ⬅ Incremented row 1
[ 0  1  0 ]  
```
```
[ 0  2  1 ]  ⬅ Incremented column 2
[ 1  2  2 ]  
[ 0  1  1 ]  
```
---
#### ✅ **Third Update: `indices[2] = [2, 0]`**  
- Increment **row `2`** → `row_increments[2] += 1`
- Increment **column `0`** → `col_increments[0] += 1`
```
row_increments = [1, 1, 1]
col_increments = [1, 1, 1]
```
**Final matrix representation:**
```
[ 1  2  1 ]  ⬅ Incremented row 2
[ 1  2  2 ]  
[ 2  2  2 ]  
```

---

## **3️⃣ Counting Odd Numbers**
Now, we check how many **odd-valued** cells exist in the final matrix.

A cell at position `(r, c)` is odd if:
```rust
(row_increments[r] + col_increments[c]) % 2 != 0
```

| **Cell (r, c)**  | `row_increments[r]` | `col_increments[c]` | Sum | Odd? |
|------------------|-------------------|-------------------|-----|------|
| `(0,0)` | 1 | 1 | **2** | ❌ No |
| `(0,1)` | 1 | 1 | **2** | ❌ No |
| `(0,2)` | 1 | 1 | **2** | ❌ No |
| `(1,0)` | 1 | 1 | **2** | ❌ No |
| `(1,1)` | 1 | 1 | **2** | ❌ No |
| `(1,2)` | 1 | 1 | **2** | ❌ No |
| `(2,0)` | 1 | 1 | **2** | ❌ No |
| `(2,1)` | 1 | 1 | **2** | ❌ No |
| `(2,2)` | 1 | 1 | **2** | ❌ No |

**Result:** `0` odd numbers in the matrix.

---

## **⏳ Time Complexity Analysis**
- **Loop through `indices`** → `O(k)`, where `k` is the number of updates.
- **Loop through matrix rows and columns** → `O(m * n)`, where `m` and `n` are the number of rows and columns.
- **Final Odd Count Calculation** → `O(m * n)`, iterating through every cell.

🔹 **Optimized Approach Complexity:**  
Instead of `O(m * n * k)`, we **reduce** it to `O(m + n + k)`.

---

## **✨ Why Is This Better?**
✅ **Memory-Efficient:** Uses just two arrays instead of modifying the entire matrix.  
✅ **Fast Computation:** Avoids redundant operations on the matrix.  
✅ **Scales Well:** Works efficiently for large matrices.  

---

## **🎯 Final Thoughts**
- Instead of modifying the **whole matrix**, we only **track row and column increments**.
- This makes our solution **faster and more memory-efficient**.
- The final matrix is never actually created, and we compute the result directly.




### **Understanding the Bitwise XOR Approach (`^=`) in Rust**
The code is using **bitwise XOR (`^=`)** to efficiently track whether a row or column has been toggled an odd number of times.

---

## **🔹 Step 1: What’s the Goal?**
We need to count how many numbers in the matrix are **odd** after applying the `indices` operations.

Each operation **flips** a row and a column by adding `+1` to all the cells in that row and column.

Instead of storing and modifying a full matrix, we only care about whether a **row or column has been toggled an odd number of times**.

---

## **🔹 Step 2: Understanding XOR (`^=`)**
```rust
row_toggle[index[0] as usize] ^= true;
col_toggle[index[1] as usize] ^= true;
```
### **XOR (`^=`) Works Like a Light Switch!**
- If the row was **OFF (false)** and you toggle it, it becomes **ON (true)**.
- If the row was **ON (true)** and you toggle it again, it becomes **OFF (false)**.
- This way, we don’t need to count how many times a row is toggled. At the end:
  - **`true` means it was toggled an odd number of times.**
  - **`false` means it was toggled an even number of times.**

#### **Example**
Imagine you have `row_toggle = [false, false, false]` (3 rows, all OFF).
```rust
row_toggle[0] ^= true;  // [true, false, false]  (toggled row 0)
row_toggle[1] ^= true;  // [true, true, false]  (toggled row 1)
row_toggle[0] ^= true;  // [false, true, false] (row 0 was toggled again)
```
- Row `0` was toggled **twice** → Even times → `false`.
- Row `1` was toggled **once** → Odd times → `true`.

---

## **🔹 Step 3: Counting Odd and Even Rows/Columns**
Now, after processing all indices, we count:
```rust
let odd_rows = row_toggle.iter().filter(|&&x| x).count() as i32;
let odd_cols = col_toggle.iter().filter(|&&x| x).count() as i32;
```
- `odd_rows` = Number of rows that were toggled an **odd** number of times.
- `odd_cols` = Number of columns that were toggled an **odd** number of times.

Since we know the total row and column counts:
```rust
let even_rows = row_count - odd_rows;
let even_cols = col_count - odd_cols;
```
- `even_rows` = The remaining rows that were toggled an **even** number of times.
- `even_cols` = The remaining columns that were toggled an **even** number of times.

---

## **🔹 Step 4: Calculating the Odd Cells**
Each **odd cell** comes from one of two groups:
1. **(Odd row, Even column)**
2. **(Even row, Odd column)**

Since:
- Each row in `odd_rows` affects all `even_cols` cells.
- Each row in `even_rows` affects all `odd_cols` cells.

We use the formula:
```rust
odd_rows * even_cols + even_rows * odd_cols
```
This efficiently counts the odd numbers **without constructing the full matrix**!

---

## **🔹 Why is This Approach Fast?**
✅ **No need to create and update a full matrix** → Only two small boolean arrays (`row_toggle` & `col_toggle`).  
✅ **Only loops through the `indices` list and small arrays** → **O(n + m + indices.len())** time complexity.  
✅ **Only stores row and column toggle states** → **O(n + m)** space complexity.

---

## **🔹 Summary (For a 5-Year-Old)**
- Imagine each row and column is a **light switch** that starts OFF (false).
- Each operation **flips the switch** for a row and a column.
- At the end, count which **rows** and **columns** have their switches ON (odd toggles).
- Odd cells happen when an **odd row meets an even column** or an **even row meets an odd column**.
- Instead of storing a full matrix, we just track rows and columns separately.

That’s why XOR (`^=`) works beautifully! 🚀