# Mini Site de Músicas — versão gratuita

## 1. Adicionar músicas
Coloque os ficheiros `.mp3` dentro da pasta `music`.

## 2. Adicionar capas
Coloque `.jpg`, `.jpeg`, `.png` ou `.webp` dentro de `covers`.
A capa deve ter o mesmo nome da música.

Exemplo:
- `music/Minha Musica.mp3`
- `covers/Minha Musica.jpg`

Se não houver capa, será usada `covers/default.svg`.

## 3. Gerar a lista automaticamente
No Windows, instale Python se ainda não tiver e execute:

```bash
python gerar_catalogo.py
```

Isto atualiza `songs.json` automaticamente.

## 4. Testar no computador
Não abra o `index.html` diretamente se o navegador bloquear o `songs.json`.
Na pasta do site, execute:

```bash
python -m http.server 8000
```

Depois abra:
http://localhost:8000

## 5. Publicar gratuitamente
A forma mais simples é usar GitHub Pages:
1. Crie uma conta no GitHub.
2. Crie um repositório, por exemplo `minhas-musicas`.
3. Envie todos os ficheiros desta pasta.
4. Em Settings > Pages, escolha a publicação a partir da branch `main`.
5. O GitHub dará um endereço `https://SEUNOME.github.io/minhas-musicas/`.

### Atenção aos ficheiros MP3
Para um catálogo pequeno, GitHub Pages pode funcionar. Evite ficheiros gigantes e muitos GB de áudio. Para uma biblioteca grande, use armazenamento/hosting de ficheiros adequado e deixe o site apenas como catálogo.

## Estrutura
- `index.html` — página
- `styles.css` — visual
- `app.js` — leitor, pesquisa e downloads
- `songs.json` — catálogo gerado
- `gerar_catalogo.py` — lê a pasta `music`
- `music/` — músicas
- `covers/` — capas
