import { getCurrencySymbol } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WORDS } from './words';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
    this.todaysWord = this.words[Math.floor(Math.random() * this.words.length)];
    this.novZbor();
  }
  doesExist = false;
  words = WORDS;

  todaysWord='шеќер';
  counter: number = 0;
  order: number = 0;
  word: string = '';

  novZbor() {
    setTimeout (() => {
      this.todaysWord = this.words[Math.floor(Math.random() * this.words.length)];
   }, 86400000);
  }

  dodadi(char: any) {
    console.log(this.todaysWord);
    if(char.data === null) {
      this.word = this.word.slice(0, this.word.length-1);
      if(this.order !== 0) {
        this.order--;
      }
    } else {
      this.word += char.data;
      if(this.order !== 4){
        this.order++;
      }
      
    }
    if(this.word.length === 5) {
      this.proveri();
    }
  }

  proveri() {
    console.log(this.todaysWord);
    this.word = this.word.toLowerCase();
      for(let i=0; i<this.words.length; i++) {
        if(this.word === this.words[i]) {
          this.doesExist = true;
          break;
        }
      }
      if(this.doesExist){
        if(this.word === this.todaysWord) {
          let element = document.getElementById(this.counter + '');
          element!.innerHTML='';
          for(let i=0; i<this.word.length; i++) {
            element!.innerHTML+='<input disabled type="text" placeholder="'+ this.word.charAt(i) +'" style="width: 70px; height: 70px; text-align: center; font-size: larger; font-weight: bold; margin: 4px; background-color: #90EE90;">';
          }
          alert("Честиткиииииии :)");
        } else {
          let element = document.getElementById(this.counter + '');
          element!.innerHTML='';
          for(let i=0; i<this.word.length; i++) {
            if(this.word.charAt(i) === this.todaysWord.charAt(i)) {
              element!.innerHTML+='<input disabled type="text" placeholder="'+ this.word.charAt(i) +'" style="width: 70px; height: 70px; text-align: center; font-size: larger; font-weight: bold; margin: 4px; background-color: #90EE90;">';
            }
            else if(this.todaysWord.includes(this.word.charAt(i))) {
              element!.innerHTML+='<input disabled type="text" placeholder="'+ this.word.charAt(i) +'" style="width: 70px; height: 70px; text-align: center; font-size: larger; font-weight: bold; margin: 4px; background-color: yellow;">';
            } 
            else {
              element!.innerHTML+='<input disabled type="text" placeholder="'+ this.word.charAt(i) +'" style="width: 70px; height: 70px; text-align: center; font-size: larger; font-weight: bold; margin: 4px; background-color: silver;">';
            }
          }
          this.order = 0;
          this.counter++;
          this.word='';
        }

        if(this.counter === 5) {
          alert("Не го погодивте зборот. Зборот што го баравме беше: " + this.todaysWord);
        }
      }else{
        alert("Непостоечки збор");
      }
  }
}
