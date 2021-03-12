import getInputData from "./components/get-intput-data";
import basic from "./components/print-graphics";
import { isChecked, setListenersForCheckingData } from "./components/check-input-data";
import { postDataToLocalStorage, getDataFromLocalStorage } from "./components/local-storage";

import {
    getFunctionPoints,
    getPolPoints,
    getRnPoints,
    getDifFunctionPoints,
} from "./components/get-graphics-cord";

document.addEventListener("DOMContentLoaded", () => {
    const optSize = document.querySelectorAll(".opt input[data-type-1]"),
        functions = document.querySelectorAll(".opt input[type='checkbox']"),
        del = document.querySelector("#del"),
        nodes = document.querySelector("#nodes"),
        button = document.querySelector("#button");

    const offset = 10000;

    getDataFromLocalStorage([...functions, nodes, del, ...optSize]);
    postDataToLocalStorage([...functions, nodes, del, ...optSize]);
    start();

    setListenersForCheckingData({ optSize, nodes });

    function start() {
        if (!isChecked({ optSize, nodes })) {
            console.log("Данные введены некорректно!");
            return;
        }

        const dataSet = getInputData({ optSize, nodes, del });

        const pointSet = [];

        functions.forEach((fun) => {
            if (fun.checked) {
                switch (fun.getAttribute("id")) {
                    case "f":
                        pointSet.push(getFunctionPoints(dataSet, offset));
                        break;
                    case "p":
                        pointSet.push(getPolPoints(dataSet, offset));
                        break;
                    case "r":
                        pointSet.push(getRnPoints(dataSet, offset));
                        break;
                    case "df":
                        pointSet.push(getDifFunctionPoints(dataSet, offset));
                        break;
                    case "dp":
                        break;
                }
            } else {
                pointSet.push([]);
            }
        });
        basic("#container", pointSet, dataSet);
    }

    button.addEventListener("click", start);
    document.addEventListener("keydown", (event) => {
        if (event.code === "Enter") start();
    });
    functions.forEach((item) => item.addEventListener("change", () => start()));
});
