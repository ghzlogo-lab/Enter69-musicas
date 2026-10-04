let songs = [];
const songsEl = document.getElementById("songs");
const statusEl = document.getElementById("status");
const searchEl = document.getElementById("search");
const player = document.getElementById("player");
const audio = document.getElementById("audio");
const playerCover = document.getElementById("playerCover");
const playerTitle = document.getElementById("playerTitle");
const playerArtist = document.getElementById("playerArtist");
const downloadCurrent = document.getElementById("downloadCurrent");

document.getElementById("year").textContent = new Date().getFullYear();

async function loadSongs() {
  try {
    const response = await fetch("songs.json", {cache: "no-store"});
    if (!response.ok) throw new Error("songs.json não encontrado");
    songs = await response.json();
    render(songs);
  } catch (error) {
    statusEl.textContent = "Não foi possível carregar a lista. Verifica se o ficheiro songs.json existe.";
    songsEl.innerHTML = '<div class="empty">Adiciona as músicas na pasta <b>music</b> e executa o gerador <b>gerar_catalogo.py</b>.</div>';
  }
}

function render(list) {
  statusEl.textContent = `${list.length} música${list.length === 1 ? "" : "s"} disponível${list.length === 1 ? "" : "e"}${list.length ? "" : "."}`;
  if (!list.length) {
    songsEl.innerHTML = '<div class="empty">Nenhuma música encontrada.</div>';
    return;
  }
  songsEl.innerHTML = list.map((song, i) => `
    <article class="card">
      <img class="cover" src="${escapeAttr(song.cover || "covers/default.svg")}" alt="Capa de ${escapeAttr(song.title)}" loading="lazy">
      <div class="card-body">
        <div class="title" title="${escapeAttr(song.title)}">${escapeHtml(song.title)}</div>
        <div class="artist">${escapeHtml(song.artist || "Artista")}</div>
        <div class="actions">
          <button class="btn play" onclick="playSong(${i})">▶ Ouvir</button>
          <a class="btn download" href="${escapeAttr(song.file)}" download>⬇ Baixar</a>
        </div>
      </div>
    </article>
  `).join("");
}

function playSong(index) {
  const song = songs[index];
  audio.src = song.file;
  audio.play().catch(() => {});
  playerCover.src = song.cover || "covers/default.svg";
  playerTitle.textContent = song.title;
  playerArtist.textContent = song.artist || "Artista";
  downloadCurrent.href = song.file;
  downloadCurrent.download = song.file.split("/").pop();
  player.classList.remove("hidden");
}

searchEl.addEventListener("input", () => {
  const q = searchEl.value.trim().toLowerCase();
  render(songs.filter(s => `${s.title} ${s.artist || ""}`.toLowerCase().includes(q)));
});

function escapeHtml(v) {
  return String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
}
function escapeAttr(v) { return escapeHtml(v); }

loadSongs();
