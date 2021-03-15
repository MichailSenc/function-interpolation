function myFunction({ alpha, betta, gamma, delta, xi, x }) {
    return alpha * Math.sin(betta / (x - gamma) ** 2) + delta * Math.cos(xi * x);
}

// F(x)
function getFunctionPoints({ a, b, alpha, betta, gamma, delta, xi }, offset) {
    const points = [];
    const stepX = (b - a) / offset;

    for (let x = a; x <= b; x += stepX) {
        let y = myFunction({ ...arguments[0], x });
        points.push([x, y]);
    }
    return points;
}

// F`(x)
function getDifFunctionPoints({ a, b, c, d, alpha, betta, gamma, delta, nod, delta1, xi }, offset) {
    const points = [];
    const stepX = (b - a) / offset;

    for (let x = a; x <= b; x += stepX) {
        let y = myFunction({ ...arguments[0], x });
        let df = myFunction({ ...arguments[0], x: x + delta1 });
        points.push([x, (df - y) / delta1]);
    }
    return points;
}

// Pn(x)
function getPolPoints({ a, b, d, nod, alpha, betta, gamma, delta, xi }, offset) {
    const points = [];
    const stepX = (b - a) / offset;
    const interStep = (b - a) / nod;

    const matr = createFiniteDifferenceTable({ interStep, ...arguments[0] });

    for (let x = a; x <= b; x += stepX) {
        points.push([x, calcPolynom((x - a) / interStep, 0, nod, matr)]);
    }

    return points;
}

// Pn`(x)
function getDifPolPoints({ a, b, c, d, alpha, betta, gamma, delta, nod, delta1, xi }, offset) {
    const points = [];
    const stepX = (b - a) / offset;
    const interStep = (b - a) / nod;

    const matr = createFiniteDifferenceTable({ interStep, ...arguments[0] });

    for (let x = a; x <= b; x += stepX) {
        let y = calcPolynom((x - a) / interStep, 0, nod, matr);
        let dp = calcPolynom((x - a + delta1) / interStep, 0, nod, matr);
        points.push([x, (dp - y) / delta1]);
    }
    return points;
}

// Rn(x)
function getRnPoints({ a, b, alpha, betta, gamma, delta, xi, nod }, offset) {
    const points = [];
    const stepX = (b - a) / offset;
    const interStep = (b - a) / nod;

    const matr = createFiniteDifferenceTable({ interStep, ...arguments[0] });

    for (let x = a; x <= b; x += stepX) {
        let y = myFunction({ ...arguments[0], x });
        points.push([x, y - calcPolynom((x - a) / interStep, 0, nod, matr)]);
    }
    return points;
}

// Таблица конечных разностей
function createFiniteDifferenceTable({ interStep, nod, a, alpha, gamma, betta, delta, xi }) {
    let arr = [];
    for (let i = 0; i < nod + 1; i++) {
        arr[i] = [];
        for (let j = 0; j < nod + 1; j++) {
            arr[i][j] = 0;
        }
    }

    for (let x = a, i = 0; i <= nod; x += interStep, i++) {
        arr[i][0] = myFunction({ ...arguments[0], x });
        if (isNaN(arr[i][0])) {
            //Вот и костыли подъехали
            arr[i][0] = myFunction({ ...arguments[0], x: x + interStep / 2 });
            console.log("NaN");
        }
    }

    for (let j = 1; j <= nod; j++) {
        for (let i = 0; i <= nod - j; i++) {
            arr[i][j] = arr[i + 1][j - 1] - arr[i][j - 1];
        }
    }

    return arr;
}

/* -----------------ВЫЧИСЛЕНИЕ ПОЛИНОМА---------------------------------------------------------------------------- */
// Тут крч "Вторая форма записи 1ой интерполяционной формулы Ньютона"
// Передаваемые аргументы: t - точка интерполирования (x - x0) / h или (x - a) / interStep,
//                         n - номер (порядок) коэфициента (начинается с 0) и шаг рекурсии (до тех пор пока n < nod )
//                         nod количество узлов интерполяци
//                         matr - таблица конечных разностей
function calcPolynom(t, n, nod, matr) {
    if (n < nod) return coefAtDelta(t, n) * matr[0][n] + calcPolynom(t, n + 1, nod, matr);
    return coefAtDelta(t, n) * matr[0][n];
}

/* -----------------Вычисление коэфициента при дельта-------------------------------------------------------------- */
// Pn(x) = Pn(x0 + t*h) - вторая форма записи
// x0 начальная точка ('A' на графике), h - размер шага интерполяции (interStep), t - шаг (пока меньше nod)
// Итоговый коэффициент при дельта: t*(t-1)*...*(t - n + 1) / n! - то, что вернёт функция
// Передаваемые аргументы: t - точка интерполирования (= (x - a) / interStep)
//                         n - номер (порядок) вычисляемого коэфициента
function coefAtDelta(t, n) {
    if (n == 0) return 1;
    return (t / n) * coefAtDelta(t - 1, n - 1);
}

export { getFunctionPoints, getPolPoints, getRnPoints, getDifFunctionPoints, getDifPolPoints };
