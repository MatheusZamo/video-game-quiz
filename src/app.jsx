import { Header } from "@/components/header"
import styled, { createGlobalStyle, ThemeProvider } from "styled-components"
import { Main } from "./components/main"
import { theme } from "./resources/theme"

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
  color: ${({ theme }) => theme.colors.gray};
  background-color: ${({ theme }) => theme.colors.white};
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
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Div>
        <Header />
        <Main />
      </Div>
    </ThemeProvider>
  )
}

export { App }
