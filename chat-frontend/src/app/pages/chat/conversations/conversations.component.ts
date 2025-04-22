import { Component, inject, DestroyRef, signal, input, output, EventEmitter } from '@angular/core';
import { ConversationsService } from './conversations.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroUserCircleSolid } from '@ng-icons/heroicons/solid';
import { AuthService } from '../../../services/auth.service';

type User = {
	_id: string;	
	name: string;
	email: string;
}

@Component({
  selector: 'app-conversations',
  standalone: true,
  imports: [NgIcon],
  templateUrl: './conversations.component.html',
  styleUrl: './conversations.component.scss',
  providers: [provideIcons({ heroUserCircleSolid })]
})

export class ConversationsComponent {
	isFetching = signal<Boolean>(true);
	conversations = signal<any[]>([]);
	selectedConversation = output<{user: User, conversationId: string }>();

	user = signal<User | undefined>(undefined)

	private conversationsService = inject(ConversationsService);
	private destroyRef = inject(DestroyRef);
	private authService = inject(AuthService)

	ngOnInit() {
		this.user.set(this.authService.user())
        const userId = this.user()?._id;	

		if(userId) {
			const subscription = this.conversationsService.loadConversations(userId).subscribe({
				next: (conversations) => {
					this.conversations.set(conversations);
					this.setCurrentChat(conversations[0].participants, conversations[0]._id);
				},
				error: (error) => {
					console.error('Error fetching conversations:', error);
				},
				complete: () => {
					this.isFetching.set(false);
				}
				
			})
			this.destroyRef.onDestroy(() => {
				subscription.unsubscribe();
			});
		}

	}

	setCurrentChat(users: User[], conversationId: string) {
		const user = users.find((user) => user._id !== this.user()?._id);
		if (user) {
			this.selectedConversation.emit({user, conversationId});
		} else {
			console.error('No valid user found to emit.');
		}
	}

}
