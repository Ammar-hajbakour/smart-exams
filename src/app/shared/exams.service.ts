import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, setDoc, collectionData, deleteDoc, docData } from '@angular/fire/firestore';
import { Subject, firstValueFrom } from 'rxjs';
import { Exam } from '../models/exam.model';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {

  private readonly collection = "exams"
  constructor(private store: Firestore) { }

  getExamById(examId: string): Promise<Partial<Exam>> {
    return Promise.resolve({ ...(new Exam('', '')), id: examId });
  }

  save(exam: Partial<Exam>): Promise<Partial<Exam>> {
    return Promise.resolve(exam);
  }

  createExam(subject: Exam) {
    let subjectsRef = collection(this.store, 'exams')
    return addDoc(subjectsRef, subject)
  }
  async updateSubject(newSubject: Subject, id: string) {
    let subjectRef = doc(this.store, "subjects/" + id)
    return await setDoc(subjectRef, newSubject)
  }

  async getExams() {
    let subjectsRef = collection(this.store, 'subjects')
    return await firstValueFrom(collectionData(subjectsRef, { idField: 'id' })) as Subject[]

  }
  async deleteSubject(id: string) {
    let subjectRef = doc(this.store, "subjects/" + id)
    return await deleteDoc(subjectRef)
  }
  async getSubjectById(id: string) {
    let subjectRef = doc(this.store, "subjects/" + id)
    return await firstValueFrom(docData(subjectRef)) as Subject
  }
}
