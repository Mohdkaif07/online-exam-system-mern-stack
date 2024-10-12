import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import style from "../StudentDashboard.module.css";

function Test() {
    let { id } = useParams();
    let { category } = useParams();

    const [allQuestions, setAllQuestions] = useState([]);
    const [shuffledQuestions, setShuffledQuestions] = useState([]);
    const [timeLeft, setTimeLeft] = useState(300); // Timer set for 5 minutes (300 seconds)
    const [isTimeUp, setIsTimeUp] = useState(false); // State to track if time is up

    const [answer, setAnswer] = useState({
        answer1: "",
        answer2: "",
        answer3: "",
    });

    let history = useHistory();

    // Fisher-Yates shuffle algorithm to randomly shuffle an array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    useEffect(() => {
        async function getAllQuestions() {
            let value = await axios.get("http://localhost:5000/questions");
            console.log(value)
            const filteredQuestions = value.data.filter(
                (question) => parseInt(question.exam_id) === parseInt(id)
            );

            // Shuffle and pick the first 3 questions after shuffling
            const shuffled = shuffleArray(filteredQuestions).slice(0, 5);
            setAllQuestions(value.data);
            setShuffledQuestions(shuffled); // Store the shuffled questions
        }
        getAllQuestions();
    }, [id]);

    // Timer effect to count down the time
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000); // Decrease timer by 1 second
            return () => clearTimeout(timer); // Cleanup on component unmount or update
        } else {
            setIsTimeUp(true);
            submitTest(); // Automatically submit the test when the timer runs out
        }
    }, [timeLeft]);

    let correctAnswer = [];

    function onRadioButtonChange(e) {
        setAnswer({
            ...answer,
            [e.target.name]: e.target.value,
        });
    }

    async function submitTest() {
        shuffledQuestions.forEach((question) => {
            correctAnswer.push(question.question_answer);
        });

        let score = 0;
        let status = "";

        if (correctAnswer[0] === answer.answer1) score++;
        if (correctAnswer[1] === answer.answer2) score++;
        if (correctAnswer[2] === answer.answer3) score++;
        if (correctAnswer[3] === answer.answer4) score++;
        if (correctAnswer[4] === answer.answer5) score++;

        status = score >= 2 ? "Pass" : "Fail";

        let date = new Date();
        let d = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
        let t = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

//         let d = date.getFullYear() + "-" + 
//          String(date.getMonth() + 1).padStart(2, '0') + "-" + 
//          String(date.getDate()).padStart(2, '0');

// // Format time as HH:mm:ss
//      let t = String(date.getHours()).padStart(2, '0') + ":" + 
//         String(date.getMinutes()).padStart(2, '0') + ":" + 
//         String(date.getSeconds()).padStart(2, '0');

// Combine date and time
    let dateTimeString = d + "T" + t + "Z"; // "YYYY-MM-DDTHH:mm:ssZ"

// Create a Date object
    let examDate = new Date(dateTimeString);
    // console.log(examDate.toISOString());

        let data = {
            result_status: status,
            result_score: score,
            user_email: sessionStorage.getItem("user"),
            // exam_date:  d + "T" + t + "Z",
            exam_name: category,
            total_marks: "5",
            exam_id: id,
            total_Question: "5",
        };
        console.log(data);
        await axios.post("http://localhost:5000/result", data);
        history.push("/StudentDashboard/Result");
    }

    // Format the time in minutes and seconds
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    };

    return (
        <>
            <div id={style.displayBoxQuestionHeadingBox}>
                <h1>Answer all the questions</h1>
                <div className={style.timer}>
                    <h2>Time Left: {formatTime(timeLeft)}</h2> {/* Display the timer */}
                </div>
            </div>
            {
                // Display the shuffled questions (limited to 3)
                shuffledQuestions.map((data, index) => (
                    <div id={style.displayBoxQuestionBox} key={index}>
                        <div id={style.divQuestion}>
                            <span>{data.question_name}</span>
                        </div>

                        <div>
                            <input
                                onChange={(e) => onRadioButtonChange(e)}
                                value={data.option_one}
                                id={style.option1}
                                name={"answer" + (index + 1)}
                                type="radio"
                            />
                            <label htmlFor="option1">{data.option_one}</label>
                        </div>

                        <div>
                            <input
                                onChange={(e) => onRadioButtonChange(e)}
                                value={data.option_two}
                                id={style.option2}
                                name={"answer" + (index + 1)}
                                type="radio"
                            />
                            <label htmlFor="option2">{data.option_two}</label>
                        </div>

                        <div>
                            <input
                                onChange={(e) => onRadioButtonChange(e)}
                                value={data.option_three}
                                id={style.option3}
                                name={"answer" + (index + 1)}
                                type="radio"
                            />
                            <label htmlFor="option3">{data.option_three}</label>
                        </div>

                        <div>
                            <input
                                onChange={(e) => onRadioButtonChange(e)}
                                value={data.option_four}
                                id={style.option4}
                                name={"answer" + (index + 1)}
                                type="radio"
                            />
                            <label htmlFor="option4">{data.option_four}</label>
                        </div>
                    </div>
                ))
            }
            <div id={style.submitExam}>
                <button onClick={submitTest} disabled={isTimeUp}> {/* Disable when time is up */}
                    Submit Exam
                </button>
            </div>
        </>
    );
}

export default Test;
