const execute = () => {
  chrome.storage.sync.get({
    keywords: '',
  }, (items) => {
    items.keywords
      .split('\n')
      .filter((keyword) => !!keyword)
      .forEach((keyword) => {
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
    });
  });
};

const handle = () => {
  chrome.storage.sync.get({
    event: '',
  }, (items) => {
    switch (items.event) {
      case 'history.onVisited': {
        chrome.history.onVisited.addListener(execute);
        break;
      }
      case 'windows.onRemoved': {
        chrome.windows.onRemoved.addListener(execute);
        break;
      }
      default: {
        break;
      }
    }
  });
};

chrome.storage.onChanged.addListener(handle);

handle();
