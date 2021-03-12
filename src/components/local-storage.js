function getDataFromLocalStorage(attributes) {
    attributes.forEach((item) => {
        let value = localStorage.getItem(item.getAttribute("id"));
        if (value) {
            if (item.getAttribute("type") === "checkbox") {
                item.checked = value == "true";
            } else if (item.getAttribute("type") === "text") {
                item.value = value;
            } else if (item.getAttribute("id") === "del") {
                item.value = value;
            }
        }
    });
}

function postDataToLocalStorage(attributes) {
    attributes.forEach((item) => {
        if (item.getAttribute("type") === "checkbox") {
            item.addEventListener("change", () => {
                localStorage.setItem(item.getAttribute("id"), item.checked);
            });
        } else if (item.getAttribute("type") === "text") {
            item.addEventListener("change", () => {
                localStorage.setItem(item.getAttribute("id"), item.value);
            });
        } else if (item.getAttribute("id") === "del") {
            item.addEventListener("change", () => {
                localStorage.setItem("del", item.value);
            });
        }
    });
}

export { getDataFromLocalStorage, postDataToLocalStorage };
