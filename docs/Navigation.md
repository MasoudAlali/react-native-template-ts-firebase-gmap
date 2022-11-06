#### Navigation

We have some sample examples of how to manage `bottom tabs` and `stack` screens<br/>
If user is `LoggedIn`, `TabNabigator` will be default screen, else `Login` page is default

* default headers are disabled
* you should implement `LoginPage` for your application, and update store `isUserLoggedIn` value
* whole `Navigation` files are stored in `src/navigators`

***
* To typescript typing for your screen components you can define props like this:
```typescript
interface Props extends CompositeScreenProps<StackScreenProps<RootStackParamList, "Sample">, any> {}
```
***

##### Structure

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

