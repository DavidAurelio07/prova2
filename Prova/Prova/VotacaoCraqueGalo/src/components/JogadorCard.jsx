function JogadorCard({ jogador, selecionado = false, onSelecionar }) {
    const { nome, numero, posicao, foto, situacao } = jogador;

    const SELOS = {
        indicado: 'Indicado',
        suspenso: 'Suspenso',
    };

    const selo = SELOS[situacao];

    return (
        <article
            className={`card card-${situacao || ''} ${
                selecionado ? 'card-selecionado' : ''
            }`}
        >
            {selo && (
                <span className={`selo selo-${situacao}`}>
                    {selo}
                </span>
            )}

            <img
                src={foto}
                alt={nome}
                className="card-foto"
            />

            <div className="card-corpo">
                <h3 className="card-nome">{nome}</h3>

                <p className="card-numero">Número: {numero}</p>
                <p className="card-posicao">Posição: {posicao}</p>

                {onSelecionar && (
                    <button
                        type="button"
                        onClick={() => onSelecionar(jogador)}
                    >
                        {selecionado ? 'Selecionado' : 'Selecionar'}
                    </button>
                )}
            </div>
        </article>
    );
}

export default JogadorCard;
