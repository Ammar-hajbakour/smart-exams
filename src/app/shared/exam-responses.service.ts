import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, collectionData, deleteDoc, docData, updateDoc, query, where, limit, getDocs } from '@angular/fire/firestore';
import { firstValueFrom } from 'rxjs';
import { Exam, Question } from '../models/exam.model';
import { ExamResponse } from '../models/response.model';




@Injectable({
  providedIn: 'root'
})
export class ExamResponsesService {


  private readonly collectionName = "responses";
  constructor(private store: Firestore) { }


  async getUserResponse(userId: string, examId: any): Promise<ExamResponse> {
    let ref = collection(this.store, this.collectionName);

    const q = query(ref, where("userId", "==", userId), where("examId", "==", examId), limit(1))
    const res = await getDocs(q)


    return res.docs.shift()?.data() as ExamResponse
  }


  save(id: string | null, response: Partial<ExamResponse>): Promise<Partial<ExamResponse>> {
    if (id) return this.updateResponse(id, response);
    else return this.createResponse(response);
  }

  async createResponse(response: Partial<ExamResponse>) {
    let ref = collection(this.store, this.collectionName);
    const id = await addDoc(ref, response).then(c => c.id)
    return { ...response, id }
  }

  async updateResponse(id: string, response: Partial<ExamResponse>) {
    let examRef = doc(this.store, `${this.collectionName}/${id}`);
    const res = { ...response }
    if (res.id) delete res.id
    await updateDoc(examRef, res);
    return response
  }


  async getExams(filter?: any) {
    let subjectsRef = collection(this.store, this.collectionName);
    return await firstValueFrom(collectionData(subjectsRef, { idField: 'id' })) as Exam[];
  }
  async deleteExam(id: string) {
    let subjectRef = doc(this.store, `${this.collectionName}/${id}`);
    return await deleteDoc(subjectRef);
  }
  async getExamById(id: string) {
    let subjectRef = doc(this.store, `${this.collectionName}/${id}`);
    const exam = await firstValueFrom(docData(subjectRef)) as Exam;
    if (!exam)
      throw new Error("Exam not found");

    return { ...exam, id };
  }
}
