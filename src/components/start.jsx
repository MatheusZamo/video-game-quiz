const Start = ({ state, onClickStart }) => (
  <div className="start">
    <h2>Bem vindo ao Quiz dos Videogames!</h2>
    <h4>{state.apiData.length} questões pra te testar</h4>
    <div>
      <button onClick={onClickStart} className="btn btn-ui">
        Bora começar
      </button>
    </div>
  </div>
)

export { Start }
