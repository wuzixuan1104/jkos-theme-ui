# Error Handling pattern

# Tips
1. 存有效的資訊到 error object
2. bubble up errors
3. 可重複使用的 function, 預期條件內可以直接回傳 boolean
4. 錯誤在不同 module 中定義
5. 立即印出錯誤內容
  - 使用 logger helper 於 kibana 上可以截取到



![](https://i.imgur.com/V1q04rj.png)

![](https://i.imgur.com/oDY01TA.png)



## Ref

- Node: https://nodejs.org/api/errors.html#new-errormessage-options

- https://medium.com/@nick_92077/error-handling-patterns-for-javascript-applications-23cc5e2a416c

- Patterns for Generation, Handling and Management of Errors