document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("btn").addEventListener("click", sendReq);
});

sendReq = async () => {
  const response = await fetch("/read", {
    method: "POST",
    body: document.getElementById("input").value,
  });
  document.getElementById("msg").textContent = response.statusText;
  document.getElementById("body").innerHTML = await response.text();
};
