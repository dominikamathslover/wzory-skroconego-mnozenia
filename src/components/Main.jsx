import data from "../assets/data.json";
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";
import { useState } from "react";
import rozkladAB from "../assets/rozklad.js";
import nthPower from "../assets/nthpower.json";

export default function Main() {
  const zadania = data.przyklady;
  const zadaniaN = nthPower.przyklady;
  const [wybraneId, setWybraneId] = useState("");
  const [wybraneId2, setWybraneId2] = useState("");
  const [isShown, setIsShown] = useState(false);
  const [isShown2, setIsShown2] = useState(false);

  const wybraneZadanie = zadania.find(
    (zadanie) => zadanie.id === Number(wybraneId),
  );

  const wybraneZadanie2 = zadaniaN.find(
    (zadanie) => zadanie.id === Number(wybraneId2),
  );

  const a2 = wybraneZadanie2?.a;
  const b2 = wybraneZadanie2?.b;
  const n = wybraneZadanie2?.n;

  const a = wybraneZadanie?.a;
  const b = wybraneZadanie?.b;

  function showSolution() {
    setIsShown((prev) => !prev);
  }

  function showSolution2() {
    setIsShown2((prev) => !prev);
  }

  function hideAll() {
    (setWybraneId(""), setWybraneId2(""));
    setIsShown(false);
    setIsShown2(false);
  }

  const trescZadania = `${a}^2-${b}^2`;

  function obliczNawiasy(wynik) {
    return wynik.replace(/\(([^()]*)\)/g, (calyNawias, zawartosc) => {
      if (zawartosc.includes("^")) {
        return calyNawias;
      }

      const obliczony = Function(`"use strict"; return (${zawartosc})`)();

      if (obliczony > 0) {
        return `${obliczony}`;
      }

      return `(${obliczony})`;
    });
  }

  return (
    <main>
      <BlockMath math="a^2-b^2" />
      <select
        name="zbior-zadan"
        value={wybraneId}
        onChange={(e) => setWybraneId(e.target.value)}
        className="select-zadanie"
      >
        <option value="" selected disabled>
          Wybierz przykład
        </option>
        {zadania.map((zadanie) => (
          <option key={zadanie.id} value={zadanie.id}>
            Zadanie {zadanie.id}
          </option>
        ))}
      </select>

      {wybraneZadanie && (
        <div className="aktualne-zadanie">
          <BlockMath math={`${trescZadania}`} />
        </div>
      )}

      {isShown && wybraneZadanie && (
        <div className="rozwiazanie">
          <h2>Rozwiązanie</h2>

          <BlockMath id="zapis-rozwiazania" math={`${trescZadania}=`} />
          <BlockMath math={`=(${a}-${b})(${a}+${b})=`} />
          <BlockMath math={`=${a - b}\\cdot ${a + b}= ${(a - b) * (a + b)}`} />

          <div className="porada">
            <p>Korzystając z wzoru:</p>
            <BlockMath math="a^2-b^2=(a-b)(a+b)" />
          </div>
          <h3>Matura: {wybraneZadanie["matura"].join(" ")}</h3>
        </div>
      )}

      <button className="btn-zobacz-rozwiazanie" onClick={showSolution}>
        {isShown ? "Ukryj rozwiązanie" : "Zobacz rozwiązanie"}
      </button>

      <BlockMath math="a^n-b^n" />

      <select
        name="zbior-zadan-2"
        value={wybraneId2}
        onChange={(e) => setWybraneId2(e.target.value)}
        className="select-zadanie"
      >
        <option value="" disabled>
          Wybierz przykład
        </option>

        {zadaniaN.map((zadanie) => (
          <option key={zadanie.id} value={zadanie.id}>
            Zadanie {zadanie.id}
          </option>
        ))}
      </select>

      {wybraneId2 && (
        <div className="aktualne-zadanie">
          <BlockMath math={`${a2}^{${n}}-${b2}^{${n}}`} />
        </div>
      )}

      {wybraneZadanie2 && isShown2 && (
        <div className="rozwiazanie">
          <p>Korzystając ze wzoru skróconego mnożenia:</p>
          {rozkladAB(a2, b2, n).historia.map((krok, index) => (
            <BlockMath key={index} math={krok} />
          ))}
          Otrzymujemy:
          <BlockMath math={`${rozkladAB(a2, b2, n).wynik}=`} />
          <BlockMath math={obliczNawiasy(rozkladAB(a2, b2, n).wynik)} />
          <h3>Matura: {wybraneZadanie2["matura"].join(" ")}</h3>
        </div>
      )}

      <button className="btn-zobacz-rozwiazanie" onClick={showSolution2}>
        {isShown2 ? "Ukryj rozwiązanie" : "Zobacz rozwiązanie"}
      </button>

      <button className="btn-zobacz-rozwiazanie" onClick={hideAll}>
        Ukryj wszystkie zadania
      </button>
    </main>
  );
}
