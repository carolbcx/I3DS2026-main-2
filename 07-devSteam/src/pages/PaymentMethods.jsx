import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaCreditCard, FaReceipt, FaTrashAlt, FaPlus } from "react-icons/fa";

import {
  createPaymentMethod,
  deletePaymentMethod,
  listPaymentMethods,
} from "../services/paymentMethodsApi";

const initialForm = {
  type: "card",
  nickname: "",
  holderName: "",
  cardNumber: "",
  expiry: "",
  document: "",
  email: "",
};

function maskCardNumber(value) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function PaymentMethodsPage() {
  const [methods, setMethods] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function loadMethods() {
    try {
      setError("");
      setLoading(true);
      const data = await listPaymentMethods();
      setMethods(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMethods();
  }, []);

  const cardMethods = useMemo(
    () => methods.filter((method) => method.type === "card"),
    [methods],
  );

  const boletoMethods = useMemo(
    () => methods.filter((method) => method.type === "boleto"),
    [methods],
  );

  function handleChange(event) {
    const { name, value } = event.target;

    if (name === "cardNumber") {
      setForm((current) => ({ ...current, [name]: maskCardNumber(value) }));
      return;
    }

    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSubmitting(true);
      setError("");

      const payload =
        form.type === "card"
          ? {
              type: "card",
              nickname: form.nickname.trim(),
              holderName: form.holderName.trim(),
              cardNumber: form.cardNumber.replace(/\s/g, ""),
              lastDigits: form.cardNumber.replace(/\s/g, "").slice(-4),
              expiry: form.expiry,
            }
          : {
              type: "boleto",
              nickname: form.nickname.trim(),
              document: form.document.trim(),
              email: form.email.trim(),
            };

      await createPaymentMethod(payload);
      setForm(initialForm);
      await loadMethods();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    try {
      setError("");
      await deletePaymentMethod(id);
      await loadMethods();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="container my-4 payment-page">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h1 className="payment-title mb-1">Pagamentos</h1>
          <p className="payment-subtitle mb-0">
            Cadastre e remova cartões ou boletos usando a API local.
          </p>
        </div>

        <Link to="/" className="btn btn-outline-light">
          Voltar para os jogos
        </Link>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-5">
          <div className="card payment-card shadow-sm">
            <div className="card-body">
              <h2 className="h4 mb-3 d-flex align-items-center gap-2">
                <FaPlus /> Novo método
              </h2>

              <form onSubmit={handleSubmit} className="payment-form">
                <label className="form-label">Tipo</label>
                <select
                  className="form-select mb-3"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                >
                  <option value="card">Cartão</option>
                  <option value="boleto">Boleto</option>
                </select>

                <label className="form-label">Apelido</label>
                <input
                  className="form-control mb-3"
                  name="nickname"
                  value={form.nickname}
                  onChange={handleChange}
                  placeholder="Ex.: Cartão principal"
                  required
                />

                {form.type === "card" ? (
                  <>
                    <label className="form-label">Nome do titular</label>
                    <input
                      className="form-control mb-3"
                      name="holderName"
                      value={form.holderName}
                      onChange={handleChange}
                      placeholder="Nome impresso no cartão"
                      required
                    />

                    <label className="form-label">Número do cartão</label>
                    <input
                      className="form-control mb-3"
                      name="cardNumber"
                      value={form.cardNumber}
                      onChange={handleChange}
                      placeholder="0000 0000 0000 0000"
                      required
                    />

                    <label className="form-label">Validade</label>
                    <input
                      className="form-control mb-3"
                      name="expiry"
                      type="month"
                      value={form.expiry}
                      onChange={handleChange}
                      required
                    />
                  </>
                ) : (
                  <>
                    <label className="form-label">CPF/CNPJ</label>
                    <input
                      className="form-control mb-3"
                      name="document"
                      value={form.document}
                      onChange={handleChange}
                      placeholder="000.000.000-00"
                      required
                    />

                    <label className="form-label">E-mail para envio</label>
                    <input
                      className="form-control mb-3"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="cliente@email.com"
                      required
                    />
                  </>
                )}

                {error ? (
                  <div className="alert alert-danger py-2">{error}</div>
                ) : null}

                <button className="btn btn-primary w-100" disabled={submitting}>
                  {submitting ? "Salvando..." : "Cadastrar método"}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-7">
          <div className="row g-4">
            <div className="col-12">
              <div className="card payment-card shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                    <h2 className="h4 mb-0 d-flex align-items-center gap-2">
                      <FaCreditCard /> Cartões
                    </h2>
                    <span className="badge text-bg-info">
                      {cardMethods.length}
                    </span>
                  </div>

                  {loading ? (
                    <p className="mb-0">Carregando...</p>
                  ) : cardMethods.length === 0 ? (
                    <p className="mb-0">Nenhum cartão cadastrado.</p>
                  ) : (
                    <div className="payment-list">
                      {cardMethods.map((method) => (
                        <div key={method.id} className="payment-item">
                          <div>
                            <strong>{method.nickname}</strong>
                            <div className="text-muted small">
                              {method.holderName}
                            </div>
                            <div className="small">
                              **** **** **** {method.lastDigits}
                            </div>
                            <div className="small text-muted">
                              Validade: {method.expiry}
                            </div>
                          </div>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDelete(method.id)}
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-12">
              <div className="card payment-card shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                    <h2 className="h4 mb-0 d-flex align-items-center gap-2">
                      <FaReceipt /> Boletos
                    </h2>
                    <span className="badge text-bg-warning">
                      {boletoMethods.length}
                    </span>
                  </div>

                  {loading ? (
                    <p className="mb-0">Carregando...</p>
                  ) : boletoMethods.length === 0 ? (
                    <p className="mb-0">Nenhum boleto cadastrado.</p>
                  ) : (
                    <div className="payment-list">
                      {boletoMethods.map((method) => (
                        <div key={method.id} className="payment-item">
                          <div>
                            <strong>{method.nickname}</strong>
                            <div className="text-muted small">
                              {method.document}
                            </div>
                            <div className="small">{method.email}</div>
                          </div>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDelete(method.id)}
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentMethodsPage;
