var browserify = require('browserify');
var b = browserify();
b.add('./lib/ftdatasquasher.js');
b.bundle({standalone: 'DataSquasher'}).pipe(process.stdout);
