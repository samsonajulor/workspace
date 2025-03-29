# **Checking if a Matrix is Toeplitz – A Beginner-Friendly Guide in TypeScript**

## **📌 Introduction**
A **Toeplitz matrix** is a special kind of grid where every diagonal from the top-left to the bottom-right has the same number. This means that if you look at any diagonal, all the numbers in it should be the same.

### **🖼️ Real-World Example**
Imagine a brick wall where each diagonal row of bricks has to be the same color. If one brick is different in a diagonal, the wall is **not** Toeplitz!

For example:
```
1  2  3  4
5  1  2  3
9  5  1  2
```
✅ This is a Toeplitz matrix because all diagonals have the same numbers.

But:
```
1  2
2  2
```
❌ This is **not** a Toeplitz matrix because the diagonal `[1, 2]` has different numbers.

---

## **📝 Expected Solution with Diagrams**
To check if a matrix is Toeplitz, we need to compare:
1. Each element with the one diagonally **below and to the right**.
2. If any diagonal has different numbers, the matrix is **not** Toeplitz.

**Example Matrix:**
```
1  2  3
4  1  2
5  4  1
```
Checking diagonals:
- `[1, 1, 1]` ✅
- `[2, 2]` ✅
- `[3]` ✅
- `[4, 4]` ✅
- `[5]` ✅

This is a **Toeplitz matrix**!

---

## **🔎 Approach & Thought Process**
We will look at three ways to solve this:

### **1️⃣ Brute Force Approach**
**🔹 How it works:**
- We **compare each number** to the one diagonally below and to the right.
- If we find a mismatch, we return **false**.
- If we check all diagonals and they are fine, we return **true**.

### **2️⃣ Using a Hash Map**
**🔹 How it works:**
- We **store** the first number of each diagonal in a map.
- As we go through the matrix, we check if the diagonal has the same numbers.

### **3️⃣ Memory Efficient Approach (For Large Matrices)**
**🔹 How it works:**
- Instead of checking the whole matrix at once, we **only load one row at a time**.
- We compare it to the **previous row** instead of storing everything.

---

## **🧩 Algorithm Breakdown with Pseudo Code**
Before we write TypeScript code, let’s understand it with simple steps:

### **1️⃣ Brute Force Approach**
```plaintext
1. Loop through the matrix row by row.
2. For each element:
   a. Check if it has a next row and next column.
   b. If it does, compare it to the next diagonal element.
   c. If they are not equal, return false.
3. If we check everything and it’s fine, return true.
```

### **2️⃣ Using a Hash Map**
```plaintext
1. Create an empty map.
2. Loop through each row and column:
   a. Compute the diagonal key (row - column).
   b. If this is the first time we see this key, store the value.
   c. Otherwise, check if the value is the same.
   d. If not, return false.
3. If all checks pass, return true.
```

### **3️⃣ Memory Efficient Approach**
```plaintext
1. Read the first row into memory.
2. Read the next row and compare each element (except the last one) to the previous row.
3. If there’s a mismatch, return false.
4. Continue reading one row at a time.
5. If no mismatches are found, return true.
```

---

## **💻 TypeScript Code Implementations**

### **1️⃣ Brute Force Approach**
```typescript
function isToeplitzMatrix(matrix: number[][]): boolean {
    let numberOfRows = matrix.length;
    let numberOfColumns = matrix[0].length;

    for (let row = 0; row < numberOfRows - 1; row++) {
        for (let column = 0; column < numberOfColumns - 1; column++) {
            if (matrix[row][column] !== matrix[row + 1][column + 1]) {
                return false;
            }
        }
    }

    return true;
}
```
**🔹 Time Complexity:** `O(rows × columns)`  
**🔹 Space Complexity:** `O(1)`

---

### **2️⃣ Using a Hash Map**
```typescript
function isToeplitzMatrixUsingMap(matrix: number[][]): boolean {
    let diagonalMap = new Map<number, number>();

    for (let row = 0; row < matrix.length; row++) {
        for (let column = 0; column < matrix[0].length; column++) {
            let diagonalKey = row - column;

            if (!diagonalMap.has(diagonalKey)) {
                diagonalMap.set(diagonalKey, matrix[row][column]);
            } else if (diagonalMap.get(diagonalKey) !== matrix[row][column]) {
                return false;
            }
        }
    }

    return true;
}
```
**🔹 Time Complexity:** `O(rows × columns)`  
**🔹 Space Complexity:** `O(rows + columns)`

---

### **3️⃣ Memory Efficient Approach**
```typescript
function isToeplitzMatrixEfficient(matrix: number[][]): boolean {
    let previousRow = matrix[0];

    for (let row = 1; row < matrix.length; row++) {
        let currentRow = matrix[row];

        for (let column = 0; column < currentRow.length - 1; column++) {
            if (currentRow[column] !== previousRow[column + 1]) {
                return false;
            }
        }

        previousRow = currentRow; // Move to the next row
    }

    return true;
}
```
**🔹 Time Complexity:** `O(rows × columns)`  
**🔹 Space Complexity:** `O(columns)`

---

## **⏳ Time & Space Complexity Analysis**
| Approach | Time Complexity | Space Complexity | Notes |
|----------|---------------|-----------------|-------|
| **Brute Force** | `O(rows × columns)` | `O(1)` | Directly compares elements |
| **Hash Map** | `O(rows × columns)` | `O(rows + columns)` | Stores diagonal elements |
| **Memory Efficient** | `O(rows × columns)` | `O(columns)` | Uses minimal memory |

---

## **🚀 Best Practices & Edge Cases**
✅ **Edge Cases to Consider:**
1. **Matrix with one row or column:** Always Toeplitz.
2. **Matrix with identical numbers:** Always Toeplitz.
3. **Matrix with different diagonals:** Should return false.

✅ **Best Practices:**
- Use **memory-efficient approach** for very large matrices.
- Use **hash maps** for flexibility in checking large data.

---

## **📌 Conclusion & Further Enhancements**
- **Brute force** is simple but inefficient for large matrices.
- **Hash maps** provide an alternate way to track diagonals.
- **Memory-efficient approach** is best for large matrices on disk.

### **🔮 Further Enhancements**
- **Parallel Processing:** Process rows in parallel for faster results.
- **Lazy Loading:** Read rows only when needed instead of storing.

---

## **🎯 Summary**
1. **Toeplitz Matrix** means **all diagonals** have the **same numbers**.
2. We can check this using **direct comparison, hash maps, or memory-efficient methods**.
3. **Brute Force:** Simple but not scalable.
4. **Hash Map:** Efficient but uses extra space.
5. **Memory Efficient:** Best for **large data sets**.

---

I hope this helps you **understand Toeplitz matrices in a super simple way**! 😃 🚀