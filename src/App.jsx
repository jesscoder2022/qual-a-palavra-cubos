import { useState } from "react";

import "./App.css";
import Header from "./components/Header";
import Mensagem from "./components/Mensagem";
import Palavra from "./components/Palavra";

function App() {
  const [palavra] = useState("cubos".split(""));
  const [status, setStatus] = useState({ mensagem: "", ganhou: false });
  const [tentativas, setTentativas] = useState([
    {
      id: 1,
      valor: ["", "", "", "", ""],
      ativo: true,
      letras: ["", "", "", "", ""],
      posicoes: ["", "", "", "", ""],
    },
    {
      id: 2,
      valor: ["", "", "", "", ""],
      ativo: false,
      letras: ["", "", "", "", ""],
      posicoes: ["", "", "", "", ""],
    },
    {
      id: 3,
      valor: ["", "", "", "", ""],
      ativo: false,
      letras: ["", "", "", "", ""],
      posicoes: ["", "", "", "", ""],
    },
    {
      id: 4,
      valor: ["", "", "", "", ""],
      ativo: false,
      letras: ["", "", "", "", ""],
      posicoes: ["", "", "", "", ""],
    },
    {
      id: 5,
      valor: ["", "", "", "", ""],
      ativo: false,
      letras: ["", "", "", "", ""],
      posicoes: ["", "", "", "", ""],
    },
  ]);

  const verificarLetraEPosicao = () => {
    let indice = null;
    let letraEPosicaoCorreta = [];
    let letraCorreta = [];

    tentativas.forEach((tentativa, tentativaIndice) => {
      if (tentativa.ativo) {
        indice = tentativaIndice;
        letraEPosicaoCorreta = tentativa.posicoes;
        letraCorreta = tentativa.letras;
        tentativa.valor.forEach((letra, letraIndice) => {
          if (palavra.includes(letra) && palavra.indexOf(letra) === letraIndice)
            letraEPosicaoCorreta[letraIndice] = letra;
          else if (palavra.includes(letra)) letraCorreta[letraIndice] = letra;
        });
      }
    });
    return { indice, letraEPosicaoCorreta, letraCorreta };
  };

  const ativarProximaTentativa = (novasTentativas, proximaTentativaIndice) => {
    novasTentativas[proximaTentativaIndice].ativo = true;
    return novasTentativas;
  };

  const alterarValorTentativa = (
    indice,
    letraEPosicaoCorreta,
    letraCorreta
  ) => {
    const novasTentativas = tentativas;
    novasTentativas[indice] = {
      ...novasTentativas[indice],
      ativo: false,
      posicoes: letraEPosicaoCorreta,
      letras: letraCorreta
    }  
    return novasTentativas;
  };

  const verificarPalavra = () => {
    const { indice, letraEPosicaoCorreta, letraCorreta } =
      verificarLetraEPosicao();
    
    if (indice === null) return;
    
    const proximaTentativaIndice = indice + 1;
    let novasTentativas = alterarValorTentativa(
      indice,
      letraEPosicaoCorreta,
      letraCorreta
    );
    if (
      letraEPosicaoCorreta.length === palavra.length &&
      !letraEPosicaoCorreta.includes("")
    ) {
      setStatus({ mensagem: "Você ganhou!! Parabéns!!!", ganhou: true });
    } else if (proximaTentativaIndice < palavra.length) {
      novasTentativas = ativarProximaTentativa(
        novasTentativas,
        proximaTentativaIndice
      );
    } else {
      setStatus({ mensagem: "Você Perdeu :(", ganhou: false });
    }
    setTentativas([...novasTentativas]);
    
  };

  return (
    <div className="container">
      <Header />
      <h1>Qual é a palavra?</h1>
      <Mensagem status={status}/>
      {tentativas.map((tentativa, tentativaIndice) => (
        <Palavra
          key={tentativa.id}
          tentativaIndice={tentativaIndice}
          tentativas={tentativas}
          tentativa={tentativa}
          setTentativas={setTentativas}
        />
      ))}
      <button onClick={verificarPalavra}>enviar</button>
    </div>
  );
}

export default App;
