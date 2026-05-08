const apiKey = import.meta.env.VITE_API_KEY;

export async function getPopularMovies(page=1) {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=${page}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Erro ao carregar filmes populares");
  return res.json();
}

export async function searchMovies(query, page = 1) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=pt-BR&query=${encodeURIComponent(query)}&page=${page}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Erro ao buscar filmes");
  return res.json();
}

export async function getMovieDetails(id) {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=pt-BR`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Erro ao buscar detalhes do filme");
  return res.json();
}

export async function getCredits(id) {
  const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=pt-BR`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Erro ao buscar elenco/diretor");
  return res.json();
}


