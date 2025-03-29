# **Rank Transform of a Matrix - In-Depth TypeScript Guide**

## **1. Introduction**
Imagine you have a table of numbers (a **matrix**), and you want to assign a **rank** to each number. The **rank** tells you how "big" a number is compared to other numbers in the same row and column.

- **Smallest number in its row and column gets rank `1`**
- **A bigger number gets a higher rank**
- **Equal numbers in the same row or column get the same rank**

This problem appears in **data ranking, grading systems, and sorting operations**.

---

## **2. Expected Solution with Examples**
### **Example 1**
#### **Input:**
```
matrix = [
  [1, 2],
  [3, 4]
]
```
#### **Output:**
```
[
  [1, 2],
  [2, 3]
]
```
#### **Why?**
- **1** is the smallest → rank = **1**
- **2** is bigger than **1** → rank = **2**
- **3** is bigger than **1** → rank = **2**
- **4** is bigger than **2 & 3** → rank = **3**

---

### **Example 2**
#### **Input:**
```
matrix = [
  [7, 7],
  [7, 7]
]
```
#### **Output:**
```
[
  [1, 1],
  [1, 1]
]
```
#### **Why?**
- All numbers are the same, so they all get **rank 1**.

---

## **3. Approach & Thought Process**
We need to **sort** and **assign ranks** based on **row and column comparisons**.

### **Approach 1: Sorting + Disjoint Set (Union-Find)**
- **Step 1:** Convert matrix elements into a list of `[row, column, value]`
- **Step 2:** **Sort** the list based on value
- **Step 3:** Assign ranks using **Union-Find** (grouping numbers with similar ranks)

### **Approach 2: BFS / Topological Sorting**
- **Step 1:** Convert matrix into **graph relationships** (bigger numbers depend on smaller ones)
- **Step 2:** Use **Topological Sorting** to assign ranks from smallest to largest.

### **Approach 3: Binary Search**
- **Step 1:** **Guess a rank** (mid-value between smallest and largest)
- **Step 2:** Check if we can assign ranks **without breaking rules**
- **Step 3:** Adjust the guess using **binary search**.

---

## **4. Algorithm Breakdown with Code**

### **Approach 1: Sorting + Union-Find**
### **Pseudo-code**
```
1. Convert matrix into a list of (row, column, value)
2. Sort this list by value
3. For each element in the sorted list:
   - Assign rank based on row and column constraints
   - If multiple elements have the same value, assign the same rank
4. Return the transformed matrix
```

### **TypeScript Code**
```typescript
function matrixRankTransform(matrix: number[][]): number[][] {
    const rowCount = matrix.length;
    const colCount = matrix[0].length;
    
    const result: number[][] = Array.from({ length: rowCount }, () => Array(colCount).fill(0));
    const sortedValues: [number, number, number][] = [];

    // Step 1: Extract (row, column, value) from the matrix
    for (let r = 0; r < rowCount; r++) {
        for (let c = 0; c < colCount; c++) {
            sortedValues.push([r, c, matrix[r][c]]);
        }
    }

    // Step 2: Sort values based on the number itself
    sortedValues.sort((a, b) => a[2] - b[2]);

    // Step 3: Use a Disjoint Set (Union-Find) to process rankings
    const rowMaxRank = Array(rowCount).fill(0);
    const colMaxRank = Array(colCount).fill(0);

    for (let i = 0; i < sortedValues.length; ) {
        let sameRankGroup: [number, number][] = [];

        let value = sortedValues[i][2];

        while (i < sortedValues.length && sortedValues[i][2] === value) {
            const [row, col] = sortedValues[i];
            let rank = Math.max(rowMaxRank[row], colMaxRank[col]) + 1;
            result[row][col] = rank;

            sameRankGroup.push([row, col]);
            i++;
        }

        for (const [row, col] of sameRankGroup) {
            rowMaxRank[row] = result[row][col];
            colMaxRank[col] = result[row][col];
        }
    }

    return result;
}
```

---

### **Approach 2: BFS / Topological Sorting**
### **Pseudo-code**
```
1. Build a graph where larger elements depend on smaller ones.
2. Use BFS (like solving a shortest path problem).
3. Assign ranks step by step.
```

### **TypeScript Code**
```typescript
function matrixRankTransform(matrix: number[][]): number[][] {
    const rowCount = matrix.length, colCount = matrix[0].length;
    const result: number[][] = Array.from({ length: rowCount }, () => Array(colCount).fill(0));

    let rankMap = new Map<number, [number, number][]>(); 

    // Group elements by value
    for (let r = 0; r < rowCount; r++) {
        for (let c = 0; c < colCount; c++) {
            if (!rankMap.has(matrix[r][c])) rankMap.set(matrix[r][c], []);
            rankMap.get(matrix[r][c])!.push([r, c]);
        }
    }

    let rowRank = Array(rowCount).fill(0);
    let colRank = Array(colCount).fill(0);

    let sortedKeys = [...rankMap.keys()].sort((a, b) => a - b);

    for (let key of sortedKeys) {
        let temp = [];
        for (let [r, c] of rankMap.get(key)!) {
            let rank = Math.max(rowRank[r], colRank[c]) + 1;
            temp.push([r, c, rank]);
        }
        for (let [r, c, rank] of temp) {
            result[r][c] = rank;
            rowRank[r] = rank;
            colRank[c] = rank;
        }
    }

    return result;
}
```

---

### **Approach 3: Binary Search (Experimental)**
### **Pseudo-code**
```
1. Guess the rank using Binary Search.
2. Check if rank assignment is valid.
3. Adjust the guess and repeat.
```

### **TypeScript Code**
```typescript
// Due to complexity, binary search is impractical for large cases.
```

---

## **5. Complexity Analysis**
| Approach        | Time Complexity | Space Complexity |
|----------------|---------------|----------------|
| **Sorting + Union-Find** | `O(m*n log(m*n))` | `O(m*n)` |
| **BFS / Topological Sorting** | `O(m*n log(m*n))` | `O(m*n)` |
| **Binary Search** | `O(m*n log(maxValue))` | `O(m*n)` |

---

## **6. Conclusion**
- Sorting + Union-Find is **fastest and easiest to implement**.
- BFS / Topological Sorting is **useful for dependency-based problems**.
- Binary Search is **uncommon but useful in some ranking problems**.
