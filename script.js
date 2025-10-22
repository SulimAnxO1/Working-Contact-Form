const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  const formData = new FormData(form);
  e.preventDefault();

  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  result.style.display = "block";
  result.className = "";
  result.innerHTML = "Please wait...";
  result.classList.add("waiting");

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: json,
  })
    .then(async (response) => {
      let json = await response.json();

      result.className = "";

      if (response.status == 200) {
        result.innerHTML = json.message;
        result.classList.add("success");
      } else {
        console.log(response);
        result.innerHTML = json.message;
        result.classList.add("error");
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
      result.className = "";
      result.classList.add("error");
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
        result.className = "";
      }, 3000);
    });
});
