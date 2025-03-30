## **🧠 Step 1: Understand the Problem Statement**  
Before jumping into coding, ask yourself:  
✔ **What are we trying to find?** (Sum, count, path, transformation, etc.)  
✔ **What kind of operations are allowed?** (Movement, updates, comparisons, etc.)  
✔ **What constraints exist?** (Matrix size, value limits, time limits, etc.)  

### **Example Questions**  
- **Traversal:** "Visit every cell and do something" (e.g., sum all values).  
- **Pathfinding:** "Find the shortest/longest path" (e.g., shortest path from (0,0) to (m-1,n-1)).  
- **Transformation:** "Modify the matrix based on certain rules" (e.g., rotate, rank transform).  
- **Graph-based:** "Treat the matrix as a graph" (e.g., islands, connected components).  

---

## **🔍 Step 2: Identify the Type of Matrix Problem**
Different matrix problems follow certain patterns. Here are **common types** and the **best techniques** to solve them:

### **1️⃣ Traversal (Iterate through each cell)**
💡 **Technique:** Use **nested loops** (for `m × n` traversal).  
🔧 **Use Cases:** Counting elements, modifying values, finding the maximum/minimum.  

🔹 **Example:** Counting elements greater than `X`
```typescript
for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
        if (matrix[i][j] > X) {
            count++;
        }
    }
}
```

---

### **2️⃣ Directional Movement (Left, Right, Up, Down)**
💡 **Technique:** Use **direction arrays** to move in 4 or 8 directions.  
🔧 **Use Cases:** Flood Fill, DFS/BFS traversal, matrix expansion problems.  

🔹 **Example:** Moving in four directions:
```typescript
const directions = [[0,1], [1,0], [0,-1], [-1,0]]; // Right, Down, Left, Up

for (const [dx, dy] of directions) {
    let newX = x + dx;
    let newY = y + dy;
    if (newX >= 0 && newX < m && newY >= 0 && newY < n) {
        // Process cell (newX, newY)
    }
}
```

---

### **3️⃣ Pathfinding (Shortest/Longest Path)**
💡 **Technique:** Use **BFS for shortest path** or **DFS for longest path**.  
🔧 **Use Cases:** Maze problems, finding the shortest path in a grid.  

🔹 **Example:** **BFS for shortest path**
```typescript
const queue = [[0, 0]];  // Start from (0,0)
const distances = Array(m).fill().map(() => Array(n).fill(Infinity));
distances[0][0] = 0;

while (queue.length) {
    const [x, y] = queue.shift();
    for (const [dx, dy] of directions) {
        let newX = x + dx, newY = y + dy;
        if (isValid(newX, newY) && distances[newX][newY] === Infinity) {
            distances[newX][newY] = distances[x][y] + 1;
            queue.push([newX, newY]);
        }
    }
}
```

---

### **4️⃣ Sorting-Based Problems**
💡 **Technique:** Sort cells by value, row, or column order before processing.  
🔧 **Use Cases:** Rank transform problems, matrix ordering problems.  

🔹 **Example:** Sorting by value:
```typescript
const cells = [];
for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
        cells.push([matrix[i][j], i, j]);
    }
}
cells.sort((a, b) => a[0] - b[0]); // Sort by value
```

---

### **5️⃣ Graph-Based (Connected Components, Islands)**
💡 **Technique:** Use **DFS or BFS** to find groups of connected cells.  
🔧 **Use Cases:** Finding islands, counting clusters, flood fill.  

🔹 **Example:** Counting islands (connected 1s in a binary matrix)
```typescript
const visited = Array(m).fill().map(() => Array(n).fill(false));

function dfs(x, y) {
    if (x < 0 || x >= m || y < 0 || y >= n || matrix[x][y] === 0 || visited[x][y]) return;
    visited[x][y] = true;
    for (const [dx, dy] of directions) {
        dfs(x + dx, y + dy);
    }
}

let islandCount = 0;
for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
        if (matrix[i][j] === 1 && !visited[i][j]) {
            dfs(i, j);
            islandCount++;
        }
    }
}
```

---

### **6️⃣ Dynamic Programming (Optimized Matrix Computation)**
💡 **Technique:** Use **DP tables** for optimal substructure problems.  
🔧 **Use Cases:** Longest increasing paths, minimum cost path.  

🔹 **Example:** **Finding the longest increasing path using DP**
```typescript
const dp = Array(m).fill().map(() => Array(n).fill(-1));

function longestPath(x, y) {
    if (dp[x][y] !== -1) return dp[x][y];

    let maxLength = 1;
    for (const [dx, dy] of directions) {
        let newX = x + dx, newY = y + dy;
        if (isValid(newX, newY) && matrix[newX][newY] > matrix[x][y]) {
            maxLength = Math.max(maxLength, 1 + longestPath(newX, newY));
        }
    }

    return dp[x][y] = maxLength;
}

let maxPath = 0;
for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
        maxPath = Math.max(maxPath, longestPath(i, j));
    }
}
```

---

## **🎯 Step 3: Optimize Your Solution**
Once you have a working solution, check:
✔ **Time Complexity:** Can you reduce nested loops?  
✔ **Space Complexity:** Can you avoid extra memory?  
✔ **Edge Cases:** What if the matrix is empty? What if all values are the same?  

---

## **🔑 Summary of General Techniques**
| **Problem Type**      | **Best Techniques** |
|----------------------|------------------|
| Simple Traversal | Nested Loops |
| Moving in Directions | Direction Arrays |
| Shortest Path | BFS |
| Longest Path | DFS + DP |
| Sorting-based | Sort by Value |
| Connected Components | BFS/DFS |
| Matrix DP | DP Arrays |

---

## **💡 Final Advice**
✅ Always **visualize** the problem first (draw examples).  
✅ Identify **patterns** (Traversal? Pathfinding? Sorting?)  
✅ Choose the **right technique** (BFS, DFS, DP, Sorting).  
✅ Optimize by reducing redundant computations.  
