import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    username: ""
  });

  // BUSCAR DADOS DO USUÁRIO (API REAL)
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then(res => res.json())
      .then(data => {
        setUser({
          name: data.name,
          email: data.email,
          username: data.username
        });
      });
  }, []);

  // ATUALIZAR CAMPOS
  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  // SALVAR (PUT)
  function handleSubmit(e) {
    e.preventDefault();

    fetch("https://jsonplaceholder.typicode.com/users/1", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(() => {
        alert("Perfil atualizado com sucesso!");
      });
  }

  return (
    <div className="container my-5" style={{ maxWidth: "500px" }}>
      <h2 className="text-center mb-4">Meu Perfil</h2>

      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <input
          className="form-control mb-3"
          name="name"
          placeholder="Nome"
          value={user.name}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          name="username"
          placeholder="Usuário"
          value={user.username}
          onChange={handleChange}
        />

        <button className="btn btn-primary w-100">
          Salvar alterações
        </button>
      </form>
    </div>
  );
}

export default Profile;