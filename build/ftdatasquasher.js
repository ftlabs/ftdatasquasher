(function(e){if("function"==typeof bootstrap)bootstrap("datasquasher",e);else if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else if("undefined"!=typeof ses){if(!ses.ok())return;ses.makeDataSquasher=e}else"undefined"!=typeof window?window.DataSquasher=e():global.DataSquasher=e()})(function(){var define,ses,bootstrap,module,exports;
return (function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
(function(){/**
 * FT Data Squasher
 *
 * Data compression and
 * decompression support,
 * packing base64 into UTF8
 * high and low bytes
 *
 * A requireable module of the
 * compression and decompression
 * algorithm described by
 * @triblondon here:
 * http://bit.ly/11NGLrV
 *
 * @codingstandard ftlabs-jsv2
 * @copyright The Financial Times Limited [All rights reserved]
 */

/*jshint laxbreak:true*/

/**
 * Compresses the Image using
 * the most recent compression
 * algorithm.
 */
function compress(data) {
  var i, l, out = '';

  /**
   * If string is not an even
   * number of characters, pad
   * it with a space, so that
   * when these bytes are read
   * as UTF-16 data, the final
   * character is complete
   */
  if (data.length % 2 !== 0) {
    data += ' ';
  }

  for (i = 0, l = data.length; i < l; i += 2) {
    out += String.fromCharCode((data.charCodeAt(i) * 256)
      + data.charCodeAt(i + 1));
  }

  return out;

}

/**
 * Decompress the Image using
 * decompression algorithm 1.
 *
 * Findings when optimising this
 * function for homescreen iOS 6:
 * 1) Bitwise maths is significantly
 *    faster - ~1.25x faster
 * 2) Caching fromCharCode method
 *    slightly faster - ~1.03x
 *    faster
 * 3) Eliminating temporary storage
 *    variables - ~1.1x faster
 * 4) Passing multiple arguments to
 *    fromCharCode is complex; with
 *    just two, slower (!) - ~1.10x
 *    slower - but combined with
 *    unrolling, faster,
 * 5) Unrolling the loop is faster,
 *    although with diminishing
 *    returns - never near linear.
 * 6) Combining unrolling with
 *    multiple arguments to
 *    fromCharCode leads to a bigger
 *    speed increase due to batched
 *    string creation.
 *
 * @param {string} data The compressed data to uncompress
 *
 * @return string
 */
function decompress(data) {
  var i, n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12, n13, n14, n15, n16;
  var getCharacterCode = String.fromCharCode;
  var decompressedData = '';

  /**
   * While l is ultimately the
   * length to process, unrolling
   * the loop needs to process
   * the data in batches, in this
   * case of 16; so start with the
   * length rounded to a multiple
   * of 16.
   */
  var l = (data.length >> 4 << 4);

  /**
   * In a loop, process the data
   * in batches of 16 characters.
   */
  for (i = 0; i < l; i++) {

    /**
     * Copy to local variables
     * representing the character
     * code at the positions
     */
    n1 = data.charCodeAt(i);
    n2 = data.charCodeAt(++i);
    n3 = data.charCodeAt(++i);
    n4 = data.charCodeAt(++i);
    n5 = data.charCodeAt(++i);
    n6 = data.charCodeAt(++i);
    n7 = data.charCodeAt(++i);
    n8 = data.charCodeAt(++i);
    n9 = data.charCodeAt(++i);
    n10 = data.charCodeAt(++i);
    n11 = data.charCodeAt(++i);
    n12 = data.charCodeAt(++i);
    n13 = data.charCodeAt(++i);
    n14 = data.charCodeAt(++i);
    n15 = data.charCodeAt(++i);
    n16 = data.charCodeAt(++i);

    /**
     * Use String.fromCharCode
     * (or a cached version of
     * same) to get the ascii
     * characters from the high
     * and low parts of each of
     * the characters. In other
     * words, each character
     * from the passed-in data
     * is converted via:
     *   decompressedData += String.fromCharCode(n >> 8)
     *     + String.fromCharCode(n & 255)
     */
    decompressedData += getCharacterCode(
      n1 >> 8, n1 & 255, n2 >> 8, n2 & 255, n3 >> 8, n3 & 255, n4 >> 8, n4 & 255,
      n5 >> 8, n5 & 255, n6 >> 8, n6 & 255, n7 >> 8, n7 & 255, n8 >> 8, n8 & 255,
      n9 >> 8, n9 & 255, n10 >> 8, n10 & 255, n11 >> 8, n11 & 255, n12 >> 8, n12 & 255,
      n13 >> 8, n13 & 255, n14 >> 8, n14 & 255, n15 >> 8, n15 & 255, n16 >> 8, n16 & 255
    );
  }

  /**
   * Finally, output the end
   * of the string, by processing
   * any characters left over
   * after the groups of 16
   * have been handled.
   */
  for (l = data.length; i < l; i++) {
    n1 = data.charCodeAt(i);
    decompressedData += getCharacterCode(n1 >> 8) + getCharacterCode(n1 & 255);
  }

  return decompressedData;
}


module.exports = {
  compress: compress,
  decompress: decompress
};

})()
},{}]},{},[1])(1)
});
;