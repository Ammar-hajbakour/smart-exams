import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, setDoc, collectionData, deleteDoc, docData, updateDoc, query, where, orderBy, startAt, limit, getDocs, startAfter } from '@angular/fire/firestore';
import { firstValueFrom } from 'rxjs';
import { Exam, Question } from '../models/exam.model';
import { Filter } from '../models/filter.model';
import { DatabaseService } from './data-base.service';

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
  async getExamsCount() {
    return await firstValueFrom(this.database.count)
  }





  async getExams(page?: number, pageSize?: number, filter?: Filter): Promise<Exam[]> {
    return this.database.list<Exam>(page, pageSize, filter)
  }
  async listP<Exam>(page: number, pageSize: number, filter?: any): Promise<Exam[]> {
    let ref = collection(this.store, this.collectionName);
    let start = pageSize * (page)
    let q = query(ref, orderBy("name"), startAfter(start), limit(pageSize))
    const res = await firstValueFrom(collectionData(q, { idField: 'id' })) as Exam[];

    console.log("Result From Database Service :", res)
    return res
  }
  async deleteExam(id: string) {
    return this.database.delete(id)
  }
  async getExamById(id: string) {
    return this.database.getById(id)
  }
}



