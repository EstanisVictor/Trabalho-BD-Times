import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

import styles from "./Curiosidades.module.scss";

const Curiosidades: NextPage = () => {
  const [query1, setQuery1] = useState<any[]>([]);
  const [query2, setQuery2] = useState<any[]>([]);
  const [query3, setQuery3] = useState<any[]>([]);
  const [query4, setQuery4] = useState<any[]>([]);
  const [query5, setQuery5] = useState<any[]>([]);
  const [query6, setQuery6] = useState<any[]>([]);
  const [query7, setQuery7] = useState<any[]>([]);
  const [query8, setQuery8] = useState<any[]>([]);
  const [query9, setQuery9] = useState<any[]>([]);
  const [query10, setQuery10] = useState<any[]>([]);

  {
    /* Select 1 */
  }
  useEffect(() => {
    const getData = async () => {
      const res = await axios.post("/api/get-jogadores-por-genero");

      setQuery1(res.data);
    };

    getData();
  }, []);

  {
    /* Select 2 */
  }
  useEffect(() => {
    const getData = async () => {
      const res = await axios.post("/api/select-2");

      setQuery2(res.data);
    };

    getData();
  }, []);

  {
    /* Select 3 */
  }
  useEffect(() => {
    const getData = async () => {
      const res = await axios.post("/api/get-campeonatos-com-modalidades");
      setQuery3(res.data);
    };

    getData();
  }, []);

  {
    /* Select 4 */
  }
  useEffect(() => {
    const getData = async () => {
      const res = await axios.post("/api/get-jogadores-com-time");

      setQuery4(res.data);
    };

    getData();
  }, []);

  {
    /* Select 5 */
  }
  useEffect(() => {
    const getData = async () => {
      const res = await axios.post("/api/get-campeonatos-com-times");

      setQuery5(res.data);
    };

    getData();
  }, []);

  {
    /* Select 6 */
  }
  useEffect(() => {
    const getData = async () => {
      const res = await axios.post("/api/select-6");
      setQuery6(res.data);
    };

    getData();
  }, []);

  {
    /* Select 7 */
  }
  useEffect(() => {
    const getData = async () => {
      const res = await axios.post("/api/select-7");
      setQuery7(res.data);
    };

    getData();
  }, []);

  {
    /* Select 8 */
  }
  useEffect(() => {
    const getData = async () => {
      const res = await axios.post("/api/select-8");
      setQuery8(res.data);
    };

    getData();
  }, []);

  {
    /* Select 9 */
  }
  useEffect(() => {
    const getData = async () => {
      const res = await axios.post("/api/select-9");

      setQuery9(res.data);
    };

    getData();
  }, []);

  {
    /* Select 10 */
  }
  useEffect(() => {
    const getData = async () => {
      const res = await axios.post("/api/select-10");

      console.log(res.data);

      setQuery10(res.data);
    };

    getData();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Curiosidades</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.header}>
          <h1>Curiosidades</h1>
        </div>
        <ul>
          <hr />
          <h2>Select Simples</h2>
          <hr />
          {/* Select 1 */}
          {query1.length > 0 && (
            <li>
              <strong>Quantidade de jogadores por g??nero:</strong>
              <div>
                {query1.map((item, index) => (
                  <div key={index}>
                    {item.sexo}: {item.quantidade}
                  </div>
                ))}
              </div>
              <code>
                SELECT genero AS sexo, COUNT(*) AS quantidade FROM tb_jogador
                GROUP BY genero;
              </code>
            </li>
          )}
          <hr />
          {/* Select 2 */}
          {query2.length > 0 && (
            <li>
              <strong>
                Lista de Jogadores de sexo feminino por ordem descendente:
              </strong>
              <div className={styles.listJogadores}>
                {query2.map((item, index) => (
                  <div key={index}>{item.nome}</div>
                ))}
              </div>
              <code>
                SELECT nome FROM tb_jogador WHERE genero = {"'F'"} order by nome
                desc;
              </code>
            </li>
          )}
          <hr />
          <h2>Select Join Simples</h2>
          <hr />
          {/* Select 3 */}
          {query3.length > 0 && (
            <li>
              <strong>
                Mostra todas as informa????es dos campeonatos juntamente com sua
                modalidade:
              </strong>
              <div className={styles.listJogadores}>
                {query4.map((item, index) => (
                  <div key={index}>
                    <div>{query3[0].nome}</div>
                    <div>{query3[0].Modalidade}</div>
                    <div>Premia????o: {query3[0].premiacao}</div>
                    <div>Quantidade de times: {query3[0].qnt_times}</div>
                    <div>Data: {query3[0].data_camp.substring(0, 10)}</div>
                    <hr />
                  </div>
                ))}
              </div>
              <div></div>
              <code>
                select c.nome, m.tipo as Modalidade, c.qnt_times, c.premiacao,
                c.data_camp from tb_campeonato as c join tb_modalidade as m on
                c.modalidade = m.id_modalidade;
              </code>
            </li>
          )}
          <hr />
          {/* Select 4 */}
          {query4.length > 0 && (
            <li>
              <strong>
                Mostra todas as informa????es dos jogadores juntamente com seu
                time:
              </strong>
              <div className={styles.listJogadores}>
                {query4.map((item, index) => (
                  <div key={index}>
                    <div>{item.nome}</div>
                    <div>Time: {item.Time}</div>
                    <div>Genero: {item.genero}</div>
                    <div>Nacionalidade: {item.nacionalidade}</div>
                    <div>Data Nasc: {item.data_nasc.substring(0, 10)}</div>
                    <div>
                      Valor Passe: ${Math.floor(item.valor_passe / 1000000)}{" "}
                      milh??es
                    </div>

                    <hr />
                  </div>
                ))}
              </div>
              <code>
                SELECT j.nome, j.nacionalidade, j.data_nasc, j.genero,
                j.valor_passe, t.nome as Time FROM tb_jogador as j join tb_time
                as t on t.id_time = j.id_time;
              </code>
            </li>
          )}
          <hr />
          {/* Select 5 */}
          {query5.length > 0 && (
            <li>
              <strong>
                Mostra os times que possuem titulos juntamente com sua org em
                ordem do time que possui mais titulos:
              </strong>
              <div className={styles.listJogadores}>
                {query5.map((item, index) => (
                  <div key={index}>
                    <span>{item.Time}</span>
                    {" - "} <span>{item.ORG}</span>
                    {" - "}
                    <span>{item.Quantidade_de_titulos} t??tulos</span>
                    <hr />
                  </div>
                ))}
              </div>
              <code>
                SELECT o.nome AS ORG, t.nome as Time, t.qnt_titulos as
                Quantidade_de_titulos FROM tb_time as t join tb_organizacao as o
                on o.id_org = t.id_org WHERE qnt_titulos {">"} 0 ORDER BY
                qnt_titulos desc;
              </code>
            </li>
          )}
          <hr />
          <h2>SELECT JOIN TR??S OU MAIS</h2>
          <hr />
          {/* Select 6 */}
          {query6.length > 0 && (
            <li>
              <strong>
                Mostra os times que possuem titulos juntamente com sua
                modalidade e a org em ordem alfabetica:
              </strong>
              <div className={styles.listJogadores}>
                {query6.map((item, index) => (
                  <div key={index}>
                    <span>{item.Time}</span>
                    {" - "} <span>{item.Modalidade}</span>
                    {" - "} <span>{item.ORG}</span>
                    {" - "}
                    <span>{item.Quantidade_de_titulos} t??tulos</span>
                    <hr />
                  </div>
                ))}
              </div>
              <code>
                SELECT o.nome AS ORG, t.nome as Time, m.tipo as
                Modalidade,t.qnt_titulos as Quantidade_de_titulos FROM tb_time
                as t join tb_organizacao as o on o.id_org = t.id_org join
                tb_modalidade as m on m.id_modalidade = t.modalidade WHERE
                qnt_titulos {">"} 0 ORDER BY o.nome;
              </code>
            </li>
          )}
          <hr />
          {/* Select 7 */}
          {query7.length > 0 && (
            <li>
              <strong>
                Mostra o campeonato e os times que est??o participando:
              </strong>
              <div className={styles.listJogadores}>
                {query7.map((item, index) => (
                  <div key={index}>
                    {item.Campeonato} {" - "}
                    {item.Time}
                  </div>
                ))}
              </div>
              <code>
                SELECT c.nome as Campeonato, t.nome as Time FROM tb_disputa as d
                join tb_campeonato as c on c.id_camp = d.id_camp join tb_time as
                t on t.id_time = d.id_time;
              </code>
            </li>
          )}
          <hr />
          {/* Select 8*/}
          {query8.length > 0 && (
            <li>
              <strong>
                Quantidade de mulheres por time disputando cada campeonato:
              </strong>
              <div className={styles.listJogadores}>
                {query8.map((item, index) => (
                  <div key={index}>
                    {item.Campeonato} {" - "} {item.Time} {" - "}{" "}
                    {item.Quantidade_de_Mulheres} mulheres
                  </div>
                ))}
              </div>
              <code>
                SELECT c.nome as Campeonato, t.nome as Time, Count(j.genero) as
                Quantidade_de_Mulheres FROM tb_disputa as d join tb_campeonato
                as c on c.id_camp = d.id_camp join tb_time as t on t.id_time =
                d.id_time join tb_jogador as j on j.id_time = t.id_time where
                j.genero = {"'F'"} GROUP BY c.nome, t.nome;
              </code>
            </li>
          )}
          <hr />
          <h2>SELECT JOIN COM AGREGA????ES</h2>
          <hr />
          {/* Select 9 */}
          {query9.length > 0 && (
            <li>
              <strong>
                Nome da organiza????o que possui time de futebol com a maior
                quantia de titulos e que possua jogadores e a quantidade de
                t??tulos:
              </strong>
              <hr />
              <div className={styles.listJogadores}>
                {query9[0]?.ORG} {" - "} {query9[0]?.Quantidade_de_titulos}{" "}
                t??tulos
              </div>
              <hr />
              <code>
                SELECT o.nome AS ORG, t.qnt_titulos as Quantidade_de_titulos,
                COUNT(j.id_time) as Media_de_titulos from tb_organizacao as o
                join tb_time as t on o.id_org = t.id_org join tb_modalidade as m
                on m.id_modalidade = t.modalidade join tb_jogador as j on
                j.id_time = t.id_time where t.qnt_titulos = (SELECT
                MAX(qnt_titulos) FROM tb_time as tim join tb_modalidade as m on
                m.id_modalidade = tim.modalidade where m.tipo = {"'Futebol'"})
                having COUNT(j.id_time) {">"} 0;
              </code>
            </li>
          )}
          {/* Select 10 */}
          {query10.length > 0 && (
            <li>
              <strong>
                A quantidade m??dia e m??xima dos t??tulos dos times de orgs
                fundadas depois dos anos 2000:
              </strong>
              <hr />
              <div className={styles.listJogadores}>
                M??dia de t??tulos: {query10[0]?.Media_de_titulos} {" - "}
                <br />
                Quantidade m??xima de t??tulos:{" "}
                {query10[0]?.Quantidade_maxima_de_titulos} t??tulos
              </div>
              <hr />
              <code>
                select round(avg(qnt_titulos)) as Media_de_titulos,
                max(qnt_titulos) as Quantidade_maxima_de_titulos from tb_time as
                t join tb_organizacao as o on t.id_org = o.id_org where
                year(ano_fundacao) {">"} 2000;
              </code>
            </li>
          )}
        </ul>
      </main>
    </div>
  );
};

export default Curiosidades;
