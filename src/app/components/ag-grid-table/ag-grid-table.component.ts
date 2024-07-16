import { Component, inject } from '@angular/core';
import { ReposStore } from '../../core/store/repos.store';

@Component({
  selector: 'app-ag-grid-table',
  templateUrl: './ag-grid-table.component.html',
  styleUrl: './ag-grid-table.component.scss'
})
export class AgGridTableComponent {
  readonly store = inject(ReposStore);
  pagination = true;
  paginationPageSize = 10;
  paginationPageSizeSelector = [10, 20, 50];

  filterParams: any = {
    maxNumConditions: 1,
    comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
      var dateAsString = cellValue;
      if (dateAsString == null) return -1;
      var dateParts = dateAsString.split("/");
      var cellDate = new Date(
        Number(dateParts[2]),
        Number(dateParts[1]) - 1,
        Number(dateParts[0])
      );
      if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
        return 0;
      }
      if (cellDate < filterLocalDateAtMidnight) {
        return -1;
      }
      if (cellDate > filterLocalDateAtMidnight) {
        return 1;
      }
      return 0;
    }
  };

  colDefs: any[] = [
    { headerName: 'Name', field: "name", filter: true, floatingFilter: true, initialWidth: 150 },
    { headerName: 'No. of Stars', field: "stargazerCount", filter: true, floatingFilter: true, initialWidth: 150 },
    { headerName: 'No. of Watchers', field: "watchersCount", filter: true, floatingFilter: true, initialWidth: 150 },
    { headerName: 'Forks Count', field: "forksCount", filter: true, floatingFilter: true, initialWidth: 150 },
    { headerName: 'PRs Count', field: "pullRequestsCount", filter: true, floatingFilter: true, initialWidth: 150 },
    // { headerName: 'Created At', field: "createdAt", filter: true, floatingFilter: true, initialWidth: 150,
    //   cellRenderer: (data: any) => {
    //     return data.value ? (new Date(data.value).toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric'})) : '';
    //   } 
    // },
    { headerName: 'Created At', field: "createdAt", filter: 'agDateColumnFilter',filterParams: this.filterParams, floatingFilter: true, initialWidth: 150
    },
    { headerName: 'Description', field: "description", filter: true, floatingFilter: true, initialWidth: 220, 
      tooltipField: "description",
    },
    // { field: "type", valueGetter: (p: any) => p.owner.type},
  ];

  

  constructor() {
    // effect(() => {
    //   console.log(this.store.repos())
    //   this.repoList = this.store.repos();
    // })
  }
}
