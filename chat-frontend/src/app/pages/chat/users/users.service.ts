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

  loadUsers(id: string | undefined) {
    return this.fetchUsers('http://localhost:4000', id)
  }

  createChat(userId: string | undefined, participantId: string | undefined) {
    return this.addUsertoChat(userId, participantId)	
  }

  private fetchUsers(url: string, id: string | undefined) {
    return this.httpClient.get<{ users: User[]}>(`${url}/api/users/${id}`).pipe(
      map((resData) => resData.users),
      catchError((error) => {
        console.error('Error fetching users:', error);
        return throwError(() => new Error("Failed to fetch")); // Return an empty array on error
      })		
    )
  }

  private addUsertoChat(userId: string | undefined, participantId: string | undefined) {
    if (userId && participantId) {
      return this.httpClient.post<{ message: string}>('http://localhost:4000/api/chats', { participants: [userId, participantId] }).pipe(
        map((resData) => resData.message),
        catchError((error) => {
          console.error('Error adding user to chat:', error);
          return throwError(() => new Error("Failed to add user to chat")); // Return an empty array on error
        })		
      )
    }
    return throwError(() => new Error("ID is required to add user to chat"));
  }
  
}
