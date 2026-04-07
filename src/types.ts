export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  rating: number;
  gameType: 'runner' | 'collector' | 'clicker';
}

export interface User {
  id: string;
  name: string;
  email: string;
  ownedGames: string[];
}
