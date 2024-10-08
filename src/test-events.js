(function () {
    var counters = {
        start: 0,
        end: 0,
        turn: 0
    };

    var tracker = {
        ongamestart: function () {
            counters.start++;
            console.log('start');
        },
        ongameover: function () {
            counters.end++;
            console.log('end');
        },
        turn: function (i) {
            if (i === counters.turn + 1) {
                counters.turn++;
                console.log('turn ' + i);
            }
        },
        print: function () {
            var key;
            for (key in counters) {
                console.log('counter ' + key + ': ' + counters[key]);
            }
        }
    }

    window.eventTracker = tracker;
})();
