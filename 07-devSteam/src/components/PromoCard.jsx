function PromoCard({ image, title, price, addToCart }) {

  function handleAdd() {
    addToCart({
      image,
      title,
      price
    })
  }

  return (
    <div className="promo-card">

      <img src={image} alt={title} />

      <div className="promo-info">

        <p>OFERTA EXCLUSIVA</p>

        <div className="price-row">
          <span>-50%</span>
          <h3>{price}</h3>
        </div>

        <button onClick={handleAdd}>
          ADICIONAR AO CARRINHO
        </button>

      </div>

    </div>
  )
}

export default PromoCard