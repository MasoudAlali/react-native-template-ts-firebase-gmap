##### Logger

This service is easily a wrapper for console with all those functions, the only difference is that first argument of
functions will be a key which is defined in same module, and you can enable or disable that logs

* There are some predefined LogKeys in this module which you can use as first argument when calling methods:

```typescript
type LogTypes = "API" | "CACHE" | "COMPONENT" | "ERROR" | "OTHER";

const LogKeys = {
  API: "API",
  Cache: "CACHE",
  Component: "COMPONENT",
  Other: "OTHER",
  Error: "ERROR",
}
```

* There is `hiddenLogs` field in `Logger` class which will determine if should hide a log type or not
