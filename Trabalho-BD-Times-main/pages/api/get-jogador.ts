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
      query: `SELECT j.nome, j.nacionalidade, j.data_nasc, j.genero, j.valor_passe, t.nome as time
      FROM tb_jogador as j
      join tb_time as t on t.id_time = j.id_time
      where id_jogador = ${req.body.id};`,
      values: [],
    });
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500);
  }
}
