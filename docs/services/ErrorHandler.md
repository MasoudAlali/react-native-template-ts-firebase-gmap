### Error Handler
This service is responsible for showing errors to user using `ToastService.showMessage` with `error` type<br/>


* It has some kind of debounce and deduplication, which will filter duplicate messages in given time frame
  * Default behavioral is that each message can be shown in 15000 ms (`debounce`)
* You can specify some filtering to prevent some messages to be shown to user
  * if you want to hide specific message which you have whole message just add it to `filteredMessages`, afterwards the messages included in this array won't be shown to user
  * if you want to hide a message which contains specific word or substring, you can add that word to `messagesFilter`, afterwards them messages which includes those substrings won't be shown to user
* Currently, it's used in `Axios.interceptors.request` in `api.ts`

#### Fields:
|    field name    |   type    | default |                                 description                                  |
|:----------------:|:---------:|:-------:|:----------------------------------------------------------------------------:|
|    #messages     |   any[]   |   []    |    used to store handled messages to check for duplication and debouncing    |
|     debounce     |  number   |  15000  |              milliseconds for not showing already shown message              |
| filteredMessages | string [] |   []    |           used to check if you want to hide some specific messages           | 
|  messagesFilter  | string[]  |   []    | used to check if message contain any word or sentence from this array or not |

#### Methods:
```typescript
handleMessage(errorMessage: string, forceShow: boolean = false) => void
```
this function is responsible to do all the logics, it will get some `errorMessage` which is `string` and will check if it's filtered or not, and will check if we already shown this in `debounce` time or not
* you can pass `forceShow` which is `boolean`, it will bypass all the filtering and show `errorMessage`

```typescript
handleError(error: Axios<ErrorResponseType> | Error, foreShow: boolean = false) => void
```
this function is just a helper, you can just pass `AxiosError` or `Error` and it will extract message and send it to `handleMessage`
