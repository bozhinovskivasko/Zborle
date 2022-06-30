import { getCurrencySymbol } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WORDS } from './words';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  ngOnInit(): void { }

  //if the word is in the dictionary
  doesExist = false;
  words = WORDS;
  todaysWord = this.words[Math.floor(Math.random() * this.words.length)];
  row = 0;
  //Entered word
  word = '';
  showErrorMessage = false;

  //function to add letters from input to the variable word
  addLetter(char: any) {
    //this is for deleting
    if (char.data === null) {
      this.word = this.word.slice(0, this.word.length - 1);
      this.showErrorMessage = false;
    } 
    else { //this is for adding word
      this.word += char.data;
    }

    if (this.word.length === 5) {
      this.checkWord();
    }
  }

  //function for checking if the word is valid and if it is for checking the letters
  checkWord() {
    this.findIfExists();
    if (this.doesExist) { //check if the word exist in the database

      //the word exists 
      let element = document.getElementById(this.row + '');
      element!.innerHTML = '';

      //check if the word is todays word
      if (this.word === this.todaysWord) {
        //if it is color, paint the fields green
        for (let i = 0; i < this.word.length; i++) {
          this.color(element, this.word.charAt(i), "#008000");
        }
      }
      else { //it is not so check the letters
        this.checkLetters(element);
        //after that reset the fields
        this.row++;
        this.word = '';
        this.doesExist = false;
      }
    }
    else { //it does not exist, so show message and disable next letter space
      this.word = this.word.slice(0, this.word.length - 1);
      this.showErrorMessage = true;
    }
  }

  //function for searching the database for word
  findIfExists() {
    console.log(this.todaysWord);
    this.word = this.word.toLowerCase();
    for (let i = 0; i < this.words.length; i++) {
      if (this.word === this.words[i]) {
        this.doesExist = true;
        break;
      }
    }
  }

  //function for cheking the letters and painting them the appropriate color
  checkLetters(element: HTMLElement | null) {
    //variable so I can keep track of the readed letters
    let duplicates = '';

    for (let i = 0; i < this.word.length; i++) {

      //check if the letter is duplicate
      if(duplicates.includes(this.word.charAt(i))) {
        
        //check if todays word has same letter twice also 
        if(this.containsTwoLetters(this.todaysWord, this.word.charAt(i))) {
          
            //check if duplicate letter is in right spot
            if(this.letterInRightSpot(i)) {

              //the letter is in right place so add green color
              this.color(element, this.word.charAt(i), "#008000");
              duplicates += this.word.charAt(i);
            }
            else {
              //the letter is not in right place so add yellow color
              this.color(element, this.word.charAt(i), "yellow");
              duplicates += this.word.charAt(i);
            }
        }
        else {
          //there are not two same letters in todays word so paint it silver
          this.color(element, this.word.charAt(i), "silver");
        }
      } 

      //check if the letter is not part of todays word
      else if(!this.todaysWord.includes(this.word.charAt(i))) {
        this.color(element, this.word.charAt(i), "silver");
      }

      //check if letter is in right spot so paint it green
      else if(this.letterInRightSpot(i)) {
        this.color(element, this.word.charAt(i), "#008000");
        duplicates += this.word.charAt(i);
      }
      else {
        //the letter is in todays word but, not in right place so paint it yellow
        this.color(element, this.word.charAt(i), "yellow");
        duplicates += this.word.charAt(i);
      }
    }
  }

  //function for cheking if letter is in right place
  letterInRightSpot(i: number): boolean {
    if(this.word.charAt(i) === this.todaysWord.charAt(i)) {
      return true;
    }
    return false;
  }

  //function for cheking if there are two same letters
  containsTwoLetters(str: string, char: string) {
    return str.indexOf(char) != str.lastIndexOf(char);
  }

  //function for coloring the input field
  color(element: HTMLElement | null, char: string, color: string) {
    element!.innerHTML += '<input disabled type="text" placeholder="' + char + '" style="width: 70px; height: 70px; text-align: center; font-size: larger; font-weight: bold; margin: 4px; border-radius: 7%; background-color:' + color + ';">';
  }
}
