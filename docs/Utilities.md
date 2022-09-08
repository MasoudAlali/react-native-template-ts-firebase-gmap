### Utilities

Here we have some very basic utility methods which you can use in different scenarios

* you can check them in `src/utilities`

##### Description

* `date.ts` has some utilities for `Date`:
    * mostly for complex date calculations we are using [moment.js](https://momentjs.com/)
      ###### for more details about implementations you can refer to [MomentJS docs](https://momentjs.com/docs/)
    * all methods accept `Date` | `string`, and it should be supported by `Date` standards
    * `WeekDayNames`: string array of day names
    * `MonthNames`: string array of month names

```typescript
const convertDateTimeToTime = (datetime: string | Date) => string;

convertDateTimeToTime("2022-09-08T11:33:35.306Z") => "11:33" // in local timezone
```
```typescript
const convertDateTimeToDate = (datetime?: string | Date, short: boolean = false) => string;

convertDateTimeToDate("2022-09-08T11:33:35.306Z", true) => "Sep 08"
convertDateTimeToDate("2022-09-08T11:33:35.306Z", false) => "2022-09-08"
```
```typescript
const getTimeDiff = (time: Date | string) => string;

// current time "2022-09-08T11:33:35.306Z"
getTimeDiff("2022-09-08T11:33:30.306Z") => "Few seconds ago"
getTimeDiff("2022-09-08T11:23:35.306Z") => "10 min ago"
getTimeDiff("2022-09-08T10:23:35.306Z") => "1 hour ago"
getTimeDiff("2022-09-07T11:23:35.306Z") => "Yesterday"
getTimeDiff("2022-09-01T11:23:35.306Z") => "Sep 01"
getTimeDiff("2022-09-10T11:33:35.306Z") => "Future"
```

* `fileSize.ts` has method to show file size in more human-readable style:
```typescript
const convertSizeFile = (fileSize: number, decimals: number = 2) => string;

convertSizeFile(1048576) => "1MB"
```

* `string.ts` has some utilities to work with strings:
```typescript
const camelize = (str: string) => string;

camelize("hello there") => "Hello There"
```
```typescript
const camelizeArray = (arr: string[] = [], separator = "") => string;

camelizeArray(["hello", "there"], "-") => "Hello-There"
```
```typescript
const baseFormatPrice = (price: number) => string;

baseFormatPrice(12000) => "12,000.00"
```
