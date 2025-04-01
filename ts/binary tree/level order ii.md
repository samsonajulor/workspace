# 🌳 **Binary Tree Level Order Traversal II - TypeScript Guide**

## **📖 Table of Contents**
1. **Introduction** (What is Bottom-Up Level Order?)
2. **Approach 1: BFS with Reverse** (Easy to Understand)
3. **Approach 2: BFS with Unshift** (No Reverse Needed)
4. **Approach 3: DFS with Level Tracking** (Recursive Magic)
5. **Key Takeaways & Performance**
6. **FAQs**

---

## **1️⃣ Introduction: What is Bottom-Up Level Order?**
It's like reading a tree from the bottom leaves up to the root, left-to-right at each level.

### **🎯 Examples**
#### **🌲 Example 1**
```
        3
       / \
      9   20
         /  \
        15   7
```
**Output:** `[[15,7], [9,20], [3]]` (Bottom to top)

#### **🍁 Example 2**
```
        1
       / \
      2   3
     / \
    4   5
```
**Output:** `[[4,5], [2,3], [1]]`

#### **🌴 Example 3 (Single Node)**
```
        1
```
**Output:** `[[1]]`

---

## **2️⃣ Approach 1: BFS with Reverse**
### **👶 Pseudo-Code (For a 5-Year-Old)**
1. **Make a line (queue) starting with root**
2. **While people are in line:**
   - Count people on current floor
   - Make a list of their values
   - Tell their children to join the line
   - Save the floor list
3. **Reverse all floors at the end**

### **💻 TypeScript Code**
```typescript
function levelOrderBottom(root: TreeNode | null): number[][] {
    if (!root) return []; // Empty tree = no floors
    
    const result: number[][] = [];
    const queue: TreeNode[] = [root]; // Start line with root
    
    while (queue.length) {
        const levelSize = queue.length;
        const currentLevel: number[] = [];
        
        // Process all people on this floor
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift()!; // Next in line
            currentLevel.push(node.val); // Remember their value
            
            // Children join the back of the line
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        result.push(currentLevel); // Save this floor
    }
    
    return result.reverse(); // Flip the building upside down!
}
```

### **⚡ Performance**
- **Time:** O(n) - We visit each node once
- **Space:** O(n) - Queue stores all nodes at widest level

---

## **3️⃣ Approach 2: BFS with Unshift**
### **👶 Pseudo-Code**
1. **Same line system as Approach 1**
2. **Instead of saving floors normally:**
   - Add each new floor to the **beginning** of the result
3. **No need to reverse at the end!**

### **💻 TypeScript Code**
```typescript
function levelOrderBottom(root: TreeNode | null): number[][] {
    if (!root) return [];
    
    const result: number[][] = [];
    const queue: TreeNode[] = [root];
    
    while (queue.length) {
        const levelSize = queue.length;
        const currentLevel: number[] = [];
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift()!;
            currentLevel.push(node.val);
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        result.unshift(currentLevel); // Add to front instead of back
    }
    
    return result;
}
```

### **⚡ Performance Insight**
- **unshift** is O(n) per operation (slower than push for large trees)
- Better space complexity than reverse approach

---

## **4️⃣ Approach 3: DFS with Level Tracking**
### **👶 Pseudo-Code**
1. **Start at root (floor 0)**
2. **When visiting a node:**
   - If we need a new floor, add it to the **front**
   - Put node value in the correct floor
3. **Send children to next floor down**

### **💻 TypeScript Code**
```typescript
function levelOrderBottom(root: TreeNode | null): number[][] {
    const result: number[][] = [];
    
    function dfs(node: TreeNode | null, level: number) {
        if (!node) return; // No node = stop here
        
        // If we need a new floor, add it at beginning
        if (level >= result.length) {
            result.unshift([]);
        }
        
        // Calculate which floor to use (from bottom)
        const currentLevel = result[result.length - 1 - level];
        currentLevel.push(node.val); // Add value
        
        // Visit children on next floor down
        dfs(node.left, level + 1);
        dfs(node.right, level + 1);
    }
    
    dfs(root, 0);
    return result;
}
```

### **⚡ Performance**
- **Time:** O(n) - Each node visited once
- **Space:** O(h) - Call stack depth (better for tall trees)

---

## **5️⃣ Key Takeaways**
| Approach | Best For | Pros | Cons |
|----------|---------|------|------|
| **BFS + Reverse** | Most intuitive | Simple logic | Needs final reverse |
| **BFS + Unshift** | Medium trees | No reverse step | Slower unshift ops |
| **DFS** | Deep trees | Memory efficient | Harder to understand |

### **🔍 Deep Insights**
- **BFS** naturally handles level-order
- **DFS** can simulate BFS with level tracking
- **unshift** vs **reverse** tradeoffs depend on tree shape

---

## **6️⃣ FAQs**
**Q1: Why use `!` after shift()?**  
A: It tells TypeScript "I'm sure this isn't null" (we checked queue.length)

**Q2: Which is fastest?**  
A: BFS + Reverse is generally fastest for balanced trees

**Q3: When to use DFS approach?**  
A: When memory is limited (very deep trees)

---

# **🎉 Conclusion**
- **Beginners:** Start with BFS + Reverse
- **Intermediate:** Try BFS + Unshift
- **Experts:** DFS shows deep recursion understanding

**Now you can read trees upside down!** 🌳↕️