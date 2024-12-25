import { useEffect, useReducer, useState } from "react"

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
    },

    game_over: {
      ...state,
      appStatus: "finished",
    },
  })[action.type] || state

const initialState = {
  currentQuestion: 0,
  apiData: [],
  clickedOption: null,
  userScore: 0,
  appStatus: "ready",
}

const secondsPerQuestion = 30

const Timer = ({ appState, onHandleTimer }) => {
  const [seconds, setSeconds] = useState(
    secondsPerQuestion * appState.apiData.length,
  )

  useEffect(() => {
    if (seconds === 0) {
      onHandleTimer({ message: "game_over" })
      return
    }

    if (appState.status === "finished") {
      return
    }

    const id = setTimeout(() => setSeconds((prev) => prev - 1), 1000)
    return () => clearTimeout(id)
  }, [seconds, appState, onHandleTimer])

  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60

  return (
    <div className="timer">
      {mins < 10 ? `0${mins}` : mins}:{secs < 10 ? `0${secs}` : secs}
    </div>
  )
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

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
  const handleTimer = ({ message }) => dispatch({ type: message })

  const userHasAnswered = state.clickedOption !== null
  const maxScore = state.apiData.reduce((acc, q) => acc + q.points, 0)
  const percentage = (state.userScore / maxScore) * 100
  const progressValue = userHasAnswered
    ? state.currentQuestion + 1
    : state.currentQuestion

  return (
    <div className="app">
      <header className="app-header">
        <img src="logo-quiz-videogames.png" alt="Logo do Quiz dos Videogames" />
        <h1>Quiz dos Videogames</h1>
      </header>
      <main className="main">
        <div>
          {state.appStatus === "ready" && (
            <div className="start">
              <h2>Bem vindo ao Quiz dos Videogames!</h2>
              <h4>5 questões pra te testar</h4>
              <div>
                <button onClick={handleClickStart} className="btn btn-ui">
                  Bora começar
                </button>
              </div>
            </div>
          )}

          {state.appStatus === "finished" && (
            <>
              <div className="result">
                <span>
                  Você fez <b>{state.userScore}</b> pontos de {maxScore} (
                  {percentage}%)
                </span>
              </div>
              <button onClick={handleClickRestart} className="btn btn-ui">
                Reiniciar quiz
              </button>
            </>
          )}

          {state.apiData.length > 0 && state.appStatus === "active" && (
            <>
              <header className="progress">
                <label>
                  <progress max={state.apiData.length} value={progressValue}>
                    {progressValue}
                  </progress>
                  <span>
                    Questão <b>{state.currentQuestion + 1}</b> /{" "}
                    {state.apiData.length}
                  </span>
                  <span>
                    <b>{state.userScore}</b> / {maxScore}
                  </span>
                </label>
              </header>
              <h4>{state.apiData[state.currentQuestion].question}</h4>
              <ul className="options">
                {state.apiData[state.currentQuestion].options.map(
                  (option, index) => {
                    const answerClass =
                      state.clickedOption === index ? "answer" : ""
                    const correctOrWrongClass = userHasAnswered
                      ? state.apiData[state.currentQuestion]?.correctOption ===
                        index
                        ? "correct"
                        : "wrong"
                      : ""

                    return (
                      <li key={option}>
                        <button
                          onClick={() => handleClickOption(index)}
                          className={`btn btn-option ${answerClass} ${correctOrWrongClass}`}
                          disabled={userHasAnswered}
                        >
                          {option}
                        </button>
                      </li>
                    )
                  },
                )}
              </ul>
              <Timer appState={state} onHandleTimer={handleTimer} />
            </>
          )}
        </div>
        <div>
          {userHasAnswered && (
            <button onClick={handleClickNextQuestion} className="btn btn-ui">
              {state.currentQuestion === state.apiData.length - 1
                ? "Finalizar"
                : "Próxima"}
            </button>
          )}
        </div>
      </main>
    </div>
  )
}

export { App }
