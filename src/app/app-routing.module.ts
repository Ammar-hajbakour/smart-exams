import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { StudentGuard } from "./student-guard";
import { ExamDetailsPageComponent } from './exam-details-page/exam-details-page.component';
import { ExamsListPageComponent } from './exams-list-page/exams-list-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ExamGuard } from "./ExamGuard";
import { SimpleLayoutComponent } from './simple-layout/simple-layout.component';
import { ResponseGuard } from './simple-layout/response.guard';
import { InstructorGuard } from './instructor.guard';

const routes: Routes = [
  { path: '', redirectTo: '/en', pathMatch: 'full' },
  { path: ':lang/account', loadChildren: () => import('./features/membership/membership.module').then(m => m.MembershipModule) },
  { path: ':lang/instructor', canActivateChild: [InstructorGuard], loadChildren: () => import('./features/instructor-space/instructor-space.module').then(m => m.InstructorSpaceModule) },
  { path: ':lang/admin', canActivateChild: [AdminGuard], loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule) },
  { path: ':lang/student', canActivateChild: [StudentGuard], loadChildren: () => import('./features/student/student.module').then(m => m.StudentModule) },
  { path: ':lang/response', canActivateChild: [ResponseGuard], loadChildren: () => import('./features/response/response.module').then(m => m.ResponsesModule) },
  {
    path: ':lang', component: SimpleLayoutComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomePageComponent },
      { path: 'exams', component: ExamsListPageComponent },
      { path: 'exam/:id', canActivate: [ExamGuard], component: ExamDetailsPageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
