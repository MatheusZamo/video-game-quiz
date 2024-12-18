const App = () => {
  return (
    <div className="app">
      <main className="main">
        <div>
          <h4>Pergunta aqui</h4>
          <ul className="options">
            <li>
              <button className="btn btn-option">Opção 1</button>
            </li>
            <li>
              <button className="btn btn-option">Opção 2</button>
            </li>
            <li>
              <button className="btn btn-option">Opção 3</button>
            </li>
            <li>
              <button className="btn btn-option">Opção 4</button>
            </li>
          </ul>
        </div>
        <div>
          <button className="btn btn-ui">Próxima</button>
        </div>
      </main>
    </div>
  )
}

export { App }
