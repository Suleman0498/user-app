import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';

import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http'
import { InMemoryCache, ApolloClientOptions } from '@apollo/client/core'
import { AgGridTableComponent } from '../ag-grid-table/ag-grid-table.component';
import { AgGridAngular } from 'ag-grid-angular';
import { D3ChartComponent } from '../d3-chart/d3-chart.component';
import { UserRoutingModule } from './user-routing.module';
import { CommonModule } from '@angular/common';

const uri = {
    uri: 'https://api.github.com/graphql',
    headers: new HttpHeaders({
        Authorization: `Bearer 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`,
    })
};
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
    return {
        link: httpLink.create(uri),
        cache: new InMemoryCache(),
        resolvers: {},
        defaultOptions: {
            query: {
                errorPolicy: "all"
            }
        }
    };
}

@NgModule({
    declarations: [
        UserComponent,
        AgGridTableComponent,
        D3ChartComponent,
    ],
    imports: [
        CommonModule,
        ApolloModule,
        HttpClientModule,
        AgGridAngular,
        UserRoutingModule,
    ],
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: createApollo,
            deps: [HttpLink],
        },
    ],
    exports: [UserComponent]
})
export class UserModule { }
