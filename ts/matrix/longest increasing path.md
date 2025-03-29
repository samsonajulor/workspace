# **Finding the Longest Increasing Path in a Matrix (TypeScript)**

## **📝 Introduction**
Imagine you have a grid full of numbers. You want to find the longest path where each step moves to a bigger number, but you can only move **up, down, left, or right** (no diagonal moves!). 

For example:

```
[ 9,  9,  4 ]
[ 6,  6,  8 ]
[ 2,  1,  1 ]
```

The longest increasing path here is **[1 → 2 → 6 → 9]**, which has a length of **4**.

### **Real-Life Uses**
This problem is useful for:
- **Game AI** (finding the longest path in a game map).
- **Robotics** (navigating increasing terrain heights).
- **Data Analysis** (finding patterns in spreadsheets).

---

## **🔎 Understanding the Problem**
### **Example 1**
#### **Input:**
```typescript
matrix = [
  [9, 9, 4],
  [6, 6, 8],
  [2, 1, 1]
];
```

#### **Output:**
```typescript
4
```

#### **Explanation:**
```
Path:  1 → 2 → 6 → 9
```
- Start at **1** (bottom right).
- Move to **2** (up).
- Move to **6** (up).
- Move to **9** (up).
- No more moves! **Path length = 4**.

---

### **Example 2**
#### **Input:**
```typescript
matrix = [
  [3, 4, 5],
  [3, 2, 6],
  [2, 2, 1]
];
```

#### **Output:**
```typescript
4
```

#### **Explanation:**
```
Path: 3 → 4 → 5 → 6
```
- Start at **3** (top left).
- Move **right** to **4**.
- Move **right** to **5**.
- Move **down** to **6**.
- No more moves! **Path length = 4**.

---

## **💡 Approach 1: Recursive DFS (Brute Force)**
### **🌱 Idea**
- Start from **each** cell in the matrix.
- Try moving **up, down, left, and right**.
- Keep track of the **longest path** found.

### **📝 Pseudo Code**
```
function longestPath(matrix):
    longest = 0
    for each cell in matrix:
        longest = max(longest, dfs(cell))
    return longest

function dfs(cell):
    if already visited, return stored result
    for each direction (up, down, left, right):
        if move is valid and next cell > current cell:
            pathLength = 1 + dfs(next cell)
            store pathLength
    return longest found
```

---

### **🚀 TypeScript Code**
```typescript
function longestIncreasingPath(matrix: number[][]): number {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    function dfs(row: number, col: number, prevValue: number): number {
        if (row < 0 || row >= rows || col < 0 || col >= cols || matrix[row][col] <= prevValue) {
            return 0;
        }

        let maxPath = 1;
        for (const [dx, dy] of directions) {
            maxPath = Math.max(maxPath, 1 + dfs(row + dx, col + dy, matrix[row][col]));
        }
        return maxPath;
    }

    let longestPath = 0;
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            longestPath = Math.max(longestPath, dfs(row, col, -1));
        }
    }

    return longestPath;
}
```

### **🕒 Time Complexity**
- **O(4^(m×n))** (very slow for big matrices 😱).

---

## **💡 Approach 2: DFS with Memoization**
### **🌱 Idea**
- Store results of previous calculations.
- Use **dynamic programming** to avoid recalculating.

### **📝 Pseudo Code**
```
function longestPath(matrix):
    memo = empty storage
    longest = 0
    for each cell in matrix:
        longest = max(longest, dfs(cell, memo))
    return longest

function dfs(cell, memo):
    if already visited, return stored result
    for each direction:
        if move is valid and next cell > current cell:
            pathLength = 1 + dfs(next cell, memo)
            store pathLength
    memo[cell] = longest found
    return longest found
```

---

### **🚀 TypeScript Code**
```typescript
function longestIncreasingPath(matrix: number[][]): number {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const memo: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0));
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    function dfs(row: number, col: number): number {
        if (memo[row][col] !== 0) return memo[row][col];

        let maxPath = 1;
        for (const [dx, dy] of directions) {
            const newRow = row + dx, newCol = col + dy;
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && matrix[newRow][newCol] > matrix[row][col]) {
                maxPath = Math.max(maxPath, 1 + dfs(newRow, newCol));
            }
        }

        memo[row][col] = maxPath;
        return maxPath;
    }

    let longestPath = 0;
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            longestPath = Math.max(longestPath, dfs(row, col));
        }
    }

    return longestPath;
}
```

### **🕒 Time Complexity**
- **O(m × n)** (much faster! 🎉).

---

## **💡 Approach 3: Topological Sorting (BFS with In-degree)**
### **🌱 Idea**
- Treat the matrix as a **graph**.
- Use **BFS** to process smaller values first.
- Count how many paths depend on each cell.

### **📝 Pseudo Code**
```
function longestPath(matrix):
    in_degree = count incoming edges for each cell
    queue = all cells with in_degree == 0
    while queue is not empty:
        process each cell and reduce in-degree of neighbors
    return longest path found
```

---

### **🚀 TypeScript Code**
```typescript
function longestIncreasingPath(matrix: number[][]): number {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const inDegree = Array.from({ length: rows }, () => Array(cols).fill(0));
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    const queue: [number, number][] = [];

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            for (const [dx, dy] of directions) {
                const newRow = row + dx, newCol = col + dy;
                if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && matrix[newRow][newCol] > matrix[row][col]) {
                    inDegree[newRow][newCol]++;
                }
            }
        }
    }

    return 0; // Implement BFS logic
}
```

---

## **🏁 Conclusion**
- **Brute Force DFS** → **Slow** 😭.
- **Memoized DFS** → **Best for large matrices** 🎉.
- **Topological Sorting** → **Efficient for huge graphs** 🚀.
