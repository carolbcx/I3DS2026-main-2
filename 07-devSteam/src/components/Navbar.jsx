import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import logoGame from "../assets/logo_convertida.png";

function Navbar({
  cart,
  user,
  showAuthPanel,
  showCartPanel,
  showPaymentsPanel,
  onToggleAuth,
  onToggleCart,
  onTogglePayments,
  onLogout,
  onLoginSubmit,
  loginEmail,
  loginPassword,
  onLoginEmailChange,
  onLoginPasswordChange,
}) {
  const total = cart.length * 99.9;

  return (
    <>
      <div className="header-bg"></div>

      <header className="navbar">
        <div className="logo">
          <img src={logoGame} alt="Logo" />

          <h2>DevSteam</h2>
        </div>

        <input type="text" placeholder="Buscar" />

        <div className="navbar-actions">
          <button
            className="btn btn-outline-info btn-sm me-2"
            onClick={onTogglePayments}
          >
            Pagamentos
          </button>

          <button
            className="btn btn-outline-light btn-sm me-2"
            onClick={onToggleAuth}
          >
            {user ? `Olá, ${user.email.split("@")[0]}` : "Entrar"}
          </button>

          <button
            className="btn btn-primary btn-sm d-flex align-items-center"
            onClick={onToggleCart}
          >
            <FaShoppingCart style={{ marginRight: 8 }} /> {cart.length}
          </button>

          {showAuthPanel && (
            <div className="corner-panel navbar-panel">
              {user ? (
                <div className="d-flex flex-column gap-2">
                  <div className="small text-white-50">{user.email}</div>
                  <div className="d-flex gap-2">
                    <Link
                      to="/profile"
                      className="btn btn-outline-primary btn-sm"
                    >
                      Perfil
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={onLogout}
                    >
                      Sair
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    onLoginSubmit(e);
                  }}
                >
                  <input
                    className="form-control mb-2"
                    placeholder="Email"
                    value={loginEmail}
                    onChange={(e) => onLoginEmailChange(e.target.value)}
                  />
                  <input
                    className="form-control mb-2"
                    type="password"
                    placeholder="Senha"
                    value={loginPassword}
                    onChange={(e) => onLoginPasswordChange(e.target.value)}
                  />
                  <button className="btn btn-primary w-100">Entrar</button>
                </form>
              )}
            </div>
          )}

          {showCartPanel && (
            <div className="corner-panel navbar-panel navbar-panel-cart">
              {cart.length === 0 ? (
                <p className="mb-2">Nenhum item no carrinho</p>
              ) : (
                <>
                  {cart.map((item, index) => (
                    <div className="cart-game" key={index}>
                      <img src={item.image} alt={item.title} />

                      <div>
                        <p>{item.title}</p>

                        <span>{item.price}</span>
                      </div>
                    </div>
                  ))}

                  <div className="cart-total">
                    <p>Total:</p>

                    <h3>R${total.toFixed(2)}</h3>
                  </div>
                </>
              )}
            </div>
          )}

          {showPaymentsPanel && (
            <div className="corner-panel navbar-panel navbar-panel-payments">
              <div className="d-flex flex-column gap-2">
                <strong className="mb-1">Pagamento</strong>
                <div className="small text-white-50">
                  Cadastre cartão ou boleto na tela completa de pagamentos.
                </div>
                <div className="d-flex gap-2 flex-wrap">
                  <Link to="/pagamentos" className="btn btn-info btn-sm">
                    Abrir tela
                  </Link>
                  <Link
                    to="/pagamentos"
                    className="btn btn-outline-light btn-sm"
                  >
                    Ver métodos
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}

export default Navbar;
