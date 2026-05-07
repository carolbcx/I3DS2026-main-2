function GameRow({ image, title, price, addToCart }) {

  function handleAdd() {
    addToCart({
      image,
      title,
      price
    })
  }

  return (
    <div className="game-row">

      <img src={image} alt={title} />

      <div className="game-content">

        <div>
          <h3>{title}</h3>
          <p>Ação, Estratégia, Multijogador.</p>
        </div>

        <div className="game-buy">

          <h2>{price}</h2>

          <button onClick={handleAdd}>
            ADICIONAR AO CARRINHO
          </button>

        </div>

      </div>

    </div>
  )
}

export default GameRow