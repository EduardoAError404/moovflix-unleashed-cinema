
export interface Movie {
  id: string;
  titulo: string;
  pagina: string;
  capa: string;
  video_url: string;
  genero: string;
  ano: string;
  duracao: string;
  sinopse: string;
  elenco: string;
  diretor: string;
  rating?: string;
  categoria?: string[];
  progress?: number;
}
