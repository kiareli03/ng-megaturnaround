import { Bet } from "../interfaces/bet";

export const mockBets: Bet[] = [
  {
    id: 'A',
    numbers: [1, 2, 3, 4, 5, 6],
    userEmail: 'gabriel.chiareli03@gmail.com',
    userAvatarUrl: 'https://avatars.dicebear.com/api/avataaars/1.svg',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'B',
    numbers: [],
    userEmail: 'gabriel.chiareli03@gmail.com',
    userAvatarUrl: 'https://avatars.dicebear.com/api/avataaars/1.svg',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'C',
    numbers: [],
    userEmail: 'r.paivabr@gmail.com',
    userAvatarUrl: 'https://avatars.dicebear.com/api/avataaars/1.svg',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
