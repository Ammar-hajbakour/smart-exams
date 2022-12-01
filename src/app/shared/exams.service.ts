import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, setDoc, collectionData, deleteDoc, docData, updateDoc, query, where, orderBy, startAt, limit, getDocs, startAfter } from '@angular/fire/firestore';
import { firstValueFrom, Observable, Subject, Subscription } from 'rxjs';
import { Exam, Question } from '../models/exam.model';
import { Filter } from '../models/filter.model';
import { DatabaseService } from './data-base.service';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {

  private readonly collectionName = "exams"
  private readonly database = new DatabaseService(this.store, this.collectionName)

  constructor(private store: Firestore) { }

  save(id: string | null | undefined, exam: Partial<Exam>): Promise<Partial<Exam>> {
    return this.database.save<Partial<Exam>>(id, exam)
  }

  async create(exam: Partial<Exam>) {
    return this.database.create(exam)
  }

  async update(id: string, exam: Partial<Exam>) {
    return this.database.update(id, exam)
  }


  find(item: string, array: Array<any>) {
    let itemsArray: string[] = []
    array.forEach(i => {
      itemsArray.push(i[`${item}`])
    })
    return [... new Set(itemsArray)]
  }
  async getFilterOptions(...options: any[]) {
    let ref = collection(this.store, this.collectionName);
    let result = await firstValueFrom(collectionData(ref, { idField: 'id' })) as Exam[]
    options.forEach((option: { key: string, value: string[] }) => {
      option.value = this.find(option.key, result)
    })
  }


  async getExams(filter?: Filter, next?: boolean, dataLimit?: number): Promise<{ dataCount: number, dataRes: Exam[] }> {
    return await this.database.list<Exam>(this.collectionName, filter, next, dataLimit)
  }

  async deleteExam(id: string) {
    return this.database.delete(id)
  }
  async getExamById(id: string) {
    return this.database.getById(id)
  }
}



