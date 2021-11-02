import { Injectable } from '@angular/core';
import { StudentDetail } from './student-detail.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentDetailService {

  constructor(private http: HttpClient) { }
  readonly baseURL = 'https://localhost:44350/api/student'
  formData: StudentDetail = new StudentDetail();
  list: StudentDetail[];

  postStudent() {
    return this.http.post(this.baseURL, this.formData);
  }
  refreshList() {
    this.http.get(this.baseURL)
      .toPromise()
      .then(res => this.list = res as StudentDetail[]);
  }
  putStudent() {
    return this.http.put(`${this.baseURL}/${this.formData.studentId}`, this.formData);
  }
  deleteStudent(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
