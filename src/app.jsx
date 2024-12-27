import { useEffect, useReducer } from "react"
import { Timer } from "@/components/timer"
import { Header } from "@/components/header"
import { Start } from "@/components/start"
import { Result } from "@/components/result"
import { ButtonNext } from "@/components/button-next"

const secondsPerQuestion = 30

const reducer = (state, action) =>
  ({
    set_api_data: { ...state, apiData: action.apiData },

    clicked_some_option: {
      ...state,
      clickedOption: action.index,
      userScore:
        action.index === state.apiData[state.currentQuestion]?.correctOption
          ? state.userScore + state.apiData[state.currentQuestion]?.points
          : state.userScore,
    },

    clicked_next_question: {
      ...state,
      currentQuestion:
        state.currentQuestion + 1 === state.apiData.length
          ? 0
          : state.currentQuestion + 1,
      clickedOption: null,
      appStatus:
        state.currentQuestion + 1 === state.apiData.length
          ? "finished"
          : state.appStatus,
      seconds:
        state.currentQuestion + 1 === state.apiData.length
          ? null
          : state.seconds,
    },

    clicked_restart: {
      ...state,
      userScore: 0,
      appStatus: "ready",
      currentQuestion: 0,
      clickedOption: null,
    },

    clicked_start: {
      ...state,
      appStatus: "active",
      seconds: secondsPerQuestion * state.apiData.length,
    },

    tick: {
      ...state,
      seconds: state.seconds === 0 ? null : state.seconds - 1,
      appStatus: state.seconds === 0 ? "finished" : state.appStatus,
    },
  })[action.type] || state

const initialState = {
  currentQuestion: 0,
  apiData: [],
  clickedOption: null,
  userScore: 0,
  appStatus: "ready",
  seconds: null,
}

const Progress = ({ state, maxScore, userHasAnswered }) => {
  const progressValue = userHasAnswered
    ? state.currentQuestion + 1
    : state.currentQuestion
  return (
    <header className="progress">
      <label>
        <progress max={state.apiData.length} value={progressValue}>
          {progressValue}
        </progress>
        <span>
          Questão <b>{state.currentQuestion + 1}</b> / {state.apiData.length}
        </span>
        <span>
          <b>{state.userScore}</b> / {maxScore}
        </span>
      </label>
    </header>
  )
}

const Questions = ({ state, userHasAnswered, onClickOption }) => (
  <div>
    <h4>{state.apiData[state.currentQuestion].question}</h4>
    <ul className="options">
      {state.apiData[state.currentQuestion].options.map((option, index) => {
        const answerClass = state.clickedOption === index ? "answer" : ""
        const correctOrWrongClass = userHasAnswered
          ? state.apiData[state.currentQuestion]?.correctOption === index
            ? "correct"
            : "wrong"
          : ""

        return (
          <li key={option}>
            <button
              onClick={() => onClickOption(index)}
              className={`btn btn-option ${answerClass} ${correctOrWrongClass}`}
              disabled={userHasAnswered}
            >
              {option}
            </button>
          </li>
        )
      })}
    </ul>
  </div>
)

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (state.seconds === null) {
      return
    }

    const id = setTimeout(() => dispatch({ type: "tick" }), 1000)
    return () => clearTimeout(id)
  }, [state.seconds])

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/MatheusZamo/video-game-quiz/refs/heads/main/src/videogame-questions.json",
    )
      .then((response) => response.json())
      .then((apiData) => dispatch({ type: "set_api_data", apiData }))
      .catch((error) => alert(error.message))
  }, [])

  const handleClickOption = (index) =>
    dispatch({ type: "clicked_some_option", index })
  const handleClickNextQuestion = () =>
    dispatch({ type: "clicked_next_question" })
  const handleClickRestart = () => dispatch({ type: "clicked_restart" })
  const handleClickStart = () => dispatch({ type: "clicked_start" })

  const userHasAnswered = state.clickedOption !== null
  const maxScore = state.apiData.reduce((acc, q) => acc + q.points, 0)

  return (
    <div className="app">
      <Header />
      <main className="main">
        <div>
          {state.appStatus === "ready" && (
            <Start state={state} onClickStart={handleClickStart} />
          )}
          {state.appStatus === "finished" && (
            <Result
              state={state}
              maxScore={maxScore}
              onClickRestart={handleClickRestart}
            />
          )}

          {state.apiData.length > 0 && state.appStatus === "active" && (
            <>
              <Progress
                state={state}
                maxScore={maxScore}
                userHasAnswered={userHasAnswered}
              />
              <Questions
                state={state}
                userHasAnswered={userHasAnswered}
                onClickOption={handleClickOption}
              />
              <div>
                <Timer state={state} />
                {userHasAnswered && (
                  <ButtonNext
                    state={state}
                    onClickNextQuestion={handleClickNextQuestion}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export { App }
