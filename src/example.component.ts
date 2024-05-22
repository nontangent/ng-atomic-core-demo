import { Component, Directive, inject, input } from '@angular/core';
import {
  InjectableComponent,
  NgAtomicComponent,
  TokenizedType,
} from '@ng-atomic/core';

export enum ActionId {
  CREATE = 'Create',
}

@TokenizedType()
@Directive({ standalone: true, selector: 'example' })
export class ExampleComponentStore extends InjectableComponent {
  static readonly ActionId = ActionId;
  readonly name = input<string>('');
}

@Component({
  standalone: true,
  selector: `example`,
  template: `
  <div>{{ store.name() }}</div>
  <button (click)="onClick()">ADD</button>
  `,
  hostDirectives: [
    {
      directive: ExampleComponentStore,
      inputs: ['name'],
    },
  ],
})
export class ExampleComponent extends NgAtomicComponent {
  protected readonly store = inject(ExampleComponentStore);

  protected onClick() {
    this.dispatch({ id: ActionId.CREATE, payload: 'ADD' });
  }
}
