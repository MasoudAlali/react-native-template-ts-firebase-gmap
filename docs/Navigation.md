#### Navigation

We have some sample examples of how to manage `bottom tabs` and `stack` screens<br/>
If user is `LoggedIn`, `TabNabigator` will be default screen, else `Login` page is default

* default headers are disabled
* you should implement `LoginPage` for your application, and update store `isUserLoggedIn` value
* whole `Navigation` files are stored in `src/navigators`

##### Structure

* `Application.tsx` which is responsible to render:
    * `SafeAreaView` (to handle safe area view in devices with notch, ...)
    * `NavigationContainer`
    * `StatusBar` (you can modify based on your application theme)
    * `MainStack` which contains `TabNavigator` and other pages
* `Root.tsx` which contain some `refs` and `methods` to use navigations more easily
    * `navigationRef` is default `Navigator` and base to call methods
    * `navigateBack` handles navigation to previous screen
      ```typescript
      const navigateBack = () => void;
      ```
    * `navigate` handles navigation to some screen with specific params
      ```typescript
      const navigate = (name: string, params: any = {}) => void;
      ```
    * `navigateAndReset` handles resetting main stack with some `routes` initial state
      ```typescript
      const navigateAndReset = (routes: any[] = [], index: number = 0) => void;
      ```
* `Main.tsx` which is used to define screens and params
    * You should define your screens and their params in `RootStackParamList`
      ```typescript
      // Sample
      type RootStackParamList = {
           Hello: undefined;
           Sample: {
               title: string;
           }
      }
      ```
    * `TabStack` which contains all `BottomTab` screens
    * `MainStack` which contains all `Stack` screens
      * it also handles `LoggedIn` state by setting `initialRouteName`
