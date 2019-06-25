var logger = function () {
    var instance = {};

    // Logging for printlabel.html so that Ajax error is not shown when redirected to index.html
    var base = {};
    base.log = console.log;
    base.info = console.info;
    base.warn = console.warn;
    base.error = console.error;

    var log_element = null;
    instance.Setup = function (html_element, trigger_alerts) {
        if (html_element && document.querySelector(html_element))
            log_element = html_element;
        instance.Trigger_Alerts = (trigger_alerts ? true : false);
    };

    instance.Write = function () {
        var message = "";
        for (var i = 0; i < arguments.length; i++)
            message += arguments[i];

        if (log_element)
            document.querySelector(log_element).innerHTML = message;

        if (instance.Trigger_Alerts)
            alert(message);
    };

    instance.Trigger_Alerts = false;

    console.log = function () {
        instance.Write.apply(this, arguments);
        base.log.apply(console, arguments);
    };

    //console.info = function () {
    //    instance.Write.apply(this, arguments);
    //    base.info.apply(console, arguments);
    //};

    //console.warn = function () {
    //    instance.Write.apply(this, arguments);
    //    base.warn.apply(console, arguments);
    //}

    //console.error = function () {
    //    instance.Write.apply(this, arguments);
    //    base.error.apply(console, arguments);
    //}

    return instance;
}();
