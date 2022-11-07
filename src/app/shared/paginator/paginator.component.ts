import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  @Input() dir: 'ltr' | 'rtl' = 'ltr'
  @Output() pageChange = new EventEmitter<number>()

  private _page = 1;
  @Input()
  public get page(): number {
    return this._page;
  }
  public set page(v: number) {
    if (v === this._page) return
    this._page = v;
    this.pageChange.emit(v)
  }


  canGoNext = false;
  canGoPrev = false;

  private _total = 0;
  @Input()
  public get total(): number {
    return this._total;
  }
  public set total(v: number) {
    if (v === this._total) return
    this._total = v;
    this._rerenderBtns(v)
  }



  private _pageSize: number = 1;
  @Input()
  public get pageSize(): number {
    return this._pageSize;
  }
  public set pageSize(v: number) {
    if (v === this._pageSize) return
    this._pageSize = v;
    this._rerenderBtns(this.total)
  }



  private _noOfPagesInView = 5;
  @Input()
  public get noOfPagesInView(): number {
    return this._noOfPagesInView;
  }
  public set noOfPagesInView(v: number) {
    if (v === this._noOfPagesInView) return
    this._noOfPagesInView = v;
    this._rerenderBtns(this.total)
  }


  pagesBtns!: number[]

  private _rerendering: any
  private _rerenderBtns(total: number) {
    if (total <= this.pageSize) return
    if (this._rerendering) clearTimeout(this._rerendering)
    this._rerendering = setTimeout(() => {

      total = isNaN(total) ? 0 : total
      const ps = isNaN(this.pageSize) ? 1 : this.pageSize
      const totalPages = Math.ceil(total / ps)


      let nopiv = Math.min((isNaN(this.noOfPagesInView) || this.noOfPagesInView === 0) ? 5 : this.noOfPagesInView, totalPages)
      this.pagesBtns ??= [this.page]
      const idx = this.pagesBtns.findIndex((p) => p == this.page)
      let start = 0
      if (idx === -1) start = 0
      else if (idx === 0) start = Math.max(0, this.page - nopiv - 1)
      else if (idx === nopiv - 1) start = this.page - 1
      else start = this.pagesBtns[0] - 1
      nopiv = Math.min(nopiv, totalPages - start)
      this.pagesBtns = new Array(nopiv).fill(0).map((p, i) => i + start + 1)

      this.canGoPrev = this.pagesBtns[0] > 1
      this.canGoNext = this.pagesBtns[this.pagesBtns.length - 1] < totalPages

    }, 150);
  }



  ngOnInit(): void {
    this._rerenderBtns(this.total)
  }

  changePage(p: number) {

    this._page = p

    this.pageChange.emit(p)
    this._rerenderBtns(this.total)
  }

}
