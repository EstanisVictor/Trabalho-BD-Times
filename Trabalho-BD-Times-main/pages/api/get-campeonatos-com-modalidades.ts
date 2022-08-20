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
      query: `select c.nome, m.tipo as Modalidade, c.qnt_times, c.premiacao, c.data_camp 
      from tb_campeonato as c
      join tb_modalidade as m
      on c.modalidade = m.id_modalidade;`,
      values: [],
    });
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500);
  }
}
