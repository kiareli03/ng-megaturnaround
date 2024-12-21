import { inject, Injectable } from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { Auth, GoogleAuthProvider, signInWithPopup, UserCredential, authState, signOut, User as FirebaseUser } from '@angular/fire/auth';
import { first, from, map, Observable, of, switchMap } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly firestore = inject(Firestore);
  private readonly docRef = (id: string) => doc(this.firestore, 'users', id);

  private getUserByEmail(user: FirebaseUser): Observable<User | null> {
    return from(getDoc(this.docRef(user.email!))).pipe(
      first(),
      map(doc => doc.exists() ? ({
        email: doc.id, 
        admin: doc.data()['admin'], 
        userAvatarUrl: user.photoURL
      } as User) : null),
    );
  }

  private readonly auth = inject(Auth);
  private readonly authState$ = authState(this.auth);

  loggedUser$: Observable<User | null> = this.authState$.pipe(
    switchMap((user: FirebaseUser | null) => user ? this.getUserByEmail(user) : of(null)),
  );
  isLogged$: Observable<boolean> = this.loggedUser$.pipe(map((user) => Boolean(user)));

  login(): Promise<void | UserCredential> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }
}
