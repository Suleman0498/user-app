import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { filter, Subject, takeUntil } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { ReposStore } from '../../core/store/repos.store';
import { CommonService } from '../../core/services/common.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class UserComponent {
  private ngUnsubscribe = new Subject();
  repoList: any[] = [];
  readonly store = inject(ReposStore);
  enableHome = signal(false);

  constructor(
    private commonService: CommonService,
    router: Router,
  ) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      if (event.url == '/') {
        this.enableHome.set(true);
      }
      else {
        this.enableHome.set(false);
      }
    });
  }

  ngOnInit() {
    this.commonService.getUserRepos().pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: any) => {
      if (res) {
        const data = res?.data?.repositoryOwner?.repositories?.nodes;
        let resp = [];
        if (data?.length) {
          resp = data.map((x: any) => {
            return {
              name: x.name,
              stargazerCount: x.stargazerCount,
              // createdAt: x.createdAt,
              createdAt: x.createdAt ? (new Date(x.createdAt).toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric'})) : '',
              forksCount: x.forks.totalCount,
              watchersCount: x.watchers.totalCount,
              pullRequestsCount: x.pullRequests.totalCount,
              url: x.url,
              description: x.description,
              isPrivate: x.isPrivate,
            }
          })
        }
        console.log(resp);
        this.store.setRepos(resp);
      }
    });
    // this.apollo
    //     .query({ query: this.GET_POSTS, fetchPolicy: "cache-first", })
    //     .subscribe(res =>console.log('a',res));
  }
}
