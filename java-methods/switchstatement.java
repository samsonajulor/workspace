/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package samsonajulor.snippets;

/**
 *
 * @author s.ajulor
 */
public class switchstatement {
    
    public static void main(String[] args) {
       
        int switchedInt = 5;
        int result = 0;
        
        // 1. switch statement
        switch (switchedInt) {
            case 0:
                result = 10 * 0;
                break;
            case 2:
                result = 10 * 2;
                break;
            case 5:
                result = 10 * 5;
                break;
            default :
                result = 10;
        }
        System.out.println("Result is " + result);
        
        // 2. switch statement
        switchedInt = 5;
        result = 0;
        switch (switchedInt) {
            case 0:
                result = 10 * 0;
                break;
            case 2:
                result = 10 * 2;
                break;
            case 5:
                result = 10 * 5;
            default :
                result = 10;
        }
        System.out.println("Result is " + result);
        
        // 3. switch statement
        char operation = '+';
        result = 0;
        switch (operation) {
            case '+':
                result = 10 + 5;
                break;
            case '-':
                result = 10 - 5;
                break;
            case '*':
                result = 10 * 5;
                break;
            default :
                result = 10;
        }
        System.out.println("Result is " + result);
    }
}
