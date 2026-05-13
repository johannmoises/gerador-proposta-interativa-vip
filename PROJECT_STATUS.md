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

## Não Quebrar

- não remover `data-pd-style`;
- não remover `renderVisualStyles()`;
- não remover `QuickEditModal`;
- não remover `Ctrl + Shift + E`;
- não mexer no `runtime.js` sem validar desktop e mobile;
- não publicar sem `npm run build` e teste local;
- não alterar assets, rotas ou layout durante melhorias pontuais.

## Observação

Novas melhorias devem partir deste estado estável e preservar o visual dark/neon, a estrutura baseada em `PROPOSTA`, o modo admin e o fluxo de publicação GitHub -> Vercel.
