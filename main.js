inspectLink = function (link) {
    console.log(link);

    fetch('https://api.csgoskins.gg/inspect-links', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            link: link.linkUrl,
        }),
    })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);

            if (res.success && res.needs_to_connect && res.connect_to_url) {
                chrome.tabs.create({
                    url: res.connect_to_url,
                });
            }
        })
        .catch((error) => {
            console.log(error);
        });

    // window.location = link.linkUrl;
    // chrome.tabs.create({url: "http://www.urbandictionary.com/define.php?term=" + query});
};

chrome.contextMenus.create({
    title: 'Test CS:GO skin in-game',
    contexts: ["link"],
    onclick: inspectLink
});
