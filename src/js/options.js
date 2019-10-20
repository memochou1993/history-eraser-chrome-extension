const saveOptions = () => {
  const keywords = document.querySelector('textarea[name="keywords"]').value;
  const event = document.querySelector('input[name="event"]:checked').value;

  chrome.storage.sync.set({
    keywords,
    event,
  }, () => {
    window.close();
  });
};

const restoreOptions = () => {
  chrome.storage.sync.get({
    keywords: '',
    event: 'history.onVisited',
  }, (items) => {
    document.querySelector('textarea[name="keywords"]').value = items.keywords;
    document.querySelector(`input[value="${items.event}"]`).checked = true;
  });
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
