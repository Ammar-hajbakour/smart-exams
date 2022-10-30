import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Exam } from 'src/app/models/exam.model';
import { ExamsService } from 'src/app/shared/exams.service';

@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.scss']
})
export class ExamFormComponent implements OnInit {

  constructor(
    private examsService: ExamsService,
    private dialogRef: MatDialogRef<ExamFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { instructorId: string, examId?: string }) { }

  model!: Partial<Exam>;

  async ngOnInit(): Promise<void> {
    if (this.data.examId) {
      this.model = await this.examsService.getExamById(this.data.examId)
    }
    else {
      this.model = new Exam(this.data.instructorId, 'New Exam')
    }
  }

  async submit(form: NgForm) {
    if (form.invalid) return
    const v = { ...this.model }
<<<<<<< Updated upstream
    const id = await this.examsService.save(v).then(x=>x.id)
    this.dialogRef.close({...v, id})
=======
    v.passDegreePercentage = Math.max((v.passDegreePercentage ?? 0) / 100, 0)
    const id = await this.examsService.save(this.model.id, v).then(x => x.id)
    this.dialogRef.close({ ...v, id })
>>>>>>> Stashed changes
  }

}
