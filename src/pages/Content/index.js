console.log('Content script works!');

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(
    sender.tab
      ? 'from a content script:' + sender.tab.url
      : 'from the extension'
  );
  if (request.action === 'getClassInfo')
    try {
      const values = document.querySelectorAll(
        'div.section-content.clearfix div.pull-right'
      );
      const classInfo = Object.fromEntries(
        Array.prototype.map.call(
          document.querySelectorAll(
            'div.section-content.clearfix div.pull-left'
          ),
          (key, i) => [key.innerText, values[i].innerText]
        )
      );
      classInfo.catalogNumber = document.querySelector(
        'body > section > header > h1'
      ).innerText;
      classInfo.title = document.querySelector(
        'body > section > section > div.primary-head'
      ).innerText;
      sendResponse({ classInfo, success: true });
    } catch (err) {
      sendResponse({ err, success: true });
    }
});
