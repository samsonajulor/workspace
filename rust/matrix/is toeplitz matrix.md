# **Checking if a Matrix is Toeplitz – Rust Technical Documentation**  

## **Introduction**  
A **Toeplitz matrix** is a special type of grid (matrix) where every diagonal from the **top-left** to the **bottom-right** has the same elements.  

Imagine you are playing with blocks and placing them diagonally in a pattern. If each diagonal has the same color, then your arrangement follows the **Toeplitz rule**!  

### **Real-World Applications**  
- **Image Processing:** Helps in detecting patterns in images.  
- **Data Compression:** Used in reducing redundant information in large datasets.  
- **Signal Processing:** Important for reducing noise in audio and video signals.  

---

## **Expected Solution**  
We need to check if all diagonals in the matrix contain the same values.  

### **Example 1**  
#### **Input:**  
```plaintext
1  2  3  4  
5  1  2  3  
9  5  1  2  
```
#### **Diagonals in the Matrix**  
```plaintext
[9], [5, 5], [1, 1, 1], [2, 2, 2], [3, 3], [4]
```
- Each diagonal has the same value → **True**  

### **Example 2**  
#### **Input:**  
```plaintext
1  2  
2  2  
```
#### **Diagonals in the Matrix**  
```plaintext
[1], [2, 2]
```
- The diagonal `[1, 2]` has different values → **False**  

---

## **Approach & Thought Process**  

We will explore **three different approaches** to solving this problem:  
1. **Brute Force Approach** – Check each diagonal manually.  
2. **Using a HashMap** – Track diagonals with a dictionary-like structure.  
3. **Memory-Efficient Approach** – Compare only the current and previous row.  

---

## **Solution 1: Brute Force Approach**  
### **How it Works (Pseudo Code)**  
1. Loop through every element in the matrix.  
2. Check if the **current element** matches the element **diagonally below and to the right**.  
3. If any diagonal mismatch is found, return `false`.  
4. If no mismatches, return `true`.  

### **Rust Code**
```rust
impl Solution {
    pub fn is_toeplitz_matrix(matrix: Vec<Vec<i32>>) -> bool {
        let number_of_rows = matrix.len();
        let number_of_columns = matrix[0].len();

        for row in 0..number_of_rows - 1 {
            for column in 0..number_of_columns - 1 {
                if matrix[row][column] != matrix[row + 1][column + 1] {
                    return false;
                }
            }
        }

        true
    }
}
```

### **Time Complexity:**  
- **O(rows × columns)** → We check every element once.  
### **Space Complexity:**  
- **O(1)** → No extra memory is used.  

---

## **Solution 2: Using a HashMap**  
### **How it Works (Pseudo Code)**  
1. Each diagonal has the same **row - column** difference.  
2. Use a **HashMap** to store the first element for each diagonal.  
3. Check if all elements in the same diagonal match the stored value.  
4. If all match, return `true`; otherwise, return `false`.  

### **Rust Code**
```rust
use std::collections::HashMap;

impl Solution {
    pub fn is_toeplitz_matrix(matrix: Vec<Vec<i32>>) -> bool {
        let mut diagonal_map: HashMap<i32, i32> = HashMap::new();

        for row in 0..matrix.len() {
            for column in 0..matrix[0].len() {
                let diagonal_key = row as i32 - column as i32;

                if let Some(&value) = diagonal_map.get(&diagonal_key) {
                    if value != matrix[row][column] {
                        return false;
                    }
                } else {
                    diagonal_map.insert(diagonal_key, matrix[row][column]);
                }
            }
        }

        true
    }
}
```

### **Time Complexity:**  
- **O(rows × columns)** → Each element is checked once.  
### **Space Complexity:**  
- **O(rows + columns)** → We store one element per diagonal.  

---

## **Solution 3: Memory-Efficient Approach**  
### **How it Works (Pseudo Code)**  
1. Store only the **previous row** instead of the entire matrix.  
2. Compare each **current row** with the **previous row**, ensuring diagonals match.  
3. If any mismatch is found, return `false`.  

### **Rust Code**
```rust
impl Solution {
    pub fn is_toeplitz_matrix(matrix: Vec<Vec<i32>>) -> bool {
        let mut previous_row = &matrix[0];

        for row in 1..matrix.len() {
            let current_row = &matrix[row];

            for column in 0..current_row.len() - 1 {
                if current_row[column] != previous_row[column + 1] {
                    return false;
                }
            }

            previous_row = current_row;
        }

        true
    }
}
```

### **Time Complexity:**  
- **O(rows × columns)** → We check every element once.  
### **Space Complexity:**  
- **O(columns)** → We only store one row in memory.  

---

## **Comparison of Solutions**  

| Approach | Time Complexity | Space Complexity | Best Use Case |
|----------|---------------|-----------------|--------------|
| **Brute Force** | `O(rows × columns)` | `O(1)` | Simple and easy to implement |
| **HashMap Approach** | `O(rows × columns)` | `O(rows + columns)` | Good for sparse matrices |
| **Memory Efficient** | `O(rows × columns)` | `O(columns)` | Best for large matrices |

---

## **Handling Large Matrices (Follow-up Questions)**  

### **1. What if the matrix is stored on disk, and only one row can be loaded at a time?**  
✅ Use the **Memory Efficient Approach** (Solution 3), which only requires the current and previous row in memory.  

### **2. What if only a part of a row can be loaded into memory?**  
✅ Process small chunks of the matrix sequentially using disk streaming techniques.  

---

## **Conclusion & Further Enhancements**  
- The **brute force** method is simple but inefficient for large matrices.  
- Using a **HashMap** allows easy tracking of diagonals.  
- The **memory-efficient** solution is the best choice for handling large matrices.  
- **Further Improvements:** We could parallelize computations for larger datasets.  

🚀 **By understanding the different approaches, you can choose the best solution based on memory and performance constraints!**