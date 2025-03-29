Below is an in‐depth, step‐by‐step Rust technical documentation for solving the "Rank Transform of a Matrix" problem. It is written in simple language (as if explaining to a five‐year‐old) with pseudo-code before each actual code solution. Three distinct solution approaches are provided.

---

# Rank Transform of a Matrix

## Problem Recap
You are given a grid (matrix) of numbers. You need to assign a “rank” to each cell such that:
- The rank is an integer starting from 1.
- In each row and column, if a cell’s value is smaller than another’s, its rank must be smaller.
- If two cells in the same row or column have the same value, they must share the same rank.
- Ranks should be as small as possible.

For example:

**Input:**  
```
[[1, 2],
 [3, 4]]
```

**Output:**  
```
[[1, 2],
 [2, 3]]
```

---

## Approach 1: Union-Find (Disjoint Set Union - DSU) Method

### Intuition
Imagine you have groups of cells that must have the same rank because they share the same value in the same row or column. We can use **union-find** (a “grouping” tool) to join cells in the same group. Then, for each group, we set the rank as one plus the maximum rank seen in that row or column so far.

### Pseudo-code
```
1. For each cell (r, c) in the matrix:
      - Save (r, c, value) in a list.
2. Sort the list by value.
3. Initialize two arrays: row_max and col_max, all zeros.
4. For each group of cells with the same value:
      a. Use union-find to merge cells that share the same row or column.
      b. For each cell in the group:
             new_rank = max(row_max[r], col_max[c]) + 1
      c. For each cell in the group:
             Set result[r][c] = new_rank.
             Update row_max[r] and col_max[c] to new_rank.
5. Return the result matrix.
```

### Rust Code
```rust
use std::collections::HashMap;

impl Solution {
    pub fn matrix_rank_transform(matrix: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let m = matrix.len();
        let n = matrix[0].len();
        let mut result = vec![vec![0; n]; m];
        let mut value_to_positions: HashMap<i32, Vec<(usize, usize)>> = HashMap::new();

        // Step 1: Group cells by their value.
        for r in 0..m {
            for c in 0..n {
                value_to_positions.entry(matrix[r][c]).or_default().push((r, c));
            }
        }

        // Initialize maximum rank for each row and column.
        let mut row_max = vec![0; m];
        let mut col_max = vec![0; n];

        // Get sorted unique values.
        let mut sorted_values: Vec<i32> = value_to_positions.keys().cloned().collect();
        sorted_values.sort_unstable();

        // Process each value group in increasing order.
        for &value in sorted_values.iter() {
            // Union-Find: build DSU for cells with same value.
            let mut uf = UnionFind::new(m + n);
            for &(r, c) in value_to_positions.get(&value).unwrap() {
                uf.union(r, c + m);
            }
            
            // For each connected group, determine the new rank.
            let mut group_rank: HashMap<usize, i32> = HashMap::new();
            for &(r, c) in value_to_positions.get(&value).unwrap() {
                let root = uf.find(r);
                let rank = row_max[r].max(col_max[c]) + 1;
                group_rank.entry(root).and_modify(|e| *e = (*e).max(rank)).or_insert(rank);
            }
            
            // Assign the rank and update row_max and col_max.
            for &(r, c) in value_to_positions.get(&value).unwrap() {
                let root = uf.find(r);
                let rank = group_rank[&root];
                result[r][c] = rank;
                row_max[r] = rank;
                col_max[c] = rank;
            }
        }

        result
    }
}

struct UnionFind {
    parent: Vec<usize>,
}

impl UnionFind {
    fn new(size: usize) -> Self {
        let mut parent = Vec::with_capacity(size);
        for i in 0..size {
            parent.push(i);
        }
        Self { parent }
    }

    fn find(&mut self, x: usize) -> usize {
        if self.parent[x] != x {
            self.parent[x] = self.find(self.parent[x]);
        }
        self.parent[x]
    }

    fn union(&mut self, x: usize, y: usize) {
        let root_x = self.find(x);
        let root_y = self.find(y);
        if root_x != root_y {
            self.parent[root_x] = root_y;
        }
    }
}
```

---

## Approach 2: Group by Value with Direct Rank Update

### Intuition
Instead of explicit union-find, we can process cells by their value in sorted order. For cells with the same value, they get a temporary rank computed by the maximum rank in their row and column plus one. Then update those rows and columns with that rank.

### Pseudo-code
```
1. For each cell, group (r, c) by matrix[r][c] in a dictionary.
2. Sort the keys (values) in increasing order.
3. Initialize row_max and col_max arrays with zeros.
4. For each value in sorted order:
     a. For each cell (r, c) with that value:
            new_rank = max(row_max[r], col_max[c]) + 1
     b. For each cell (r, c) in that group, assign result[r][c] = new_rank.
     c. Update row_max[r] and col_max[c] to new_rank.
5. Return the result.
```

### Rust Code
```rust
use std::collections::HashMap;

impl Solution {
    pub fn matrix_rank_transform(matrix: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let m = matrix.len();
        let n = matrix[0].len();
        let mut result = vec![vec![0; n]; m];
        let mut value_groups: HashMap<i32, Vec<(usize, usize)>> = HashMap::new();
        
        // Group cells by value.
        for r in 0..m {
            for c in 0..n {
                value_groups.entry(matrix[r][c]).or_default().push((r, c));
            }
        }
        
        let mut row_max = vec![0; m];
        let mut col_max = vec![0; n];
        let mut keys: Vec<i32> = value_groups.keys().cloned().collect();
        keys.sort_unstable();
        
        // Process groups in order.
        for key in keys {
            // Temporarily store rank for this group.
            let mut temp = Vec::new();
            for &(r, c) in &value_groups[&key] {
                let rank = row_max[r].max(col_max[c]) + 1;
                temp.push((r, c, rank));
            }
            // Update result and row/column maximums.
            for (r, c, rank) in temp {
                result[r][c] = rank;
                row_max[r] = rank;
                col_max[c] = rank;
            }
        }
        
        result
    }
}
```

---

## Approach 3: Graph & Topological Sorting

### Intuition
Think of each cell as a node in a graph. A cell has an edge to a cell in the same row or column if the other cell’s value is greater. Then, by performing a topological sort (BFS-level traversal), we assign ranks level by level.

### Pseudo-code
```
1. Build a graph where each cell is a node.
   - For each cell, for each cell in the same row and column with a higher value, add a directed edge.
2. Compute in-degrees for each cell.
3. Initialize a queue with all cells with in-degree 0 and assign them rank 1.
4. While the queue is not empty:
      a. For each node in the queue, for each neighbor:
              Reduce neighbor's in-degree.
              If in-degree becomes 0, add neighbor to the next level and assign rank = current_rank + 1.
5. Return the result matrix.
```

### Rust Code
```rust
use std::collections::VecDeque;

impl Solution {
    pub fn matrix_rank_transform(matrix: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let m = matrix.len();
        let n = matrix[0].len();
        let mut result = vec![vec![0; n]; m];
        let mut in_degree = vec![vec![0; n]; m];
        let mut graph: Vec<Vec<(usize, usize)>> = vec![vec![]; m * n];

        // Build graph: for each cell, find all cells in same row/col with a higher value.
        // We'll use indices (r, c) mapped to a single number: idx = r * n + c.
        for r in 0..m {
            for c in 0..n {
                let idx = r * n + c;
                // Check row.
                for cc in 0..n {
                    if cc != c && matrix[r][cc] > matrix[r][c] {
                        graph[idx].push((r, cc));
                        in_degree[r][cc] += 1;
                    }
                }
                // Check column.
                for rr in 0..m {
                    if rr != r && matrix[rr][c] > matrix[r][c] {
                        graph[idx].push((rr, c));
                        in_degree[rr][c] += 1;
                    }
                }
            }
        }
        
        let mut queue = VecDeque::new();
        // Initialize queue with cells that have in-degree 0.
        for r in 0..m {
            for c in 0..n {
                if in_degree[r][c] == 0 {
                    queue.push_back((r, c));
                    result[r][c] = 1;
                }
            }
        }
        
        while !queue.is_empty() {
            let (r, c) = queue.pop_front().unwrap();
            let idx = r * n + c;
            let current_rank = result[r][c];
            for &(nr, nc) in &graph[idx] {
                in_degree[nr][nc] -= 1;
                // Update rank: it must be at least current_rank + 1.
                result[nr][nc] = result[nr][nc].max(current_rank + 1);
                if in_degree[nr][nc] == 0 {
                    queue.push_back((nr, nc));
                }
            }
        }
        
        result
    }
}
```

---

# **Summary**
- **Approach 1 (Union-Find):** Groups cells with the same value in the same row/column and updates ranks using union-find.  
- **Approach 2 (Group & Direct Update):** Groups by value and directly updates rank arrays without union-find.  
- **Approach 3 (Graph/Topological Sort):** Treats the matrix as a graph and uses BFS-level traversal to assign ranks.

Each approach has its own benefits. For many cases, **Approach 2 (Group & Direct Update)** is simpler to implement, while **Approach 1 (Union-Find)** handles grouping elegantly. **Approach 3 (Graph/Topological Sort)** is useful when you think of the problem as dependencies among cells.
