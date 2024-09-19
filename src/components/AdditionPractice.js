import { useState} from "react";
import '../styles/AdditionPractice.css';

const AdditionPractice = () => {
    const questionCount = 20; // 題目數量
    const [questions, setQuestions] = useState([]);

    // 取隨機數min-max
    const generateRandomNumbers = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // 初始化問題數據
    const initializeQuestions = () => {
        let min = 1;
        let max = 10;
        const newQuestions = Array.from({ length: questionCount }, () => ({
            num1: generateRandomNumbers(min, max),
            num2: generateRandomNumbers(min, max),
            userAnswer: '',
            message: ''
        }));
        setQuestions(newQuestions);
    }

    // 在初始化時生成隨機數
    useState(() => {
        initializeQuestions();
    }, []);

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
            const correctAnswer = question.num1 + question.num2;
            if (parseInt(question.userAnswer) === correctAnswer) {
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

const Topic = ({ num1, num2, userAnswer, onAnswerChange, message, index }) => {
    return (
        <div className="topic">
            <p>
                ({index}).&nbsp;&nbsp;<span className="number">{num1}</span> + <span className="number">{num2}</span> =&nbsp;
            </p>
            <input
                className="userAnswer"
                type="number"
                value={userAnswer}
                onChange={(e) => onAnswerChange(e.target.value)}
            />
            <p>{message}</p>
        </div>
    );
}

export default AdditionPractice;