document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("btn").addEventListener("click", sendReq);
});

sendReq = async () => {
  let payload = [];
  for (let i = 0; i < 5; i++) {
    payload.push({ id: i, message: `Payload Message: ${i}\n` });
  }
  const response = await fetch("/read", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  document.getElementById("msg").textContent = response.statusText;
  document.getElementById("body").textContent = await response.text();
};
