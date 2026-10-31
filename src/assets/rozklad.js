function potega(zmienna, n) {
  if (n === 0) return "";
  if (n === 1) return zmienna;
  return `${zmienna}^{${n}}`;
}

function rozklad(n, znak = "-", kroki = []) {
  let wyrazenie = `${potega("a", n)}${znak}${potega("b", n)}`;

  if (znak === "-" && n % 2 === 0) {
    let k = n / 2;

    let nowe = `(${potega("a", k)}-${potega("b", k)})\\cdot(${potega("a", k)}+${potega("b", k)})`;

    kroki.push(`${wyrazenie}=${nowe}`);

    return [...rozklad(k, "-", kroki), ...rozklad(k, "+", kroki)];
  }

  if (znak === "+") {
    let wynik = `(${potega("a", n)}+${potega("b", n)})`;
    return [wynik];
  }

  if (n === 1) {
    return ["(a-b)"];
  }

  let suma = [];

  for (let i = n - 1; i >= 0; i--) {
    let j = n - 1 - i;

    suma.push([potega("a", i), potega("b", j)].filter(Boolean).join("\\cdot"));
  }

  let wynik = `(a-b)\\cdot(${suma.join("+")})`;

  kroki.push(`${wyrazenie}=${wynik}`);

  return ["(a-b)", `(${suma.join("+")})`];
}

export default function rozkladAB(a, b, n) {
  let kroki = [];

  let czynniki = rozklad(n, "-", kroki);

  let wynik = czynniki
    .join("\\cdot")
    .replaceAll("a", `${a}`)
    .replaceAll("b", `${b}`);

  let historia = kroki.map((krok) =>
    krok.replaceAll("a", `${a}`).replaceAll("b", `${b}`),
  );

  return {
    wynik,
    historia,
  };
}
