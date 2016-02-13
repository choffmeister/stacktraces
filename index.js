const Bluebird = require('bluebird');

function logError(name, err) {
    console.log('Name: ' + name);
    console.log(err.stack
        // filter external files
        .split('\n')
        .filter(l => l.indexOf('stacktraces/') >= 0 && l.indexOf('node_modules/') < 0)
        .join('\n'));
}

setTimeout(() => {
    setTimeout(() => {
        setTimeout(() => {
            setTimeout(() => {
                setTimeout(() => {
                    // must be caught here, since else the application crashes
                    try {
                        throw new Error('setTimeout');
                    } catch (err) {
                        logError('setTimeout', err);
                    }
                }, 0);
            }, 0);
        }, 0);
    }, 0);
}, 0);

Promise.resolve().then(() =>
    Promise.resolve().then(() =>
        Promise.resolve().then(() =>
            Promise.resolve().then(() =>
                Promise.resolve().then(() =>
                    Promise.reject(new Error('Promise'))
                )
            )
        )
    )
)
.catch(err => logError('Promise', err));

Bluebird.resolve().then(() =>
    Bluebird.resolve().then(() =>
        Bluebird.resolve().then(() =>
            Bluebird.resolve().then(() =>
                Bluebird.resolve().then(() =>
                    Bluebird.reject(new Error('Bluebird'))
                )
            )
        )
    )
)
.catch(err => logError('Bluebird', err));
