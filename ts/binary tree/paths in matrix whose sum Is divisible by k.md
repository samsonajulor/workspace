# **📝 Beginner-Friendly TypeScript Guide: Paths in a Matrix Whose Sum Is Divisible by K**
## **🔹 Problem Breakdown (Explain Like I’m 5)**
Imagine you're in a video game where:  
✅ You **start at the top-left** of a board.  
✅ You can only move **right or down**.  
✅ Every tile you step on has **a number**.  
✅ When you reach the bottom-right corner, you **add up all the numbers** on your path.  
✅ If the **total sum** is **divisible by K**, you **win**! 🎉  

Your **goal** is to count how many different ways you can win.

---

## **🔹 Three Ways to Solve This Problem**
### **Approach 1: Try All Possible Paths (Brute Force)**
- We move **right** or **down** at each step.  
- We **sum up numbers** and check if it’s **divisible by K** at the end.  
- This is **very slow** because we try **every single possible path**.  

### **Approach 2: Memoization (Save Results for Reuse)**
- Instead of recalculating the sum for every path, we **store results**.  
- When we reach the **same position with the same sum remainder**, we **reuse** the result.  

### **Approach 3: Dynamic Programming (Fastest Method)**
- We **precompute** results for all positions and reuse them.  
- Instead of recursion, we use **tables** to store intermediate results.  
- This makes it the **fastest solution**.

---

## **🔹 Example 1: Large Grid with Different Paths**
### **Grid Example**
```
[
  [ 5, 1, 7 ],
  [ 3, 6, 2 ],
  [ 8, 4, 9 ]
]
```
### **K = 4**
### **All Possible Paths**
| Path Taken                | Sum | Divisible by 4? |
|---------------------------|-----|----------------|
| **5 → 1 → 7 → 2 → 9**    | 24  | ✅ Yes        |
| **5 → 1 → 7 → 6 → 9**    | 28  | ✅ Yes        |
| **5 → 3 → 6 → 2 → 9**    | 25  | ❌ No        |
| **5 → 3 → 6 → 4 → 9**    | 27  | ❌ No        |
| **5 → 3 → 8 → 4 → 9**    | 29  | ❌ No        |

### **Total Winning Paths = 2**

---

## **🔹 Approach 1: Brute Force (Recursive Solution)**
### **Pseudo-code Explanation**
1. Start at the **top-left** corner.  
2. Move **right** or **down** at each step.  
3. Keep track of the **sum** along the path.  
4. If we reach the **bottom-right** and sum is **divisible by K**, count the path.  
5. Try every possible path.

### **Code**
```typescript
function countPathsBruteForce(grid: number[][], k: number): number {
    const rowCount = grid.length;
    const colCount = grid[0].length;

    function findPaths(x: number, y: number, sum: number): number {
        if (x >= rowCount || y >= colCount) return 0; // Out of bounds
        sum += grid[x][y];

        if (x === rowCount - 1 && y === colCount - 1) {
            return sum % k === 0 ? 1 : 0;
        }

        return findPaths(x + 1, y, sum) + findPaths(x, y + 1, sum);
    }

    return findPaths(0, 0, 0);
}
```
### **⏳ Why This is Too Slow**
- If the grid is **very large**, it **tries too many paths**.
- **Exponential Time Complexity**: **O(2^(rows + cols))**.

---

## **🔹 Approach 2: Memoization (Optimized Recursion)**
### **Optimization Idea**
- Instead of recalculating for the same **position and sum remainder**, **store results**.
- If we reach a **previously visited cell with the same sum remainder**, we **reuse** the result.

### **Code**
```typescript
function countPathsMemo(grid: number[][], k: number): number {
    const rowCount = grid.length;
    const colCount = grid[0].length;
    const memo = new Map<string, number>();

    function findPaths(x: number, y: number, sum: number): number {
        if (x >= rowCount || y >= colCount) return 0;
        sum += grid[x][y];

        if (x === rowCount - 1 && y === colCount - 1) {
            return sum % k === 0 ? 1 : 0;
        }

        const key = `${x},${y},${sum % k}`;
        if (memo.has(key)) return memo.get(key)!;

        const totalPaths = findPaths(x + 1, y, sum) + findPaths(x, y + 1, sum);
        memo.set(key, totalPaths);
        return totalPaths;
    }

    return findPaths(0, 0, 0);
}
```
### **⏳ Why This is Faster**
- **Stores** results for repeated states.
- **Time Complexity**: **O(rows × cols × k)** (much better).

---

## **🔹 Approach 3: Dynamic Programming (Fastest)**
### **Optimization Idea**
- Use **a table** to store **all possible ways to reach each cell**.
- Avoid recursion completely.
- Update **each cell** based on previous results.

### **Code**
```typescript
function countPathsDP(grid: number[][], k: number): number {
    const MODULO = 1e9 + 7;
    const rowCount = grid.length;
    const colCount = grid[0].length;

    // Create a DP array
    const dp: number[][][] = Array.from({ length: rowCount }, () =>
        Array.from({ length: colCount }, () => new Array(k).fill(0))
    );

    dp[0][0][grid[0][0] % k] = 1; // Start at top-left

    for (let row = 0; row < rowCount; row++) {
        for (let col = 0; col < colCount; col++) {
            for (let remainder = 0; remainder < k; remainder++) {
                if (dp[row][col][remainder] > 0) {
                    const newRemainder = (remainder + grid[row][col]) % k;

                    // Move Down
                    if (row + 1 < rowCount) {
                        dp[row + 1][col][newRemainder] = 
                          (dp[row + 1][col][newRemainder] + dp[row][col][remainder]) % MODULO;
                    }

                    // Move Right
                    if (col + 1 < colCount) {
                        dp[row][col + 1][newRemainder] = 
                          (dp[row][col + 1][newRemainder] + dp[row][col][remainder]) % MODULO;
                    }
                }
            }
        }
    }

    return dp[rowCount - 1][colCount - 1][0]; // Paths where sum % k == 0
}
```
### **⏳ Why This is the Best**
- **Avoids recursion completely**.
- **Uses dynamic programming** to **reuse** calculations.
- **Time Complexity**: **O(rows × cols × k) → Very Fast**.

---

## **💡 Summary**
| Approach | Time Complexity | Space Complexity | Speed |
|----------|---------------|----------------|-------|
| **Brute Force (Recursion)** | **O(2^(rows + cols))** | **O(rows + cols)** | ❌ **Too Slow** |
| **Memoization (Optimized Recursion)** | **O(rows × cols × k)** | **O(rows × cols × k)** | ✅ **Much Faster** |
| **Dynamic Programming (Best Approach)** | **O(rows × cols × k)** | **O(rows × cols × k)** | 🚀 **Fastest** |

**🚀 Use Dynamic Programming for the Best Performance!** 🚀


# **📚 In-Depth TypeScript Explanation: Paths in a Matrix Whose Sum Is Divisible by K**  
This guide will **break down every piece of syntax** used in the **three solutions** to help you understand **why it was used**. I will go step by step, explaining each part of the code in detail. 🚀  

---

## **🔹 Approach 1: Brute Force (Recursive Solution)**
### **Full Code**
```typescript
function countPathsBruteForce(grid: number[][], k: number): number {
    const rowCount = grid.length;
    const colCount = grid[0].length;

    function findPaths(x: number, y: number, sum: number): number {
        if (x >= rowCount || y >= colCount) return 0; // Out of bounds
        sum += grid[x][y];

        if (x === rowCount - 1 && y === colCount - 1) {
            return sum % k === 0 ? 1 : 0;
        }

        return findPaths(x + 1, y, sum) + findPaths(x, y + 1, sum);
    }

    return findPaths(0, 0, 0);
}
```

---

### **🔍 Explanation of Each Syntax**
#### **1️⃣ Function Definition**
```typescript
function countPathsBruteForce(grid: number[][], k: number): number
```
- **`function`** → Declares a new function.
- **`countPathsBruteForce`** → The name of our function.
- **`(grid: number[][], k: number)`** →  
  - **`grid`** is a **2D array of numbers (`number[][]`)** that represents the matrix.  
  - **`k`** is a **single number** that we check divisibility against.
- **`: number`** → This means the function **returns a number** (total number of valid paths).

---

#### **2️⃣ Getting Grid Dimensions**
```typescript
const rowCount = grid.length;
const colCount = grid[0].length;
```
- **`const`** → Declares a constant variable.
- **`rowCount = grid.length;`** → The **number of rows** in the matrix.
- **`colCount = grid[0].length;`** → The **number of columns** in the matrix.

---

#### **3️⃣ Recursive Helper Function**
```typescript
function findPaths(x: number, y: number, sum: number): number
```
- **`function findPaths(x: number, y: number, sum: number)`** →  
  - **`x` and `y`** → Current position in the matrix.
  - **`sum`** → Keeps track of the total sum of the path.
- **`: number`** → Returns a number (valid paths count).

---

#### **4️⃣ Base Case (Stop When Out of Bounds)**
```typescript
if (x >= rowCount || y >= colCount) return 0;
```
- **If `x` (row index) is greater than rowCount** OR **`y` (column index) is greater than colCount**, return **0** (invalid path).

---

#### **5️⃣ Add Current Cell’s Value to Sum**
```typescript
sum += grid[x][y];
```
- Add the **current cell’s value** to `sum`.

---

#### **6️⃣ Check if We Reached the Bottom-Right Corner**
```typescript
if (x === rowCount - 1 && y === colCount - 1) {
    return sum % k === 0 ? 1 : 0;
}
```
- If we reached the **bottom-right corner**, check:
  - **`sum % k === 0`** → If divisible by `k`, return `1` (valid path).
  - Else, return `0`.

---

#### **7️⃣ Recursive Calls (Move Down or Right)**
```typescript
return findPaths(x + 1, y, sum) + findPaths(x, y + 1, sum);
```
- **Move Down (`x + 1, y`)**.
- **Move Right (`x, y + 1`)**.
- **Sum up all valid paths**.

---

### **🔍 Why is This Solution Slow?**
- **No caching or reuse** → It recomputes paths multiple times.
- **Exponential Time Complexity** → `O(2^(rows + cols))`.

---

## **🔹 Approach 2: Memoization (Optimized Recursion)**
### **Full Code**
```typescript
function countPathsMemo(grid: number[][], k: number): number {
    const rowCount = grid.length;
    const colCount = grid[0].length;
    const memo = new Map<string, number>();

    function findPaths(x: number, y: number, sum: number): number {
        if (x >= rowCount || y >= colCount) return 0;
        sum += grid[x][y];

        if (x === rowCount - 1 && y === colCount - 1) {
            return sum % k === 0 ? 1 : 0;
        }

        const key = `${x},${y},${sum % k}`;
        if (memo.has(key)) return memo.get(key)!;

        const totalPaths = findPaths(x + 1, y, sum) + findPaths(x, y + 1, sum);
        memo.set(key, totalPaths);
        return totalPaths;
    }

    return findPaths(0, 0, 0);
}
```

---

### **🔍 Explanation of New Syntax**
#### **1️⃣ Memoization Map**
```typescript
const memo = new Map<string, number>();
```
- **`Map<string, number>`** → Stores previously computed results.  
- The **key** is a **string representation of `x, y, sum % k`**.  
- The **value** is the **number of valid paths** from that position.

---

#### **2️⃣ Checking if Result is Already Cached**
```typescript
const key = `${x},${y},${sum % k}`;
if (memo.has(key)) return memo.get(key)!;
```
- **`memo.has(key)`** → Checks if the result is already computed.
- **`memo.get(key)!`** → Retrieves and returns the cached value.

---

#### **3️⃣ Store the Result in the Memoization Map**
```typescript
memo.set(key, totalPaths);
```
- **Saves the result** to avoid recalculations.

---

### **🔍 Why is This Solution Faster?**
- **Time Complexity: O(rows × cols × k)** → Much better than brute force.

---

## **🔹 Approach 3: Dynamic Programming (Fastest)**
### **Full Code**
```typescript
function countPathsDP(grid: number[][], k: number): number {
    const MODULO = 1e9 + 7;
    const rowCount = grid.length;
    const colCount = grid[0].length;

    const dp: number[][][] = Array.from({ length: rowCount }, () =>
        Array.from({ length: colCount }, () => new Array(k).fill(0))
    );

    dp[0][0][grid[0][0] % k] = 1;

    for (let row = 0; row < rowCount; row++) {
        for (let col = 0; col < colCount; col++) {
            for (let remainder = 0; remainder < k; remainder++) {
                if (dp[row][col][remainder] > 0) {
                    const newRemainder = (remainder + grid[row][col]) % k;

                    if (row + 1 < rowCount) {
                        dp[row + 1][col][newRemainder] = 
                          (dp[row + 1][col][newRemainder] + dp[row][col][remainder]) % MODULO;
                    }

                    if (col + 1 < colCount) {
                        dp[row][col + 1][newRemainder] = 
                          (dp[row][col + 1][newRemainder] + dp[row][col][remainder]) % MODULO;
                    }
                }
            }
        }
    }

    return dp[rowCount - 1][colCount - 1][0];
}
```

---

### **🔍 Explanation of New Syntax**
#### **1️⃣ 3D DP Array**
```typescript
const dp: number[][][] = Array.from({ length: rowCount }, () =>
    Array.from({ length: colCount }, () => new Array(k).fill(0))
);
```
- **Stores paths for each remainder** at each cell.

---

### **🔍 Why is This the Best Solution?**
- **Avoids recursion completely**.
- **Runs in `O(rows × cols × k)` → Fastest possible**.

---

🚀 **Final Advice**: Use **Dynamic Programming** for the best performance! 🚀