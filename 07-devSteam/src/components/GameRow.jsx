function GameRow({ image, title, price, addToCart }) {
  return (
    <div className="row align-items-center bg-primary text-white rounded p-3 mb-3">
      <div className="col-12 col-md-3 text-center">
        <img src={image} className="img-fluid rounded" />
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <h5>{title}</h5>
      </div>

      <div className="col-12 col-md-3 text-md-end">
        <strong>{price}</strong>
        <br />
        <button
          className="btn btn-success mt-2"
          onClick={() => addToCart({ title, price })}
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}

export default GameRow;
