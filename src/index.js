import getInputData from "./components/get-intput-data";
import basic from "./components/print-graphics";
import { isChecked, setListenersForCheckingData } from "./components/check-input-data";
import { postDataToLocalStorage, getDataFromLocalStorage } from "./components/local-storage";
import * as cordFunctions from "./components/get-graphics-cord";

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
        if (!isChecked([...optSize, nodes])) {
            console.log("Данные введены некорректно!");
            return;
        }

        const dataSet = getInputData([...optSize, nodes, del]);

        console.log(dataSet);

        const pointSet = [];

        functions.forEach((fun) => {
            if (fun.checked) {
                switch (fun.getAttribute("id")) {
                    case "f":
                        pointSet.push(cordFunctions.getFunctionPoints(dataSet, offset));
                        break;
                    case "p":
                        pointSet.push(cordFunctions.getPolPoints(dataSet, offset));
                        break;
                    case "r":
                        pointSet.push(cordFunctions.getRnPoints(dataSet, offset));
                        break;
                    case "df":
                        pointSet.push(cordFunctions.getDifFunctionPoints(dataSet, offset));
                        break;
                    case "dp":
                        pointSet.push(cordFunctions.getDifPolPoints(dataSet, offset));
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
