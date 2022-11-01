import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Exam } from 'src/app/models/exam.model';
import { ExamsService } from 'src/app/shared/exams.service';
import { AuthService } from '../../membership/services/auth.service';
import { dataUrlToFile } from './dataUrlToFile';

@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.scss']
})
export class ExamFormComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private examsService: ExamsService,
    private dialogRef: MatDialogRef<ExamFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { instructorId: string, examId?: string }
  ) { }

  model!: Partial<Exam>;
  imageName = ''
  imageUrl = ''
  // img!: File
  async ngOnInit(): Promise<void> {
    if (this.data.examId) {
      this.model = await this.examsService.getExamById(this.data.examId)
      // this.img = await dataUrlToFile(this.model.image as string)
      // console.log(this.img.toString());

    }
    else {
      this.model = new Exam(this.data.instructorId, 'New Exam')
    }
  }

  async submit(form: NgForm) {
    if (form.invalid) return
    const v = { ...this.model, instructorName: this.auth.user.name }
    const id = await this.examsService.save(this.model.id, v).then(x => x.id)
    this.dialogRef.close({ ...v, id })
  }
  onFileSelected(event: any) {

    const file: File = event.target.files[0];

    if (file) {

      this.imageName = file.name;

      var reader = new FileReader();
      reader.onloadend = () => {
        this.imageUrl = reader.result as string
        this.model.image = { name: this.imageName, url: this.imageUrl }
      }
      reader.readAsDataURL(file);

    }
  }
}
