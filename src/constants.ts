import { Game, User } from './types';

export const MOCK_GAMES: Game[] = [
  {
    id: '1',
    title: 'Cyber Runner',
    description: 'A fast-paced neon-soaked endless runner.',
    thumbnail: 'https://picsum.photos/seed/cyber/400/250',
    category: 'Action',
    rating: 4.8,
    gameType: 'runner'
  },
  {
    id: '2',
    title: 'Void Explorer',
    description: 'Collect energy orbs in the deep void.',
    thumbnail: 'https://picsum.photos/seed/void/400/250',
    category: 'RPG',
    rating: 4.5,
    gameType: 'collector'
  },
  {
    id: '3',
    title: 'Pixel Quest',
    description: 'Click the pixels to gain power.',
    thumbnail: 'https://picsum.photos/seed/pixel/400/250',
    category: 'Platformer',
    rating: 4.2,
    gameType: 'clicker'
  },
  {
    id: '4',
    title: 'Shadow Tactics',
    description: 'Stealth-based runner in the shadows.',
    thumbnail: 'https://picsum.photos/seed/shadow/400/250',
    category: 'Strategy',
    rating: 4.7,
    gameType: 'runner'
  },
  {
    id: '5',
    title: 'Inferno Racer',
    description: 'Dodge the fireballs and collect fuel.',
    thumbnail: 'https://picsum.photos/seed/inferno/400/250',
    category: 'Racing',
    rating: 4.4,
    gameType: 'collector'
  },
  {
    id: '6',
    title: 'Zen Garden',
    description: 'Click the flowers to make them bloom.',
    thumbnail: 'https://picsum.photos/seed/zen/400/250',
    category: 'Puzzle',
    rating: 4.9,
    gameType: 'clicker'
  },
  {
    id: '7',
    title: 'Neon Strike',
    description: 'Fast-paced combat runner with neon blades.',
    thumbnail: 'https://picsum.photos/seed/strike/400/250',
    category: 'Action',
    rating: 4.6,
    gameType: 'runner'
  },
  {
    id: '8',
    title: 'Orbital Drift',
    description: 'Drift through space collecting star fragments.',
    thumbnail: 'https://picsum.photos/seed/drift/400/250',
    category: 'Racing',
    rating: 4.3,
    gameType: 'collector'
  },
  {
    id: '9',
    title: 'Cookie Clicker X',
    description: 'The ultimate clicking experience.',
    thumbnail: 'https://picsum.photos/seed/cookie/400/250',
    category: 'Casual',
    rating: 4.1,
    gameType: 'clicker'
  },
  {
    id: '10',
    title: 'Dungeon Dash',
    description: 'Escape the dungeon in this high-speed runner.',
    thumbnail: 'https://picsum.photos/seed/dungeon/400/250',
    category: 'Adventure',
    rating: 4.7,
    gameType: 'runner'
  },
  {
    id: '11',
    title: 'Star Harvester',
    description: 'Harvest stars in a beautiful nebula.',
    thumbnail: 'https://picsum.photos/seed/harvest/400/250',
    category: 'Simulation',
    rating: 4.8,
    gameType: 'collector'
  },
  {
    id: '12',
    title: 'Gold Miner',
    description: 'Click to mine gold and upgrade your tools.',
    thumbnail: 'https://picsum.photos/seed/gold/400/250',
    category: 'Casual',
    rating: 4.4,
    gameType: 'clicker'
  }
];

export const INITIAL_USER: User = {
  id: 'user-1',
  name: 'Player One',
  email: 'player@example.com',
  ownedGames: ['1'], // Starts with one game
};
