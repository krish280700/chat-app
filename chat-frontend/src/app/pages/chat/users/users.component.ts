import { Component, DestroyRef, inject, signal } from '@angular/core';
import { UsersService } from './users.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroUserCircleSolid } from '@ng-icons/heroicons/solid';
import { heroUserPlus } from '@ng-icons/heroicons/outline';


type User = {
	_id: number;	
	name: string;
	email: string;
}

@Component({
	selector: 'app-users',
	standalone: true,
	imports: [NgIcon ],
	templateUrl: './users.component.html',
	styleUrl: './users.component.scss',
	providers: [provideIcons({ heroUserCircleSolid, heroUserPlus })]
})
export class UsersComponent {
	isFetching = signal<Boolean>(true);
	users = signal<User[]>([]);
	
	private usersService = inject(UsersService);
	private destroyRef = inject(DestroyRef);

	ngOnInit() {
	
		const subsciption = this.usersService.loadUsers().subscribe({
			next: (users) => {
				this.users.set(users);
			},
			error: (error) => {
				console.error('Error fetching users:', error);
			},
			complete: () => {
				this.isFetching.set(false);
			}
		});

		this.destroyRef.onDestroy(() => {
			subsciption.unsubscribe();
		});	
	}

}
