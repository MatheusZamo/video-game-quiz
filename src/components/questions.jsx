import { OptionButton } from "./shared/button"
import styled from "styled-components"

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
