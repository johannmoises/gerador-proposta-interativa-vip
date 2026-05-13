# Pixel Demand Propostas

Projeto local/Vercel para propostas comerciais interativas da Pixel Demand.

A vers?o validada em HTML ?nico foi preservada em:

- `index-elementor-v2.html`
- `backups/index-elementor-v2.funcional-2026-05-13.html`

## Rodar localmente

```bash
npm install
npm run dev
```

Depois acesse:

- `http://localhost:5173/propostas/brooklyn-academia`
- `http://localhost:5173/propostas/donna-angela`
- `http://localhost:5173/propostas/grand-villagio`

Tamb?m funciona no formato curto:

- `http://localhost:5173/brooklyn-academia`

## Estrutura

```text
src/
  data/
    proposals.js      # Dados por cliente, baseados no objeto PROPOSTA
  js/
    app.js            # Bootstrap Vite, resolve slug e injeta runtime
    runtime.js        # Runtime preservado do template validado
  styles/
    main.css          # CSS validado da proposta, incluindo admin, print e responsivo
  templates/
    shell.html        # Estrutura HTML do template/admin/modal
public/
  imagens identidade visual pixel demand/
backups/
```

## Criar nova proposta

1. Abra `src/data/proposals.js`.
2. Duplique um bloco dentro de `proposals`.
3. Troque o slug, cliente, textos, valores, imagens e escopo.
4. Acesse a URL correspondente, por exemplo:

```text
/propostas/novo-cliente
```

## Admin

Atalho: `Ctrl + Shift + E`.

Mantido:

- edi??o visual por clique;
- QuickEditModal;
- estilos por desktop/tablet/mobile;
- localStorage para rascunho;
- Exportar HTML;
- Exportar PDF dark.

## Deploy Vercel

1. Suba este projeto para o GitHub.
2. Importe o reposit?rio na Vercel.
3. Use build padr?o do Vite:
   - Build command: `npm run build`
   - Output directory: `dist`
4. O arquivo `vercel.json` mant?m as URLs por slug funcionando.
