///<reference path="../../node_modules/@angular/common/http/src/client.d.ts"/>
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CategoryQuestion} from './question';
import {map} from 'rxjs/operators';
import {forEach} from '@angular/router/src/utils/collection';


@Injectable({providedIn: 'root'})

export class QuestionsService {
  private api = 'http://bluemaxstudios.com/questionnaire/questions?_format=json';

  constructor(private http: HttpClient) {
  }


 // getQuestion(): Observable<CategoryQuestions[]> {
  getQuestion(): Observable<CategoryQuestion[]> {
    const headers = {
      'headers': new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': 'Basic ZnJvbnRlbmQ6cmVzdDEyMw=='
      })
    };
    console.log('in getQuestion');
    // this.http.get(this.api, headers).subscribe((questions) => console.log(questions));
    // return null;

    return this.http
     // .get<CategoryQuestions[]>(this.api, headers)
      .get<CategoryQuestion[]>(this.api, headers)
      .pipe(
        map(response => this.mapToCategoryQuestionsArray(response),
          console.log('inside pipe')
        )
      );
  }

  /**
   * Maps the Drupal server response to a CategoryQuestions array.
   *
   * @param response
   *  A tab view list that has been mapped to the CategoryQuestions object.
   */
  //private mapToCategoryQuestionsArray(response): CategoryQuestions[] {
  private mapToCategoryQuestionsArray(response): CategoryQuestion[] {
    console.log('private mapToCategoryQuestionsArray');
    console.log(response);
    // return response.map(result => this.mapToCategoryQuestions(result));
    return response.map(result => this.mapToCategoryQuestions(result));
  }

  /**
   * Maps a tab view from the Drupal server to a CategoryQuestions.
   *
   * @param results
   *  A single question from the list from the Drupal server.
   * @returns {CategoryQuestion}
   *  A CategoryQuestions object that has been populated by the server object.
   */
  private mapToCategoryQuestions(results): CategoryQuestion {
    const categoryQuestions = new CategoryQuestion();
    categoryQuestions.id = Object.keys(results).pop();
    categoryQuestions.questionText = (<string>Object.values(results).pop());

 /* private mapToCategoryQuestion(results): CategoryQuestion {
    const CategoryQuestions = new CategoryQuestion();
    CategoryQuestions.id = results[0];
    CategoryQuestions.questionText = results[1];*/


    console.log(results);
    console.log('===========');
    console.log(results[0]);
    console.log(results[1]);
    console.log('===========');

    return categoryQuestions;
  }



  /**
  * Handle Http operation that failed.
  * Let the app continue.
* @param operation - name of the operation that failed
* @param result - optional value to return as the observable result
*/
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      // return of(result as T);
      return null;
    };
  }
}
