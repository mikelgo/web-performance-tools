function createUniqueLists(firstParty, thirdParty) {
    function getUniqueListBy(arr, key) {
        return [...new Map(arr.map((item) => [item[key], item])).values()];
    }

    const firstPartyList = getUniqueListBy(firstParty, ["name"]);
    const thirdPartyList = getUniqueListBy(thirdParty, ["name"]);

    return { firstPartyList, thirdPartyList };

}

const { firstPartyList, thirdPartyList } = createUniqueLists(
    firstParty,
    thirdParty
);



function calculateTimings(party, type) {
    const partyChoice = party === "first" ? firstParty : thirdParty;

    const timingChoices = {
        DNS_TIME: ["domainLookupEnd", "domainLookupStart"],
        TCP_HANDSHAKE: ["connectEnd", "connectStart"],
        RESPONSE_TIME: ["responseEnd", "responseStart"],
        SECURE_CONNECTION_TIME: ["connectEnd", "secureConnectionStart", 0],
        FETCH_UNTIL_RESPONSE: ["responseEnd", "fetchStart", 0],
        REQ_START_UNTIL_RES_END: ["responseEnd", "requestStart", 0],
        START_UNTIL_RES_END: ["responseEnd", "startTime", 0],
        REDIRECT_TIME: ["redirectEnd", "redirectStart"],
    };

    function handleChoices(timingEnd, timingStart, num) {
        if (!num) {
            return timingEnd - timingStart;
        }

        if (timingStart > 0) {
            return timingEnd - timingStart;
        }

        return 0;
    }

    const timings = partyChoice.map((script) => {
        const [timingEnd, timingStart, num] = timingChoices[type];
        const endValue = script[timingEnd];
        const startValue = script[timingStart];
        return {
            name: script.name,
            [type]: handleChoices(endValue, startValue, num),
        };
    });

    return timings;
}

// Available Options
const timingOptions = [
    "DNS_TIME",
    "TCP_HANDSHAKE",
    "RESPONSE_TIME",
    "SECURE_CONNECTION_TIME",
    "FETCH_UNTIL_RESPONSE",
    "REQ_START_UNTIL_RES_END",
    "START_UNTIL_RES_END",
    "REDIRECT_TIME",
];

// run em all!
// https://developer.mozilla.org/en-US/docs/Web/API/Resource_Timing_API/Using_the_Resource_Timing_API#timing_resource_loading_phases

timingOptions.forEach((timing) => {
    console.groupCollapsed(`FIRST PARTY: ${timing}`);
    console.table(calculateTimings("first", timing));
    console.groupEnd();
    console.groupCollapsed(`THIRD PARTY: ${timing}`);
    console.table(calculateTimings("third", timing));
    console.groupEnd();
});

// choose your battle - arg1 is string either "first" or "third", arg2 is string timing option listed above.

console.table(calculateTimings("first", "REQ_START_UNTIL_RES_END"));
