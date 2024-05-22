import { Component, Directive, inject, input } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Effect, provideComponent } from '@ng-atomic/core';
import 'zone.js';
import {
  InjectableComponent,
  // NgAtomicComponent,
  // TokenizedType,
} from '@ng-atomic/core';
import { ExampleComponentStore, ExampleComponent } from './example.component';
import { NgAtomicComponent } from './ng-atomic.component';

// @TokenizedType()
// @Directive({ standalone: true, selector: 'example' })
// export class ExampleComponentStore extends InjectableComponent {
//   readonly name = input<string>('');
// }

// @Component({
//   standalone: true,
//   selector: `example`,
//   template: `
//   <div>{{ store.name() }}</div>
//   <button (click)="onClick()">ADD</button>
//   `,
//   hostDirectives: [
//     {
//       directive: ExampleComponentStore,
//       inputs: ['name'],
//     },
//   ],
// })
// export class ExampleComponent extends NgAtomicComponent {
//   protected readonly store = inject(ExampleComponentStore);

//   protected onClick() {
//     this.dispatch({ id: ActionId.CREATE, payload: 'ADD' });
//   }
// }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ExampleComponentStore],
  template: `
    <example [name]="'test'" (action)="dispatch($event)" injectable/>
  `,
  providers: [provideComponent(ExampleComponentStore, () => ExampleComponent)],
})
export class App extends NgAtomicComponent {
  @Effect(ExampleComponentStore.ActionId.CREATE)
  protected create() {
    console.debug('success!!');
    alert('created!!');
  }
}

bootstrapApplication(App);
