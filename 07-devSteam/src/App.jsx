import { useState } from 'react'

import Navbar from './components/Navbar'
import PromoCard from './components/PromoCard'
import GameRow from './components/GameRow'

import lol from './assets/league-of-legends.png'
import dota from './assets/dota-2.png'
import valorant from './assets/valorant.png'
import cs from './assets/counter-strike.png'

function App() {

  const [cart, setCart] = useState([])

  function addToCart(game) {
    setCart([...cart, game])
  }

  return (
    <div className="app">

      <Navbar cart={cart} />

      <main className="container">

        <section>

          <h2 className="section-title">
            PROMOÇÕES
          </h2>

          <div className="promo-grid">

            <PromoCard
              image={lol}
              title="League of Legends"
              price="R$99,90"
              addToCart={addToCart}
            />

            <PromoCard
              image={dota}
              title="Dota 2"
              price="R$99,90"
              addToCart={addToCart}
            />

            <PromoCard
              image={valorant}
              title="Valorant"
              price="R$99,90"
              addToCart={addToCart}
            />

          </div>

        </section>

        <section className="games-section">

          <h2 className="section-title">
            OUTROS JOGOS
          </h2>

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
  )
}

export default App