# prms
A simple Promise implementation

##Usage

```js
let promise = new Prms((resolve, reject) => {
    setTimeout(() => {
      const apiResponse = fakeApiBackend();

      if (apiResponse.statusCode >= 400) {
        reject(apiResponse);
      } else {
        resolve(apiResponse.data);
      }
    }, 1500);
  });
  
  promise.then(response => console.log(response)).catch(error => console.error(error));
```
