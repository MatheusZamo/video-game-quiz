import { Start } from "@/components/start"
import { Result } from "@/components/result"
import styled from "styled-components"
import { useQuiz } from "../hook/use-quiz"
import { Quiz } from "./quiz"

const Main = () => {
  const {
    state,
    maxScore,
    handleClickOption,
    handleClickNextQuestion,
    handleClickRestart,
    handleClickStart,
    handleTimer,
  } = useQuiz()

  const StyledMain = styled.main`
    width: 50rem;
  `
  return (
    <StyledMain>
      <div>
        {state.appStatus === "ready" && (
          <Start state={state} onClickStart={handleClickStart} />
        )}
        {state.appStatus === "finished" && (
          <Result
            state={state}
            maxScore={maxScore}
            onClickRestart={handleClickRestart}
          />
        )}

        {state.apiData.length > 0 && state.appStatus === "active" && (
          <Quiz
            state={state}
            maxScore={maxScore}
            onClickNextQuestion={handleClickNextQuestion}
            onHandleTimer={handleTimer}
            onClickOption={handleClickOption}
          />
        )}
      </div>
    </StyledMain>
  )
}

export { Main }
