import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, setDoc, collectionData, deleteDoc, docData, updateDoc, query, where } from '@angular/fire/firestore';
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






  async getExams(filter?: Filter): Promise<Exam[]> {
    return this.database.list<Exam>(filter)
  }
  async deleteExam(id: string) {
    return this.database.delete(id)
  }
  async getExamById(id: string) {
    return this.database.getById(id)
  }
}



