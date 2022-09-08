### Event Emitter

This service is very simple connection between listeners and emitters, listeners listen on specific eventName and
emitters will emit on that specific eventName and pass the params

so it's a helper to call whatever listener in anywhere from anywhere you want

for example if you want to show a `Modal` which is used in `App.tsx`, you can
emit `EventEmitter.Events.General.ShowModal()` and that's it, `Modal` Component will be called by it's listener

#### Fields:

|    field name    |            type            | default |                                            description                                            |
|:----------------:|:--------------------------:|:-------:|:-------------------------------------------------------------------------------------------------:|
|      Events      |             {}             |   {}    |   this object contains all event names we need in application, currently it has `Modal` events    |
|     #events      | Record<string, Function[]> |   {}    | this object contains all registered listeners which will be manipulated with `addListener` method |

#### Methods
```typescript
addListener(eventName: string, handler: Function) => Function
```
you can add listener to some event by passing `eventName` (which is listed in `Events` field) and a handler which will be called with params whenever event is emitted<br/>
this will return a `Function` which will be remove the listener
```typescript
removeListener(eventName: string, handler: Function) => void;
```
you can remove specific listener by passing its `eventName` and `handler` you already provided<br/>
if you keep returned function of `addListener` you can easily call it and remove that listener
```typescript
emit(eventName: string, payload?: any) => void
```
will emit some event by `eventName` and call all listeners assigned to that `eventName` with given `payload`

#### Example

* Listener

```typescript jsx
import EventEmitter from "./EventEmitter";

const Modal = () => {
  const showModal = () => {
  };

  useEffect(() => {
    const listener = EventEmitter.addListener(EventEmitter.Events.General.ShowModal(), showModal);

    return () => listener();
  }, [])
}
```

* Emitter

```typescript jsx
import EventEmitter from "./EventEmitter";

const DeleteButton = () => {
  const onPress = () => {
    EventEmitter.emit(EventEmitter.Events.General.ShowModal(), {
      title: "Are you sure",
      onAction: () => {
      }
    })
  }
}
```
