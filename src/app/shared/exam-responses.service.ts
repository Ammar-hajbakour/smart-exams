import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, collectionData, deleteDoc, docData, updateDoc, query, where, limit, getDocs } from '@angular/fire/firestore';
import { firstValueFrom } from 'rxjs';
import { Exam, Question } from '../models/exam.model';
import { ExamResponse } from '../models/response.model';
import { DatabaseService } from './data-base.service';




@Injectable({
  providedIn: 'root'
})
export class ExamResponsesService {


  private readonly collectionName = "responses";
  private readonly database = new DatabaseService(this.store, this.collectionName)

  constructor(private store: Firestore) { }


  async getUserResponse(userId: string, examId: any): Promise<ExamResponse> {
    let ref = collection(this.store, this.collectionName);

    const q = query(ref, where("userId", "==", userId), where("examId", "==", examId), limit(1))
    const res = await getDocs(q)


    return res.docs.shift()?.data() as ExamResponse
  }


  save(id: string | null, response: Partial<ExamResponse>): Promise<Partial<ExamResponse>> {
    return this.database.save(id, response)
  }

  async createResponse(response: Partial<ExamResponse>) {
    return this.database.create(response)
  }

  async updateResponse(id: string, response: Partial<ExamResponse>) {
    return this.database.update(id, response)
  }


  async getExams(filter?: any) {
    return this.database.list(filter)
  }
  async deleteExam(id: string) {
    return this.database.delete(id)
  }
  async getExamById(id: string) {
    return this.database.getById(id)
  }
}
