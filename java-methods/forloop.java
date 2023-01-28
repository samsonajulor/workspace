/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package samsonajulor.snippets;

/**
 *
 * @author s.ajulor
 */
public class forloop {
    

    public static void main(String[] args) {
        int temp = 1;
        temp++; // temp = temp + 1;
        System.out.println("Temp variable is now " + temp);
        temp--; // temp = temp - 1;
        System.out.println("Temp variable is now " + temp);

        // CYCLE 1
        System.out.println("Cycle 1");
        for (int i = 0; i < 5; i++) {
            System.out.println("i is now " + i);
        }

        // CYCLE 2
        System.out.println("Cycle 2");
        String[] names = {"Adam", "Ava", "Paul", "Emily"};
        for (int i = 0; i < names.length; i++) {
            System.out.println("Name on index " + i + " = " + names[i]);
        }
        
        // CYCLE 3
        System.out.println("Cycle 2");
        for (int i = 0; i < names.length;) {
            System.out.println("Name on index " + i + " = " + names[i]);
            i++;
        }
    }
}
