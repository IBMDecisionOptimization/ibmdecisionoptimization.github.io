(function($){

    // Store the initial location.hash so that the event isn't triggered when
    // the page is first loaded.
    var last_hash = location.hash,

    // An id with which the polling loop can be canceled.
        timeout_id;

    // Special event definition.
    $.event.special.hashchange = {
        setup: function() {
            // If the event is supported natively, return false so that jQuery
            // will bind to the event using DOM methods instead of using the
            //  polling loop.
            if ( 'onhashchange' in window ) { return false; }

            // Start the polling loop if it's not already running.
            start();
        },
        teardown: function() {
            // If the event is supported natively, return false so that jQuery
            // will bind to the event using DOM methods instead of using the
            // polling loop.
            if ( 'onhashchange' in window ) { return false; }

            // Stop the polling loop. Since this event is only evern bound to
            // the `window` object, multiple-element tracking is unnecessary.
            stop();
        },
        add: function( handleObj ) {
            // Save a reference to the bound event handler.
            var old_handler = handleObj.handler;

            // This function will now be called when the event is triggered,
            // instead of the bound event handler.
            handleObj.handler = function(event) {

                // Augment the event object with the location.hash at the time
                // the event was triggered.
                event.fragment = location.hash.replace( /^#/, '' );

                // Call the originally-bound event handler, complete with modified
                // event object! The result from this call doesn't need to be
                // returned, because there is no default action to prevent, and
                // nothing to propagate to.
                old_handler.apply( this, arguments );
            };
        }
    };

    // Start (or continue) the polling loop.
    function start() {
        // Stop the polling loop if it has already started.
        stop();

        // Get the current location.hash. If is has changed since the last loop
        // iteration, store that value and trigger the hashchange event.
        var hash = location.hash;
        if ( hash !== last_hash ) {
            $(window).trigger( 'hashchange' );
            last_hash = hash;
        }

        // Poll, setting timeout_id so the polling loop can be canceled.
        timeout_id = setTimeout( start, 100 );
    };

    // Stop the polling loop.
    function stop() {
        clearTimeout( timeout_id );
    };

})(jQuery);
