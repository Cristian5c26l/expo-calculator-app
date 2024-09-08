import { useEffect, useRef, useState } from "react"


enum Operator {
    add = '+',
    subtract = '-',
    multiply = 'X',
    divide = '÷',
}


export const useCalculator = () => {

    const [formula, setFormula] = useState('');

    const [number, setNumber] = useState('0');
    const [prevNumber, setPrevNumber] = useState('0');

    const lastOperation = useRef<Operator>();

    useEffect(() => {
        // if (number === '0' && prevNumber !== '0') { // esto sucede al ejecutar setLastNumber de manera implicita mediante funciones addOperation o subtractOperation, lo que indica que "si se apretó un operador para hacer operacion..."
        //     if (lastOperation.current === Operator.subtract) {
        //         setPrevNumber('-' + prevNumber);
        //     }
        // }

        if (lastOperation.current) {
            const firstFormulaPart = formula.split(' ').at(0);
            setFormula(`${firstFormulaPart} ${lastOperation.current} ${number}`);
        } else {
            setFormula(number);
        }

    }, [number]);// number cambia en buildNumber (por ejemplo cuando se ingresa 0.1). number tambien cambia cuando se oprime el signo de "-". Ahi, number pasaría a ser 0 y prevNumber pasaria a ser 0.1

    useEffect(() => {
        const subResult = parseFloat(calculateSubResult().toFixed(2));
        setPrevNumber(`${subResult}`);
    }, [formula]);

    const clean = () => {
        setNumber('0');
        setPrevNumber('0');
        setFormula('0');

        lastOperation.current = undefined;
    }

    const toggleSign = () => {
        if (number.startsWith('-')) return setNumber(number.slice(1));

        setNumber('-' + number);
    }

    const deleteLast = () => {
        if (number.length === 1 || (number.startsWith('-') && number.length < 3)) return setNumber('0')

        // Borrar ultimo caracter como comportamiento normal
        setNumber(number.slice(0, -1));
    }

    const setLastNumber = () => {

        calculateResultWithEqualButton();

        if (number.endsWith('.')) {
            setPrevNumber(number.slice(0, -1))
        }

        setPrevNumber(number);
        setNumber('0');

    }

    const divideOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.divide;
    }

    const multiplyOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.multiply;
    }

    const subtractOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.subtract;
    }

    const addOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.add;
    }

    const calculateSubResult = () => {
        const [firstOperand, operator, secondOperand] = formula.split(' ');

        const firstValue = Number(firstOperand);// si firstOperand es "23.", firstValue será 23
        const secondValue = Number(secondOperand);

        if (isNaN(secondValue)) return firstValue;

        switch (operator) {
            case Operator.add:
                return firstValue + secondValue;
            case Operator.subtract:
                return firstValue - secondValue;
            case Operator.multiply:
                return firstValue * secondValue;
            case Operator.divide:
                // if (secondValue === 0) {
                //     setFormula('Math Error')
                // }
                return firstValue / secondValue;
            default:
                throw new Error(`Operation ${operator} not implemented`)
        }
    }

    const calculateResultWithEqualButton = () => {
        // console.log('calculateResultWithButton')
        const result = parseFloat(calculateSubResult().toFixed(2));
        // console.log({ result });
        setFormula(`${result}`);

        lastOperation.current = undefined;

        // setTimeout(() => {
        //     console.log({ formula, prevNumber });
        // }, 2000);// esperar un retardo para que se alcance a ver el cambio de formula y prevNumber
    }

    const buildNumber = (numberString: string) => {
        // valor del state "number" es el valor del state "formula" que es el número que se está construyendo cuando el usuario teclea "., 0, 2,...,9"
        // Evitar 00000 cuando se tiene solo como number '0'
        if ((number === '0' || number === '-0') && numberString === '0') {
            return;
        }

        // Evitar que cuando se tiene como number solo '0' y se presiona un 1,2,...,9 
        // (numberString no es '.'), no se tenga "01" por ejemplo, sino solo "1" para el mismo ejemplo
        if ((number === '0' || number === '-0') && numberString !== '.') {
            return setNumber(numberString);
        }

        // Evitar que si se tiene como number "0" o "123" o "10402347", se pueda colocar un punto decimal despues (seria el unico punto decimal) 
        if (!number.includes('.') && numberString === '.') {
            return setNumber(number + numberString);
        }

        // Evitar que si se tiene como number "0." o "14534.345348", no sea posible poder ingresar otro punto decimal
        if (number.includes('.') && numberString === '.') {
            return;
        }


        setNumber(number + numberString);
    }

    return {
        // Props
        formula,
        number,
        prevNumber,

        // Methods or actions
        buildNumber,
        clean,
        toggleSign,
        deleteLast,

        divideOperation,
        multiplyOperation,
        subtractOperation,
        addOperation,
        calculateResultWithEqualButton,
    }
}