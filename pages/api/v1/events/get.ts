// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/util/prisma'
import { Prisma } from '@prisma/client'


export type EventLocation = Prisma.EventGetPayload<{
  select: {
    name: true,
    time: true,
    id: true,
    location: {
      select: {
        venue: true,
        city: true,
        country: true,
      }
    },
  }
}>

type ReturnType = {
  events: EventLocation[],
  count: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReturnType>
) {

  const limit = 10;
  let page = Number(req.query.page);
  if(!page) page = 0;


  const events = await prisma.event.findMany({
    select: {
      name: true,
      time: true,
      id: true,
      location: {
        select: {
          venue: true,
          city: true,
          country: true,
        }
      },
    },
    orderBy: {
      time: 'asc',
    },
    take: limit,
    skip: page * limit,
  })

  const count = await prisma.event.count()


  res.status(200).json({events, count})
}
