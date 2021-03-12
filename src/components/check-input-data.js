function setListenersForCheckingData({ optSize, nodes }) {
    function setBorderColor(target) {
        if (target.value.match(/^\s*[-+]?[0-9]+\s*$/)) {
            target.style.borderColor = "";
            return true;
        } else {
            target.style.borderColor = "red";
            return false;
        }
    }

    optSize.forEach((item) => {
        item.addEventListener("input", (e) => {
            let value = e.target.value;
            if (setBorderColor(e.target)) {
                e.target.value =
                    value > 100 ? 100 : value < -100 ? -100 : value;
            }
        });
    });

    nodes.addEventListener("input", () => {
        let value = nodes.value;
        if (setBorderColor(nodes)) {
            nodes.value = value < 0 ? 0 : value > 200 ? 200 : value;
        }
    });
}

function isChecked({ optSize, nodes }) {
    let flag = true;
    optSize.forEach((item) => {
        if (!item.value.match(/^\s*[-+]?[0-9]+\s*$/)) flag = false;
    });

    if (!nodes.value.match(/^\s*[-+]?[0-9]+\s*$/)) flag = false;
    return flag;
}

// export default inputData;
export {isChecked, setListenersForCheckingData};