import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, setDoc, collectionData, deleteDoc, docData, updateDoc, query, where } from '@angular/fire/firestore';
import { firstValueFrom } from 'rxjs';
import { Exam, Question } from '../models/exam.model';
import { Filter } from '../models/filter.model';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {

  private readonly collectionName = "exams"
  constructor(private store: Firestore) { }


  save(exam: Partial<Exam>): Promise<Partial<Exam>> {
    if (exam.id) return this.updateExam(exam)
    else return this.createExam(exam)

  }

  private createExam(exam: Partial<Exam>) {
    let subjectsRef = collection(this.store, this.collectionName)
    return addDoc(subjectsRef, exam)
  }
  private async updateExam(exam: Partial<Exam>) {
    const { id } = exam
    const e = { ...exam } as any
    delete e.id
    let examRef = doc(this.store, `${this.collectionName}/${id}`)
    await setDoc(examRef, e)
    return exam
  }
  async updateExamQuestions(id: string, questions: Question[]) {
    let examRef = doc(this.store, `${this.collectionName}/${id}`)
    return updateDoc(examRef, {
      ['questions']: questions.map(q => Object.assign({}, q))
    })
  }
  async getExams(filter?: Filter) {
    let ref = collection(this.store, this.collectionName)

    return await firstValueFrom(collectionData(ref, { idField: 'id' })) as Exam[]


  }
  async deleteExam(id: string) {
    let subjectRef = doc(this.store, `${this.collectionName}/${id}`)
    return await deleteDoc(subjectRef)
  }
  async getExamById(id: string) {
    let subjectRef = doc(this.store, `${this.collectionName}/${id}`)
    const exam = await firstValueFrom(docData(subjectRef)) as Exam
    if (!exam) throw new Error("Exam not found");

    return { ...exam, id }
  }
}



