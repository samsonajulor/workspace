/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package samsonajulor.snippets;

/**
 *
 * @author s.ajulor
 */
public class dowhileloop {
    public static void main(String[] args) {
        
        int i = 10;
        do{
            i++;
        }while(i < 10);
        
        System.out.println(i);
        
        i = 10;
        while(i < 10){
            System.out.println("This will never happen");
            i++;
        }
        System.out.println("End of program");
    }
}
