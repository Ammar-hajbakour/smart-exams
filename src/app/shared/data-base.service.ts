import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, collectionData, deleteDoc, docData, updateDoc, query, where, limit, getDocs, WithFieldValue, DocumentData, startAt, orderBy, startAfter, getCountFromServer, endAt, getDoc, QueryConstraint } from '@angular/fire/firestore';
import { BehaviorSubject, firstValueFrom, Observable, ReplaySubject, Subject } from 'rxjs';
import { Exam, Question } from '../models/exam.model';
import { Filter } from '../models/filter.model';
import { ExamResponse } from '../models/response.model';
export class DatabaseService {

  constructor(private store: Firestore, private collectionName: string) { }

  save<T extends WithFieldValue<DocumentData>>(id: string | undefined | null, doc: T): Promise<T> {
    if (id) return this.update(id, doc);
    else return this.create(doc);
  }

  async create<T extends WithFieldValue<DocumentData>>(doc: T) {
    let ref = collection(this.store, this.collectionName);
    const id = await addDoc(ref, doc).then(c => c.id)
    return { ...doc, id }
  }

  async update<T>(id: string, entity: T) {
    let ref = doc(this.store, `${this.collectionName}/${id}`);
    const res = { ...entity } as any
    if (res.id) delete res.id
    await updateDoc(ref, res);
    return entity
  }

  filters: QueryConstraint[] = [orderBy('normalizeName')]
  lastVisible: any
  result: any
  async list<T>(collectionName: string = 'exams', filter?: Filter, next: boolean = false, dataLimit: number = 1): Promise<{ dataCount: number, dataRes: T[] }> {
    let ref = collection(this.store, collectionName);


    const f = [...this.filters]
    console.log(next);

    // if (filter?.q && filter.q !== '') f.push(startAt(filter.q), endAt(filter.q + '\uf8ff'))
    switch (filter?.q?.by) {
      case 'examName':
        f.length = 0
        f.unshift(orderBy('normalizeName'))
        f.push(startAt(filter.q.text), endAt(filter.q.text + '\uf8ff'))
        break

      case 'userName':

        f.length = 0
        f.unshift(orderBy('userName'))
        f.push(startAt(filter.q.text), endAt(filter.q.text + '\uf8ff'))
        break
    }

    if (filter?.level) f.push(where('level', '==', filter.level))
    if (filter?.category) f.push(where('category', '==', filter.category))
    if (filter?.instructor) f.push(where('instructorId', '==', filter.instructor))
    if (filter?.user) f.push(where('userId', '==', filter.user))


    if (next) {
      this.lastVisible = this.result.docs[this.result.docs.length - 1];
      if (this.lastVisible) f.push(startAfter(this.lastVisible))
    }
    let q = query(ref, ...f, limit(dataLimit))

    this.result = await getDocs(q);
    const dataRes = await firstValueFrom(collectionData(q, { idField: 'id' })) as unknown as T[]
    const dataCount = (await getCountFromServer(query(ref, ...f))).data().count;
    console.log(dataCount, this.lastVisible);
    return { dataCount, dataRes }
  }

  async delete(id: string) {
    let ref = doc(this.store, `${this.collectionName}/${id}`);
    return await deleteDoc(ref);
  }
  async getById<T>(id: string): Promise<T & { id: string }> {
    let ref = doc(this.store, `${this.collectionName}/${id}`);
    const exam = await firstValueFrom(docData(ref)) as T;
    if (!exam)
      throw new Error("Exam not found");

    return { ...exam, id };
  }
}


