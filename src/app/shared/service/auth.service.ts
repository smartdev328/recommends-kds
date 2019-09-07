import { Injectable } from '@angular/core';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { from, of, Observable, BehaviorSubject, combineLatest, throwError } from 'rxjs';
import { tap, catchError, concatMap, shareReplay, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CommonUtil } from '@shared/utils/common-util';
import { UserRequest } from '@shared/model/request-body';
import { UserService } from '@shared/service/user.service';
import { Account } from '@shared/model/account';
import { User } from '@shared/model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Create an observable of Auth0 instance of client
  auth0Client$ = (from(
    createAuth0Client({
      domain: "dev--ilicir1.auth0.com",
      //client_id: "360XW2Ge6hB69Z5ae32T1ekhJHITyj7m",
      client_id: "SK978DumFV6PAhxKNFgM0g8vkZoLoxUN",
      redirect_uri: `${window.location.origin}/callback`,
      audience: "https://kin-dev-api-gateway",
      scope: 'openid profile email'
    })
  ) as Observable<Auth0Client>).pipe(
    shareReplay(1), // Every subscription receives the same shared value
    catchError(err => throwError(err))
  );
  // Define observables for SDK methods that return promises by default
  // For each Auth0 SDK method, first ensure the client instance is ready
  // concatMap: Using the client instance, call SDK method; SDK returns a promise
  // from: Convert that resulting promise into an observable
  isAuthenticated$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.isAuthenticated())),
    tap(res => this.loggedIn = res)
  );
  handleRedirectCallback$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.handleRedirectCallback()))
  );
  // Create subject and public observable of user profile data
  private userProfileSubject$ = new BehaviorSubject<any>(null);
  userProfile$ = this.userProfileSubject$.asObservable();
  // Create a local property for login status
  loggedIn: boolean = null;

  private userSubject$ = new BehaviorSubject<User>(null);
  user$ = this.userSubject$.asObservable();

  constructor(
    private router: Router,
    private userService: UserService
  ) { }




  // When calling, options can be passed if desired
  // https://auth0.github.io/auth0-spa-js/classes/auth0client.html#getuser
  getUserProfile$(options?): Observable<any> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.getUser(options))),
      tap(user => this.userProfileSubject$.next(user))
    );
  }

  getUser$(): Observable<any> {
    return this.userService.getUser().pipe(
      map((user) => this.userSubject$.next(user))
    );
  }

  localAuthSetup() {
    // This should only be called on app initialization
    // Set up local authentication streams
    const checkAuth$ = this.isAuthenticated$.pipe(
      concatMap((loggedIn: boolean) => {
        if (loggedIn) {

          // If authenticated, get user and set in app
          // NOTE: you could pass options here if needed
          // return this.getUserProfile$();
          return this.getUser$();
        }
        // If not authenticated, return stream that emits 'false'
        return of(loggedIn);
      })
    );
    const checkAuthSub = checkAuth$.subscribe((response: { [key: string]: any } | boolean) => {
      // If authenticated, response will be user object
      // If not authenticated, response will be 'false'
      this.loggedIn = !!response;
      // Clean up subscription
      checkAuthSub.unsubscribe();
    });
  }

  login(redirectPath: string = '/') {

    // A desired redirect path can be passed to login method
    // (e.g., from a route guard)
    // Ensure Auth0 client instance exists
    this.auth0Client$.subscribe((client: Auth0Client) => {
      // Call method to log in

      client.loginWithRedirect({

        redirect_uri: `${window.location.origin}/callback`,
        appState: { target: redirectPath }
      });

    });
  }

  handleAuthCallback() {
    // Only the callback component should call this method
    // Call when app reloads after user logs in with Auth0
    let currunrRoute :string;
    let targetRoute: string; // Path to redirect to after login processsed
    const authComplete$ = this.handleRedirectCallback$.pipe(
      // Have client, now call method to handle auth callback redirect
      tap(cbRes => {
        // Get and set target redirect route from callback results
         currunrRoute = JSON.parse(sessionStorage.getItem('current_url'));
        targetRoute = cbRes.appState && cbRes.appState.target ? cbRes.appState.target : '/';
      }),
      concatMap(() => {
        // Redirect callback complete; get user and login status
        return combineLatest(
          this.getUserProfile$(),
          this.isAuthenticated$
        );
      })
    );
    // Subscribe to authentication completion observable
    // Response will be an array of user and login status
    const authCompleteSub = authComplete$.subscribe(([user, loggedIn]) => {

      if (user['http://user.information/loginCount'] == 1) {
        // Fist login, create a new account
        const userRequest = new UserRequest(CommonUtil.initRequestBody());
        userRequest.email = user.email;
        this.userService.createUser(userRequest).subscribe((response) => {
          this.router.navigate(['get-started']);
        });
      } else {
        this.userService.getUser().subscribe((user) => {
          this.userSubject$.next(user);
        });
        if (currunrRoute) {
          this.router.navigate([currunrRoute]);
          sessionStorage.removeItem('current_url');
        } else {
          this.router.navigate([targetRoute]);
        }
      }

      // Redirect to target route after callback processing
      //this.router.navigate([targetRoute]);
      // Clean up subscription
      authCompleteSub.unsubscribe();
    });
  }

  logout() {
    // Ensure Auth0 client instance exists
    this.auth0Client$.subscribe((client: Auth0Client) => {
      // Call method to log out
      client.logout({
        client_id: "360XW2Ge6hB69Z5ae32T1ekhJHITyj7m",
        returnTo: `${window.location.origin}`
      });
    });
  }

  getTokenSilently$(options?): Observable<string> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.getTokenSilently(options)))
    );
  }

}
