import { getResultMessage } from "@/utils/get-result-message"
import styled from "styled-components"

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
  const Button = styled.button`
    display: block;
    font-family: inherit;
    color: inherit;
    background-color: transparent;
    font-size: 2rem;
    padding: 1.2rem 2.4rem;
    cursor: pointer;
    border-radius: 100px;
    transition: 0.3s;
    border: 1px solid #d3d3d3;
    float: right;
  `
  return (
    <>
      <Div>
        <Span>{resultMessage}</Span>
      </Div>
      <Button onClick={onClickRestart}>Reiniciar quiz</Button>
    </>
  )
}

export { Result }
