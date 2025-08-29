import { useState, useEffect } from "react"
import styled from "styled-components"

const secondsPerQuestion = 30

const Timer = ({ state, onHandleTimer }) => {
  const [seconds, setSeconds] = useState(
    secondsPerQuestion * state.apiData.length,
  )
  useEffect(() => {
    let id

    const run = () => {
      if (seconds === 0) {
        onHandleTimer({ message: "game_over" })
        return
      }

      id = setTimeout(() => setSeconds((prev) => prev - 1), 1000)
    }

    run()
    return () => clearTimeout(id)
  }, [seconds, onHandleTimer])

  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60

  const Div = styled.div`
    float: left;
    font-size: 1.8rem;
    color: ${({ theme }) => theme.colors.gray}
    padding: 1.35rem 2.8rem;
    border-radius: 100px;
  `

  return (
    <Div>
      {mins < 10 ? `0${mins}` : mins}:{secs < 10 ? `0${secs}` : secs}
    </Div>
  )
}

export { Timer }
