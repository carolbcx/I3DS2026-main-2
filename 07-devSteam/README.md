# DevSteam

Projeto React + Vite com página de jogos, login, perfil, carrinho e tela de pagamentos.

## Como rodar

Abra dois terminais:

### 1. API local de métodos de pagamento

```bash
cd 07-devSteam
npm run api
```

A API sobe em `http://localhost:3001/api/payment-methods`.

### 2. Aplicação React

```bash
cd 07-devSteam
npm run dev
```

Depois acesse:

- `http://localhost:5173/` para a página inicial
- `http://localhost:5173/pagamentos` para cadastrar e excluir métodos de pagamento

## Regras da tela de pagamentos

- Cadastro e exclusão de métodos de pagamento são feitos via API local.
- Cartões e boletos são tratados separadamente na interface.
- Os dados ficam persistidos em `api/payment-methods.db.json`.
