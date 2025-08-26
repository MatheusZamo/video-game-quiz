import styled from "styled-components"

const Progress = ({ state, maxScore, userHasAnswered }) => {
  const progressValue = userHasAnswered
    ? state.currentQuestion + 1
    : state.currentQuestion

  const Progress = styled.progress`
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 12px;
    grid-column: 1 / -1;
  `
  const Label = styled.label`
    width: 50rem;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
  `
  const Span = styled.span`
    text-align: right;
  `
  const Header = styled.header`
    margin-bottom: 4rem;
    font-size: 1.8rem;
    color: #495057;
  `
  return (
    <Header>
      <Label>
        <Progress max={state.apiData.length} value={progressValue}>
          {progressValue}
        </Progress>
        <span>
          Questão <b>{state.currentQuestion + 1}</b> / {state.apiData.length}
        </span>
        <Span>
          <b>{state.userScore}</b> / {maxScore}
        </Span>
      </Label>
    </Header>
  )
}

export { Progress }
