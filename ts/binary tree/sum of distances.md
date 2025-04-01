# **In-Depth Guide to Solving "Sum of Distances in Tree" Using TypeScript**

## **Problem Breakdown**
We are given an **undirected connected tree** with `n` nodes labeled from `0` to `n - 1`. Each node is connected by `n - 1` edges, forming a valid tree structure. The goal is to compute the **sum of distances** between each node and all other nodes in the tree.

### **Understanding the Problem with an Example**
Consider the following tree:

```
      0
     / \
    1   2
       /|\
      3 4 5
```

With input:
```typescript
n = 6
edges = [[0,1],[0,2],[2,3],[2,4],[2,5]]
```
We need to return an array `answer`, where `answer[i]` represents the sum of distances from node `i` to all other nodes.

Expected Output:
```typescript
[8,12,6,10,10,10]
```

### **Key Observations**
1. **Brute Force Approach**: If we calculate distances for each node separately using BFS/DFS, it would be **O(n²)**, which is too slow.
2. **Optimized Approach**: We can solve this in **O(n)** using **Dynamic Programming (DP) on Trees**:
   - **Step 1**: Use **DFS** to calculate the subtree sizes and sum of distances from node `0` to all nodes.
   - **Step 2**: Use **another DFS pass** to adjust results for all nodes efficiently.

---

## **Solution 1: Efficient DFS + DP Approach**
### **Pseudo Code**
1. **Build an adjacency list** to represent the tree.
2. **First DFS** (dfs1) from node `0`:
   - Compute `count[i]`: Number of nodes in the subtree rooted at `i`.
   - Compute `result[i]`: Sum of distances from node `0` to all nodes in `i`'s subtree.
3. **Second DFS** (dfs2) to compute result for all nodes:
   - Use the parent’s result to compute child’s result in **O(1)**.

### **TypeScript Code**
```typescript
function sumOfDistancesInTree(n: number, edges: number[][]): number[] {
    // Step 1: Build the adjacency list representation of the tree
    const tree: number[][] = Array.from({ length: n }, () => []);
    const count: number[] = Array(n).fill(1);
    const result: number[] = Array(n).fill(0);

    for (const [u, v] of edges) {
        tree[u].push(v);
        tree[v].push(u);
    }

    // Step 2: First DFS to calculate subtree sizes and distances from node 0
    function dfs1(node: number, parent: number) {
        for (const neighbor of tree[node]) {
            if (neighbor === parent) continue;
            dfs1(neighbor, node);
            count[node] += count[neighbor];
            result[node] += result[neighbor] + count[neighbor];
        }
    }

    // Step 3: Second DFS to calculate final result for all nodes
    function dfs2(node: number, parent: number) {
        for (const neighbor of tree[node]) {
            if (neighbor === parent) continue;
            result[neighbor] = result[node] + (n - 2 * count[neighbor]);
            dfs2(neighbor, node);
        }
    }

    dfs1(0, -1); // First DFS to populate count and result for node 0
    dfs2(0, -1); // Second DFS to calculate the final result for each node
    
    return result;
}
```

---

## **Solution 2: BFS Approach**
Instead of DFS, we can use **Breadth-First Search (BFS)** to traverse the tree. This approach is less efficient (`O(n²)`) but helps in understanding an alternative method.

### **Pseudo Code**
1. **Build an adjacency list** representation of the tree.
2. **Use BFS** from every node `i` to find its sum of distances to all other nodes.
3. **Store the results** in an array.

### **TypeScript Code**
```typescript
function sumOfDistancesInTreeBFS(n: number, edges: number[][]): number[] {
    const tree: number[][] = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        tree[u].push(v);
        tree[v].push(u);
    }

    function bfs(start: number): number {
        const queue: number[] = [start];
        const visited = new Set<number>();
        let sum = 0, level = 0;
        visited.add(start);

        while (queue.length > 0) {
            let size = queue.length;
            for (let i = 0; i < size; i++) {
                const node = queue.shift()!;
                sum += level;
                for (const neighbor of tree[node]) {
                    if (!visited.has(neighbor)) {
                        visited.add(neighbor);
                        queue.push(neighbor);
                    }
                }
            }
            level++;
        }
        return sum;
    }

    return Array.from({ length: n }, (_, i) => bfs(i));
}
```
⏳ **Time Complexity:** `O(n²)` (Too slow for large `n`)  
💡 **Best for understanding the problem but not optimal for large inputs.**

---

## **Solution 3: Using Parent-Child Relationship**
This method is a **variation of DFS** but avoids additional computations by using parent-child distance relationships.

### **Pseudo Code**
1. **Find distances for node `0`**.
2. **Use recursive DFS** to calculate all other distances.

### **TypeScript Code**
```typescript
function sumOfDistancesInTreeOptimized(n: number, edges: number[][]): number[] {
    const tree: number[][] = Array.from({ length: n }, () => []);
    const result: number[] = Array(n).fill(0);
    const count: number[] = Array(n).fill(1);

    for (const [u, v] of edges) {
        tree[u].push(v);
        tree[v].push(u);
    }

    function dfs1(node: number, parent: number) {
        for (const neighbor of tree[node]) {
            if (neighbor !== parent) {
                dfs1(neighbor, node);
                count[node] += count[neighbor];
                result[node] += result[neighbor] + count[neighbor];
            }
        }
    }

    function dfs2(node: number, parent: number) {
        for (const neighbor of tree[node]) {
            if (neighbor !== parent) {
                result[neighbor] = result[node] + (n - 2 * count[neighbor]);
                dfs2(neighbor, node);
            }
        }
    }

    dfs1(0, -1);
    dfs2(0, -1);

    return result;
}
```
🚀 **Time Complexity:** `O(n)`  
🛠 **Space Complexity:** `O(n)`  

---

## **Three Non-Trivial Examples**
### **Example 1**
```typescript
n = 6
edges = [[0,1],[0,2],[2,3],[2,4],[2,5]]
Output: [8,12,6,10,10,10]
```

### **Example 2**
```typescript
n = 4
edges = [[0,1],[1,2],[1,3]]
Output: [5,3,5,5]
```

### **Example 3**
```typescript
n = 7
edges = [[0,1],[1,2],[1,3],[3,4],[3,5],[5,6]]
Output: [14,10,16,12,16,14,16]
```

---

## **Conclusion**
| Approach | Time Complexity | Space Complexity | Suitable for Large Inputs? |
|----------|---------------|----------------|--------------------|
| DFS + DP | `O(n)` | `O(n)` | ✅ Yes |
| BFS | `O(n²)` | `O(n)` | ❌ No |
| Parent-Child DP | `O(n)` | `O(n)` | ✅ Yes |

✅ **Final Verdict:** Use **Solution 1** (DFS + DP) for best performance.