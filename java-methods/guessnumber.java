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
public class guessnumber {
 
    public static int generateRandomInteger(int from, int to){
        return (int)(Math.random() * to + from);
    }
    
    public static void main(String[] args) throws IOException {
         // this line is here for us to be able to comunicate with user via console
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        // if you want data from user just write reader.readLine();
        
        int generatedNumber = generateRandomInteger(0, 100);
        
        System.out.println("How Many Guesses you want ?");
        String userInput = reader.readLine();
        int remainingGuesses = Integer.parseInt(userInput);
       
        while(remainingGuesses > 0){
            System.out.print("Your Guess : ");
            userInput = reader.readLine();
            int guessedNumber = Integer.parseInt(userInput);
            if(guessedNumber < generatedNumber){
                System.out.println("Generated number is bigger");
            }else if(guessedNumber > generatedNumber){
                System.out.println("Generated number is smaller");
            }else{
                System.out.println("You won !");
                break;
            }
            remainingGuesses--;
        }
        
        if(remainingGuesses == 0){
            System.out.println("You lost the game :(");
            System.out.println("You lost the game :(" + ' ' + generatedNumber);

        }
    }   
}
