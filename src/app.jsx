import { Timer } from "@/components/timer"
import { Header } from "@/components/header"
import { Start } from "@/components/start"
import { Result } from "@/components/result"
import { ButtonNext } from "@/components/button-next"
import { Progress } from "@/components/progress"
import { Questions } from "@/components/questions"
import styled from "styled-components"
import { useQuiz } from "./hook/use-quiz"

const App = () => {
  const {
    state,
    userHasAnswered,
    maxScore,
    handleClickOption,
    handleClickNextQuestion,
    handleClickRestart,
    handleClickStart,
    handleTimer,
  } = useQuiz()

  const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `
  const Main = styled.main`
    width: 50rem;
  `

  return (
    <Div>
      <Header />
      <Main>
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
            <>
              <Progress
                state={state}
                maxScore={maxScore}
                userHasAnswered={userHasAnswered}
              />
              <Questions
                state={state}
                userHasAnswered={userHasAnswered}
                onClickOption={handleClickOption}
              />
              <div>
                <Timer state={state} onHandleTimer={handleTimer} />
                {userHasAnswered && (
                  <ButtonNext
                    state={state}
                    onClickNextQuestion={handleClickNextQuestion}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </Main>
    </Div>
  )
}

export { App }
