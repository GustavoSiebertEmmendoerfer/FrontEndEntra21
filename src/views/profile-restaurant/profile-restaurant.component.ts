import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { merge, Observable } from 'rxjs';
import { Plate } from 'src/models/plate';
import { PlateService } from 'src/services/plate.service';
import { of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { isTemplateSpan } from 'typescript';


@Component({
  selector: 'app-profile-restaurant',
  templateUrl: './profile-restaurant.component.html',
  styleUrls: ['./profile-restaurant.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProfileRestaurantComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'price']
  exampleDatabase: ExampleHttpDatabase | null
  data: Plate[] = []

  resultsLenght = 0
  isLoadingResults = true
  isRateLimitReached = false

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  constructor(
    private http: HttpClient,
    public servicePlate: PlateService
  ) { }

  ngAfterViewInit(): void {
    this.exampleDatabase = new ExampleHttpDatabase(this.http)

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0)

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true
          return this.exampleDatabase!.getPlates(
            this.sort.active, this.sort.direction, this.paginator.pageIndex
          ).pipe(catchError(() => observableOf(null)))
        }),
        map(data => {
          this.isLoadingResults = false
          this.isRateLimitReached = data === null

          if (data === null) {
            return []
          }

          this.resultsLenght = data.length
          console.log(data)
          return data
        })
      ).subscribe(data => this.data = data)
      console.log(this.data)
  }
}

export class PlateApi {
  items: Plate[] = []
  total_count: number
}

export class ExampleHttpDatabase {
  constructor(private http: HttpClient) { }

  getPlates(sort: string, order: SortDirection, page: number): Observable<PlateApi> {
    const href = `https://localhost:44308/api/Plates/`
    const requestUrl = `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${page + 1}`

    return this.http.get<PlateApi>(requestUrl)
  }
}

