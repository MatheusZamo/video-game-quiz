import { Button } from "./shared/button"
import styled, { css } from "styled-components"

const Questions = ({ state, userHasAnswered, onClickOption }) => {
  const H4 = styled.h4`
    font-size: 2.2rem;
    font-weight: 600;
    margin-bottom: 2.4rem;
  `
  const Ul = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    margin-bottom: 3.2rem;
    list-style: none;
  `
  const OptionButton = styled(Button)`
    ${({ $state, $index, $userHasAnswered }) => {
      const apply = ({ correct, wrong }) =>
        $userHasAnswered
          ? $state.apiData[$state.currentQuestion]?.correctOption === $index
            ? correct
            : wrong
          : ""

      return css`
    transform: ${$state.clickedOption === $index ? "translateX(2rem)" : ""};
    background-color: ${apply({
      correct: "var(--color-correct)",
      wrong: "var(--color-wrong)",
    })};
    border: ${apply({
      correct: "2px solid var(--color-correct)",
      wrong: "2px solid var(--color-wrong)",
    })};
    color: ${apply({
      correct: "var(--color-dark)",
      wrong: "var(--color-lightest)",
    })};
    width: 100%;
    text-align: : left;

    &:not()([disabled]):hover {
      transform: translateX(1.2rem)
    }
  `
    }}
  `
  return (
    <div>
      <H4>{state.apiData[state.currentQuestion].question}</H4>
      <Ul>
        {state.apiData[state.currentQuestion].options.map((option, index) => (
          <li key={option}>
            <OptionButton
              onClick={() => onClickOption(index)}
              disabled={userHasAnswered}
              $state={state}
              $index={index}
              $userHasAnswered={userHasAnswered}
            >
              {option}
            </OptionButton>
          </li>
        ))}
      </Ul>
    </div>
  )
}

export { Questions }
