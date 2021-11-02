import { Component, OnInit } from '@angular/core';
import { StudentDetail } from '../shared/student-detail.model';
import { StudentDetailService } from '../shared/student-detail.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styles: [
  ]
})
export class StudentDetailsComponent implements OnInit {

  constructor(public service: StudentDetailService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }
  populateForm(selectedRecord: StudentDetail) {

    this.service.formData = Object.assign({}, selectedRecord)
  }

  onRemove(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteStudent(id)
        .subscribe(
          res => {
            this.service.refreshList();
            this.toastr.error("Deleted successfully");
          },
          err => { console.log(err) }
        )
    }
  }
}
