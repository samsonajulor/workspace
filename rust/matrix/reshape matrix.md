# **Matrix Reshape Function in Rust**

## **Overview**
The `matrix_reshape` function reshapes a `m × n` matrix into an `r × c` matrix while maintaining row-major traversal order. If the reshape operation is invalid, the function returns the original matrix.

## **Usage**
This function is part of the `Solution` struct and can be called using:
```rust
Solution::matrix_reshape(mat, r, c);
```

---

## **Function Signature**
```rust
impl Solution {
    pub fn matrix_reshape(mat: Vec<Vec<i32>>, r: i32, c: i32) -> Vec<Vec<i32>>;
}
```

### **Parameters**
| Name | Type | Description |
|------|------|-------------|
| `mat` | `Vec<Vec<i32>>` | The original matrix stored as a vector of vectors. |
| `r` | `i32` | Target number of rows in the new matrix. |
| `c` | `i32` | Target number of columns in the new matrix. |

### **Returns**
- **`Vec<Vec<i32>>`** – The reshaped matrix if possible; otherwise, the original matrix.

---

## **Implementation**
```rust
impl Solution {
    /// Reshapes a given m x n matrix into an r x c matrix.
    ///
    /// # Memory Management
    /// - The input `mat` is consumed (`into_iter()`) to avoid unnecessary cloning.
    /// - The flattened 1D vector (`flat`) is allocated once and re-used to construct the new matrix.
    /// - The `reshaped` matrix is preallocated using `Vec::with_capacity(r as usize)` for efficiency.
    ///
    /// # Arguments
    /// * `mat` - A 2D vector representing the input matrix.
    /// * `r` - The desired number of rows in the new matrix.
    /// * `c` - The desired number of columns in the new matrix.
    ///
    /// # Returns
    /// A new reshaped matrix if valid, otherwise returns the original matrix.
    ///
    /// # Example
    /// ```
    /// let mat = vec![vec![1, 2], vec![3, 4]];
    /// let r = 1;
    /// let c = 4;
    /// assert_eq!(Solution::matrix_reshape(mat, r, c), vec![vec![1, 2, 3, 4]]);
    /// ```
    pub fn matrix_reshape(mat: Vec<Vec<i32>>, r: i32, c: i32) -> Vec<Vec<i32>> {
        let m = mat.len();
        let n = mat[0].len();
        let total_elements = m * n;

        // Ensure reshape is possible
        if (r * c) as usize != total_elements {
            return mat; // Returns the original matrix (avoids unnecessary computation)
        }

        // Flatten matrix using `into_iter().flatten()` to avoid cloning
        let flat: Vec<i32> = mat.into_iter().flatten().collect();
        let mut reshaped = Vec::with_capacity(r as usize); // Preallocate memory for rows

        // Populate the reshaped matrix using slices
        for i in 0..r as usize {
            reshaped.push(flat[i * c as usize..(i + 1) * c as usize].to_vec());
        }

        reshaped
    }
}
```

---

## **Memory Management Considerations**
1. **Avoiding Cloning (`into_iter().flatten()`)**
   - Instead of cloning elements, `into_iter().flatten()` **moves** elements from `mat` to `flat`.
   - This avoids extra allocations and reduces memory overhead.

2. **Preallocating Memory (`Vec::with_capacity`)**
   - `Vec::with_capacity(r as usize)` ensures memory is allocated once instead of dynamically growing.
   - This improves performance by avoiding repeated reallocations.

3. **Efficient Slicing (`flat[i * c..(i + 1) * c]`)**
   - Instead of reassigning elements one by one, slices (`&flat[..]`) are used to extract rows efficiently.
   - `to_vec()` converts the slice into a new `Vec<i32>`.

4. **Early Return for Invalid Reshape**
   - If the reshape operation is not possible, the function returns **early** to avoid unnecessary memory usage.

---

## **Examples**
### **Example 1: Valid Reshape**
#### **Input:**
```rust
let mat = vec![vec![1, 2], vec![3, 4]];
let r = 1;
let c = 4;
```
#### **Output:**
```rust
[[1, 2, 3, 4]]
```
#### **Explanation:**
The original 2×2 matrix is flattened into `[1, 2, 3, 4]` and reshaped into a 1×4 matrix.

---

### **Example 2: Invalid Reshape (Size Mismatch)**
#### **Input:**
```rust
let mat = vec![vec![1, 2], vec![3, 4]];
let r = 2;
let c = 4;
```
#### **Output:**
```rust
[[1, 2], [3, 4]]
```
#### **Explanation:**
Since `2 × 2 ≠ 2 × 4`, the reshape operation is **not possible**, and the original matrix is returned.

---

## **Edge Cases Covered**
✅ **Matrix cannot be reshaped** (e.g., `r * c` does not match `m * n`)  
✅ **Matrix is already in the correct shape**  
✅ **Matrix contains negative numbers or zeroes**  
✅ **Single-row and single-column matrices**  

---

## **Complexity Analysis**
| Operation | Time Complexity | Space Complexity |
|-----------|----------------|------------------|
| Flattening the matrix | **O(m × n)** | **O(m × n)** |
| Constructing the reshaped matrix | **O(m × n)** | **O(m × n)** |
| **Total Complexity** | **O(m × n)** | **O(m × n)** |

- **Time Complexity:**  
  - We traverse the matrix **twice** (flattening + reconstruction), leading to `O(m × n)`.
  
- **Space Complexity:**  
  - The **original matrix is consumed** (`into_iter()`), but a **new matrix is allocated**, so space remains `O(m × n)`.
  - Using `Vec::with_capacity` ensures **optimal memory allocation**.

---

## **Key Takeaways**
🚀 **Optimized memory handling** using **move semantics** and **preallocation**.  
✅ **Avoids unnecessary cloning**, reducing memory usage.  
📌 **Handles edge cases gracefully**, making it production-ready.
