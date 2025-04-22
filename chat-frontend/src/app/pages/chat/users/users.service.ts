import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

type User = {
  _id: number;	
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private httpClient = inject(HttpClient);
  private users = signal([])

  loadUsers() {
    return this.fetchUsers('http://localhost:4000')
  }

  private fetchUsers(url: string) {
    return this.httpClient.get<{ users: User[]}>(`${url}/api/users`).pipe(
      map((resData) => resData.users),
      catchError((error) => {
        console.error('Error fetching users:', error);
        return throwError(() => new Error("Failed to fetch")); // Return an empty array on error
      })		
    )
  }

  
  
}
