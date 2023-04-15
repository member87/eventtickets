// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/util/prisma'
import { Prisma, Ticket } from '@prisma/client'


type returnData = {
  tickets?: Ticket[]
  error?: string
}



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<returnData>
) {

  if(req.method !== "GET") {
    res.status(400).json({error: "Invalid request method"})
    return;
  }

  
  const evnetId = req.query.event;
  if(!evnetId) {
    res.status(400).json({error: "No event id provided"})
    return;
  }

  let page = Number(req.query.page);
  if(!page) {
    page = 1;
  }
  const limit = 10;

  const tickets = await prisma.ticket.findMany({
    where: {
      eventId: Number(evnetId)
    },
    take: limit,
    skip: page * limit,
  })


  res.status(200).json({tickets})
}