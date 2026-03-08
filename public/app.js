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

    const li = event.target.closest("li");
    const buttons = li.querySelector("div");

    const editContainer = document.createElement("div");
    editContainer.classList.add("d-flex", "justify-content-between", "w-100");

    const input = document.createElement("input");
    input.type = "text";
    input.value = title;

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("buttonContainer");

    editContainer.append(input, buttonContainer);

    const saveButton = document.createElement("button");
    saveButton.classList.add("btn", "btn-success");
    saveButton.textContent = "Сохранить";

    const cancelButton = document.createElement("button");
    cancelButton.classList.add("btn", "btn-danger", "ms-1");
    cancelButton.textContent = "Отменить";

    buttonContainer.append(saveButton, cancelButton);

    li.innerHTML = "";
    li.appendChild(editContainer);

    saveButton.addEventListener("click", () => {
      const newTitle = input.value.trim();

      if (newTitle && newTitle !== title) {
        editNote(id, newTitle).then(() => {
          event.target.dataset.title = newTitle;
          li.innerHTML = "";
          li.append(newTitle, buttons);
        });
      } else {
        li.innerHTML = "";
        li.append(title, buttons);
      }
    });

    cancelButton.addEventListener("click", () => {
      li.innerHTML = "";
      li.append(title, buttons);
    });
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

async function editNote(id, title) {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
}
