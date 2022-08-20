// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import executeQuery from "../../lib/db";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const result: any = await executeQuery({
      query: `SELECT c.nome as Campeonato, t.nome as Time, Count(j.genero) as Quantidade_de_Mulheres
      FROM tb_disputa as d
      join tb_campeonato as c on c.id_camp = d.id_camp
      join tb_time as t on t.id_time = d.id_time
      join tb_jogador as j on j.id_time = t.id_time
      where j.genero = 'F'
      GROUP BY c.nome, t.nome;`,
      values: [],
    });
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500);
  }
}
