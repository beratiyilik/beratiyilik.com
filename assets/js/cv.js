/**
* cv.js
*/
'use strict';
var cv;
(function (window, document, cv) {
    const defaults = {};
    const init = () => {
        var options = { root: null };
        cv.options = extend(true, defaults, options || {});

        // render();
    };

    const redirectToPath = (path) => window.location.pathname = path;

    const createState = state => {
        return new Proxy(state, {
            set(obj, prop, value) {
                obj[prop] = value;
                render();
                return true;
            }
        });
    };

    const state = createState({
        model: [{}, {}]
    });

    const template = (model) => {
        const template = () => ``;
        return `${template}`;
    };

    const render = () => {
        const model = state['model'] || [];
        if (model && model.length < 1) return;

        var divMain = document.getElementById(cv.options.root);
        if (!divMain) return;

        divMain.innerHTML = template(model);
    };

    /*!
    * Merge two or more objects together.
    * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
    * @param   {Boolean}  deep     If true, do a deep (or recursive) merge [optional]
    * @param   {Object}   objects  The objects to merge together
    * @returns {Object}            Merged values of defaults and options
    */
    var extend = function () {

        // Variables
        var extended = {};
        var deep = false;
        var i = 0;

        // Check if a deep merge
        if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
            deep = arguments[0];
            i++;
        }

        // Merge the object into the extended object
        var merge = function (obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    // If property is an object, merge properties
                    if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                        extended[prop] = extend(extended[prop], obj[prop]);
                    } else {
                        extended[prop] = obj[prop];
                    }
                }
            }
        };

        // Loop through each object and conduct a merge
        for (; i < arguments.length; i++) {
            merge(arguments[i]);
        }

        return extended;
    };

    /*!
     * Sanitize and encode all HTML in a user-submitted string
     * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
     * @param  {String} str  The user-submitted string
     * @return {String} str  The sanitized string
     */
    const sanitizeHTML = str => {
        var temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    };

    cv.redirectToHome = () => redirectToPath('');
    init();
})(this, this.document, this.cv || (this.cv = {}));
