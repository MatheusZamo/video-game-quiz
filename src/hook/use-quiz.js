import { useEffect, useReducer, useCallback } from "react"

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

const useQuiz = () => {
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

  return {
    state,
    userHasAnswered,
    maxScore,
    handleClickOption,
    handleClickNextQuestion,
    handleClickRestart,
    handleClickStart,
    handleTimer,
  }
}

export { useQuiz }
