import { useEffect, useReducer } from "react"

const reducer = (state, action) =>
  ({
    set_api_data: { ...state, apiData: action.apiData },

    clicked_some_option: {
      ...state,
      clickedOption: action.index,
      userScore:
        action.index === state.apiData[state.currentQuestion]?.correctOption
          ? state.userScore + 10
          : state.userScore,
    },
  })[action.type] || state

const initialState = {
  currentQuestion: 0,
  apiData: [],
  clickedOption: null,
  userScore: 0,
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

  return (
    <div className="app">
      <main className="main">
        <div>
          {state.apiData.length > 0 && (
            <>
              <h4>{state.apiData[state.currentQuestion].question}</h4>
              <ul className="options">
                {state.apiData[state.currentQuestion].options.map(
                  (option, index) => (
                    <li key={option}>
                      <button
                        onClick={() => handleClickOption(index)}
                        className={`btn btn-option ${
                          state.clickedOption === index ? "answer" : ""
                        }
                        ${
                          state.clickedOption !== null
                            ? state.apiData[state.currentQuestion]
                                ?.correctOption === index
                              ? "correct"
                              : "wrong"
                            : ""
                        }`}
                        disabled={state.clickedOption !== null}
                      >
                        {option}
                      </button>
                    </li>
                  ),
                )}
              </ul>
            </>
          )}
        </div>
        <div>
          <button className="btn btn-ui">Próxima</button>
        </div>
      </main>
    </div>
  )
}

export { App }
