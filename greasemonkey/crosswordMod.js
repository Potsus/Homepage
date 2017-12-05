// ==UserScript==
// @name         Crossword Sound Mod
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Replace the crummy new nound with a more triumphant one
// @author       Alex Potts
// @match        *://embed.universaluclick.com/c/usat/l/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
     setTimeout(function(){window.puzzle_solve.setAttribute('src', 'http://apotts.me/mp3/tada.mp3');}, 5000);
    // Your code here...
})();