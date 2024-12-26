import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, serverTimestamp, updateDoc } from '@angular/fire/firestore';
import { map, Observable, tap } from 'rxjs';
import { Bet, CreateBetDTO } from '../interfaces/bet';

@Injectable({ providedIn: 'root' })
export class BetsService {
  private readonly firestore = inject(Firestore);
  private readonly collectionRef = collection(this.firestore, 'bets');
  private readonly docRef = (id: string) => doc(this.firestore, 'bets', id);

  getBets(): Observable<Bet[]> {
    return collectionData(this.collectionRef, { idField: 'id' }).pipe(
      map((bets: any[]) => bets.map(bet => ({
        ...bet,
        numbers: Array.from({ length: 6 }).map((_, i) => bet.numbers[i] || 0),
        matchedNumbers: Array.from({ length: 6 }).map(() => false),
        createdAt: bet.createdAt?.toDate() || new Date(),
        updatedAt: bet.updatedAt?.toDate() || new Date(),
      })) as Bet[]),
      // tap(bets => console.log(bets)),
      map((bets: Bet[]) => bets.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())),
    );
  }

  createBet(bet: CreateBetDTO): void {
    const betToCreate = { ...bet, createdAt: serverTimestamp(), updatedAt: serverTimestamp() };
    addDoc(this.collectionRef, betToCreate);
  }

  updateBet(bet: Bet): void {
    const betToUpdate = { ...bet, updatedAt: serverTimestamp() };
    updateDoc(this.docRef(bet.id), betToUpdate);
  }

  deleteBet(id: string): void {
    deleteDoc(this.docRef(id));
  }
}
