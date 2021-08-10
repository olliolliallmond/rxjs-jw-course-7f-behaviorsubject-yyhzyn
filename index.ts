import { fromEvent, Subject, BehaviorSubject } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';

const loggedInSpan: HTMLElement = document.querySelector('span#logged-in');
const loginButton: HTMLElement = document.querySelector('button#login');
const logoutButton: HTMLElement = document.querySelector('button#logout');
const printStateButton: HTMLElement = document.querySelector(
  'button#print-state'
);

const isLoggedIn$ = new BehaviorSubject<boolean>(false);

fromEvent(loginButton, 'click').subscribe(() => isLoggedIn$.next(true));
fromEvent(logoutButton, 'click').subscribe(() => isLoggedIn$.next(false));

//Navigation bar
isLoggedIn$.subscribe(
  isLoggedIn => (loggedInSpan.innerText = isLoggedIn.toString())
);

// Buttons
isLoggedIn$.subscribe(isLoggedIn => {
  logoutButton.style.display = isLoggedIn ? 'block' : 'none';
  loginButton.style.display = isLoggedIn ? 'none' : 'block';
});

// fromEvent(printStateButton, 'click').subscribe(() =>
//   console.log('User logged in? ', isLoggedIn$.value)
// );

// More common way
fromEvent(printStateButton, 'click')
  .pipe(withLatestFrom(isLoggedIn$))
  .subscribe(([event, isLoggedIn]) =>
    console.log('User logged in? ', isLoggedIn)
  );
