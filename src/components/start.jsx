import styled from "styled-components"
import { Button } from "./shared/button"

const Start = ({ state, onClickStart }) => {
  const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `
  const H2 = styled.h2`
    font-size: 3.6rem;
    margin-bottom: 2rem;
    text-align: center;
  `
  const H4 = styled.h4`
    font-size: 2.2rem;
    font-weight: 600;
    margin-bottom: 2.4rem;
  `
  const StartButton = styled(Button)``
  return (
    <Div>
      <H2>Bem vindo ao Quiz dos Videogames!</H2>
      <H4>{state.apiData.length} questões pra te testar</H4>
      <div>
        <StartButton onClick={onClickStart}>Bora começar</StartButton>
      </div>
    </Div>
  )
}

export { Start }
