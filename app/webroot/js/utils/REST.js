/*NOTE: If you see Cross-Origin Request Blocked: errors in your console, this error can be very deceiving.  It will get thrown if you can't connect to the host like
* for example the host is down, or the host url is invalid.  As of currently random cors errors occur if you make calls through the F5.  This doesn't happen if you
* point directly to one of the services hosts.  Front team is aware of the problem and working on it. */

var $ = require('jquery');
var _CREDENTIALS = "CREDENTIALS";
$.ajaxSettings.traditional = true;
$.support.cors = true;
//@todo change this for prod server
var _url = "http://192.168.1.8";

module.exports = {
    get: function(resource, arg, callback) {
       return this.call(resource, arg, callback, 'GET');
    },

    post: function(resource, arg, callback) {
        return this.call(resource, arg, callback, 'POST');
    },

    put: function(resource, arg, callback) {
        return this.call(resource, arg, callback, 'PUT');
    },

    delete: function(resource, arg, callback) {
        return this.call(resource, arg, callback, 'DELETE');
    },

    call: function(resource, arg, callback, method) {
        var headers;
        //console.debug("REST url:", _url+resource);
        if(method == 'GET')
        {
            headers = this.getHeaders();
        }
        else
        {
            headers = this.getAuthHeaders();
        }
        $.ajax({
                   method: method,
                   url: _url+resource,
                   //headers: headers,
                   data:arg,
                   dataType: 'json',
                   //cache: false,
                   //ifModified:true,
                   crossDomain: true,
                   success: callback,
                   error: function(status, err) {
                       console.error(_url+resource, status, err.toString());
                   }.bind(this)
               });
    },

    setCredentials: function(username, password)
    {
       var credentials = {
        username:username,
        password:password
       };
       localStorage.setItem(_CREDENTIALS, credentials);
    },

    getCredentials: function()
    {
        var credentials = localStorage.getItem(_CREDENTIALS);
        if (credentials == null)
        {
            console.error("Failed to get stored credentials, rest call will fail");
        }
        return credentials;
    },

    getAuthHeaders: function()
    {
        var headers = {};
        var credentials = this.getCredentials();
        headers['Authorization'] = "Basic " + btoa(credentials.username+":" + credentials.password);
        headers['Content-Type'] = 'application/json;charset=utf-8';
        headers['Accept'] = 'application/json';
        return headers;
    },

    getHeaders: function()
    {
        var headers = {};
        headers['Content-Type'] = 'application/json;charset=utf-8';
        headers['Accept'] = 'application/json';
        return headers;
    }
};
