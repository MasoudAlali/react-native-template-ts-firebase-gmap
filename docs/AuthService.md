##### Auth Service
This service is responsible for doing normal auth functionalities in term of persisting data and accessing them, this service mainly will be manipulated by AuthRequests<br/>
it will subscribe and dispatch on `user reducer`

  ```typescript 
loginUser({ token: string, refreshToken: string }) => void
```
this function will persist token and refreshToken in store after login and navigate to `Main` screen and send login event to AnalyticsService
  ```typescript
refreshUserToken({ token: string, refreshToken: string }) => void
```
this function will persist token and refreshToken in store after handling refreshToken request
  ```typescript
getToken() => string
```
this function will return user token
  ```typescript
getRefreshToken() => string
```
this function will return user refreshToken
  ```typescript
isUserLoggedIn() => boolean
```
this function will return if user is logged-in or not based on store flag;
