ftdatasquasher
==============

Data compression and decompression support, packing base64 into UTF8 high and
low bytes that we use to 'compress' base 64 encoded to maximise the amount of
binary data we can store offline on [described](bit.ly/unireencode) by
[@triblondon](http://www.twitter.com/triblondon).

## The problem

If you want to store binary data for offline use browsers today don't officially
support it.  (localStorage only stores strings, WebSQL stores a few different
types - but not binary, and IndexedDB doesn't support it on all browsers)

Also IndexedDB is unlikely to ever support it properly across all browsers as
[File API](should fulfill the storing binary files for offline use case).

But you can work around it.  If you base 64 the binary data it becomes a string
and that string can be stored with the storage technology of your choosing.

Though, in reality it is only really practical to use IndexedDB (falling back
to WebSQL when IndexedDB is not available as localStorage has limited capacity
and base 64 encoded binary files tend to be quite large.

When data in a web browser's offline storage is stored (for example
IndexedDB, WebSQL or localStorage) it stores that data as UTF16.

Because UTF-16 is capable of encoding over a million different characters and
Base 64 only uses 64 of them it turns out that UTF-16 is not a very efficient
format for storing base 64 encoded data.

## What do we do

We squash the characters together (if you look at them in dev tools the string
often comes out as a mixture of characters from East Asian languages.  This
algorithm allows us to store more than twice as much base 64 encoded data than
without it.

## Installation

```
npm install ftdatasquasher
```

## Compatability

It's just plain javascript.  It should work everywhere.  Across all browsers
(via a compiler like Browserify) and in NodeJS.

## Usage

[See the docs](http://ftlabs.github.io/ftdatasquasher/doc/module-ftdatasquasher.html)

## Credits and collaboration ##

The lead developer of FastClick is
[Rowan Beentje](http://twitter.com/rowanbeentje) at FT Labs. This fork is
currently maintained by [Matt Andrews](http://twitter.com/andrewsmatt). All open
source code released by FT Labs is licenced under the MIT licence. We welcome
comments, feedback and suggestions.  Please feel free to raise an issue or pull
request. Enjoy.
