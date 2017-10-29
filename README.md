# Timer for Websites That Steal Your Time

This project helps to control time was spent on sites. It requires special extension for Chrome browser.

The script counts 3 minutes when you are on the entertainment site, then every 30 seconds gives you a motivating message. To reset the timer, simply click on it.


# Installing

1. Install extension for Chrome browser [Custom JavaScript for websites](https://chrome.google.com/webstore/detail/custom-javascript-for-web/poakhlngfciodnhlhhgnaaelnpjljija).

2. Open configuration of [cjs](https://chrome.google.com/webstore/detail/custom-javascript-for-web/poakhlngfciodnhlhhgnaaelnpjljija) browser extension on the site you want to controll. Click on the link "your own external scripts", add path [TODO в качестве production хостинга файла с JavaScript подойдет GitHub - у каждого файла в репозитории есть свой URL, и этим можно воспользоваться]. Don`t forget to press "enable cjs for this host" to enable custom JS.

3. Click `your own external link` and past path to external script in opened popup. The path can point to a local address for development reasons or to external path like [RawGIT](https://rawgit.com/). Also you can simply insert the text in the main cjs window.
`!important` CJS injection of js file not works if URL follows after comments. Check your delete all comments if your use `your own external link` method of js code injection.

4.  In the address bar at the right end should be a 'shield' icon, you can click on that to run insecure content. Chrome browser by default is blocking mixed content.

For faster development you can use JS code hosted on localhost. Simple web server can be used for that, run:

```bash

python3 -m http.server
```

Add path `http://localhost:8000/index.js` to [cjs](https://chrome.google.com/webstore/detail/custom-javascript-for-web/poakhlngfciodnhlhhgnaaelnpjljija) browser extension. Done.


# Project Goals

The code is written for educational purposes. Training course for web-developers - [DEVMAN.org](https://devman.org)
