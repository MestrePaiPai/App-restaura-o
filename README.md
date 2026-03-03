# Restaurante QR PWA (Next.js 14)

MVP completo para restaurante com QR por mesa, cliente sem login e backoffice para staff/admin.

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind
- Prisma + PostgreSQL
- NextAuth (Credentials)
- PWA via `next-pwa`
- Realtime preparado com polling (4s) e APIs prontas para evolução para WebSocket.

## Funcionalidades
### Cliente (`/t/{token}`)
- Menu por pesquisa, carrinho e envio de pedidos.
- Observações por item suportadas na API.
- Estado de pedidos e conta total da mesa.
- Pedido de pagamento (Dinheiro, MBWay, Multibanco) cria `PaymentIntent` interno.

### Staff
- `/staff/orders`: lista de pedidos e mudança de estado (`NEW -> ... -> SERVED`).
- `/staff/payments`: confirmação manual de pagamentos pendentes.
- `/staff/tables/[id]`: visão resumida da mesa.

### Admin
- `/admin/menu`: CRUD base de categorias e itens.
- `/admin/tables`: criação de mesas e página de impressão de QRs.
- `/admin/users`: criação de utilizadores staff/admin.
- `/admin/settings`: dados do restaurante e pagamentos.

## Segurança e decisões
- Tokens de mesa com `nanoid(32)` não sequencial.
- Validação com Zod nas APIs públicas.
- Preço calculado sempre no servidor (não confia no cliente).
- Rate limit público simples em memória por IP/header.
- MVP de pagamentos com confirmação manual pelo staff (sem dependências externas).

## Setup local
1. Copiar env:
```bash
cp .env.example .env
```
2. Subir Postgres:
```bash
docker compose up -d
```
3. Instalar dependências:
```bash
npm install
```
4. Prisma:
```bash
npm run prisma:generate
npx prisma migrate dev --name init
npm run prisma:seed
```
5. Correr app:
```bash
npm run dev
```

## Credenciais seed
- Admin: `admin@rest.local` / `Admin123!`
- Staff: `staff@rest.local` / `Staff123!`

## PWA
- Manifest em `public/manifest.json`
- Ícone vetorial (sem ficheiros binários) em `public/icon.svg`
- Cache mínimo para endpoint de menu público.
