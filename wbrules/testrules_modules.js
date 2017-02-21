defineVirtualDevice("test", {
    cells: {
        helloworld: {
            type: "switch",
            value: false
        },
        multifile: {
            type: "switch",
            value: false
        },
        error: {
            type: "switch",
            value: false
        },
        cross: {
            type: "switch",
            value: false
        }
    }
});

defineRule("helloworld", {
    whenChanged: "test/helloworld",
    then: function() {
        var m = require("test/helloworld");
        // var m = {hello: 42};
        log("Required module value:", m.hello);
        log("Function test:", m.adder(10, 20));
    }
});

defineRule("error", {
    whenChanged: "test/error",
    then: function() {
        try {
            var m = require("notfound");
            log("ERROR: Found non-existing module");
        } catch (e) {
            log("Module not found");
        }
    }
});

defineRule("multiple_require", {
    whenChanged: "test/multifile",
    then: function() {
        var m = require("test/multi_init");
        log("[1] My value of multi_init:", m.value);
    }
});

defineRule("cross-dep", {
    whenChanged: "test/cross",
    then: function() {
        require("test/with_require");
        log("Module loaded");
    }
});