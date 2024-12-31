const Result = ({ state, maxScore, onClickRestart }) => {
  const percentage = (state.userScore / maxScore) * 100
  return (
    <>
      <div className="result">
        {state.userScore === 0 && (
          <span>
            😥 Poxa, você fez {state.userScore} pontos de {maxScore} (
            {percentage}%)
          </span>
        )}
        {state.userScore <= 40 && state.userScore > 0 && (
          <span>
            😐 Você fez {state.userScore} pontos de {maxScore} ({percentage}%)
          </span>
        )}
        {state.userScore === maxScore && (
          <span>
            🏆 Caramba! Você fez {state.userScore} pontos de {maxScore} (
            {percentage}%)
          </span>
        )}
      </div>
      <button onClick={onClickRestart} className="btn btn-ui">
        Reiniciar quiz
      </button>
    </>
  )
}

export { Result }
