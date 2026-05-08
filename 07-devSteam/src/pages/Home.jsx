import PromoCard from "../components/PromoCard";
import GameRow from "../components/GameRow";

import lol from "../assets/league-of-legends.png";
import dota from "../assets/dota-2.png";
import valorant from "../assets/valorant.png";
import cs from "../assets/counter-strike.png";

function Home({ addToCart }) {
  return (
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
      </section>
    </main>
  );
}

export default Home;
