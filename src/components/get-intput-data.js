function getInputData({ optSize, nodes, del }) {
    let a, b, c, d, nod, alpha, betta, gamma, delta, delta1, xi;

    nod = nodes.value;
    delta1 = del.value;

    optSize.forEach((target) => {
        switch (target.getAttribute("id")) {
            case "A":
                a = target.value;
                break;
            case "B":
                b = target.value;
                break;
            case "C":
                c = target.value;
                break;
            case "D":
                d = target.value;
                break;
            case "nodes":
                nod = target.value;
                break;
            case "alpha":
                alpha = target.value;
                break;
            case "betta":
                betta = target.value;
                break;
            case "gamma":
                gamma = target.value;
                break;
            case "delta":
                delta = target.value;
                break;
            case "xi":
                xi = target.value;
                break;
        }
    });

    a = parseInt(a);
    b = parseInt(b);
    c = parseInt(c);
    d = parseInt(d);
    nod = parseInt(nod);
    alpha = parseInt(alpha);
    betta = parseInt(betta);
    gamma = parseInt(gamma);
    delta = parseInt(delta);
    delta1 = parseInt(delta1);
    xi = parseInt(xi);

    return { a, b, c, d, nod, alpha, betta, gamma, delta, delta1, xi };
}

export default getInputData;
