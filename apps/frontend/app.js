const helloBtn = document.getElementById("btnHello");
const infoBtn = document.getElementById("btnInfo");
const helloOutput = document.getElementById("helloOutput");
const infoOutput = document.getElementById("infoOutput");

// V Kubernete budeme volať relatívne cesty.
// Ingress nasmeruje /api na backend service.
const HELLO_URL = "/api/hello";
const INFO_URL = "/api/info";

async function callApi(url, outputElement) {
  outputElement.textContent = "Loading...";
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const data = await res.json();
    outputElement.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    outputElement.textContent = `Error: ${err.message}`;
  }
}

helloBtn.addEventListener("click", () => callApi(HELLO_URL, helloOutput));
infoBtn.addEventListener("click", () => callApi(INFO_URL, infoOutput));

