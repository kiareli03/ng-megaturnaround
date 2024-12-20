import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, Firestore, serverTimestamp, setDoc } from '@angular/fire/firestore';
import { first, from, map, Observable, of, tap } from 'rxjs';

export interface Bet {
  id: string;
  numbers: number[];
  userId: string;
  userAvatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const mockBets: Bet[] = [{
  id: 'A',
  numbers: [1, 2, 3, 4, 5, 6],
  userId: 'gabriel.chiareli03@gmail.com',
  userAvatarUrl: 'https://avatars.dicebear.com/api/avataaars/1.svg',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  id: 'B',
  numbers: [],
  userId: 'gabriel.chiareli03@gmail.com',
  userAvatarUrl: 'https://avatars.dicebear.com/api/avataaars/1.svg',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  id: 'C',
  numbers: [],
  userId: 'r.paivabr@gmail.com',
  userAvatarUrl: 'https://avatars.dicebear.com/api/avataaars/1.svg',
  createdAt: new Date(),
  updatedAt: new Date()
}

]

@Injectable({
  providedIn: 'root'
})
export class BetsService {

  private firestore = inject(Firestore);

  getBets(): Observable<Bet[]> {
    return collectionData(collection(this.firestore, 'bets'), { idField: 'id' }).pipe(
    // first(),
    tap((bets) => console.log(bets)),
    map((bets) => bets.map((bet: any) => ({...bet, createdAt: bet.createdAt.toDate(), updatedAt: bet.updatedAt.toDate() })) as Bet[]),               
    );
  }

  createBet(bet: Partial<Bet>): Observable<void> {
    const obj = { ...bet, createdAt: serverTimestamp(), updatedAt: serverTimestamp() };
    return from(addDoc(collection(this.firestore, 'bets'), obj)).pipe(map(()=>{return undefined}));
  }



  updateBet(bet: Bet): Observable<void> {
    const obj = { ...bet, updatedAt: serverTimestamp() };
    return from(setDoc(doc(this.firestore, 'bets', bet.id), obj)).pipe(map(()=>{return undefined}));
  }

  // private post<T>(collectionName: string, data: any, id?: string): Observable<T> {
  //   const obj = { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() };
  //   const saveDoc = id ?
  //     setDoc(doc(this.firestore, collectionName, id), obj)
  //     : addDoc(collection(this.firestore, collectionName) as CollectionReference<T>, obj);

  //   return from(saveDoc).pipe(
  //     first(),
  //     map((doc) => doc ? ({ ...data, id: doc.id }) : ({ ...data, id }))
  //     }

//------------------------------------------------------------------------------------------------------

// getAll<T>(collectionName: string): Observable<T> {
//   const collectionRef = collection(this.firestore, collectionName) as CollectionReference<T>;
//   return collectionData(collectionRef, { idField: 'id' }).pipe(first());
// }
}
