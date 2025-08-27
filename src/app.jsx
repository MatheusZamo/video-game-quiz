import { Header } from "@/components/header"
import styled, { createGlobalStyle } from "styled-components"
import { Main } from "./components/main"

const App = () => {
  const GlobalStyle = createGlobalStyle`
    * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

body {
  min-height: 100vh;
  color: var(--color-dark);
  background-color: var(--color-lightest);
  padding: 3.2rem;
}
  `

  const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `

  return (
    <>
      <GlobalStyle />
      <Div>
        <Header />
        <Main />
      </Div>
    </>
  )
}

export { App }
