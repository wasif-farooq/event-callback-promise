### Event Callback Promise
The package enable yout to convert you callback function either its a normal function that handle callback or a event callback to promise behaviour.

## How To Install
To install run bwlow command
```bash
npm install -g event-callback-promise
```

## How To User

To convert a normal function that has a callback
```
const fs = require('fs');
const ecp = require('event-callback-promise');

// let say convert rename function of fs libarary
const rename = ecp(fs.rename);

// now call the function with params
rename('file1.tt', 'file2.txt')
    .then(() => console.log('file renamed'))
    .catch((err) => console.log("error in renaming : ", err))

```

To convert a event callback function that
```
const EventEmitter = require('events');
const ecp = require('event-callback-promise');

const emitter = new EventEmitter();
ecp(emitter, 'data')
    .then((data) => console.log('you receive : ', data))
    .catch((err) => console.log("there is a error : ", err))

emitter.emit('data', 1);

```

## License
MIT
