export interface Bet {
  id: string;
  numbers: number[];
  matchedNumbers?: boolean[];
  userEmail: string;
  userAvatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateBetDTO = Omit<Bet, 'id' | 'matchedNumbers' | 'createdAt' | 'updatedAt'>;