/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package samsonajulor.snippets;

/**
 *
 * @author s.ajulor
 */
public class biggestfromtwoarrays {
 
    public static void main(String[] args) {
        int[] firstArray = {10, 1, 8, 4, 2, 1, 8};
        int[] secondArray = {1, 9, 7, 8, 7, 6};

        System.out.println("*****Biggest From Two Arrays *******");

        System.out.print("First Array : ");
        for (int i = 0; i < firstArray.length; i++) {
            System.out.print(firstArray[i] + " ");
        }
        System.out.println();

        System.out.print("Second Array : ");
        for (int i = 0; i < secondArray.length; i++) {
            System.out.print(secondArray[i] + " ");
        }
        System.out.println();

        int biggestJet = 0;
        for (int i = 0; i < firstArray.length; i++) {
            if (biggestJet < firstArray[i]) {
                biggestJet = firstArray[i];
            }
        }

        boolean isBiggestInFirst = true;
        for (int i = 0; i < secondArray.length; i++) {
            if (biggestJet < secondArray[i]) {
                biggestJet = secondArray[i];
                isBiggestInFirst = false;
            }
        }

        if (isBiggestInFirst) {
            System.out.println("Biggest Number is in First Array (" + biggestJet + ")");
        } else {
            System.out.println("Biggest Number is in Second Array (" + biggestJet + ")");
        }
    }   
}
