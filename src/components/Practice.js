import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation } from 'react-router-dom';
import '../styles/Practice.css';

const Practice = ({ operation, symbol }) => {
    const minRef = useRef(null);
    const maxRef = useRef(null);
    const countRef = useRef(null);

    const [questions, setQuestions] = useState([]); // 問題集合

    // 取隨機數min-max
    const generateRandomNumbers = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // 初始化問題數據，使用 useCallback 來避免每次重新生成該函數
    const initializeQuestions = useCallback(() => {
        let min = parseInt(minRef.current.value, 10); // 獲取最小數字
        let max = parseInt(maxRef.current.value, 10); // 獲取最大數字
        let count = parseInt(countRef.current.value, 10); // 獲取題目數量
        console.log(min, max, count)
        const newQuestions = Array.from({ length: count }, () => ({
            num1: generateRandomNumbers(min, max),
            num2: generateRandomNumbers(min, max),
            userAnswer: '',
            isCorrect: null
        }));
        setQuestions(newQuestions);
    }, []);

    // 取得目前位置
    const location = useLocation();

    // 每當位置 (URL) 變更時重新初始化問題
    useEffect(() => {
        initializeQuestions();
    }, [location, initializeQuestions]);

    // 處理使用者答案輸入
    const handleAnswerChange = (index, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].userAnswer = value;
        setQuestions(updatedQuestions);
    }

    // 按下按鈕檢查所有答案
    const handleCheckAnswers = () => {
        const checkQuestions = [...questions]
        checkQuestions.forEach((question) => {
            let correctAnswer;
            switch (operation) {
                case 'addition':
                  correctAnswer = question.num1 + question.num2;
                  break;
                case 'subtraction':
                  correctAnswer = question.num1 - question.num2;
                  break;
                case 'multiplication':
                  correctAnswer = question.num1 * question.num2;
                  break;
                case 'division':
                  correctAnswer = Math.round(question.num1 / question.num2 * 100) / 100;
                  break;
                default:
                  correctAnswer = null;
            }
            console.log(correctAnswer)
            if (parseFloat(question.userAnswer) === correctAnswer) {
                question.isCorrect = true;
            } else {
                question.isCorrect = false;
            }
        });
        setQuestions(checkQuestions);
    }

    return (
        <div>
            <div className="config">
                <div>
                    <p>最小數字：</p>
                    <input  
                        type="number"
                        style={{width: 50}}
                        min={1}
                        max={100}
                        defaultValue={1}
                        ref={minRef}
                    />
                </div>
                <div>
                    <p>最大數字：</p>
                    <input  
                        type="number"
                        style={{width: 50}}
                        min={1}
                        max={100}
                        defaultValue={10}
                        ref={maxRef}
                    />
                </div>
                <div>
                    <p>題目數量：</p>
                    <input  
                        type="number"
                        style={{width: 50}}
                        min={1}
                        max={100}
                        defaultValue={20}
                        ref={countRef}
                    />
                </div>
                <button onClick={initializeQuestions}>生成題目</button>
            </div>
            <div className="separator">題目</div>
            <div className="topic-content">
                {questions.map((question, index) => (
                    <Topic
                        key={index}
                        index={index + 1}
                        num1={question.num1}
                        num2={question.num2}
                        symbol={symbol}
                        userAnswer={question.userAnswer}
                        onAnswerChange={(value) => handleAnswerChange(index, value)}
                        isCorrect={question.isCorrect}
                    />
                ))}
            </div>
            <button onClick={handleCheckAnswers}>確認</button>
        </div>
    );
}

const Topic = ({ num1, num2, symbol, userAnswer, onAnswerChange, isCorrect, index }) => {
    console.log(num1, num2)
    return (
        <div className="topic">
            <p>
                ({index}).&nbsp;&nbsp;<span className="number">{num1}</span> {symbol} <span className="number">{num2}</span> =&nbsp;
            </p>
            <input
                type="number"
                value={userAnswer}
                onChange={(e) => onAnswerChange(e.target.value)}  // 使用者輸入答案時觸發
                placeholder="答案"
                style={{
                    borderColor: isCorrect === null ? "" : isCorrect ? "green" : "red",  // 動態變更框線顏色
                    width: 50
                }}
            />
        </div>
    );
}

export default Practice;