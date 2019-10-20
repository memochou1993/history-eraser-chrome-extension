const deleteRecords = () => {
  chrome.storage.sync.get({
    keywords: '',
  }, (items) => {
    const keywords = items.keywords.split('\n');

    keywords.forEach((keyword) => {
      chrome.history.search({
        text: keyword,
      }, (records) => {
        records.forEach((record) => {
          chrome.history.deleteUrl({
            url: record.url,
          }, () => {
            console.info(`Deleted record: ${record.url}`);
          });
        });
      });
    })
  });
};

const eventHandler = (event) => {
  switch (event) {
    case 'history.onVisited': {
      console.debug(`Triggered event: history.onVisited`);
      chrome.history.onVisited.addListener(deleteRecords);
      break;
    }
    case 'windows.onRemoved': {
      console.debug(`Triggered event: windows.onRemoved`);
      chrome.windows.onRemoved.addListener(deleteRecords);
      break;
    }
    default:
      break;
  }
}

const trigger = () => {
  chrome.storage.sync.get({
    event: '',
  }, (items) => {
    eventHandler(items.event);
  });
};

chrome.storage.onChanged.addListener(() => {
  console.debug(`Triggered event: storage.onChanged`);
  trigger();
});

trigger();
