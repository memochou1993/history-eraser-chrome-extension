const keywords = [
	//
];

const event = 'history.onVisited';

const removeItem = (item) => {
  const { url } = item;

  if (keywords.some((keyword) => url.includes(keyword))) {
    chrome.history.deleteUrl({
      url,
    }, () => {
      console.debug(`Removed item: ${url}`);
    });
  };
};

switch (event) {
  case 'history.onVisited': {
    chrome.history.onVisited.addListener(removeItem);
    break;
  }
  case 'windows.onRemoved': {
    chrome.windows.onRemoved.addListener(() => {
      chrome.history.search({
          text: '',
        }, (items) => {
          items.forEach(removeItem);
        });
    });
    break;
  }
  default:
    break;
}
