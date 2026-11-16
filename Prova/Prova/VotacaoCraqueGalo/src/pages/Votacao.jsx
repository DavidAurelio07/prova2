
import { useState } from "react";
import {
    listarPorSituacao,
    obterSuspenso,
    registrarVoto
} from "../services/votacaoService";

import JogadorCard from "../components/JogadorCard";
import { Link } from "react-router-dom";

function Votacao() {

    const indicados = listarPorSituacao("indicado");
    const eElenco = listarPorSituacao("elenco");

    const [selecionado, setSelecionado] = useState(null);
    const [historico, setHistorico] = useState([]);

    const suspenso = obterSuspenso();

    function handleConfirmar() {
        if (!selecionado) return;

        registrarVoto(selecionado.id);

        setHistorico([...historico, selecionado.nome]);
        setSelecionado(null);
    }

    return (
        <main>

            <section className="indicados">
                <h2>Escolha quem receberá seu voto</h2>

                <div className="grade-participantes">
                    {indicados.map((j) => (
                        <JogadorCard
                            key={j.id}
                            jogador={j}
                            selecionado={selecionado?.id === j.id}
                            onSelecionar={() => setSelecionado(j)}
                        />
                    ))}
                </div>
            </section>

            <div className="confirmacao">
                <p>
                    {selecionado
                        ? <>
                            Seu voto vai para{" "}
                            <strong>{selecionado.nome}</strong>
                          </>
                        : "Nenhum jogador selecionado."
                    }
                </p>

                <button
                    type="button"
                    className="botao botao-principal"
                    disabled={!selecionado}
                    onClick={handleConfirmar}
                >
                    Confirmar voto
                </button>
            </div>

            {historico.length > 0 && (
                <section className="historico" aria-live="polite">

                    <h2>
                        Seus votos nesta sessão: {historico.length}{" "}
                        {historico.length === 1 ? "voto" : "votos"}
                    </h2>

                    <ol className="historico-lista">
                        {historico.map((nome, indice) => (
                            <li key={indice}>{nome}</li>
                        ))}
                    </ol>

                    <Link to="/resultado">Ver parcial</Link>

                </section>
            )}

            {suspenso && (
                <section className="demais">
                    <h2>Jogador suspenso</h2>
                    <p className="demais-legenda">
                        Jogador está suspenso
                    </p>

                    <div className="grade-participantes">
                        <ParticipanteCard participante={suspenso} />
                    </div>
                </section>
            )}

            <section className="demais">
                <h2>Demais jogadores</h2>

                <p className="demais-legenda">
                    Outros jogadores
                </p>

                <div className="grade-participantes">
                    {eElenco.map((p) => (
                        <ParticipanteCard
                            key={p.id}
                            participante={p}
                        />
                    ))}
                </div>
            </section>

        </main>
    );
}

export default Votacao;
