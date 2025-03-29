# **Problem Overview**

Imagine you have a grid (or a picture) with numbers in it. An “increasing path” is like a treasure hunt where you can move from one number to a larger number. You can only move **up, down, left, or right**—never diagonally.  
Your goal is to find the longest chain of numbers where each number is larger than the one before it.

For example, given this grid:

```
9 9 4
6 6 8
2 1 1
```

The longest increasing path is: **[1, 2, 6, 9]** (length 4).

---

# **Solution 1: DFS (Depth-First Search) Without Memoization (Naive Approach)**

## **Idea**
We start at every cell and try to walk in all four directions (up, down, left, right) as long as the next cell has a larger number than the current one. We then take the maximum length found among all starting points.  
*Note:* This approach does not store (cache) any results, so it may repeat the same work many times.

## **Pseudo-code**
```
function longestIncreasingPath(matrix):
    maxLength = 0
    for each cell in matrix:
        maxLength = max(maxLength, dfs(cell, previous = -infinity))
    return maxLength

function dfs(cell, previous):
    if cell is out of bounds or cell value <= previous:
        return 0
    length = 1
    for each direction (up, down, left, right):
        length = max(length, 1 + dfs(neighbor cell, current cell value))
    return length
```

## **Rust Code**
```rust
fn longest_increasing_path_naive(matrix: Vec<Vec<i32>>) -> i32 {
    let rows = matrix.len();
    let cols = matrix[0].len();
    let directions = [(0, 1), (0, -1), (1, 0), (-1, 0)];

    fn dfs(matrix: &Vec<Vec<i32>>, row: usize, col: usize, prev: i32, rows: usize, cols: usize, directions: &[(i32, i32)]) -> i32 {
        if row >= rows || col >= cols || matrix[row][col] <= prev {
            return 0;
        }
        let mut max_length = 1;
        for &(dx, dy) in directions {
            let new_row = row as i32 + dx;
            let new_col = col as i32 + dy;
            if new_row >= 0 && new_row < rows as i32 && new_col >= 0 && new_col < cols as i32 {
                max_length = max_length.max(1 + dfs(matrix, new_row as usize, new_col as usize, matrix[row][col], rows, cols, directions));
            }
        }
        max_length
    }

    let mut longest = 0;
    for row in 0..rows {
        for col in 0..cols {
            longest = longest.max(dfs(&matrix, row, col, i32::MIN, rows, cols, &directions));
        }
    }
    longest
}
```

---

# **Solution 2: DFS with Memoization (Optimized Approach)**

## **Idea**
We use the same DFS as before but store the longest increasing path starting at each cell. If we visit the same cell again, we can use the stored result (this is called memoization). This avoids repeating the same work.

## **Pseudo-code**
```
function longestIncreasingPath(matrix):
    memo = 2D array of zeros with same dimensions as matrix
    maxLength = 0
    for each cell in matrix:
        maxLength = max(maxLength, dfs(cell, memo))
    return maxLength

function dfs(cell, memo):
    if memo[cell] is not 0:
        return memo[cell]
    length = 1
    for each direction (up, down, left, right):
        if neighbor cell > current cell:
            length = max(length, 1 + dfs(neighbor cell, memo))
    memo[cell] = length
    return length
```

## **Rust Code**
```rust
fn longest_increasing_path_memo(matrix: Vec<Vec<i32>>) -> i32 {
    let rows = matrix.len();
    let cols = matrix[0].len();
    let directions = [(0, 1), (0, -1), (1, 0), (-1, 0)];
    
    let mut memo = vec![vec![0; cols]; rows];
    
    fn dfs(matrix: &Vec<Vec<i32>>, row: usize, col: usize, memo: &mut Vec<Vec<i32>>, rows: usize, cols: usize, directions: &[(i32, i32)]) -> i32 {
        if memo[row][col] != 0 {
            return memo[row][col];
        }
        let mut max_length = 1;
        for &(dx, dy) in directions {
            let new_row = row as i32 + dx;
            let new_col = col as i32 + dy;
            if new_row >= 0 && new_row < rows as i32 && new_col >= 0 && new_col < cols as i32 &&
               matrix[new_row as usize][new_col as usize] > matrix[row][col] {
                max_length = max_length.max(1 + dfs(matrix, new_row as usize, new_col as usize, memo, rows, cols, directions));
            }
        }
        memo[row][col] = max_length;
        max_length
    }
    
    let mut longest = 0;
    for row in 0..rows {
        for col in 0..cols {
            longest = longest.max(dfs(&matrix, row, col, &mut memo, rows, cols, &directions));
        }
    }
    longest
}
```

---

# **Solution 3: Topological Sorting (BFS Approach)**

## **Idea**
We can view the matrix as a **directed acyclic graph (DAG)** where there is an edge from cell A to cell B if B's value is greater than A's. We then use **Breadth-First Search (BFS)** to perform a topological sort. Each level in the BFS corresponds to an increasing path step.

## **Pseudo-code**
```
1. For each cell, calculate in-degree (number of incoming edges).
2. Add all cells with in-degree 0 to a queue.
3. While queue is not empty:
    - Increase path length counter.
    - For each cell in the current level:
         For each neighbor (up, down, left, right):
             If neighbor value > current cell:
                 Decrease neighbor's in-degree.
                 If neighbor's in-degree becomes 0:
                     Add neighbor to next level's queue.
4. Return path length.
```

## **Rust Code**
```rust
use std::collections::VecDeque;

fn longest_increasing_path_topo(matrix: Vec<Vec<i32>>) -> i32 {
    let rows = matrix.len();
    let cols = matrix[0].len();
    let directions = [(0, 1), (0, -1), (1, 0), (-1, 0)];
    
    // Create a 2D in-degree matrix.
    let mut in_degree = vec![vec![0; cols]; rows];
    
    // Compute in-degrees for each cell.
    for row in 0..rows {
        for col in 0..cols {
            for &(dx, dy) in &directions {
                let new_row = row as i32 + dx;
                let new_col = col as i32 + dy;
                if new_row >= 0 && new_row < rows as i32 && new_col >= 0 && new_col < cols as i32 &&
                   matrix[new_row as usize][new_col as usize] > matrix[row][col] {
                    in_degree[new_row as usize][new_col as usize] += 1;
                }
            }
        }
    }
    
    // Initialize queue with cells having in-degree 0.
    let mut queue = VecDeque::new();
    for row in 0..rows {
        for col in 0..cols {
            if in_degree[row][col] == 0 {
                queue.push_back((row, col));
            }
        }
    }
    
    let mut path_length = 0;
    
    // Process cells level by level.
    while !queue.is_empty() {
        let size = queue.len();
        for _ in 0..size {
            let (row, col) = queue.pop_front().unwrap();
            for &(dx, dy) in &directions {
                let new_row = row as i32 + dx;
                let new_col = col as i32 + dy;
                if new_row >= 0 && new_row < rows as i32 && new_col >= 0 && new_col < cols as i32 &&
                   matrix[new_row as usize][new_col as usize] > matrix[row][col] {
                    let nr = new_row as usize;
                    let nc = new_col as usize;
                    in_degree[nr][nc] -= 1;
                    if in_degree[nr][nc] == 0 {
                        queue.push_back((nr, nc));
                    }
                }
            }
        }
        path_length += 1;
    }
    
    path_length
}
```

### **Time Complexity**
- **DFS with Memoization:** \(O(m \times n)\)  
- **BFS Topological Sort:** \(O(m \times n)\)  
- **Naive DFS (without memo):** Exponential in worst-case; not practical.

### **Space Complexity**
- **DFS with Memoization:** \(O(m \times n)\) for the memo array.  
- **BFS Topological Sort:** \(O(m \times n)\) for the in-degree matrix and queue.

---

# **Summary**
1. **Solution 1 (Naive DFS):**  
   - Simple recursive DFS without caching.  
   - **Pros:** Easy to understand.  
   - **Cons:** Exponential time; not practical for larger matrices.

2. **Solution 2 (DFS with Memoization):**  
   - Uses caching to store results for each cell.  
   - **Pros:** Efficient \(O(m \times n)\) time; easier to implement.  
   - **Cons:** Requires extra space for memoization.

3. **Solution 3 (BFS Topological Sorting):**  
   - Treats the matrix as a graph and uses a level-by-level BFS.  
   - **Pros:** Elegant approach for DAGs; efficient.  
   - **Cons:** Slightly more complex to understand initially.

Each solution has its own benefits. For most cases, **DFS with memoization** is the preferred method because it’s both efficient and relatively straightforward.
