import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

type User = {
  _id: string;	
  name: string;
  email: string;
}

type messages = {
  _id?: string;
  sender: User;
  receiver: User;
  content: string;
  chatId: string;
  isRead?: boolean;
  timestamp?: string;
}

type MessageReq = {
  sender: string;
  receiver: string;
  content: string;
  chatId: string;
}
@Injectable({
  providedIn: 'root'
})

export class MessagesService {

  private httpClient = inject(HttpClient); // Expose the observable for external use

  loadMessages(id: string | undefined) {
    if (id) {
      return this.fetchMessages('http://localhost:4000', id);

    }
    return throwError(() => new Error("ID is required to load messages"));
  }

  sendMessage(message: MessageReq) {
    if (message) {
      return this.sendNewMessage(message)
    }

    return throwError(() => new Error("Message is required to send message"));
  }

  markAsRead(chatId: string, userId: string) {
    if (chatId && userId) {
      return this.updateMessageMarkAsRead(chatId, userId)
    }

    return throwError(() => new Error("Chat ID and User ID are required to mark as read"));
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
  
  private sendNewMessage(messageData: MessageReq) {
    return this.httpClient.post<{message: messages}>('http://localhost:4000/api/messages', messageData).pipe(
      map((resData) => {
        console.log('Message sent successfully:', resData);
        return resData.message
      }),
      catchError((error) => {
        console.error('Error adding user to chat:', error);
        return throwError(() => new Error("Failed to add user to chat")); // Return an empty array on error
      })		
    )
  }
  
  private updateMessageMarkAsRead(chatId: string, userId: string ) {
    return this.httpClient.put(`http://localhost:4000/api/messages/chat/${chatId}/user/${userId}`, '').pipe(
      map((resData) => {
        console.log('Message sent successfully:', resData);
        return 'Successfully marked as read'
      }),
      catchError((error) => {
        console.error('Error adding user to chat:', error);
        return throwError(() => new Error("Failed to add user to chat")); // Return an empty array on error
      })
    )
  }
}
