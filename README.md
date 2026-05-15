# Outfit Store

Aplicacao de e-commerce full stack desenvolvida com Next.js, TypeScript, MongoDB e NextAuth. O projeto foi organizado para servir como vitrine de portfólio e como base para evoluir uma loja virtual com autenticacao, carrinho, checkout e painel administrativo.

## Preview

![Home preview](./public/images/shirts1.jpg)

Deploy de referencia informado no projeto: `https://outfit-store-alpha.vercel.app/`

## Stack

- Next.js
- React
- TypeScript
- MongoDB + Mongoose
- NextAuth
- Tailwind CSS
- PayPal
- Cloudinary
- Jest

## Funcionalidades

- Catalogo com listagem, detalhe de produto e estoque
- Carrinho persistido em cookie
- Login e cadastro com NextAuth
- Checkout com endereco, pagamento e criacao de pedido
- Historico de pedidos do usuario
- Painel admin com produtos, usuarios, pedidos e resumo de vendas
- Upload de imagem com Cloudinary

## Como rodar

1. Instale as dependencias:

```bash
npm install
```

2. Crie seu arquivo de ambiente a partir do exemplo:

```bash
cp .env.example .env
```

No Windows PowerShell, voce pode usar:

```powershell
Copy-Item .env.example .env
```

3. Preencha as variaveis do `.env` com credenciais locais ou de teste.

4. Rode o projeto:

```bash
npm run dev
```

5. Acesse `http://localhost:3000`.

## Variaveis de ambiente

O projeto usa estas variaveis:

- `MONGODB_URI`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `PAYPAL_CLIENT_ID`
- `CLOUDINARY_SECRET`
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- `NEXT_PUBLIC_CLOUDINARY_API_KEY`

Veja o arquivo [`.env.example`](./.env.example) para o formato esperado.

## Dados de demo

Ao popular o banco com a rota de seed, o projeto cria estes usuarios de teste:

- Admin: `admin@outfitstore.com` / `123456`
- Cliente: `victor@example.com` / `123456`

## Popular o banco

Com a aplicacao configurada e conectada ao MongoDB, execute a rota de seed uma vez para inserir os dados iniciais:

```text
GET /api/seed
```

## Scripts

- `npm run dev`: ambiente de desenvolvimento
- `npm run build`: build de producao
- `npm run start`: inicia a build
- `npm run lint`: verifica o codigo
- `npm run test`: executa os testes

## Observacoes para portfólio

- O repositório foi preparado para nao versionar segredos locais.
- As credenciais reais devem ser regeneradas se já tiverem sido expostas anteriormente.
- O deploy pode exigir configuracao adicional de MongoDB, PayPal e Cloudinary.

## Licenca

Este projeto esta sob a licenca MIT. Veja [LICENSE](./LICENSE).
