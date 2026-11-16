
import { useState } from "react";
import { Link } from "react-router-dom";

import {
    obterVotos,
    calcularResultado,
    desfazerUltimoVoto,
    zerarVotos,
} from "../services/votacaoService";

function Resultado() {

    const [votos, setVotos] = useState(() => obterVotos());

    // Valores derivados
    const total = votos.length;
    const resultado = calcularResultado(votos);

    const craque = resultado[0];
    const vice = resultado[1];

    const vantagem = craque && vice
        ? craque.votos - vice.votos
        : 0;

    function handleDesfazer() {
        setVotos(desfazerUltimoVoto());
    }

    function handleZerar() {
        if (window.confirm("Tem certeza que deseja apagar todos os votos?")) {
            zerarVotos();
            setVotos([]);
        }
    }

    return (
        <main className="pagina">

            <header className="pagina-cabecalho">
                <h1>Resultado da votação</h1>

                <p className="total-votos">
                    <strong>
                        {total.toLocaleString("pt-BR")}
                    </strong>{" "}
                    {total === 1
                        ? "voto computado"
                        : "votos computados"}
                </p>
            </header>

            {total === 0 ? (

                <section className="sem-votos">
                    <h2>Nenhum voto registrado!</h2>

                    <p>
                        A votação ainda não recebeu votos.
                    </p>

                    <Link to="/votacao" className="botao botao-principal">
                        Ir para votação
                    </Link>
                </section>

            ) : (

                <>

                    {vice && (
                        <p className="situacao-lideranca">
                            {vantagem === 0
                                ? `Empate na liderança entre ${craque.nome} e ${vice.nome}!`
                                : `${craque.nome} lidera com ${vantagem} ${vantagem === 1 ? "voto" : "votos"} de vantagem sobre ${vice.nome}.`
                            }
                        </p>
                    )}

                    <section className="placar">

                        <h2>Placar da votação</h2>

                        {resultado.map((j, indice) => (

                            <article
                                key={j.id}
                                className={`placar-item ${
                                    indice === 0
                                        ? "placar-craque"
                                        : indice === 1
                                            ? "placar-vice"
                                            : ""
                                }`}
                            >

                                <div className="placar-info">

                                    <div>
                                        <span className="placar-posicao">
                                            {indice + 1}º
                                        </span>

                                        <strong>{j.nome}</strong>

                                        {indice === 0 && (
                                            <span className="selo">
                                                Craque do jogo
                                            </span>
                                        )}

                                        {indice === 1 && (
                                            <span className="selo">
                                                Vice
                                            </span>
                                        )}
                                    </div>

                                    <div className="placar-votos">
                                        <strong>{j.votos}</strong>{" "}
                                        {j.votos === 1 ? "voto" : "votos"}
                                    </div>

                                </div>

                                <div className="barra-progresso">
                                    <div
                                        className="barra-progresso-preenchimento"
                                        style={{
                                            width: `${j.percentual}%`
                                        }}
                                    />
                                </div>

                                <p className="placar-percentual">
                                    {j.percentual.toLocaleString(
                                        "pt-BR",
                                        {
                                            maximumFractionDigits: 1
                                        }
                                    )}%
                                </p>

                            </article>

                        ))}

                    </section>

                </>
            )}

            <div className="acoes-resultado">

                <button
                    type="button"
                    className="botao"
                    onClick={handleDesfazer}
                    disabled={total === 0}
                >
                    Desfazer último voto
                </button>

                <button
                    type="button"
                    className="botao botao-perigo"
                    onClick={handleZerar}
                    disabled={total === 0}
                >
                    Zerar votação
                </button>

            </div>

            <Link to="/votacao">
                Voltar para votação
            </Link>

        </main>
    );
}

export default Resultado;
