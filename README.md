# Restaurante QR PWA (Next.js 14)

MVP para restaurante com QR por mesa, cliente sem login e backoffice para staff/admin.

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
- NextAuth (Credentials)
- PWA via `next-pwa`
- Realtime por polling (4s), pronto para evoluir para WebSocket

## Funcionalidades
### Cliente (`/t/{token}`)
- Ver menu e pesquisar itens
- Carrinho e envio de pedidos
- Ver estado dos pedidos
- Ver conta total da mesa
- Pedir pagamento (Dinheiro / MBWay / Multibanco)

### Staff
- `/staff/orders`: ver pedidos e atualizar estado
- `/staff/payments`: confirmar pagamentos pendentes
- `/staff/tables/[id]`: visão resumida por mesa

### Admin
- `/admin/menu`: CRUD base de categorias e itens
- `/admin/tables`: criar mesas + imprimir QRs
- `/admin/users`: gerir utilizadores
- `/admin/settings`: configurações de restaurante/pagamento

## Segurança e decisões
- Token de mesa não sequencial (`nanoid(32)`)
- Validação com Zod nas APIs públicas
- Preço e total calculados no servidor
- Rate limit público simples (memória)
- Pagamentos em modo manual (staff confirma)

---

## Pré-requisitos (IMPORTANTE)
Se recebeu erros como:
- `'cp' is not recognized...`
- `'docker' is not recognized...`
- `'npm' is not recognized...`

isso significa que as ferramentas não estão instaladas ou não estão no `PATH`.

Instale:
1. **Node.js 20+** (inclui `npm`): https://nodejs.org/
2. **Docker Desktop** (opcional, para Postgres em container): https://www.docker.com/products/docker-desktop/

Depois reabra o terminal.

---

## Setup local (macOS/Linux)
1. Criar `.env`:
```bash
cp .env.example .env
```
2. Subir PostgreSQL:
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

## Setup local (Windows - PowerShell)
1. Criar `.env`:
```powershell
Copy-Item .env.example .env
```
2. Subir PostgreSQL (com Docker Desktop):
```powershell
docker compose up -d
```
3. Instalar dependências:
```powershell
npm install
```
4. Prisma:
```powershell
npm run prisma:generate
npx prisma migrate dev --name init
npm run prisma:seed
```
5. Correr app:
```powershell
npm run dev
```

## Sem Docker (alternativa)
Se não tiver Docker, pode usar PostgreSQL instalado localmente:
1. Instale PostgreSQL.
2. Ajuste `DATABASE_URL` no `.env`.
3. Execute apenas:
```bash
npm run prisma:generate
npx prisma migrate dev --name init
npm run prisma:seed
npm run dev
```



## Erro comum: "@prisma/client did not initialize yet"
Se vir este erro, faça:
```bash
npm run prisma:generate
```
Depois reinicie o servidor (`npm run dev`).

Se ainda falhar, execute também:
```bash
npx prisma migrate dev --name init
npm run prisma:seed
```

## Como navegar na interface
1. Abrir `http://localhost:3000` para ver a página inicial com atalhos e explicações.
2. Clicar numa mesa demo para entrar como cliente (sem login).
3. Para backoffice, clicar em **Entrar** e usar credenciais seed.
4. Staff: `/staff/orders` e `/staff/payments`.
5. Admin: `/admin/menu`, `/admin/tables`, `/admin/users`, `/admin/settings`.

## Nota sobre PWA em desenvolvimento
Se aparecer no terminal `"[PWA] PWA support is disabled"`, está correto: o `next-pwa` fica desligado no `next dev` por design.
Para testar PWA ativa use:
```bash
npm run build
npm run start
```

## Credenciais seed
- Admin: `admin@rest.local` / `Admin123!`
- Staff: `staff@rest.local` / `Staff123!`

## PWA
- Manifest: `public/manifest.json`
- Ícone vetorial (sem binários): `public/icon.svg`
- Cache mínimo do endpoint de menu público
