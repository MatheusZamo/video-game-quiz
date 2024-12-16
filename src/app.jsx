import { useState, useEffect } from "react"

const App = () => {
  const [games, setGames] = useState(null)
  const [index, setIndex] = useState(0)
  const [points, setPoints] = useState(0)
  const [buttonNext, setButtonNext] = useState(false)
  const [result, setResult] = useState(false)

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/MatheusZamo/video-game-quiz/refs/heads/main/src/videogame-questions.json",
    )
      .then((response) => response.json())
      .then((data) => setGames(data[index]))
      .catch((error) => alert(error.message))
  }, [index])

  const userResponse = (e) => {
    const selectedAnswer = +e.target.value
    const correctAnswer = games.correctOption

    selectedAnswer === correctAnswer
      ? setPoints((prev) => prev + games.points)
      : points

    setButtonNext(true)
  }

  const nextGame = () => {
    index < 4 ? setIndex((prev) => prev + 1) : setResult(true)
  }

  const restartQuiz = () => {
    setIndex(0)
    setPoints(0)
    setResult(false)
    setButtonNext(false)
  }

  return (
    <>
      {result ? (
        <>
          <div className="result">
            <span className="highscore">
              🤨 Você fez {points} pontos de 50 (
              {((points / 50) * 100).toFixed(0)}%)
            </span>
          </div>
          <button className="btn" onClick={restartQuiz}>
            Reiniciar quiz
          </button>
        </>
      ) : (
        <div className="app">
          <div className="options">
            <h4>{games?.question}</h4>
            {games?.options.map((value, i) => (
              <option
                key={i}
                className="btn btn-option"
                onClick={(e) => userResponse(e)}
                value={i}
              >
                {value}
              </option>
            ))}
          </div>
          {buttonNext && (
            <button className="btn" onClick={nextGame}>
              {index < 4 ? "Próxima" : "Finalizar"}
            </button>
          )}
        </div>
      )}
    </>
  )
}

export { App }
