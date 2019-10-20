const execute = () => {
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
        console.debug(`Triggered event: history.onVisited`);
        break;
      }
  
      case 'windows.onRemoved': {
        chrome.windows.onRemoved.addListener(execute);
        console.debug(`Triggered event: windows.onRemoved`);
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
