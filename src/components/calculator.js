import React, { Component } from 'react';
import Buttons from './buttons';
import Display from './display';
import { Decimal } from 'decimal.js';

class Calculator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            calculation: '',
            output: '0',
            isEvaluated: false,
        };

        this.handleClick = this.handleClick.bind(this);
        this.clearDisplay = this.clearDisplay.bind(this);
        this.parseCalculationString = this.parseCalculationString.bind(this);
        this.calculate = this.calculate.bind(this);
        this.evaluate = this.evaluate.bind(this);
    }

    handleClick(e) {
        const char = e.target.innerText;
        const numArr = this.state.calculation.split(/[()%÷x\-+]/);
        const ops = '%÷x-+';
        let temp = '';

        if (char === '.') {
            if (numArr[numArr.length -1].includes('.')) {
                return;
            } else if (this.state.isEvaluated) {
                this.clearDisplay();
                temp = char;
            } else {
                temp = char;
            }
        } else if (ops.indexOf(char) > -1) {
            if ((this.state.calculation.length < 1) && (char !== '-')) {
                temp = '';
            } else if ((char === '%') && (this.state.calculation[this.state.calculation.length -1] === '%')) {
                temp = '';
            } else if (this.state.calculation[this.state.calculation.length - 1].match(/[0-9)%]/) != null) {
                temp = char;
            } else {
                if (char === '-') {
                    if (ops.includes(this.state.calculation[this.state.calculation.length -2])) {
                        temp = '';
                    } else {
                        temp = char;
                    }
                } else {
                    temp = '';
                }
            }
        } else if ((char === '(') && (this.state.calculation === '')) {
            temp = char;
        }
        else if (((char === '(') && (this.state.calculation[this.state.calculation.length -1].match(/[0-9]/) != null )) ||
                   ((char.match(/[0-9]/) != null) && (this.state.calculation[this.state.calculation.length -1] === '%'))) {
            temp = `x${char}`;
        } else if ((char.match(/[0-9]/) != null) && (this.state.isEvaluated)) {
            this.clearDisplay();
            temp = char;
        } else {
            temp = char;
        }
        this.setState({
            calculation: this.state.calculation + temp,
            output: this.state.output === '0' ? temp : this.state.output + temp,
            isEvaluated: false,
        });
    }

    parseCalculationString(s) {
        const calculation = [];
        let current = '';

        for (let i = 0, ch; ch = s.charAt(i); i++) {
            if ('x÷+-'.indexOf(ch) > -1) {
                if (current === '' && ch === '-') {
                    current = '-';
                } else if (current === '') {
                    calculation.push(ch);
                } else {
                    calculation.push(new Decimal(current), ch);
                    current = '';
                }
            } else if ('()'.indexOf(ch) > -1) {
                ')'.indexOf(ch) > -1 ? (calculation.push(new Decimal(current), ch), current = '') : calculation.push(ch);
            } else {
                current += s.charAt(i);
            }
            console.log(calculation);
        }
        if (current !== '') {
            calculation.push(new Decimal(current));
        }
        console.log(calculation);
        return calculation;
    }

    calculate(calc) {
        const ops = [{'^': (a, b) => a.pow(b)},
            {'x': (a, b) => a.mul(b), '÷': (a, b) => a.div(b)},
            {'+': (a, b) => a.add(b), '-': (a, b) => a.sub(b)}];
        let newCalc = [],
            currentOp;
        for (let i = 0; i < ops.length; i++) {
            for (let j = 0; j < calc.length; j++) {
            if (calc[j] === '(') {
                newCalc.push(this.calculate(calc.slice(j+1, calc.lastIndexOf(')'))));
                j += calc.lastIndexOf(')') - j;
            } else if (ops[i][calc[j]]) {
                currentOp = ops[i][calc[j]];
            } else if (currentOp) {
                newCalc[newCalc.length - 1] = currentOp(newCalc[newCalc.length - 1], calc[j]);
                currentOp = null;
            } else {
                newCalc.push(calc[j]);
            }
            }
            calc = newCalc;
            newCalc = [];
        }
        if (calc.length > 1) {
            console.log('Error: unable to resolve calculation');
            return calc;
        } else {
            console.log(calc[0].toDP(10));
            return calc[0].toDP(10);
        }
    }

    evaluate() {
        const ops = '÷x-+';
        if (ops.indexOf(this.state.calculation[this.state.calculation.length-1]) > -1) return;
        this.setState({
            calculation: `(${this.state.calculation})`,
            isEvaluated: true,
            output: this.calculate(this.parseCalculationString(this.state.calculation.replace('%','÷100')))
        })
    }

    clearDisplay() {
        this.setState({
            calculation: '',
            output: '0',
        })
    }
    
    render() {
        console.log(this.state.calculation);
        return (
            <div className="calculator">
                <Display output={this.state.output} />
                <Buttons handleClick={this.handleClick} evaluate={this.evaluate} clear={this.clearDisplay} />
            </div>
        )
    }
}

export default Calculator;