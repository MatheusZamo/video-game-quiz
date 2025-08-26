import { useEffect, useReducer, useCallback } from "react"
import { Timer } from "@/components/timer"
import { Header } from "@/components/header"
import { Start } from "@/components/start"
import { Result } from "@/components/result"
import { ButtonNext } from "@/components/button-next"
import { Progress } from "@/components/progress"
import { Questions } from "@/components/questions"
import styled from "styled-components"

const reducer = (state, action) =>
  ({
    set_api_data: { ...state, apiData: action.apiData },

    clicked_some_option: {
      ...state,
      clickedOption: action.index,
      userScore:
        action.index === state.apiData[state.currentQuestion]?.correctOption
          ? state.userScore + state.apiData[state.currentQuestion]?.points
          : state.userScore,
    },

    clicked_next_question: {
      ...state,
      currentQuestion:
        state.currentQuestion + 1 === state.apiData.length
          ? 0
          : state.currentQuestion + 1,
      clickedOption: null,
      appStatus:
        state.currentQuestion + 1 === state.apiData.length
          ? "finished"
          : state.appStatus,
    },

    clicked_restart: {
      ...state,
      userScore: 0,
      appStatus: "ready",
      currentQuestion: 0,
      clickedOption: null,
    },

    clicked_start: {
      ...state,
      appStatus: "active",
    },

    game_over: {
      ...state,
      appStatus: "finished",
    },
  })[action.type] || state

const initialState = {
  currentQuestion: 0,
  apiData: [],
  clickedOption: null,
  userScore: 0,
  appStatus: "ready",
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/MatheusZamo/video-game-quiz/refs/heads/main/src/videogame-questions.json",
    )
      .then((response) => response.json())
      .then((apiData) => dispatch({ type: "set_api_data", apiData }))
      .catch((error) => alert(error.message))
  }, [])

  const handleClickOption = (index) =>
    dispatch({ type: "clicked_some_option", index })
  const handleClickNextQuestion = () =>
    dispatch({ type: "clicked_next_question" })
  const handleClickRestart = () => dispatch({ type: "clicked_restart" })
  const handleClickStart = () => dispatch({ type: "clicked_start" })
  const handleTimer = useCallback(
    ({ message }) => dispatch({ type: message }),
    [],
  )

  const userHasAnswered = state.clickedOption !== null
  const maxScore = state.apiData.reduce((acc, q) => acc + q.points, 0)

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
