# Matrix Transposition in Rust

## Overview  
Matrix transposition involves flipping an `m × n` matrix over its **main diagonal**, swapping row indices with column indices.  

## Algorithm Explanation  
Given an `m × n` matrix, the transposed matrix will have dimensions **n × m**.  
For each element at `matrix[i][j]`, we place it at `result[j][i]`.  

### Example  

**Input:**  
```rust
matrix = vec![
    vec![1, 2, 3],
    vec![4, 5, 6]
];
```
**Processing:**  
- `matrix[0][0]` → `result[0][0]`
- `matrix[0][1]` → `result[1][0]`
- `matrix[0][2]` → `result[2][0]`
- `matrix[1][0]` → `result[0][1]`
- `matrix[1][1]` → `result[1][1]`
- `matrix[1][2]` → `result[2][1]`

**Output:**  
```rust
[
    [1, 4],
    [2, 5],
    [3, 6]
]
```

---

## Rust Implementation  

```rust
impl Solution {
    /// Transposes a given m x n matrix, returning a new n x m matrix.
    ///
    /// # Arguments
    ///
    /// * `matrix` - A 2D vector representing the input matrix.
    ///
    /// # Returns
    ///
    /// * `Vec<Vec<i32>>` - The transposed matrix.
    ///
    /// # Complexity
    ///
    /// - Time Complexity: O(m * n) - Each element is processed once.
    /// - Space Complexity: O(m * n) - A new n x m matrix is allocated.
    ///
    /// # Example
    /// ```
    /// let matrix = vec![vec![1, 2, 3], vec![4, 5, 6]];
    /// let result = Solution::transpose(matrix);
    /// assert_eq!(result, vec![vec![1, 4], vec![2, 5], vec![3, 6]]);
    /// ```
    pub fn transpose(matrix: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let m = matrix.len();
        let n = matrix[0].len();
        let mut result = vec![vec![0; m]; n];

        for i in 0..m {
            for j in 0..n {
                result[j][i] = matrix[i][j];
            }
        }

        result
    }
}
```

---

## **Memory Management in Rust**  

Rust ensures **efficient memory allocation** while transposing the matrix:  

- **Heap Allocation:**  
  - The original matrix is stored on the **heap** (`Vec<Vec<i32>>` is dynamically allocated).  
  - A new matrix (`result`) of size `n × m` is allocated **once** using `vec![vec![0; m]; n]`.  

- **Ownership and Borrowing:**  
  - The function **takes ownership** of `matrix` (moving it into `transpose`).
  - `result` is returned, transferring ownership back to the caller.

- **Garbage Collection (Deallocation):**  
  - Once `transpose(matrix)` returns, **Rust automatically frees** the original matrix memory if no other references exist.  

---

## **Performance Analysis**  

| Operation | Complexity |
|-----------|-----------|
| Accessing Elements | O(1) |
| Iterating Through Matrix | O(m × n) |
| Allocating Memory | O(m × n) |
| Overall Time Complexity | O(m × n) |
| Overall Space Complexity | O(m × n) |

- **Time Complexity: O(m × n)**  
  - Each element is processed **exactly once**.  

- **Space Complexity: O(m × n)**  
  - A **new** matrix of size **n × m** is created, leading to O(m × n) space usage.  

---

## **Edge Cases**  

1. **Single Row Matrix (`1 x n`)**
   - Example: `vec![vec![1, 2, 3]]`
   - Transposed Output: `vec![vec![1], vec![2], vec![3]]`
   - **No empty rows, straightforward swap**.

2. **Single Column Matrix (`m x 1`)**
   - Example: `vec![vec![1], vec![2], vec![3]]`
   - Transposed Output: `vec![vec![1, 2, 3]]`
   - **Becomes a single-row matrix**.

3. **Square Matrix (`n x n`)**
   - Example: `vec![vec![1, 2], vec![3, 4]]`
   - Transposed Output: `vec![vec![1, 3], vec![2, 4]]`
   - **Still `n x n`, but elements swap across the diagonal**.

4. **Large Matrix (`1000 x 1000`)**
   - Efficient handling due to **O(m × n) complexity**.

---

## **Conclusion**  

- This implementation **efficiently transposes** an `m x n` matrix into an `n x m` matrix.  
- Rust's **heap allocation** ensures minimal overhead.  
- The function adheres to **Rust's ownership model**, preventing memory leaks.  
- **Performance is optimal**, with **O(m × n) time and space complexity**.  
