window.onload = async function () {
  var slack_sidebar = document.getElementsByClassName("p-channel_sidebar")[0];

  var trello_list = document.createElement("div");
  trello_list.style.overflow = "auto";
  trello_list.style.height = "20%";
  const p = document.createElement("p");
  p.appendChild(document.createTextNode("タスク一覧"));
  trello_list.appendChild(p);

  const list = document.createElement("ul");
  list.className = "trello-list";
  trello_list.appendChild(list);
  slack_sidebar.insertBefore(trello_list, slack_sidebar.firstChild);

  await this.setTrelloList();

  // 30秒ごとにカードを更新するように定義
  this.setInterval(async () => {
    await this.setTrelloList();
  }, 30000);
};

// カードを取得して、表示する
async function setTrelloList() {
  const cards = await getTrelloList();
  var list = document.getElementsByClassName("trello-list")[0];
  while (list.lastChild) {
    list.removeChild(list.lastChild);
  }

  for (let i = 0; i < cards.length; i++) {
    const card_dom = document.createElement("li");
    const card_due = new Date(cards[i].due);
    card_dom.appendChild(
      document.createTextNode(
        cards[i].name + "[" + card_due.toLocaleString() + "]"
      )
    );
    list.appendChild(card_dom);
  }
}

// trelloからカード情報を取得
async function getTrelloList() {
  const keys = await browser.storage.local.get([
    "trello_key",
    "trello_token",
    "trello_user_name",
  ]);

  const trelloKey = keys.trello_key,
    trelloToken = keys.trello_token,
    userName = keys.trello_user_name;

  if (trelloKey === undefined) return new Array();

  // IDからカードの一覧を取得
  const getcards_url =
    "https://trello.com/1/members/" +
    userName +
    "/cards?key=" +
    trelloKey +
    "&token=" +
    trelloToken +
    "&fields=name,due";
  const response = await fetch(getcards_url, {
    method: "GET",
  }).then((data) => data.json());
  // .then((cards) => {
  //   // console.log(cards);
  //   let cardArray = [];
  //   for (const card of cards) {
  //     if (card.idBoard === boardId && card.idList === listId) {
  //       cardArray.push(card);
  //     }
  //   }
  //   return cardArray;
  // });

  return response;
}
