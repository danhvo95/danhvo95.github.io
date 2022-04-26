rudderanalytics = window.rudderanalytics = [];

var methods = [
    "load",
    "page",
    "track",
    "identify",
    "alias",
    "group",
    "ready",
    "reset",
    "getAnonymousId",
    "setAnonymousId",
];

for (var i = 0; i < methods.length; i++) {
    var method = methods[i];
    rudderanalytics[method] = (function (methodName) {
        return function () {
            rudderanalytics.push(
                [methodName].concat(Array.prototype.slice.call(arguments))
            );
        };
    })(method);
}

rudderanalytics.load('25uWPTShz2yQV44H3cLZLIlrqDf', 'https://uat-data-plane.onpoint.vn/', {
    getSourceConfig: 'https://uat-control-plane.onpoint.vn/'
});
rudderanalytics.page();

mageCacheObj = JSON.parse(window.localStorage.getItem('mage-cache-storage'));
onpointCacheObj = JSON.parse(window.localStorage.getItem('onpoint'));

if (onpointCacheObj == null) {
    window.localStorage.setItem('onpoint', false)
}

document.onmouseup = function (event) {
    if (!event) {event = window.event;}
    // console.log(event.target.getAttribute("href"));
    // console.log(event.target.id);

    // if (event.target.className == "button dark btncart-checkout" || event.target.className == "linktocheckout button dark") {
    //     console.log("Checkout Viewed");
    // }

    // console.log(event.target.className);
    console.log('danh >>> ' + event.target.className);
    if (event.target.className == 'action tocart primary') {
        console.log("Add To Cart");
    }

    if (event.target.getAttribute("href") == "/account/logout") {
        console.log("Customer Logout");
    }
};

if ((mageCacheObj == null) || (JSON.stringify(mageCacheObj) == JSON.stringify({}))) {
    // DO NOTHING
} else {
    customer = mageCacheObj['customer']
    cart = mageCacheObj['cart']
    if (customer['userId']) {
        if (onpointCacheObj == false) {
            rudderanalytics.identify(customer['userId'], customer);
            window.localStorage.setItem('onpoint', true)
        } else {
            console.log('Already identify');
        }
    }

    if (cart['summary_count'] > 0) {
        console.log('Add To Cart');
        rudderanalytics.track('Add To Cart', cart['items']);
    }
}
