import getInputData from "./components/get-intput-data";
import basic from "./components/print-graphics";

import { postDataToLocalStorage, getDataFromLocalStorage } from "./components/local-storage";

import {
    getFunctionPoints,
    getPolPoints,
} from "./components/get-graphics-cord";

import {
    isChecked,
    setListenersForCheckingData,
} from "./components/check-input-data";

document.addEventListener("DOMContentLoaded", () => {
    const optSize = document.querySelectorAll(".opt input[data-type-1]"),
        functions = document.querySelectorAll(".opt input[type='checkbox']"),
        del = document.querySelector("#del"),
        nodes = document.querySelector("#nodes"),
        button = document.querySelector("#button");

    const offset = 10000;

    getDataFromLocalStorage([...functions, nodes, del, ...optSize]);
    postDataToLocalStorage([...functions, nodes, del, ...optSize]);

    setListenersForCheckingData({ optSize, nodes });

    function start() {
        if (!isChecked({ optSize, nodes })) {
            console.log("Данные введены некорректно!");
            return;
        }

        const dataSet = getInputData({ optSize, nodes, del });

        const pointSet = [];
        
        pointSet.push(getFunctionPoints(dataSet, offset));
        pointSet.push(getPolPoints(dataSet, offset));



        basic("#container", pointSet, dataSet);

        // //TODO: для каждой отмеченной функции построить график
        // functions.forEach((fun) => {
        //     if (fun.checked) {
        //         // нарисовать граффик
        //     }
        // });
    }

    button.addEventListener("click", start);
    document.addEventListener("keydown", (event) => {
        if (event.code === "Enter") start();
    });
});
