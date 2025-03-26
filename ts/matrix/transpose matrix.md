# Matrix Transposition in TypeScript

## Overview  
Matrix transposition is the process of flipping a given `m x n` matrix over its main diagonal, swapping rows with columns.  

## Algorithm  
Given a matrix `matrix` of dimensions **m × n**, the transposed matrix will have dimensions **n × m**. The transformation follows:

**Formula:**  
For each element `matrix[i][j]`, place it at `result[j][i]`.  

### Example  

**Input:**  
```
matrix = [
  [1, 2, 3],
  [4, 5, 6]
]
```
**Processing:**  
- Move `matrix[0][0] → result[0][0]`
- Move `matrix[0][1] → result[1][0]`
- Move `matrix[0][2] → result[2][0]`
- Move `matrix[1][0] → result[0][1]`
- Move `matrix[1][1] → result[1][1]`
- Move `matrix[1][2] → result[2][1]`

**Output:**  
```
[
  [1, 4],
  [2, 5],
  [3, 6]
]
```

---

## Implementation in TypeScript

```typescript
/**
 * Transposes a given m x n matrix, returning a new n x m matrix.
 *
 * @param {number[][]} matrix - The input 2D array.
 * @returns {number[][]} - The transposed matrix.
 *
 * @example
 * transpose([[1, 2, 3], [4, 5, 6]]);
 * // Output: [[1, 4], [2, 5], [3, 6]]
 *
 * Time Complexity: O(m * n) - We visit each element once.
 * Space Complexity: O(m * n) - We create a new matrix of size n * m.
 */
function transpose(matrix: number[][]): number[][] {
    const m = matrix.length;
    const n = matrix[0].length;
    const result: number[][] = Array.from({ length: n }, () => Array(m));

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            result[j][i] = matrix[i][j];
        }
    }

    return result;
}
```

---

## Memory Management  

- **Heap Allocation:**  
  - The new `result` matrix requires **O(m × n) space** in the heap.  
  - Each sub-array is allocated dynamically.  

- **Garbage Collection:**  
  - The original matrix remains **unchanged**.  
  - Once `transpose(matrix)` returns, the `result` array persists, but older variables may be garbage collected if not referenced.  

- **Avoiding Unnecessary Copies:**  
  - Instead of mutating `matrix`, a separate `result` array is used for clarity and efficiency.  
  - This prevents unnecessary memory duplication in case the original matrix is needed elsewhere.  

---

## Performance Analysis  

| Operation  | Complexity |
|------------|------------|
| Accessing Elements  | O(1) |
| Iterating Through Matrix  | O(m × n) |
| Space Usage  | O(m × n) |

- **Time Complexity:** **O(m × n)**  
  - We iterate over each element exactly **once**.  

- **Space Complexity:** **O(m × n)**  
  - A new matrix of size **n × m** is created.  

---

## Edge Cases  

1. **Single Row Matrix (`1 x n`)**
   - Example: `[[1, 2, 3]]`
   - Transposed Output: `[[1], [2], [3]]`
   - **No empty rows, straightforward swap**.

2. **Single Column Matrix (`m x 1`)**
   - Example: `[[1], [2], [3]]`
   - Transposed Output: `[[1, 2, 3]]`
   - **Becomes a single-row matrix**.

3. **Square Matrix (`n x n`)**
   - Example: `[[1, 2], [3, 4]]`
   - Transposed Output: `[[1, 3], [2, 4]]`
   - **Still `n x n`, but elements swap across the diagonal**.

4. **Large Matrix (`1000 x 1000`)**
   - Efficient handling due to **O(m × n) complexity**.

---

## Conclusion  

- The algorithm **efficiently transposes** an **m x n** matrix into an **n x m** matrix.  
- It ensures **optimal memory management** by only allocating a necessary result matrix.  
- Given **O(m × n) time complexity**, this solution scales well for large inputs.  
