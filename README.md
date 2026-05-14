# Pixel Demand Propostas

Projeto local/Vercel para propostas comerciais interativas da Pixel Demand.

Este repositório tem como base estável oficial a versão publicada na Vercel e validada em produção em 13 de maio de 2026.

A versão validada em HTML único foi preservada em:

- `index-elementor-v2.html`
- `backups/index-elementor-v2.funcional-2026-05-13.html`

## Rodar Localmente

```bash
npm install
npm run dev
```

Depois acesse:

- `http://localhost:5173/propostas/brooklyn-academia`
- `http://localhost:5173/propostas/donna-angela`
- `http://localhost:5173/propostas/grand-villagio`

Também funciona no formato curto:

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

## Criar Nova Proposta

Fonte oficial publicada: `src/data/proposals.js`.

O modo admin e o `localStorage` servem para rascunho, teste visual e ajuste rápido no navegador. A versão final que aparece na Vercel precisa estar salva nos arquivos do projeto.

1. Abra `src/data/proposals.js`.
2. Duplique uma proposta existente dentro de `proposals`.
3. Troque `slug`, cliente, textos, valores, imagens, escopo, condições e CTA diretamente no objeto da proposta.
4. Coloque imagens oficiais de produção dentro de `public/`.
5. Use caminhos públicos no objeto da proposta, por exemplo:

```js
"/imagens identidade visual pixel demand/nonna.jpg"
```

6. Acesse a URL correspondente, por exemplo:

```text
/propostas/novo-cliente
```

Antes de publicar, teste a nova proposta localmente no desktop e no mobile.

Teste final correto: abrir a rota em uma aba anônima. Se a proposta estiver certa em aba anônima, os dados estão no código e vão aparecer na Vercel.

## Admin

Atalho: `Ctrl + Shift + E`.

Funcionalidades validadas:

- edição visual por clique;
- `QuickEditModal`;
- estilos de fonte por `desktop`, `tablet` e `mobile`;
- `localStorage` para rascunho;
- Exportar HTML;
- Exportar PDF dark.

## Testar Antes De Publicar

```bash
npm run build
npm run dev
```

Checklist mínimo:

- abrir a rota da proposta;
- abrir a rota em aba anônima para validar sem `localStorage`;
- testar desktop e mobile;
- ativar admin com `Ctrl + Shift + E`;
- editar um texto pelo `QuickEditModal`;
- testar tamanho de fonte em desktop e mobile;
- salvar rascunho e recarregar;
- confirmar que o console não mostra erros.

No PowerShell, se `npm run build` for bloqueado por política de execução, use:

```bash
npm.cmd run build
```

## Publicação

Fluxo oficial:

```bash
git status
git add .
git commit -m "Atualiza proposta do cliente X"
git push
```

Deploy:

1. Subir alterações para o GitHub.
2. A Vercel publica a partir do repositório.
3. Usar build padrão do Vite:
   - Build command: `npm run build`
   - Output directory: `dist`
4. O arquivo `vercel.json` mantém as URLs por slug funcionando.

## Não Quebrar

- não remover `data-pd-style`;
- não remover `renderVisualStyles()`;
- não remover `QuickEditModal`;
- não remover `Ctrl + Shift + E`;
- não remover `localStorage`;
- não tratar `localStorage` como fonte final publicada;
- não publicar imagens finais fora de `public/`;
- não usar caminhos locais de desenvolvimento para imagens finais;
- não mexer no runtime sem validar desktop e mobile;
- não publicar sem `npm run build` e teste local;
- não publicar sem conferir a proposta em aba anônima;
- não alterar rotas, assets ou identidade visual sem motivo claro.
