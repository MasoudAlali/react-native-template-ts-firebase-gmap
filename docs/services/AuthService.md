### Auth Service
This service is responsible for doing normal auth functionalities in term of persisting data and accessing them, this service mainly will be manipulated by AuthRequests<br/>
it will dispatch on `user reducer`

#### Methods:

  ```typescript 
loginUser({ token: string, refreshToken: string }) => void
```
this function will persist token and refreshToken in store after login and navigate to `Main` screen and send login event to AnalyticsService
  ```typescript
refreshUserToken({ token: string, refreshToken: string }) => void
```
