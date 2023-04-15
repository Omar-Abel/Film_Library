export interface Film {
  id: number;
  tittle: string;
  description: string;
  releaseDate: Date;
  category: string;
  imagePath: string;
  userId: number;
}

export interface FilmResponse {
  tittle: string;
  description: string;
  releaseDate: Date;
  category: string;
  image: File;
  userId: number;
}