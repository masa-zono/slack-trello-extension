window.onload = () => {
  const trello_key = document.getElementById("trello_key");
  const trello_token = document.getElementById("trello_token");
  const trello_user_name = document.getElementById("trello_user_name");

  const messageEl = document.getElementById("message");
  const submitBtnEl = document.getElementById("submit");

  chrome.storage.local.get("trello_key", (items) => {
    trello_key.value = items.trello_key;
  });
  chrome.storage.local.get("trello_token", (items) => {
    trello_token.value = items.trello_token;
  });
  chrome.storage.local.get("trello_user_name", (items) => {
    trello_user_name.value = items.trello_user_name;
  });

  submitBtnEl.onclick = () => {
    chrome.storage.local.set(
      {
        trello_key: trello_key.value,
        trello_token: trello_token.value,
        trello_user_name: trello_user_name.value,
      },
      () => {
        messageEl.textContent = "Saved";
        setTimeout(() => (messageEl.textContent = ""), 750);
      }
    );
  };
};
