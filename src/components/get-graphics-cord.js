function myFunction({ alpha, betta, gamma, delta, xi, x }) {
    return (
        alpha * Math.sin(betta / (x - gamma) ** 2) + delta * Math.cos(xi * x)
    );
}
// (alpha) * Math.sin(Math.tan((betta) * x)) +
// (gamma) * Math.cos((delta) * x)

function getFunctionPoints({ a, b, alpha, betta, gamma, delta, xi }, offset) {
    const points = [];
    const stepX = (b - a) / offset;

    for (let x = a; x <= b; x += stepX) {
        let y = myFunction({ ...arguments[0], x });
        points.push([x, y]);
    }
    return points;
}

function getPolPoints(
    { a, b, d, nod, alpha, betta, gamma, delta, xi },
    offset
) {
    const points = [];
    const stepX = (b - a) / offset;
    const interStep = (b - a) / nod;

    const matr = createFiniteDifferenceTable({ interStep, ...arguments[0] });

    for (var x = a; x <= b; x += stepX) {
        points.push([x, pol((x - a) / interStep, 0, nod, matr)]);
    }

    return points;
}

function getRnPoints({ a, b, alpha, betta, gamma, delta, xi, nod }, offset) {
    const points = [];
    const stepX = (b - a) / offset;
    const interStep = (b - a) / nod;

    const matr = createFiniteDifferenceTable({ interStep, ...arguments[0] });

    for (let x = a; x <= b; x += stepX) {
        let y = myFunction({ ...arguments[0], x });
        points.push([x, y + pol((x - a) / interStep, 0, nod, matr)]);
    }
    return points;
}
function createFiniteDifferenceTable({
    interStep,
    nod,
    a,
    alpha,
    gamma,
    betta,
    delta,
    xi,
}) {
    let arr = [];
    for (let i = 0; i < nod + 1; i++) {
        arr[i] = [];
        for (let j = 0; j < nod + 1; j++) {
            arr[i][j] = 0;
        }
    }

    for (var x = a, i = 0; i <= nod; x += interStep, i++) {
        arr[i][0] = myFunction({ ...arguments[0], x });
    }

    for (var j = 1; j <= nod; j++) {
        for (var i = 0; i <= nod - j; i++) {
            arr[i][j] = arr[i + 1][j - 1] - arr[i][j - 1];
            if (isNaN(arr[i][j])) {
                console.log('NAN');
            }
        }
    }

    return arr;
}

function pol(t, k, n, matr) {
    if (k < n) return pol(t, k + 1, n, matr) + fac(t, k) * matr[0][k];
    return fac(t, k) * matr[0][k];
}

function fac(t, k) {
    if (k == 0) return 1;
    return (t / k) * fac(t - 1, k - 1);
}

export { getFunctionPoints, getPolPoints, getRnPoints };
