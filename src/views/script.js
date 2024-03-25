

function srcUrl(scriptUrl) {

    let str = scriptUrl.substring(
        scriptUrl.indexOf("?") + 1
    );
    var script = document.createElement("script");
    script.src = scriptUrl;
    document.body.appendChild(script);
    window[qs.parse(str).callback] = function (asd) {
        return asd
    };
}