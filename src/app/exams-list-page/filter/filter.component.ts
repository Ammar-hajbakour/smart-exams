import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Filter } from 'src/app/models/filter.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() instructors: string[] = []
  @Input() categories: string[] = []
  @Output() filter = new EventEmitter<Filter>()
  level: string[] = ['basic', 'medium', 'advanced']
  ngOnInit(): void {

  }

}
