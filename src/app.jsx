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
          <h4>Pergunta aqui</h4>
          <ul className="options">
            <li>
              <button className="btn btn-option">Opção 1</button>
            </li>
            <li>
              <button className="btn btn-option">Opção 2</button>
            </li>
            <li>
              <button className="btn btn-option">Opção 3</button>
            </li>
            <li>
              <button className="btn btn-option">Opção 4</button>
            </li>
          </ul>
        </div>
        <div>
          <button className="btn btn-ui">Próxima</button>
        </div>
      </main>
    </div>
  )
}

export { App }
