
        /**
         * IE 5.5+, Firefox, Opera, Chrome, Safari XHR object
         *
         * @param {string} url
         * @param {object} data
         * @param {function} callback
         */
        var miniAjax = function(url, data, callback) {
            // Cache param
            data._t = (new Date).getTime();

            // Must encode data
            var dataVars = [];
            for (var x in data) {
                if (data.hasOwnProperty(x)) {
                    dataVars.push(encodeURIComponent(x) + '=' + encodeURIComponent(data[x]));
                }
            }

            try {
                var xrh = new (window.XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');
                xrh.open('POST', url, true);
                xrh.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                xrh.setRequestHeader('X-MicrosoftAjax', 'Delta=true'); // @todo need? test..
                xrh.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                xrh.onreadystatechange = function () {
                    xrh.readyState > 3 && callback(xrh.responseText, xrh);
                };
                xrh.send(dataVars.join('&'));
            } catch (e) {
                window.console && console.log(e);
            }
        };
