# **Understanding the Problem (Like a Story!)**  

### **Imagine You Have a Magic Table**
You have a **table** with different **rows of plates**. Each plate has a **number** written on it.  

- You **must pick one plate from each row**.  
- Add the numbers on the plates to get a **sum**.  
- You want to find the **k-th smallest** sum possible.  

### **Example**
If the table looks like this:
```
Row 1: [1, 3, 11]
Row 2: [2, 4, 6]
```
Some possible sums are:  
- Picking `1` from row 1 and `2` from row 2 → **Sum = 3**  
- Picking `1` from row 1 and `4` from row 2 → **Sum = 5**  
- Picking `3` from row 1 and `2` from row 2 → **Sum = 5**  
- Picking `3` from row 1 and `4` from row 2 → **Sum = 7**  
- ... and so on.  

We want to find **the k-th smallest** sum in this list.

---

# **Solution 1: Brute Force (Try Everything)**  

## **Idea**  
- **Step 1:** Find **all possible sums** by picking one number from each row.  
- **Step 2:** Put all the sums in a **list** and **sort them** in increasing order.  
- **Step 3:** Pick the **k-th** smallest sum from the sorted list.

---

## **Pseudo Code (Simple English Steps)**  
1. Create an **empty list** to store all sums.  
2. Start at **row 1** and pick a number.  
3. Move to the **next row** and pick another number.  
4. Keep picking numbers **until we reach the last row**.  
5. Add the chosen numbers together and store the sum.  
6. Try all possible combinations.  
7. Sort the sums in increasing order.  
8. Return the **k-th** smallest sum.  

---

## **TypeScript Code**
```typescript
function kthSmallest(matrix: number[][], k: number): number {
    let allSums: number[] = [];

    // Function to generate all sums
    function generateSums(row: number, currentSum: number) {
        if (row === matrix.length) {
            allSums.push(currentSum);
            return;
        }

        for (let num of matrix[row]) {
            generateSums(row + 1, currentSum + num);
        }
    }

    generateSums(0, 0);

    // Sort all sums
    allSums.sort((a, b) => a - b);

    // Return the k-th smallest sum
    return allSums[k - 1];
}
```

---

## **Why This Works**
✅ **Simple to understand**  
✅ **Guaranteed to find the correct answer**  
❌ **Very slow for large inputs**  
❌ **Takes up too much memory**  

### **Time Complexity**: `O(n^m)` (Very slow for big matrices)  
### **Space Complexity**: `O(n^m)` (Stores all possible sums)  

---

# **Solution 2: Min-Heap (More Efficient)**
## **Idea**
Instead of storing **all sums**, use a **min-heap** (a magic bucket that always gives you the smallest number first).  

- Start with the **smallest sum**.  
- Use a **priority queue** (min-heap) to always pick the smallest sums first.  
- Stop when we find the `k-th` smallest sum.  

---

## **Pseudo Code (Simple English Steps)**  
1. Start with the **smallest sum** by picking the **first number from each row**.  
2. Put it in a **magic bucket** (min-heap).  
3. Repeat `k` times:  
   - Take out the **smallest sum** from the bucket.  
   - Try replacing one number with the next number in the same row.  
   - Put the new sum into the bucket.  
4. The `k-th` number we take out is the answer.

---

## **TypeScript Code**
```typescript
function kthSmallest(matrix: number[][], k: number): number {
    let minHeap = new MinHeap(); // A min-heap (priority queue)
    let numRows = matrix.length;

    // Start with the smallest sum
    let startSum = matrix.reduce((sum, row) => sum + row[0], 0);

    // Store (sum, row indices)
    minHeap.push({ sum: startSum, indices: Array(numRows).fill(0) });

    let seen = new Set();
    seen.add(JSON.stringify(Array(numRows).fill(0)));

    for (let i = 0; i < k; i++) {
        let { sum: currentSum, indices } = minHeap.pop();

        if (i === k - 1) {
            return currentSum;
        }

        for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
            let newIndices = [...indices];

            if (newIndices[rowIndex] + 1 < matrix[rowIndex].length) {
                newIndices[rowIndex] += 1;
                let newSum = currentSum - matrix[rowIndex][indices[rowIndex]] + matrix[rowIndex][newIndices[rowIndex]];

                if (!seen.has(JSON.stringify(newIndices))) {
                    seen.add(JSON.stringify(newIndices));
                    minHeap.push({ sum: newSum, indices: newIndices });
                }
            }
        }
    }
    return -1; // Should never reach here
}
```

---

## **Why This Works**
✅ **Much faster than brute force**  
✅ **Uses a heap to always process the smallest sums first**  
✅ **Avoids storing all sums**  
❌ **More complex than brute force**  

### **Time Complexity**: `O(k log k)`  
### **Space Complexity**: `O(k)`

---

# **Solution 3: Merging Rows One-by-One**  
## **Idea**
Instead of generating all sums at once, merge sums **row by row**:
- Start with the first row.  
- Merge it with the second row, keeping only the `k` smallest sums.  
- Continue merging with the next row.  

---

## **Pseudo Code (Simple English Steps)**  
1. Start with **first row**.  
2. Merge with **second row**, keeping only `k` smallest sums.  
3. Merge the result with the **third row**.  
4. Repeat until all rows are merged.  
5. Return the **k-th smallest sum**.  

---

## **TypeScript Code**
```typescript
function kthSmallest(matrix: number[][], k: number): number {
    let smallestSums = [...matrix[0]];

    for (let i = 1; i < matrix.length; i++) {
        let row = matrix[i];
        let newSums: number[] = [];

        for (let prevSum of smallestSums) {
            for (let num of row) {
                newSums.push(prevSum + num);
            }
        }

        newSums.sort((a, b) => a - b);
        smallestSums = newSums.slice(0, k);
    }

    return smallestSums[k - 1];
}
```

---

## **Why This Works**
✅ **Efficiently merges rows without generating all sums**  
✅ **Time Complexity: `O(m * k log k)`, better than brute force**  
✅ **Uses sorting to limit storage**  
❌ **More complex than brute force**  

---

# **Final Thoughts**
| Approach | Time Complexity | Space Complexity | Best When? |
|----------|---------------|----------------|------------|
| **Brute Force** | `O(n^m)` | `O(n^m)` | Small input size |
| **Min-Heap** | `O(k log k)` | `O(k)` | Medium `k`, large `m, n` |
| **Merging Rows** | `O(m * k log k)` | `O(k)` | Large `m`, small `k` |

For **small matrices**, brute force is fine. For **large `m, n`**, use a heap-based approach! 🚀