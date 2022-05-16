import './Palavra.css';

function PalavraComponent({tentativas, tentativa, setTentativas, tentativaIndice}) {   

    const adicionarLetraPosicao = (event, tentativaIndice, letraIndice) => {    
        const novasTentativas = tentativas;
        novasTentativas[tentativaIndice].valor[letraIndice] = event.target.value;    
        setTentativas([...novasTentativas]);
    };

    return (
        <div className='content-words'> 
            {tentativa.valor.map((letra, letraIndice) => (
              <input
                type="text"
                key={`${tentativa.id}${letraIndice}`}
                value={letra}
                maxLength={1}
                className={`${tentativa.posicoes[letraIndice].length ? 'letraeposicaocorreta' : ''} ${tentativa.letras[letraIndice].length ? 'letracorreta' : ''}`}
                onChange={() => adicionarLetraPosicao(event, tentativaIndice, letraIndice)}                
                disabled={!tentativa.ativo}
              />
            ))}
        </div>
    )
}

export default PalavraComponent;