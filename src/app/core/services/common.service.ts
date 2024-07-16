import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  GET_POSTS = gql`{
    repositoryOwner(login: "visionmedia") {
      repositories(last: 30) {
         nodes {
            name
            stargazerCount
            description
            createdAt
            watchers {
              totalCount
            }
            pullRequests {
              totalCount
            }
            forks {
              totalCount
            }
            isPrivate
            url
         }
       }
    }
  }`

  constructor(private apollo: Apollo) {}

  getUserRepos() {
    return this.apollo.query({ query: this.GET_POSTS, fetchPolicy: "cache-first"})
  }
}
