/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package samsonajulor.snippets;

/**
 *
 * @author s.ajulor
 */
public class ifcondition {
    
    public static void main(String[] args) {

        int biggerNumber = 10;
        int smallerNumber = 1;

        /* 1. if condition */
        System.out.println("1. if Condition");
        if (biggerNumber != smallerNumber) {
            System.out.println(biggerNumber + " is not equal to " + smallerNumber);
        }

        /* 2. if condition */
        System.out.println("2. if Condition");
        if (biggerNumber == smallerNumber) {
            System.out.println(biggerNumber + " is equal to " + smallerNumber);
        } else {
            System.out.println("else path took place");
        }

        /* 3. if condition */
        System.out.println("3. if Condition");
        if (biggerNumber > smallerNumber) {
            System.out.println(biggerNumber + " is bigger than " + smallerNumber);
        } else if (biggerNumber != smallerNumber) {
            System.out.println(biggerNumber + " is not equal to " + smallerNumber);
        } else {
            System.out.println("else path take place");
        }

        /* 4. if condition */
        System.out.println("4. if Condition");
        if (biggerNumber > smallerNumber) {
            System.out.println(biggerNumber + " is bigger than " + smallerNumber);
        }

        if (biggerNumber != smallerNumber) {
            System.out.println(biggerNumber + " is not equal to " + smallerNumber);
        } else {
            System.out.println("else path take place");
        }

        /* 5. if condition */
        System.out.println("5. if Condition");
        if (biggerNumber <= smallerNumber) {
            System.out.println(biggerNumber + " is smaller or equal to " + smallerNumber);
        } else if (biggerNumber == smallerNumber) {
            System.out.println(biggerNumber + " is equal to " + smallerNumber);
        } else if (biggerNumber != smallerNumber) {
            System.out.println(biggerNumber + " is not equal to " + smallerNumber);
        } else if (biggerNumber > smallerNumber) {
            System.out.println(biggerNumber + " is bigger than" + smallerNumber);
        }

        /* 6. if condition */
        System.out.println("6. if Condition");
        if (biggerNumber < smallerNumber) {
            System.out.println(biggerNumber + " is smaller " + smallerNumber);
        }
        if (biggerNumber == smallerNumber) {
            System.out.println(biggerNumber + " is equal to " + smallerNumber);
        }
        if (biggerNumber != smallerNumber) {
            System.out.println(biggerNumber + " is not equal to " + smallerNumber);
        }

        /* 7. if Condition */
        System.out.println("7. if Condition");
        if ((biggerNumber > smallerNumber) && (biggerNumber < smallerNumber)) {
            System.out.print(biggerNumber + " is bigger " + smallerNumber + " AND ");
            System.out.println(biggerNumber + " is smaller " + smallerNumber);
        } else if ((biggerNumber > smallerNumber) && !(biggerNumber < smallerNumber)) {
            System.out.print(biggerNumber + " is bigger " + smallerNumber + " AND ");
            System.out.println(biggerNumber + " is not smaller " + smallerNumber);
        } else {
            System.out.println("None of Conditions above were met");
        }

        /* 8. if Condition */
        System.out.println("8. if Condition");
        if (!(biggerNumber > smallerNumber) || (biggerNumber < smallerNumber)) {
            System.out.print(biggerNumber + " is not bigger " + smallerNumber + " OR ");
            System.out.println(biggerNumber + " is smaller " + smallerNumber);
        } else if ((biggerNumber > smallerNumber) || (biggerNumber < smallerNumber)) {
            System.out.print(biggerNumber + " is bigger " + smallerNumber + " OR ");
            System.out.println(biggerNumber + " is smaller " + smallerNumber);
        } else {
            System.out.println("None of Conditions above were met");
        }
    }
}
