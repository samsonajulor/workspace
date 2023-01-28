/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package samsonajulor.snippets;

/**
 *
 * @author s.ajulor
 */
public class whileloop {

    public static void main(String[] args) {

        int temp = 0;

        // CYCLE 1
        while (temp < 5) {
            temp++;
        }
        System.out.println(temp);

        // CYCLE 2
        int arr[] = {10, 20, 30, 40, 50, 60};

        int i = 0;
        while (i < arr.length) {
            System.out.println("Number on index " + i + " = " + arr[i]);
            i++;
        }
    }
}
