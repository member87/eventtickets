// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/util/prisma'
import { Genre } from '@prisma/client'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Genre[]>
) {
  const genres = await prisma.genre.findMany()
  res.status(200).json(genres)
}
