import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BetsService } from '../../services/bets.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-bets',
  standalone: true,
  // imports: [DatePipe],
  templateUrl: './bets.component.html',
  styleUrl: './bets.component.scss'
})
export class BetsComponent {

  private readonly betsService = inject(BetsService);
  bets = toSignal(this.betsService.getBets(), {initialValue:[]} );

  logEffect = effect(() => {
    if(this.bets().length) {
    console.log(this.bets()[0].createdAt.toISOString());
    }
  })

  createBet() {
    const bet = {
      numbers: [1,2,3,4,5,6],
      userId: 'gabriel.chiareli03@gmail.com',
      userAvatarUrl: 'https://avatars.dicebear.com/api/avataaars/1.svg',
    }

    this.betsService.createBet(bet);
  }

}
