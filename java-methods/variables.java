/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package samsonajulor.snippets;

/**
 *
 * @author s.ajulor
 */
public class variables {
    
    public static void main(String[] args) {
        /*
        DATA TYPES
        int         : numbers in range from -2,147,483,648 to +2,147,483,647.
        short       : Same as int only smaller (from -32,768 to 32,767)
        long        : Same as int only bigger range (Ranges from -9,223,372,036,854,775,808 to +9,223,372,036,854,775,807)
        double      : numbers with floating point
        char        : The char data type is a single 16-bit Unicode character.For example - 'C'
        String      : series of characters in your code that is enclosed in double quotes
        boolean     : true or false

            DECLARATION
                type name;
            DECLARATION AND INITIALIZATION
                type name = value;
         */

        int ourNumber;
        ourNumber = 0;
        System.out.println(ourNumber);
        ourNumber = 10;
        System.out.println(ourNumber);
        ourNumber = 2 + 2;
        double decimalNumber;
        decimalNumber = 10.15;

        System.out.println(decimalNumber);

        int number = 5;

        char myCharacter = 'c';

        String myString = "some string";

        int newVariable = 10 + 15;

        int anotherVariable = 10 - newVariable;

        int myInteger = 2 + (2 * 10);

        double anotherNumber = myInteger + (number - 10) / 2;

        boolean b = true;
    }
}
