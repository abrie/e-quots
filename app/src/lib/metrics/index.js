const appId = "equots";
const sessionId = `${Math.random() * 99999}`;

async function postData(url = "", data = {}) {
  return fetch(url, {
    method: "POST",
    mode: "no-cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data)
  });
}

window.addEventListener("beforeunload", () => {
  reportMetric({ action: "departed" });
});

function reportMetric(data) {
  postData(process.env.REACT_APP_METRICS_ENDPOINT, {
    ...data,
    appId,
    sessionId
  }).catch(err => {
    console.error(err);
  });
}

export { reportMetric };
