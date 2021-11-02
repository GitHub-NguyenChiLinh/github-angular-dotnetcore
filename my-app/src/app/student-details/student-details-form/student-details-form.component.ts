import { Component, OnInit } from '@angular/core';
import { StudentDetailService } from 'src/app/shared/student-detail.service';
import { NgForm } from '@angular/forms';
import { StudentDetail } from 'src/app/shared/student-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-details-form',
  templateUrl: './student-details-form.component.html',
  styles: [
  ]
})
export class StudentDetailsFormComponent implements OnInit {


  //add service from folder shared
  constructor(public service: StudentDetailService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm) {
    if (this.service.formData.studentId === 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }
  insertRecord(form: NgForm) {
    this.service.postStudent().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Submitted successfully !')
      },
      err => {
        console.log(err);
        this.toastr.error('Invalid data')
      }
    );
  }
  updateRecord(form: NgForm) {
    this.service.putStudent().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.info('Updated successfully !')
      },
      err => {
        console.log(err);
        this.toastr.error('Invalid data')
      }
    );
  }
  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new StudentDetail();
  }
  
}
