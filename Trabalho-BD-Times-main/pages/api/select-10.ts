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
      query: `select round(avg(qnt_titulos)) as Media_de_titulos, max(qnt_titulos) as Quantidade_maxima_de_titulos 
      from tb_time as t 
      join tb_organizacao as o 
      on t.id_org = o.id_org 
      where year(ano_fundacao) > 2000;`,
      values: [],
    });
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500);
  }
}
