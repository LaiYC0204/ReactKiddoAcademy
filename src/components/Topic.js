import { useState, useEffect } from "react";

const Topic = () => {
    // 取隨機數min-max
    const randomNumberInRange = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [userAnswer, setUserAnswer] = useState(0);
    const [resultMessage, setResultMessage] = useState('');

    useEffect(() => {
        let min = 1;
        let max = 10;
        setNum1(randomNumberInRange(min,max));
        setNum2(randomNumberInRange(min,max));
    }, []);

    let correctAnswer = num1 + num2;

    const handleClick = () => {
        if (parseInt(userAnswer) === correctAnswer) {
            setResultMessage('正確!');
        } else {
            setResultMessage('錯誤，請再試一次!');
        }
    }

    return (
        <div className="topic">
            <p>
                <span className="number">{num1}</span> + <span className="number">{num2}</span> =&nbsp;
            </p>
            <input
                className="userAnswer"
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
            />
            <button onClick={handleClick}>確認</button>
            <p>{resultMessage}</p>
        </div>
    )
}

export default Topic;