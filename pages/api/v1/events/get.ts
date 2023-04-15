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

  
  let page = Number(req.query.page);
  if(!page) page = 0;

  let limit = Number(req.query.limit);
  if(!limit) limit = 20;

  let genre = Number(req.query.genre);

  const events = await prisma.event.findMany({
    where: genre ? {
      artist: {
        is: {
          genre: {
            id: genre
          }
        }
      }
    } : {},
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

  const count = await prisma.event.count({
    where: genre ? {
      artist: {
        is: {
          genre: {
            id: genre
          }
        }
      }
    } : {},
  })


  res.status(200).json({events, count})
}
