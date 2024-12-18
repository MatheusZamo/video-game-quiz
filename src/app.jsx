import { useEffect, useReducer } from "react"

const reducer = (state, action) =>
  ({
    set_api_data: { ...state, apiData: action.apiData },
  })[action.type] || state

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    currentQuestion: 0,
    apiData: [],
  })

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/MatheusZamo/video-game-quiz/refs/heads/main/src/videogame-questions.json",
    )
      .then((response) => response.json())
      .then((apiData) => dispatch({ type: "set_api_data", apiData }))
      .catch((error) => alert(error.message))
  }, [])

  return (
    <div className="app">
      <main className="main">
        <div>
          {state.apiData.length > 0 && (
            <>
              <h4>{state.apiData[state.currentQuestion].question}</h4>
              <ul className="options">
                {state.apiData[state.currentQuestion].options.map((option) => (
                  <li key={option}>
                    <button className="btn btn-option">{option}</button>
                  </li>
                ))}
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
