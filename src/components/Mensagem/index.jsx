import "./Mensagem.css";

export default ({ status }) => {
    const verificarStatus = () => {
        if (status.mensagem.length) {
            return status.ganhou ? "ganhou abrir" : "perdeu abrir"
        }
        return '';
    }
    return (
        <div className={`${verificarStatus()} modal-mensagem`}>
            <h2>{status.mensagem}</h2>
        </div>
    );

}