import { Timer } from "@/components/timer"
import { Progress } from "@/components/progress"
import { Questions } from "@/components/questions"
import { Button } from "./shared/button"
import styled from "styled-components"

const Quiz = ({
  state,
  maxScore,
  onClickOption,
  onHandleTimer,
  onClickNextQuestion,
}) => {
  const userHasAnswered = state.clickedOption !== null

  const NextButton = styled(Button)`
    float: right;
  `
  return (
    <>
      <Progress
        state={state}
        maxScore={maxScore}
        userHasAnswered={userHasAnswered}
      />
      <Questions
        state={state}
        userHasAnswered={userHasAnswered}
        onClickOption={onClickOption}
      />
      <div>
        <Timer state={state} onHandleTimer={onHandleTimer} />
        {userHasAnswered && (
          <NextButton onClick={onClickNextQuestion}>
            {state.currentQuestion === state.apiData.length - 1
              ? "Finalizar"
              : "Próxima"}
          </NextButton>
        )}
      </div>
    </>
  )
}

export { Quiz }
