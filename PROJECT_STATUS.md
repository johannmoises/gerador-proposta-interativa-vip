# Project Status

## Checkpoint Oficial

Status: versão estável validada em produção.

Data do checkpoint: 13 de maio de 2026.

Este checkpoint representa a base estável oficial do sistema de propostas interativas da Pixel Demand, publicada na Vercel via GitHub e testada com sucesso.

## Rotas Funcionando

- `/propostas/brooklyn-academia`
- `/propostas/donna-angela`
- `/propostas/grand-villagio`

## Funcionalidades Validadas

- `Ctrl + Shift + E` para ativar/desativar modo admin;
- `QuickEditModal`;
- edição visual por clique;
- edição de fonte responsiva por `desktop`, `tablet` e `mobile`;
- `localStorage` para rascunhos locais;
- Exportar HTML;
- Exportar PDF dark;
- deploy Vercel via GitHub.

## Fluxo Oficial

Fonte oficial de cada proposta publicada: `src/data/proposals.js`.

Imagens oficiais de produção: `public/`.

Exemplo de caminho público para usar no objeto da proposta:

```js
"/imagens identidade visual pixel demand/nonna.jpg"
```

Fluxo diário:

1. Alterar dados, textos, valores, imagens e informações do cliente em `src/data/proposals.js`.
2. Garantir que imagens finais estejam em `public/`.
3. Testar localmente em `http://localhost:5173/propostas/slug-do-cliente`.
4. Rodar `npm run build`.
5. Abrir a proposta em aba anônima para confirmar que ela não depende de `localStorage`.
6. Publicar com `git status`, `git add .`, `git commit -m "Atualiza proposta do cliente X"` e `git push`.

O `localStorage` continua existindo para rascunho e teste visual no modo admin, mas não é a fonte final da versão publicada.

## Não Quebrar

- não remover `data-pd-style`;
- não remover `renderVisualStyles()`;
- não remover `QuickEditModal`;
- não remover `Ctrl + Shift + E`;
- não tratar `localStorage` como fonte final publicada;
- não publicar imagens finais fora de `public/`;
- não usar caminhos locais de desenvolvimento para imagens finais;
- não mexer no `runtime.js` sem validar desktop e mobile;
- não publicar sem `npm run build` e teste local;
- não publicar sem validar a proposta em aba anônima;
- não alterar assets, rotas ou layout durante melhorias pontuais.

## Observação

Novas melhorias devem partir deste estado estável e preservar o visual dark/neon, a estrutura baseada em `PROPOSTA`, o modo admin e o fluxo de publicação GitHub -> Vercel.
