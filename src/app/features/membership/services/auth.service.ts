import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, docData, Firestore, limit, query, setDoc, where } from '@angular/fire/firestore'
import { firstValueFrom, interval, Observable, ReplaySubject } from 'rxjs';
import { filter, map } from 'rxjs/operators'
import { User } from '../user-model';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any
  user$ = new ReplaySubject<any>(1)
  loading: boolean = true
  constructor(private store: Firestore) {
    this.user$.subscribe((u: any) => {
      if (!u) {
        localStorage.removeItem("token")
      }
      else localStorage.setItem("token", btoa(JSON.stringify(u)))
      this.user = u
    })

    this._refreshUserFromLocal()
    interval(5 * 60 * 1000).pipe(filter(() => this.user != null)).subscribe(() => this._refreshUserFromLocal())
  }

  private _refreshUserFromLocal() {
    const token = localStorage.getItem("token")
    if (!token || token.trim().length === 0) return this.user$.next(null)
    const user = JSON.parse(atob(token!))
    const now = new Date().getTime()
    const login = user.login ?? now
    if ((now - login) / (1000 * 60 * 60 * 5) > 5) {
      this.user$.next(null)
      this.updateUserLogin(user, null).then(() => {
        // this.toaster.warning('Warning', 'Automaticaly logged out, Time out')
        // this.router.navigate([`/${this.ls.language}`, 'login'])
      })
      return
    }
    this.user$.next(user)
  }

  async getUserByEmail(email: string): Promise<User> {
    let usersRef = collection(this.store, 'users')
    const q = query(usersRef, where("email", "==", email.toLocaleLowerCase()), limit(1));
    return await firstValueFrom(collectionData(q, { idField: 'id' }).pipe(map((users) => users.shift() as User)))
  }

  async createUser(user: User, password: string) {
    const db_user = await this.getUserByEmail(user.email)
    if (db_user) {
      // this.toaster.danger('Error', 'You already have an account')
      return
    }

    const hash = await sha256(password)
    await addDoc(collection(this.store, 'users'), { ...user, hash })

    await this.login({ email: user.email, password })
    return user
    //.then(() => this.router.navigate([`/${this.ls.language}`, 'subjects']))
  }

  async login(user: { email: string, password: string }) {
    const db_user = await this.getUserByEmail(user.email)
    const pwd_hash = await sha256(user.password);


    if (db_user?.hash !== pwd_hash) {
      // this.toaster.danger('Error', 'Email or password is incorrect.')

      return
    }


    const login = new Date().getTime()
    try {
      await this.updateUserLogin(db_user, login)
      this.user$.next({ ...db_user, login })
      return this.user
    } catch (error) {
    }

  }

  async logout() {
    await this.updateUserLogin(this.user, null)
    this.user$.next(null)

  }

  updateUserLogin(user: User, login: number | null = new Date().getTime()): Promise<void> {
    return setDoc(doc(this.store, `users/${user.id}`), { ...user, login })
  }

  getUsers(userType: any) {
    let usersRef = collection(this.store, userType)
    return collectionData(usersRef, { idField: 'id' }) as Observable<User[]>
  }
}

export async function sha256(data: string) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(data);

  // hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string
  const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
  return hashHex;
}
