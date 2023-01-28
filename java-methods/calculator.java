/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package samsonajulor.snippets;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 *
 * @author s.ajulor
 */
public class calculator {
    
    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) throws IOException {
        // this line is here for us to be able to comunicate with user via console
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        // if you want data from user just write reader.readLine();
        
        //take the input from user
        String userInput;
        System.out.println("********Calculator******** ");
        System.out.print("Write first number : ");
        userInput = reader.readLine();
        int first = Integer.parseInt(userInput);
        System.out.print("Write second number : ");
        userInput = reader.readLine();
        int second = Integer.parseInt(userInput);
        
        // do all operations
        int add = first + second;
        int subtract = first - second;
        int multiply = first * second;
        int divide = first / second;
        int modulo = first % second;
        
        // print the results
        System.out.println(first + " + " + second + " = " + add);
        System.out.println(first + " - " + second + " = " + subtract);
        System.out.println(first + " * " + second + " = " + multiply);
        System.out.println(first + " / " + second + " = " + divide);
        System.out.println(first + " % " + second + " = " + modulo);
    }
}
