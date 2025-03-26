# Detailed Technical Documentation: Matrix Zeroing Problem

## **Introduction**

The **Matrix Zeroing** problem asks us to modify a given matrix in place, such that if any element in the matrix is zero, its entire row and column must be set to zero. This problem has applications in data cleaning and preprocessing, especially in scenarios where certain data points are considered invalid (represented by zero), and we need to mark the entire row and column as irrelevant. In real-world applications, this could be used for handling corrupted data in a 2D dataset or for marking an entire region of a grid as unavailable.

For example, in a matrix representing availability of seats in a theater or status of servers in a network, a zero could indicate a critical failure or an unavailable resource, necessitating the removal of that entire row and column from further consideration.

## **Expected Solution**

### Example 1: 

**Input Matrix:**

```
[[1, 1, 1],
 [1, 0, 1],
 [1, 1, 1]]
```

**After Processing:**

```
[[1, 0, 1],
 [0, 0, 0],
 [1, 0, 1]]
```

**Explanation:** 
- The element at position (1, 1) is zero, so its entire row (row 1) and column (column 1) are set to zero.

### Example 2:

**Input Matrix:**

```
[[0, 1, 2, 0],
 [3, 4, 5, 2],
 [1, 3, 1, 5]]
```

**After Processing:**

```
[[0, 0, 0, 0],
 [0, 4, 5, 0],
 [0, 3, 1, 0]]
```

**Explanation:**
- The element at position (0, 0) is zero, so its entire row (row 0) and column (column 0) are set to zero.
- Similarly, the element at position (0, 3) is zero, so column 3 is set to zero.

## **Approach & Thought Process**

### Approach 1: **Brute Force (O(mn) Space Solution)**

This approach involves creating an auxiliary matrix of the same size as the input matrix. The auxiliary matrix will track which rows and columns need to be set to zero. For each zero found in the input matrix, we will set the corresponding row and column to zero in the auxiliary matrix. Finally, we copy the results back into the original matrix.

**Pros:**
- Simple to understand and implement.

**Cons:**
- Uses extra memory, leading to space complexity of O(m * n), where `m` is the number of rows and `n` is the number of columns.

### Approach 2: **Optimized with O(m + n) Space**

In this approach, we use two separate arrays to track which rows and columns contain zeros. Instead of creating an auxiliary matrix, we simply store flags in one array for rows and another for columns. Then, using these flags, we can efficiently update the original matrix in place.

**Pros:**
- Space complexity reduced to O(m + n), which is more efficient than the brute-force approach.

**Cons:**
- Still requires additional space for tracking rows and columns.

### Approach 3: **Constant Space Solution (In-place)**

The most optimized approach involves using the first row and first column of the matrix itself as flags to track which rows and columns need to be set to zero. This eliminates the need for any additional space and keeps the space complexity at O(1). This approach updates the matrix in place, making it the most memory-efficient solution.

**Pros:**
- Constant space complexity, O(1).
- In-place updates without any additional storage.

**Cons:**
- Slightly more complex logic due to in-place flagging.

---

## **Algorithm Breakdown**

### Approach 1: Brute Force (O(mn) Space)

**Step-by-Step Explanation:**
1. Create a new matrix (`zeroMatrix`) of the same dimensions as the input matrix.
2. Traverse through the original matrix. For every element that is zero:
   - Set the corresponding entire row and column in the `zeroMatrix` to zero.
3. After processing, copy the `zeroMatrix` back to the original matrix.

```ts
function setZeroesBruteForce(matrix: number[][]): void {
    const m = matrix.length, n = matrix[0].length;
    const zeroMatrix = Array.from({ length: m }, () => Array(n).fill(1));

    for (let rowIndex = 0; rowIndex < m; rowIndex++) {
        for (let columnIndex = 0; columnIndex < n; columnIndex++) {
            if (matrix[rowIndex][columnIndex] === 0) {
                for (let i = 0; i < n; i++) zeroMatrix[rowIndex][i] = 0;
                for (let i = 0; i < m; i++) zeroMatrix[i][columnIndex] = 0;
            }
        }
    }

    for (let rowIndex = 0; rowIndex < m; rowIndex++) {
        for (let columnIndex = 0; columnIndex < n; columnIndex++) {
            if (zeroMatrix[rowIndex][columnIndex] === 0) matrix[rowIndex][columnIndex] = 0;
        }
    }
}
```

---

### Approach 2: Optimized with O(m + n) Space

**Step-by-Step Explanation:**
1. Create two arrays: one to track the rows and another for the columns that should be set to zero.
2. Traverse the matrix. If an element is zero, mark the corresponding row and column in the arrays.
3. Use the row and column flags to set the appropriate rows and columns to zero in the original matrix.

```ts
function setZeroesOptimized(matrix: number[][]): void {
    const m = matrix.length, n = matrix[0].length;
    const rowFlags = new Array(m).fill(false);
    const colFlags = new Array(n).fill(false);

    for (let rowIndex = 0; rowIndex < m; rowIndex++) {
        for (let columnIndex = 0; columnIndex < n; columnIndex++) {
            if (matrix[rowIndex][columnIndex] === 0) {
                rowFlags[rowIndex] = true;
                colFlags[columnIndex] = true;
            }
        }
    }

    for (let rowIndex = 0; rowIndex < m; rowIndex++) {
        for (let columnIndex = 0; columnIndex < n; columnIndex++) {
            if (rowFlags[rowIndex] || colFlags[columnIndex]) {
                matrix[rowIndex][columnIndex] = 0;
            }
        }
    }
}
```

---

### Approach 3: Constant Space Solution (In-place)

**Step-by-Step Explanation:**
1. First, check if the first row and first column need to be set to zero by scanning the entire first row and column.
2. Use the first row and column to mark which rows and columns need to be zeroed.
3. Traverse the matrix, and use the flags in the first row and column to set the corresponding rows and columns to zero.
4. Finally, set the first row and column to zero if needed.

```ts
function setZeroesConstantSpace(matrix: number[][]): void {
    const m = matrix.length, n = matrix[0].length;
    let firstRowZero = false, firstColZero = false;

    // Check if first row contains zero
    for (let rowIndex = 0; rowIndex < m; rowIndex++) {
        if (matrix[rowIndex][0] === 0) firstColZero = true;
    }

    // Check if first column contains zero
    for (let columnIndex = 0; columnIndex < n; columnIndex++) {
        if (matrix[0][columnIndex] === 0) firstRowZero = true;
    }

    // Mark rows and columns to be zeroed
    for (let rowIndex = 1; rowIndex < m; rowIndex++) {
        for (let columnIndex = 1; columnIndex < n; columnIndex++) {
            if (matrix[rowIndex][columnIndex] === 0) {
                matrix[rowIndex][0] = 0;
                matrix[0][columnIndex] = 0;
            }
        }
    }

    // Zero out rows based on markers
    for (let rowIndex = 1; rowIndex < m; rowIndex++) {
        if (matrix[rowIndex][0] === 0) {
            for (let columnIndex = 1; columnIndex < n; columnIndex++) {
                matrix[rowIndex][columnIndex] = 0;
            }
        }
    }

    // Zero out columns based on markers
    for (let columnIndex = 1; columnIndex < n; columnIndex++) {
        if (matrix[0][columnIndex] === 0) {
            for (let rowIndex = 1; rowIndex < m; rowIndex++) {
                matrix[rowIndex][columnIndex] = 0;
            }
        }
    }

    // Zero out first row if needed
    if (firstRowZero) {
        for (let columnIndex = 0; columnIndex < n; columnIndex++) {
            matrix[0][columnIndex] = 0;
        }
    }

    // Zero out first column if needed
    if (firstColZero) {
        for (let rowIndex = 0; rowIndex < m; rowIndex++) {
            matrix[rowIndex][0] = 0;
        }
    }
}
```

---

## **Time & Space Complexity Analysis**

### **Brute Force Solution**
- **Time Complexity:** O(m * n), where `m` is the number of rows and `n` is the number of columns.
- **Space Complexity:** O(m * n), due to the additional matrix for tracking zeros.

### **Optimized Solution with O(m + n) Space**
- **Time Complexity:** O(m * n), as we still traverse the matrix twice (once to mark and once to apply changes).
- **Space Complexity:** O(m + n), since we use two arrays to track rows and columns.

### **In-place Solution (Constant Space)**
- **Time Complexity:** O(m * n), since we traverse the matrix multiple times.
- **Space Complexity:** O(1), as we are modifying the matrix in place without using additional space.

---

## **Best Practices & Edge Cases**

- **Empty Matrix:** Ensure that the algorithm handles matrices with no elements (i.e., m = 0 or n = 0).
- **Single Row/Column Matrices:** Special handling may be needed to handle edge cases such as matrices with only one row or one column.
- **Large Matrices:** Even though the algorithm handles large matrices efficiently, consider the implications of memory usage in extremely large datasets.

---

## **Conclusion & Further Enhancements**

In this documentation, we covered multiple approaches to solving the matrix zeroing problem. The **in-place solution** with **constant space complexity** is optimal for memory usage, making it the best choice for large matrices. However, different scenarios might favor other solutions depending on memory constraints and ease of implementation.

**Further Enhancements:**
- You could enhance the solution by parallelizing the matrix traversal if matrix size is significantly large.
