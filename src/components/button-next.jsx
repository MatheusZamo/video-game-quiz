import styled from "styled-components"

const ButtonNext = ({ state, onClickNextQuestion }) => {
  const Button = styled.button`
    display: block;
    font-family: inherit;
    color: inherit;
    background-color: transparent;
    font-size: 2rem;
    padding: 1.2rem 2.4rem;
    cursor: pointer;
    border-radius: 100px;
    transition: 0.3s;
    border: 1px solid #d3d3d3;
    float: right;
  `
  return (
    <Button onClick={onClickNextQuestion}>
      {state.currentQuestion === state.apiData.length - 1
        ? "Finalizar"
        : "Próxima"}
    </Button>
  )
}

export { ButtonNext }
