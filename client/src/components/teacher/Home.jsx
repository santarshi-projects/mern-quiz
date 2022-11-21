import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import jwt from "jsonwebtoken";
import "./Home.css";

function Home() {  
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("C++");
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const history = useHistory();

  function handleSelect(event) {
    const { name, value } = event.target;
    if (name === "category") {
      setCategory(value);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    switch (name) {
      case "category":
        setCategory(value);
        break;
      case "question":
        setQuestion(value);
        break;
      case "option1":
        setOption1(value);
        break;
      case "option2":
        setOption2(value);
        break;
      case "option3":
        setOption3(value);
        break;
      case "option4":
        setOption4(value);
        break;
      default:
        break;
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const req = await fetch("http://localhost:5000/api/quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        category: category,
        question: question,
        option1: option1,
        option2: option2,
        option3: option3,
        option4: option4,
      }),
    });

    const data = await req.json();
    setLoading(false);
    if (data.status === "ok") {
      console.log("SAVED QUESTIONS")
      // history.push({
      //   pathname: "/quiz",
      //   state: {
      //     quizId: data.quizId,
      //     quizData: data.quizData,
      //   },
      // });
    } else {
      setError(true);
      setErrorMsg(data.message);
      setTimeout(() => {
        history.push({
          pathname: "/login",
        });
      }, 1000);
      return;
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const email = jwt.decode(token);
      if (!email) {
        localStorage.removeItem("token");
        history.replace("/login");
      }
      if (Date.now() > jwt.decode(token).exp * 1000) {
        localStorage.removeItem("token");
        history.replace("/login");
      }
    } else {
      localStorage.removeItem("token");
      history.replace("/login");
    }
  }, []);

  function viewHistory() {
    history.push({
      pathname: "/history",
    });
  }

  return (
    <div className="home">
      {loading ? (
        <Loader
          className="loader"
          type="Grid"
          color="#fff"
          height={100}
          width={100}
        />
      ) : (
        <div>
          {/* <h1 className="heading">MERN Quiz</h1> */}
          <p className="heading2">Let's Start a new Quiz</p>
          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="category">Select Category</label>
            <br />
            <select
              className="category"
              name="category"
              value={category}
              onChange={handleSelect}
            >
              <option value="linux">C++</option>
              <option value="devops">Java</option>
              <option value="docker">ReactJS</option>
              <option value="bash">NodeJS</option>
            </select>
            <br />
            <label htmlFor="question">
              Question
            </label>
            <br />
            <input
              type="question"
              name="question"
              value={question}
              onChange={handleChange}
              required
            />
            <br />
            <label htmlFor="option1">
              Option 1
            </label>
            <br />
            <input
              type="option1"
              name="option1"
              value={option1}
              onChange={handleChange}
              required
            />
            <br />
            <label htmlFor="option2">
              Option 2
            </label>
            <br />
            <input
              type="option2"
              name="option2"
              value={option2}
              onChange={handleChange}
              required
            />
            <br />
            <label htmlFor="option3">
              Option 3
            </label>
            <br />
            <input
              type="option3"
              name="option3"
              value={option3}
              onChange={handleChange}
              required
            />
            <br />
            <label htmlFor="option4">
              Option 4
            </label>
            <br />
            <input
              type="option4"
              name="option4"
              value={option4}
              onChange={handleChange}
              required
            />
            <br />
            <button className="start" type="submit">
              Add Question
            </button>
            {error && <div className="error">{errorMsg}</div>}
          </form>
          <div className="btns">
            <button
              className="logout"
              onClick={() => {
                localStorage.removeItem("token");
                history.push("/login");
              }}
            >
              Logout
            </button>
            <button className="history" onClick={viewHistory}>
              View History
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default Home;
