import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { isNumber } from 'ionic-angular/umd/util/util';

@IonicPage()
@Component({
  selector: 'page-content',
  templateUrl: 'content.html'
})
export class ContentPage {
  
  //First number modified when opening the app
  public number1: number;
  //Second number modified after choosing an operator
  public number2: number;
  //The result of the operation between number1 and number 2
  public result: number;

  //If the decimal has been pressed
  public isDecimal: boolean;
  //How many decimals does the number have to concatenate
  public numDecimals: number;

  //If an operator has been chosen
  public isSecondStep: boolean;
  //What operator has been chosen
  public operation: string;

  //If the button 'Expand buttons' has been pressed
  public isExpanded: boolean;

  constructor(public navCtrl: NavController) {
    this.number1 = 0;
    this.number2 = 0;
    this.result = 0;

    this.isDecimal = false;
    this.numDecimals = 0;

    this.isSecondStep = false;
    this.operation = '';

    this.isExpanded = false;
  }

  //Main function, with all calculations
  calculatorFunction(calculatorText: string, calculatorType: string) {
    let calculatorTextArea = document.getElementById("calculatorTextArea");
    if (calculatorType == 'number' && calculatorTextArea.innerHTML.length < 16){
      if (this.isDecimal){
        if (this.isSecondStep){
          //Currently, dividing does not work properly, it has imperfections
          this.number2 = this.number2 + (parseFloat(calculatorText)/(Math.pow(10,this.numDecimals)));
          this.numDecimals = this.numDecimals + 1;
          calculatorTextArea.innerHTML = String(this.number2);
        }
        else{
          this.number1 = this.number1 + (parseFloat(calculatorText)/(Math.pow(10,this.numDecimals)));
          this.numDecimals = this.numDecimals + 1;
          calculatorTextArea.innerHTML = String(this.number1);
        }
      }
      else{
        if (this.isSecondStep){
          this.number2 = (this.number2*10) + parseInt(calculatorText);
          calculatorTextArea.innerHTML = String(this.number2);
        }
        else{
          this.number1 = (this.number1*10) + parseInt(calculatorText);
          calculatorTextArea.innerHTML = String(this.number1);
        }
      }
    }
    else{
      //Choose what type of operation will be done
      switch (calculatorType) {
        case 'add':
          this.isSecondStep = true;
          this.isDecimal = false;
          this.numDecimals = 0;
          this.operation = 'add';
          break;
        case 'subtract':
          this.isSecondStep = true;
          this.isDecimal = false;
          this.numDecimals = 0;
          this.operation = 'subtract';
          break;
        case 'multiply':
          this.isSecondStep = true;
          this.isDecimal = false;
          this.numDecimals = 0;
          this.operation = 'multiply';
          break;
        case 'divide':
          this.isSecondStep = true;
          this.isDecimal = false;
          this.numDecimals = 0;
          this.operation = 'divide';
          break;
        case 'period':
          this.isDecimal = true;
          this.numDecimals = 1;
          break;
        case 'equals':
          //Depending on the operation, the result is different
          switch (this.operation) {
            case 'add':
              this.result = this.number1 + this.number2;
              calculatorTextArea.innerHTML = String(this.result);
              break;
            case 'subtract':
              this.result = this.number1 - this.number2;
              calculatorTextArea.innerHTML = String(this.result);
              break;
            case 'multiply':
              this.result = this.number1 * this.number2;
              calculatorTextArea.innerHTML = String(this.result);
              break;
            case 'divide':
              this.result = this.number1 / this.number2;
              calculatorTextArea.innerHTML = String(this.result);
              break;
          }
          this.number1 = parseFloat(calculatorTextArea.innerHTML);
          this.isSecondStep = false;
          break;
      }
    }
  }

  //Function to reset all numbers and start from scratch
  calculatorReset() {
    let calculatorTextArea = document.getElementById("calculatorTextArea");
    calculatorTextArea.innerHTML = '0';

    this.number1 = 0;
    this.number2 = 0;
    this.result = 0;

    this.isDecimal = false;
    this.numDecimals = 0;
    this.isSecondStep = false;

    this.operation = '';
  }

  //Function to expand the numbers
  calculatorExpand() {
    let calculatorButtonList = document.getElementsByClassName("calculatorButton");
    let calculatorDivList = document.getElementsByClassName("calculatorDiv");

    for (var i = 0; i < calculatorButtonList.length; i += 1){
      let calculatorButtonClasses = calculatorButtonList[i];
      if (this.isExpanded){
        calculatorButtonClasses.classList.remove('calculatorButtonExpanded');
      }
      else{
        calculatorButtonClasses.classList.add('calculatorButtonExpanded');
      }
    }
    for (var i = 0; i < calculatorDivList.length; i += 1){
      let calculatorDivClasses = calculatorDivList[i];
      if (this.isExpanded){
        calculatorDivClasses.classList.remove('calculatorDivExpanded');
      }
      else{
        calculatorDivClasses.classList.add('calculatorDivExpanded');
      }
    }

    let calculatorResetTooltip = document.getElementById("calculatorResetTooltip");
    let calculatorExpandTooltip = document.getElementById("calculatorExpandTooltip");

    if (this.isExpanded){
      calculatorResetTooltip.style.top = "75%";
      calculatorExpandTooltip.style.top = "75%";
    }
    else{
      calculatorResetTooltip.style.top = "89%";
      calculatorExpandTooltip.style.top = "89%";
    }

    this.isExpanded = !this.isExpanded;
  }
}
