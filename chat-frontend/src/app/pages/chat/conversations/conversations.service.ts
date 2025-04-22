import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

type User = {
  _id: string;	
  name: string;
  email: string;
}

type Conversation = {
  _id: string;
  participants: User[];
}

@Injectable({
  providedIn: 'root'
})

export class ConversationsService {

  private httpClient = inject(HttpClient);
  private users = signal([])

  loadConversations(userId: string | undefined) {
    if (userId) {
      return this.fetchConversations('http://localhost:4000', userId);
    }

    return throwError(() => new Error("ID is required to load conversations"));
  }

  private fetchConversations(url: string, userId: string | undefined) {
    return this.httpClient.get<{ chats: Conversation[]}>(`${url}/api/chats/user/${userId}`).pipe(
      map((resData) => {
        return resData.chats
      }),
      catchError((error) => {
        console.error('Error fetching users:', error);
        return throwError(() => new Error("Failed to fetch")); // Return an empty array on error
      })		  
    )
  }  
  
}
