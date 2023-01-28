/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package samsonajulor.snippets;

/**
 *
 * @author s.ajulor
 */
public class sumofarray {
    
    
    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {

        int[] inputArray = {10, 15, 85, 46, 12, 28, 36, 34, 2, 28, 47, 66};

        int sum = 0;
        for (int i = 0; i < inputArray.length; i++) {
            sum = sum + inputArray[i]; // sum += inputArray[i]
        }

        System.out.println("Sum of Array : " + sum);
        System.out.println("Average Of Array : " + (sum / inputArray.length));
    }
    
}
