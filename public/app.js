document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }

  if (event.target.dataset.type === "edit") {
    const id = event.target.dataset.id;
    const title = event.target.dataset.title;

    const promptTitle = prompt("Введите новое название", title);

    if (promptTitle) {
      edit(id, promptTitle).then(() => {
        document.querySelector("li").textContent = promptTitle;
      });
    }
  }
});

async function remove(id) {
  fetch(`/${id}`, { method: "DELETE" });
}

async function edit(id, title) {
  fetch(`/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
}
