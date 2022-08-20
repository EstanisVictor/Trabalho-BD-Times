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
      query: `SELECT genero AS sexo, COUNT(*) AS quantidade
      FROM tb_jogador
      GROUP BY genero;`,
      values: [],
    });
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500);
  }
}
