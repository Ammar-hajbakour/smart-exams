import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, collectionData, deleteDoc, docData, updateDoc, query, where, limit, getDocs, WithFieldValue, DocumentData, startAt, orderBy, startAfter, getCountFromServer } from '@angular/fire/firestore';
import { BehaviorSubject, firstValueFrom, ReplaySubject } from 'rxjs';
import { Exam, Question } from '../models/exam.model';
import { Filter } from '../models/filter.model';
import { ExamResponse } from '../models/response.model';

export class DatabaseService {
  count: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  instructors: ReplaySubject<string[]> = new ReplaySubject(1);
  categories: ReplaySubject<string[]> = new ReplaySubject(1);

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

  find(items: string, array: Array<any>) {
    let itemsArray: string[] = []
    array.forEach(i => {
      itemsArray.push(i[`${items}`])
    })
    return [... new Set(itemsArray)]
  }

  async list<T>(page?: number, pageSize?: number, filter?: Filter): Promise<T[]> {
    let ref = collection(this.store, this.collectionName);
    let q = query(ref)
    let result = await firstValueFrom(collectionData(q, { idField: 'id' })) as T[]
    if (filter) {
      if (filter.category) {
        q = query(ref, where('category', '==', filter.category))
        result = await firstValueFrom(collectionData(q, { idField: 'id' })) as T[]
      }
      if (filter.instructor) {
        q = query(ref, where('instructor', '==', filter.instructor))
        result = await firstValueFrom(collectionData(q, { idField: 'id' })) as T[]
      }
      if (filter.level) {
        q = query(ref, where('level', '==', filter.level))
        result = await firstValueFrom(collectionData(q, { idField: 'id' })) as T[]
      }
    }

    this.instructors.next(this.find('instructorName', result))
    this.categories.next(this.find('category', result))

    const snapshot = await getCountFromServer(q);
    this.count.next(snapshot.data().count)
    if (page && pageSize) {
      let start = page * pageSize
      let currentList = [...result].splice(start - pageSize, pageSize)


      return currentList
    }
    return result
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


