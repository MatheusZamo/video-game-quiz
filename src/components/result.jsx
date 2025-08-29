import { getResultMessage } from "@/utils/get-result-message"
import styled from "styled-components"
import { Button } from "./shared/button"

const Result = ({ state, maxScore, onClickRestart }) => {
  const resultMessage = getResultMessage({ score: state.userScore, maxScore })
  const Div = styled.div`
    background-color: var(--color-theme);
    color: var(--color-dark);
    border-radius: 100px;
    text-align: center;
    padding: 2rem 0;
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 1.6rem;
  `
  const Span = styled.span`
    font-size: 2.2rem;
    margin-right: 4px;
  `
  const RestartButton = styled(Button)`
    float: right;
  `

  return (
    <>
      <Div>
        <Span>{resultMessage}</Span>
      </Div>
      <RestartButton onClick={onClickRestart}>Reiniciar quiz</RestartButton>
    </>
  )
}

export { Result }
