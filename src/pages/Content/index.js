function getClassInfo(sendResponse) {
  try {
    const values = document.querySelectorAll(
      'div.section-content.clearfix div.pull-right'
    )
    const keys = document.querySelectorAll(
      'div.section-content.clearfix div.pull-left'
    )
    let classInfo = {}
    for (let i in keys) {
      const key = keys[i].innerText
      const value = values[i].innerText
      if (key in classInfo) {
        if (classInfo[key] === value) {
          continue
        } else if (key === 'Meets') {
          const [daysOfWeek, startTime, _, endTime] = classInfo[key].split(' ')

          classInfo[key] = `${daysOfWeek}${
            value.split(' ')[0]
          } ${startTime} ${_} ${endTime}`
        } else {
          classInfo[key] = [classInfo[key], value]
        }
      } else {
        classInfo[key] = value
      }
    }
    classInfo.catalogNumber = document.querySelector(
      'body > section > header > h1'
    ).innerText
    classInfo.title = document.querySelector(
      'body > section > section > div.primary-head'
    ).innerText
    classInfo.url = location.href

    classInfo.classNumber = classInfo['Class Number']
    delete classInfo['Class Number']
    classInfo.instructor = classInfo['Instructor(s)']
    delete classInfo['Instructor(s)']


    sendResponse({ classInfo, success: true })
  } catch (err) {
    sendResponse({ err, success: false })
  }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(
    sender.tab
      ? 'from a content script:' + sender.tab.url
      : 'from the extension'
  )
  switch (request.action) {
    case 'getClassInfo': {
      getClassInfo(sendResponse)
      break
    }
    default:
      break
  }
})
