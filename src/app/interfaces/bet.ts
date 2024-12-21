export interface Bet {
  id: string;
  numbers: number[];
  userEmail: string;
  userAvatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateBetDTO = Omit<Bet, 'id' | 'createdAt' | 'updatedAt'>;