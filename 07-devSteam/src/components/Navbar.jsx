import { FaShoppingCart } from 'react-icons/fa'
import logoGame from '../assets/logo_convertida.png'

function Navbar({ cart }) {

  const total = cart.length * 99.90

  return (
    <>
      <div className="header-bg"></div>

      <header className="navbar">

        <div className="logo">

          <img
            src={logoGame}
            alt="Logo"
          />

          <h2>DevSteam</h2>

        </div>

        <input type="text" placeholder="Buscar" />

        <div className="cart-box">

          <div className="cart-header">

            <FaShoppingCart className="cart-icon" />

            <div>
              <p className="cart-title">
                Carrinho
              </p>

              <span className="cart-count">
                {cart.length} itens
              </span>
            </div>

          </div>

          {cart.length === 0 ? (

            <p className="empty-cart">
              Nenhum item
            </p>

          ) : (

            cart.map((item, index) => (

              <div className="cart-game" key={index}>

                <img
                  src={item.image}
                  alt={item.title}
                />

                <div>
                  <p>{item.title}</p>

                  <span>{item.price}</span>
                </div>

              </div>

            ))

          )}

          <div className="cart-total">

            <p>Total:</p>

            <h3>
              R${total.toFixed(2)}
            </h3>

          </div>

        </div>

      </header>
    </>
  )
}

export default Navbar