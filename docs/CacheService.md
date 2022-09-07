### Cache Service
This service is responsible for maintain requests cache data which are handled by axios interceptors and persist them using StorageService<br/>

* requests with `get` method will be persisted with `url + params` key and content of whole response with some expire time
* data will be saved in StorageService with `@cache` key 

##### Methods

```typescript 
async save(key: string, content: any, expireIn: number = 5 * Minute) => void
```
will save a cache entry with given `key` (usually url + params) and `content` for `expireIn` amount of time
* expireIn will be converted in milliseconds, so you should only pass `seconds` as it's value
* default expire time for each cache entry is `5 minutes`

#### Methods:

```typescript
async get(key: string) => any | null
```
will return cache entry `content` with given `key` if entry exists and it's not expired
  ```typescript
async remove(key: string) => void
```
will remove cache entry with given `key` 
```typescript
clear() => void
```
will clear all cached entries
```typescript
getCacheKeyFromUrl(url: string, params: object = {}) => string
```
will generate a cache key for given url and params, this key can be used as argument for save an entry
