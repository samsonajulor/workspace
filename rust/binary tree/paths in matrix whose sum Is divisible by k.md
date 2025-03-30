# **Rust Technical Documentation: Paths in Matrix Whose Sum Is Divisible by K**

## **Problem Breakdown (Like You're Five)**  
Imagine you have a grid full of numbers. You can start at the top-left corner and move **only right or down** until you reach the bottom-right corner.  

Now, for every path you take, you add up the numbers along the way. If the sum of these numbers is **divisible by K**, you count that path.  

Your goal is to count all such paths and return the result.

---

## **Understanding the Problem with Examples**
### **Example 1**
#### **Input**
```plaintext
grid = [[5, 2, 4], 
        [3, 0, 5], 
        [0, 7, 2]], k = 3
```
#### **All Paths**
1. **Path:** `5 → 2 → 4 → 5 → 2` → Sum = `18`, **divisible by 3** ✅  
2. **Path:** `5 → 3 → 0 → 5 → 2` → Sum = `15`, **divisible by 3** ✅  
**Output:** `2`

---

### **Example 2**
#### **Input**
```plaintext
grid = [[7, 3, 4, 9], 
        [2, 3, 6, 2], 
        [2, 3, 7, 0]], k = 1
```
#### **All Paths are valid**  
Since every number is **divisible by 1**, all **10 possible paths** work.  
**Output:** `10`

---

### **Example 3**
#### **Input**
```plaintext
grid = [[8, 2, 3], 
        [5, 1, 7], 
        [4, 6, 9]], k = 4
```
#### **Valid Paths**
1. **Path:** `8 → 2 → 3 → 7 → 9` → Sum = `29`, not divisible ❌  
2. **Path:** `8 → 5 → 1 → 7 → 9` → Sum = `30`, **divisible by 4** ✅  
3. **Path:** `8 → 2 → 3 → 6 → 9` → Sum = `28`, **divisible by 4** ✅  
**Output:** `2`

---

## **Approach: Dynamic Programming (DP)**
Since we can move **only right or down**, we can use **dynamic programming** to store partial results and avoid recalculating paths.

### **Key Observations**
- Since `grid[i][j]` can be up to `100`, the sum of the path can be **large**, but we only care about **remainders when divided by K**.
- Instead of storing **full sums**, store **only the remainder** when divided by `K`.
- Use a **3D DP table** where:
  - `dp[i][j][r]` represents the number of ways to reach `(i, j)` with sum remainder `r`.

---

## **Three Efficient Rust Solutions**

### **Solution 1: Recursive DFS + Memoization (Top-Down)**
#### **Pseudo-Code**
1. Define a recursive function to explore all paths.
2. Keep track of the sum **modulo K** to avoid large numbers.
3. Use memoization to avoid recomputation.

```rust
use std::collections::HashMap;

impl Solution {
    pub fn number_of_paths(grid: Vec<Vec<i32>>, k: i32) -> i32 {
        const MOD: i32 = 1_000_000_007;
        let mut memo = HashMap::new();
        
        fn dfs(
            grid: &Vec<Vec<i32>>, 
            r: usize, 
            c: usize, 
            sum_mod_k: i32, 
            k: i32, 
            memo: &mut HashMap<(usize, usize, i32), i32>
        ) -> i32 {
            if r >= grid.len() || c >= grid[0].len() {
                return 0;
            }
            
            let new_mod = (sum_mod_k + grid[r][c]) % k;
            if r == grid.len() - 1 && c == grid[0].len() - 1 {
                return if new_mod == 0 { 1 } else { 0 };
            }

            if let Some(&res) = memo.get(&(r, c, new_mod)) {
                return res;
            }
            
            let down = dfs(grid, r + 1, c, new_mod, k, memo);
            let right = dfs(grid, r, c + 1, new_mod, k, memo);
            
            let res = (down + right) % MOD;
            memo.insert((r, c, new_mod), res);
            res
        }

        dfs(&grid, 0, 0, 0, k, &mut memo)
    }
}
```
✅ **Good for small grids, avoids recomputation**  
❌ **Slow for large grids** (recursive depth can get high)

---

### **Solution 2: Bottom-Up Dynamic Programming**
#### **Pseudo-Code**
1. Use a **3D DP table**: `dp[i][j][r]` stores the count of paths ending at `(i, j)` with sum remainder `r`.
2. Start with `dp[0][0][grid[0][0] % k] = 1`.
3. Fill DP table by moving **right** and **down**.

```rust
impl Solution {
    pub fn number_of_paths(grid: Vec<Vec<i32>>, k: i32) -> i32 {
        const MOD: i32 = 1_000_000_007;
        let (m, n) = (grid.len(), grid[0].len());
        let k = k as usize;
        let mut dp = vec![vec![vec![0; k]; n]; m];
        
        dp[0][0][(grid[0][0] % k as i32) as usize] = 1;

        for i in 0..m {
            for j in 0..n {
                for r in 0..k {
                    let ways = dp[i][j][r];
                    if ways == 0 { continue; }

                    if i + 1 < m {
                        let new_r = ((r as i32 + grid[i + 1][j]) % k as i32) as usize;
                        dp[i + 1][j][new_r] = (dp[i + 1][j][new_r] + ways) % MOD;
                    }
                    if j + 1 < n {
                        let new_r = ((r as i32 + grid[i][j + 1]) % k as i32) as usize;
                        dp[i][j + 1][new_r] = (dp[i][j + 1][new_r] + ways) % MOD;
                    }
                }
            }
        }
        
        dp[m - 1][n - 1][0]
    }
}
```
✅ **Faster than recursion**  
❌ **Uses extra memory**

---

### **Solution 3: Optimized 2D DP (Space-Optimized)**
#### **Pseudo-Code**
1. Instead of a **3D table**, use a **2D rolling DP table**.
2. Reduce space by using only the last row’s values.

```rust
impl Solution {
    pub fn number_of_paths(grid: Vec<Vec<i32>>, k: i32) -> i32 {
        const MODULO: i32 = 1_000_000_007;
        let (m, n) = (grid.len(), grid[0].len());
        let k = k as usize;
        let mut dp = vec![vec![0; k]; n];

        dp[0][grid[0][0] as usize % k] = 1;

        for i in 0..m {
            let mut new_dp = vec![vec![0; k]; n];
            for j in 0..n {
                for r in 0..k {
                    if dp[j][r] == 0 { continue; }

                    let val = grid[i][j] as usize;
                    let new_r = (r + val) % k;

                    if i + 1 < m {
                        new_dp[j][new_r] = (new_dp[j][new_r] + dp[j][r]) % MODULO;
                    }
                    if j + 1 < n {
                        dp[j + 1][new_r] = (dp[j + 1][new_r] + dp[j][r]) % MODULO;
                    }
                }
            }
            dp = new_dp;
        }
        
        dp[n - 1][0]
    }
}
```
✅ **Fastest & uses least memory**  
✅ **Avoids recursion overhead**  



# **Rust Technical Documentation: Paths in Matrix Whose Sum Is Divisible by K**  

## **👶 Understanding the Problem (Like You're Five)**  

Imagine you have a big **chessboard** (a grid). Each square has a **number** on it.  

🟢 You start at the **top-left** corner (first square).  
🔵 You can **only move right** ➡️ or **down** ⬇️.  
🎯 You must reach the **bottom-right** corner (last square).  

For every path you take, you **add up the numbers** along the way.  

👉 If the total sum of numbers is **divisible by K**, we count it as a **good path** ✅  

Your job is to **count all the good paths** and return the number.  

---

## **💡 Example Walkthrough**
### **Example 1**
#### **Input**
```plaintext
grid = [[5, 2, 4], 
        [3, 0, 5], 
        [0, 7, 2]], k = 3
```
#### **Possible Paths**
1. **Path:** `5 → 2 → 4 → 5 → 2` → Sum = `18`, ✅ Divisible by 3  
2. **Path:** `5 → 3 → 0 → 5 → 2` → Sum = `15`, ✅ Divisible by 3  

🎯 **Output:** `2` good paths.

---

## **🛠️ Three Ways to Solve It**
### **Solution 1: Recursive DFS + Memoization**
#### **📝 Pseudo-Code**
1. Start at the top-left corner `(0,0)`.
2. Try moving **right** and **down**.
3. Keep track of the **sum of numbers**.
4. If you reach the last cell and the sum **is divisible by K**, count it ✅.
5. Use a **cache (memoization)** to store already computed paths to avoid repetition.

#### **🦀 Rust Code**
```rust
use std::collections::HashMap;

impl Solution {
    pub fn number_of_paths(grid: Vec<Vec<i32>>, k: i32) -> i32 {
        const MOD: i32 = 1_000_000_007;
        let mut memo = HashMap::new();
        
        fn dfs(
            grid: &Vec<Vec<i32>>, 
            r: usize, 
            c: usize, 
            sum_mod_k: i32, 
            k: i32, 
            memo: &mut HashMap<(usize, usize, i32), i32>
        ) -> i32 {
            if r >= grid.len() || c >= grid[0].len() {
                return 0;
            }
            
            let new_mod = (sum_mod_k + grid[r][c]) % k;
            if r == grid.len() - 1 && c == grid[0].len() - 1 {
                return if new_mod == 0 { 1 } else { 0 };
            }

            if let Some(&res) = memo.get(&(r, c, new_mod)) {
                return res;
            }
            
            let down = dfs(grid, r + 1, c, new_mod, k, memo);
            let right = dfs(grid, r, c + 1, new_mod, k, memo);
            
            let res = (down + right) % MOD;
            memo.insert((r, c, new_mod), res);
            res
        }

        dfs(&grid, 0, 0, 0, k, &mut memo)
    }
}
```
✅ **Good for small grids**  
❌ **Too slow for large grids**  

---

### **Solution 2: Bottom-Up Dynamic Programming**
#### **📝 Pseudo-Code**
1. Use a **3D DP table**: `dp[i][j][r]` stores the count of paths ending at `(i, j)` with sum remainder `r`.
2. Start with `dp[0][0][grid[0][0] % k] = 1`.
3. Fill DP table by moving **right** and **down**.

#### **🦀 Rust Code**
```rust
impl Solution {
    pub fn number_of_paths(grid: Vec<Vec<i32>>, k: i32) -> i32 {
        const MOD: i32 = 1_000_000_007;
        let (m, n) = (grid.len(), grid[0].len());
        let k = k as usize;
        let mut dp = vec![vec![vec![0; k]; n]; m];
        
        dp[0][0][(grid[0][0] % k as i32) as usize] = 1;

        for i in 0..m {
            for j in 0..n {
                for r in 0..k {
                    let ways = dp[i][j][r];
                    if ways == 0 { continue; }

                    if i + 1 < m {
                        let new_r = ((r as i32 + grid[i + 1][j]) % k as i32) as usize;
                        dp[i + 1][j][new_r] = (dp[i + 1][j][new_r] + ways) % MOD;
                    }
                    if j + 1 < n {
                        let new_r = ((r as i32 + grid[i][j + 1]) % k as i32) as usize;
                        dp[i][j + 1][new_r] = (dp[i][j + 1][new_r] + ways) % MOD;
                    }
                }
            }
        }
        
        dp[m - 1][n - 1][0]
    }
}
```
✅ **Faster than recursion**  
❌ **Uses extra memory**  

---

### **Solution 3: Optimized 2D DP (Space-Optimized)**
#### **📝 Pseudo-Code**
1. Instead of a **3D table**, use a **2D rolling DP table**.
2. Reduce space by using only the last row’s values.

#### **🦀 Rust Code**
```rust
impl Solution {
    pub fn number_of_paths(grid: Vec<Vec<i32>>, k: i32) -> i32 {
        const MODULO: i32 = 1_000_000_007;
        let (m, n) = (grid.len(), grid[0].len());
        let k = k as usize;
        let mut dp = vec![vec![0; k]; n];

        dp[0][grid[0][0] as usize % k] = 1;

        for i in 0..m {
            let mut new_dp = vec![vec![0; k]; n];
            for j in 0..n {
                for r in 0..k {
                    if dp[j][r] == 0 { continue; }

                    let val = grid[i][j] as usize;
                    let new_r = (r + val) % k;

                    if i + 1 < m {
                        new_dp[j][new_r] = (new_dp[j][new_r] + dp[j][r]) % MODULO;
                    }
                    if j + 1 < n {
                        dp[j + 1][new_r] = (dp[j + 1][new_r] + dp[j][r]) % MODULO;
                    }
                }
            }
            dp = new_dp;
        }
        
        dp[n - 1][0]
    }
}
```
✅ **Fastest & uses least memory**  
✅ **Avoids recursion overhead**  

---

## **🏆 Which Solution is Best?**
| Solution | Time Complexity | Space Complexity | Best For |
|----------|---------------|-----------------|----------|
| **Recursive DFS + Memoization** | **O(2^(m+n))** | O(m \* n \* k) | **Small Grids** |
| **3D DP Table** | **O(m \* n \* k)** | O(m \* n \* k) | **Medium Grids** |
| **2D Space-Optimized DP** | **O(m \* n \* k)** | **O(n \* k)** | **Best for Large Grids** |

---

## **🎯 Final Thoughts**
- **For small grids**, recursion with memoization is fine.  
- **For large grids**, use **2D DP** (fastest & least memory).  

Hope this helps! 🚀

### **Rust Syntax Breakdown: Fastest Solution for "Paths in Matrix Whose Sum Is Divisible by K"**  
---
### **Final Optimized Solution:**
```rust
impl Solution {
    pub fn number_of_paths(grid: Vec<Vec<i32>>, k: i32) -> i32 {
        const MODULO: i32 = 1_000_000_007; // Prevents overflow issues
        let (m, n) = (grid.len(), grid[0].len()); // Get matrix dimensions
        let k = k as usize; // Convert k to usize for indexing
        let mut dp = vec![vec![0; k]; n]; // Initialize DP table (2D)

        dp[0][grid[0][0] as usize % k] = 1; // Start point

        for i in 0..m {
            let mut new_dp = vec![vec![0; k]; n]; // New DP table for next row
            for j in 0..n {
                for r in 0..k {
                    if dp[j][r] == 0 { continue; } // Skip if no valid path

                    let val = grid[i][j] as usize; // Convert cell value to usize
                    let new_r = (r + val) % k; // Compute new remainder

                    if i + 1 < m {
                        new_dp[j][new_r] = (new_dp[j][new_r] + dp[j][r]) % MODULO;
                    }
                    if j + 1 < n {
                        dp[j + 1][new_r] = (dp[j + 1][new_r] + dp[j][r]) % MODULO;
                    }
                }
            }
            dp = new_dp; // Move to next row
        }
        
        dp[n - 1][0] // Return count of valid paths at bottom-right
    }
}
```
---

## **🔍 Breaking Down Each Line**
### **1️⃣ Function Signature**
```rust
pub fn number_of_paths(grid: Vec<Vec<i32>>, k: i32) -> i32
```
- `pub fn`: Defines a **public function** named `number_of_paths`.
- `grid: Vec<Vec<i32>>`: Takes a **2D vector (`Vec<Vec<i32>>`)** representing the matrix.
- `k: i32`: A single integer `k` representing the divisor.
- `-> i32`: The function **returns an integer**, which is the count of valid paths.

---

### **2️⃣ Constants**
```rust
const MODULO: i32 = 1_000_000_007;
```
- **Why?**  
  - Since path counts can be large, we use **modulo** to avoid integer overflow.
  - `MODULO = 1_000_000_007` is a prime number commonly used for **modulo operations**.

---

### **3️⃣ Get Matrix Dimensions**
```rust
let (m, n) = (grid.len(), grid[0].len());
```
- `grid.len()`: Gets the **number of rows** (`m`).
- `grid[0].len()`: Gets the **number of columns** (`n`).
- We store them in `(m, n)` for easy access.

---

### **4️⃣ Convert `k` to `usize`**
```rust
let k = k as usize;
```
- **Why?**  
  - `k` is an **integer (`i32`)**, but we need it as a **usize** for indexing arrays.
  - This avoids type mismatches when using `k` in vectors.

---

### **5️⃣ Initialize 2D DP Table**
```rust
let mut dp = vec![vec![0; k]; n];
```
- **Creates a 2D vector (`dp`)** of size `[n][k]`, all initialized to `0`.
- `vec![0; k]` → Creates a **vector of length `k`** with all zeros.
- `vec![vec![0; k]; n]` → Creates **`n` such vectors** (one per column).

---

### **6️⃣ Set the Starting Position**
```rust
dp[0][grid[0][0] as usize % k] = 1;
```
- `grid[0][0] as usize % k` → Computes **remainder of the first cell**.
- **Why?**
  - If the first cell is already divisible by `k`, we start with `1` valid path.

---

### **7️⃣ Iterate Through Each Cell in the Matrix**
```rust
for i in 0..m { 
    let mut new_dp = vec![vec![0; k]; n]; // Create new DP table for the next row
    for j in 0..n {
```
- Loops through each **row (`i`)** and **column (`j`)**.
- **Why create `new_dp`?**
  - We only need the **previous row's** DP state, so we reuse memory.

---

### **8️⃣ Process Each Remainder**
```rust
for r in 0..k {
    if dp[j][r] == 0 { continue; } // Skip empty cells
```
- Loops through all **remainders (`r`)** from `0` to `k-1`.
- If `dp[j][r] == 0`, it means there’s **no valid path ending here**, so we skip.

---

### **9️⃣ Compute New Remainder**
```rust
let val = grid[i][j] as usize; 
let new_r = (r + val) % k;
```
- `val = grid[i][j] as usize` → Get current cell value.
- `new_r = (r + val) % k` → Compute the **new remainder** if we include this cell.

---

### **🔟 Update Paths for Right and Down Moves**
```rust
if i + 1 < m {
    new_dp[j][new_r] = (new_dp[j][new_r] + dp[j][r]) % MODULO;
}
if j + 1 < n {
    dp[j + 1][new_r] = (dp[j + 1][new_r] + dp[j][r]) % MODULO;
}
```
#### **Moving Down (`i + 1`)**
- If there is a row below (`i + 1 < m`), update `new_dp`.

#### **Moving Right (`j + 1`)**
- If there is a column to the right (`j + 1 < n`), update `dp`.

**Why `+ dp[j][r]`?**
- We are **adding** the number of valid paths leading to `(i, j)` to the **next cell**.

**Why `% MODULO`?**
- To **prevent integer overflow**.

---

### **🔟 Update DP for Next Row**
```rust
dp = new_dp;
```
- Since we **only need one row at a time**, we **replace `dp` with `new_dp`** to save memory.

---

### **🔟 Return the Final Answer**
```rust
dp[n - 1][0]
```
- `dp[n - 1][0]`: Retrieves the **number of valid paths ending at (m-1, n-1) with sum % k == 0**.

---

## **💡 Why is This Solution Fast?**
| **Optimization** | **Why it Helps?** |
|-----------------|------------------|
| **Avoids Recursion** | Prevents deep recursion stack overhead |
| **Uses 2D DP Instead of 3D DP** | Reduces memory from **O(m * n * k) → O(n * k)** |
| **Uses Rolling DP Array** | Further reduces space by only keeping **one row at a time** |

---

## **🚀 Final Thoughts**
- **If matrix is small** → Recursion works, but slow.
- **If matrix is large** → **2D DP (our solution) is fastest & uses least memory**.
- **Why modulo 1,000,000,007?**  
  - To **prevent integer overflow** (since path counts grow large).

---

## **🔎 Summary Table**
| Syntax | Meaning |
|--------|---------|
| `const MODULO: i32 = 1_000_000_007;` | Prevents integer overflow |
| `let (m, n) = (grid.len(), grid[0].len());` | Get number of rows & columns |
| `let k = k as usize;` | Convert `k` to `usize` for indexing |
| `vec![vec![0; k]; n]` | Initialize a **2D DP table** |
| `dp[n - 1][0]` | Return number of valid paths |

---

Now, you fully understand the **fastest Rust solution** 🚀!