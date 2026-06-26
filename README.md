https://carloseduardods.github.io/Landing-Page-Lista-Smart/

# Lista Smart — Landing Page

Landing page do app **Lista Smart** (comparador colaborativo de preços de supermercado).

## Arquivos

- `index.html` — estrutura da página
- `styles.css` — todo o visual (cores, tipografia, layout responsivo)
- `script.js` — interatividade (card de comparação, menu mobile, animações, validação do formulário)

## Como rodar

Abra o `index.html` no navegador. Os três arquivos precisam ficar **na mesma pasta**.

Para hospedar, é só subir a pasta inteira em qualquer serviço de site estático
(GitHub Pages, Netlify, Vercel, Cloudflare Pages, etc.).

## Personalizar

- **Botão "Começar agora":** no `index.html`, troque o `href="#"` da seção `#baixar`
  pelo link do seu APK (Google Drive ou GitHub Releases).
- **Formulário de parceiros:** hoje é só front-end (mostra mensagem de sucesso, mas não
  envia para lugar nenhum). Para receber os contatos, ligue o `#sendBtn` no `script.js`
  ao seu backend (Spring Boot/Firebase) ou a um serviço como Formspree.
- **Cores:** estão centralizadas nas variáveis `:root` no topo do `styles.css`
  (verde `#2E7D32` e âmbar `#F57C00`, a mesma paleta do app).
- **Produtos da demo:** a lista do array `PRODUCTS` no início do `script.js`.

## Observações

- Layout responsivo (desktop e mobile). O menu vira hambúrguer em telas pequenas.
- As fontes vêm do Google Fonts (precisa de internet para carregar com o visual completo).
- Os depoimentos são ilustrativos.
