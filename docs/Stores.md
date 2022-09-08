### Stores

We are using `redux`, `@reduxjs/toolkit`, and `redux-persist` here

* Currently, we have `user` reducer which handles `LoggedIn` status and `Profile` info
* `user` reducer is persisted using AsyncStorage
* whole `store` files are stored in `src/store`

##### Structure

* `index.ts` which is responsible to initialize all tools and `combineReducers`
    * You can read more details about how to use or change this configuration please check below documentations
        * [Redux](https://redux.js.org/)
        * [Redux Toolkit](https://redux.js.org/redux-toolkit/overview)
        * [Redux Persist](https://github.com/rt2zz/redux-persist#readme)
* `user.ts` which contains user related data
  * State Structure:
    ```typescript
    interface ProfileState {
      isLoggedIn: boolean | false,
      token: Nullable<string>,
      refreshToken: Nullable<string>,
      profile: Nullable<ProfileInfo>
    }
    ```
  * Action Payload Structure:
    ```typescript
    interface ActionWithPayload<T> extends Action {
        payload: T | any;
    }
    ```
  * reducers:
    * `userLoggedIn`: you should `dispatch` it after user is logged in with `token`, `refreshToken`
    * `userLoggedOut`: you should `dispatch` it after user is logged out
    * `updateUserProfile`: you should `dispatch` it after you got user profile information

