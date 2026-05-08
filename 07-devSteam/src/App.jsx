import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import PromoCard from "./components/PromoCard";
import GameRow from "./components/GameRow";

import lol from "./assets/league-of-legends.png";
import dota from "./assets/dota-2.png";
import valorant from "./assets/valorant.png";
import cs from "./assets/counter-strike.png";

// Profile moved to its own page (Login/Profile as separate routes)

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  useEffect(() => {
    const onAuth = () => {
      try {
        setUser(JSON.parse(localStorage.getItem("user")));
      } catch {
        setUser(null);
      }
    };

    window.addEventListener("auth", onAuth);
    window.addEventListener("storage", onAuth);

    return () => {
      window.removeEventListener("auth", onAuth);
      window.removeEventListener("storage", onAuth);
    };
  }, []);

  function handleLogin(e) {
    e.preventDefault();
    const u = { email: loginEmail };
    localStorage.setItem("user", JSON.stringify(u));
    window.dispatchEvent(new Event("auth"));
    setUser(u);
    setLoginEmail("");
    setLoginPassword("");
    setShowAuthPanel(false);
  }

  function handleLogout() {
    localStorage.removeItem("user");
    setUser(null);
    window.dispatchEvent(new Event("auth"));
  }

  function addToCart(game) {
    setCart([...cart, game]);
  }

  const [showCartPanel, setShowCartPanel] = useState(false);
  const [showAuthPanel, setShowAuthPanel] = useState(false);
  const [showPaymentsPanel, setShowPaymentsPanel] = useState(false);

  function toggleCart() {
    setShowCartPanel((s) => !s);
  }

  function toggleAuth() {
    setShowAuthPanel((s) => !s);
  }

  function togglePayments() {
    setShowPaymentsPanel((s) => !s);
  }

  return (
    <div className="app">
      <Navbar
        cart={cart}
        user={user}
        showAuthPanel={showAuthPanel}
        showCartPanel={showCartPanel}
        showPaymentsPanel={showPaymentsPanel}
        onToggleAuth={toggleAuth}
        onToggleCart={toggleCart}
        onTogglePayments={togglePayments}
        onLogout={handleLogout}
        onLoginSubmit={handleLogin}
        loginEmail={loginEmail}
        loginPassword={loginPassword}
        onLoginEmailChange={setLoginEmail}
        onLoginPasswordChange={setLoginPassword}
      />

      {showPaymentsPanel && (
        <div
          className="payments-overlay"
          onClick={() => setShowPaymentsPanel(false)}
        >
          <div
            className="payments-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
              <div>
                <h2 className="mb-1">Formas de pagamento</h2>
                <p className="mb-0 text-white-50">
                  Cadastre cartão ou boleto e acesse a tela completa de
                  pagamentos.
                </p>
              </div>

              <button
                className="btn btn-outline-light btn-sm"
                onClick={() => setShowPaymentsPanel(false)}
              >
                Fechar
              </button>
            </div>

            <div className="row g-3">
              <div className="col-12 col-md-6">
                <div className="payment-quick-card">
                  <h3>Cartão</h3>
                  <p>Adicionar e remover cartões com segurança.</p>
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => {
                      setShowPaymentsPanel(false);
                      window.location.href = "/pagamentos";
                    }}
                  >
                    Abrir cadastro de cartão
                  </button>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="payment-quick-card">
                  <h3>Boleto</h3>
                  <p>Cadastro rápido e exclusão dos boletos ativos.</p>
                  <button
                    className="btn btn-info w-100"
                    onClick={() => {
                      setShowPaymentsPanel(false);
                      window.location.href = "/pagamentos";
                    }}
                  >
                    Abrir cadastro de boleto
                  </button>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-3 flex-wrap">
              <a href="/pagamentos" className="btn btn-outline-info">
                Ir para a página completa
              </a>
              <button
                className="btn btn-success"
                onClick={() => setShowPaymentsPanel(false)}
              >
                Entendi
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="container my-4">
        <section>
          <h2 className="section-title text-center mb-4">PROMOÇÕES</h2>

          <div className="row g-4 justify-content-center">
            <div className="col-12 col-sm-6 col-lg-3">
              <PromoCard
                image={lol}
                title="League of Legends"
                price="R$99,90"
                addToCart={addToCart}
              />
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <PromoCard
                image={dota}
                title="Dota 2"
                price="R$99,90"
                addToCart={addToCart}
              />
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <PromoCard
                image={valorant}
                title="Valorant"
                price="R$99,90"
                addToCart={addToCart}
              />
            </div>
          </div>
        </section>

        <section className="games-section">
          <h2 className="section-title">OUTROS JOGOS</h2>

          <GameRow
            image={cs}
            title="Counter Strike"
            price="R$99,90"
            addToCart={addToCart}
          />

          <GameRow
            image={cs}
            title="Counter Strike"
            price="R$99,90"
            addToCart={addToCart}
          />

          <GameRow
            image={cs}
            title="Counter Strike"
            price="R$99,90"
            addToCart={addToCart}
          />

          <GameRow
            image={cs}
            title="Counter Strike"
            price="R$99,90"
            addToCart={addToCart}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
