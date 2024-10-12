

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams ,NavLink } from "react-router-dom";

 import style from "../StudentDashboard.module.css";

function Exam() {

    let { category } = useParams();
    console.log("k"+category);

    const [allExam, setAllExam] = useState([]);

    useEffect(() => {
        async function getAllExams() {
            let value = await axios.get("http://localhost:5000/exams");
            console.log(value);
            setAllExam(value.data);
        }
        getAllExams();
    }, [])

    return (
        <>
            <div id={style.displayBoxHeadingBox}>
                <h1>All {category} Exam</h1>
            </div>
            {
                allExam.map((data, i) => {
                    if(data.exam_name === category)
                    return (
                        <div id={style.displayBoxExamBox} key={i}>
                            <div id={style.div1}> <span>{data.exam_name}</span> </div>
                            <div id={style.div2}> <span>Exam ID: {data._id}</span> </div>
                            <div id={style.div2}> <span>Exam Description: {data.exam_desc}</span> </div>
                            <div id={style.div3}><span>Pass Marks: {data.exam_passMarks}</span> </div>
                            <div id={style.div4}><span>Total Marks: {data.exam_marks}</span></div>
                            <div id={style.div4}><span>Total Time: {"5 Minutes"}</span></div>
                            <div id={style.div5}>
                              <NavLink exact to={`/StudentDashboard/Exam/${category}/${data._id}`}>
                              {/* {`/StudentDashboard/Exam/${category}/${data.id}`}> */}
                                 <button>Go to Exam</button>
                               </NavLink>
                            </div>
                        </div>
                    );

                    return <React.Fragment key={i}></React.Fragment>

                })
            }
        </>
    );
}
export default Exam;