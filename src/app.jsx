import { useEffect, useReducer } from "react"

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
      shouldShowResult: state.currentQuestion + 1 === state.apiData.length,
    },

    clicked_restart: {
      ...state,
      userScore: 0,
      shouldShowResult: false,
    },
  })[action.type] || state

const initialState = {
  currentQuestion: 0,
  apiData: [],
  clickedOption: null,
  userScore: 0,
  shouldShowResult: false,
  shouldShowHomePage: true,
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

  const userHasAnswered = state.clickedOption !== null
  const maxScore = state.apiData.reduce((acc, q) => acc + q.points, 0)
  const percentage = (state.userScore / maxScore) * 100

  return (
    <div className="app">
      <header className="app-header">
        <img src="logo-quiz-videogames.png" alt="Logo do Quiz dos Videogames" />
        <h1>Quiz dos Videogames</h1>
      </header>
      <main className="main">
        <div>
          {state.shouldShowHomePage && (
            <div className="start">
              <h2>Bem vindo ao Quiz dos Videogames!</h2>
              <h4>5 questões pra te testar</h4>
              <div>
                <button className="btn btn-ui">Bora começar</button>
              </div>
            </div>
          )}

          {state.shouldShowResult && (
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

          {state.apiData.length > 0 &&
            !state.shouldShowResult &&
            !state.shouldShowHomePage && (
              <>
                <h4>{state.apiData[state.currentQuestion].question}</h4>
                <ul className="options">
                  {state.apiData[state.currentQuestion].options.map(
                    (option, index) => {
                      const answerClass =
                        state.clickedOption === index ? "answer" : ""
                      const correctOrWrongClass = userHasAnswered
                        ? state.apiData[state.currentQuestion]
                            ?.correctOption === index
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
