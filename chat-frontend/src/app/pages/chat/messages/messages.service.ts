import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

type User = {
  _id: string;	
  name: string;
  email: string;
}

type messages = {
  _id: string;
  sender: User;
  receiver: User;
  content: string;
  isRead: boolean;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})

export class MessagesService {

  private httpClient = inject(HttpClient);
  private users = signal([])

  loadMessages(id: string | undefined) {
    if (id) {
      return this.fetchMessages('http://localhost:4000', id);

    }
    return throwError(() => new Error("ID is required to load messages"));
  }

  private fetchMessages(url: string, id: string | undefined) {

    return this.httpClient.get<{ messages: messages[]}>(`${url}/api/messages/chat/${id}`).pipe(
      map((resData) => {
        return resData.messages
      }),
      catchError((error) => {
        console.error('Error fetching users:', error);
        return throwError(() => new Error("Failed to fetch")); // Return an empty array on error
      })		  
    )
  }  
  
}
