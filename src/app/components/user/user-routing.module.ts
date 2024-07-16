import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { D3ChartComponent } from '../d3-chart/d3-chart.component';
import { AgGridTableComponent } from '../ag-grid-table/ag-grid-table.component';

const routes: Routes = [
  { path: 'ag-grid', component: AgGridTableComponent },
  { path: 'd3', component: D3ChartComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
