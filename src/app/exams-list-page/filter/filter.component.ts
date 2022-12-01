import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Filter } from 'src/app/models/filter.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() categories: string[] = []
  @Output() filter = new EventEmitter<Filter>()
  selectedFilter: Filter = { category: '', instructor: '', level: '' }
  level: string[] = ['basic', 'medium', 'advanced']
  ngOnInit(): void {

  }

  submit(form: NgForm) {
    this.filter.emit(form.value)
  }
}
