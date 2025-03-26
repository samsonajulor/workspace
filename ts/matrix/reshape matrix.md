### **Understanding Matrix Reshaping**
Matrix reshaping is the process of changing the dimensions (rows × columns) of a matrix while preserving the order of elements.

#### **Key Concept:**
A matrix reshape operation is only valid if the **total number of elements** remains the same before and after the transformation.

### **Mathematical Condition for a Valid Reshape**
If the given matrix has:
- \( m \) rows and \( n \) columns
- The reshaped matrix should have \( r \) rows and \( c \) columns

Then, reshaping is only possible if:
\[
m \times n = r \times c
\]
Otherwise, we **return the original matrix** because the reshape operation is not feasible.

---

## **Step-by-Step Explanation**
### **1️⃣ Checking Reshape Feasibility**
Before performing any transformations, we must check whether reshaping is possible.

- The **original matrix** has:
  \[
  m \times n \text{ (total elements)}
  \]
- The **desired matrix** has:
  \[
  r \times c \text{ (total elements)}
  \]

#### **Case 1: Valid Reshape**
If:
\[
m \times n = r \times c
\]
✅ **Reshaping is possible**, and we proceed.

#### **Case 2: Invalid Reshape**
If:
\[
m \times n \neq r \times c
\]
❌ **Reshaping is NOT possible**, so we **return the original matrix**.

---

### **2️⃣ Flattening the Matrix**
To reshape the matrix while maintaining row-wise traversal, we first **flatten** the matrix (convert it into a one-dimensional array).

Example:
```typescript
const mat = [[1, 2], [3, 4]];
const flat = mat.flat(); // [1, 2, 3, 4]
```
This preserves the row-major order.

---

### **3️⃣ Constructing the Reshaped Matrix**
We then extract elements from this flattened array to construct rows for the reshaped matrix.

For a **1×4 reshape**:
- The first row will contain elements from indices **0 to 3** → `[1, 2, 3, 4]`

For a **4×1 reshape**:
- First row → `[1]`
- Second row → `[2]`
- Third row → `[3]`
- Fourth row → `[4]`

To achieve this, we use `slice()` to create the required rows.

---

## **Code Implementation**
```typescript
function matrixReshape(mat: number[][], r: number, c: number): number[][] {
    const m = mat.length, n = mat[0].length;
    
    // Step 1: Check if reshaping is possible
    if (m * n !== r * c) return mat;

    // Step 2: Flatten the matrix
    const flat = mat.flat();

    // Step 3: Construct the reshaped matrix row-by-row
    const reshaped: number[][] = [];
    for (let i = 0; i < r; i++) {
        reshaped.push(flat.slice(i * c, (i + 1) * c));
    }

    return reshaped;
}
```

---

## **Example Walkthrough**
### **Example 1: Valid Reshape**
#### **Input:**
```typescript
matrixReshape([[1, 2], [3, 4]], 1, 4);
```
#### **Step 1: Check Feasibility**
\[
2 \times 2 = 4 \quad \text{(Original matrix)}
\]
\[
1 \times 4 = 4 \quad \text{(New matrix)}
\]
✅ **Valid, proceed.**

#### **Step 2: Flatten the matrix**
```typescript
flat = [1, 2, 3, 4];
```

#### **Step 3: Create the new matrix row-by-row**
- `slice(0, 4)` → `[1, 2, 3, 4]`

#### **Output:**
\[
[[1, 2, 3, 4]]
\]

---

### **Example 2: Invalid Reshape**
#### **Input:**
```typescript
matrixReshape([[1, 2], [3, 4]], 2, 4);
```
#### **Step 1: Check Feasibility**
\[
2 \times 2 = 4 \quad \text{(Original matrix)}
\]
\[
2 \times 4 = 8 \quad \text{(New matrix)}
\]
❌ **Invalid, return original matrix.**

#### **Output:**
\[
[[1, 2], [3, 4]]
\]

---

## **Complexity Analysis**
- **Flattening the matrix**: \( O(m \times n) \)
- **Constructing the new matrix**: \( O(r \times c) \) (same as \( O(m \times n) \))
- **Overall Complexity**: **\( O(m \times n) \)**

This ensures an **efficient** and **optimal** solution. 🚀

Let me know if you need further clarifications! 😊