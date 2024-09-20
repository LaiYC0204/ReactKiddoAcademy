import { useState, useEffect, useCallback } from "react";
import { useLocation } from 'react-router-dom';
import '../styles/Practice.css';

const Practice = ({ operation, symbol }) => {
    const questionCount = 20; // 題目數量
    const min = 1; // 最小數字
    const max = 10; // 最大數字
    const [questions, setQuestions] = useState([]);

    // 取隨機數min-max
    const generateRandomNumbers = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // 初始化問題數據，使用 useCallback 來避免每次重新生成該函數
    const initializeQuestions = useCallback(() => {
        const newQuestions = Array.from({ length: questionCount }, () => ({
            num1: generateRandomNumbers(min, max),
            num2: generateRandomNumbers(min, max),
            userAnswer: '',
            message: ''
        }));
        setQuestions(newQuestions);
    }, [questionCount, min, max]);

    // Get the current location
    const location = useLocation();

    // Reinitialize the question whenever the location (URL) changes
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

            if (parseFloat(question.userAnswer) === correctAnswer) {
                question.message = '正確';
            } else {
                question.message = '錯誤';
            }
        });
        setQuestions(checkQuestions);
    }

    return (
        <div className="question-content">
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
                        message={question.message}
                    />
                ))}
            </div>
            <button onClick={handleCheckAnswers}>確認</button>
        </div>
    );
}

const Topic = ({ num1, num2, symbol, userAnswer, onAnswerChange, message, index }) => {
    return (
        <div className="topic">
            <p>
                ({index}).&nbsp;&nbsp;<span className="number">{num1}</span> {symbol} <span className="number">{num2}</span> =&nbsp;
            </p>
            <input
                className="userAnswer"
                type="number"
                value={userAnswer}
                onChange={(e) => onAnswerChange(e.target.value)}
                placeholder="答案"
            />
            <p>{message}</p>
        </div>
    );
}

export default Practice;