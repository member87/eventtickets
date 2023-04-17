import { Page } from '@/components/templates/page';
import { prisma } from '@/util/prisma';
import Link from 'next/link';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { dateToDay, dateToMonth } from '@/util/time';
import { Tickets } from '@/components/loop/tickets/tickets';


export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.event;

  
  const eventData = await prisma.event.findUnique({
    where: {
      id: Number(id)
    },
    select: {
      id: true,
      name: true,
      artist: {
        select: {
          name: true,
          image: true,
          genre: {
            select: {
              genre: true,
              id: true,
            }
          }
        }
      },
      location: {
        select: {
          venue: true,
          city: true,
          country: true
        }
      }
    }
  })

  const eventTime = await prisma.event.findUnique({
    where: {
      id: Number(id)
    },
    select: {
      time: true
    }
  })

  let timeString = "";
  if(eventTime) {  
    const date = new Date(eventTime.time);
    const dayName = dateToDay(eventTime.time);
    const dayNum = date.getDate();
    const month = dateToMonth(eventTime.time);
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    const year = date.getFullYear();
    timeString = `${dayName}, ${dayNum} ${month} ${year}, ${hour}:${minute}`;
  }

  return {
    props: {
      eventData,
      timeString
    },
  }
}

export default function EventSingle({eventData, timeString}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  
  return (
    <Page>
      <div className='bg-zinc-900 text-white p-5 relative overflow-hidden' >
        <div className="absolute top-0 left-0 w-full h-full blur bg-cover bg-center" style={{backgroundImage: `url("${eventData.artist.image}")`}}></div>
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        <div className="relative">
          <div className="flex gap-2 flex-wrap mb-3">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href={`/genres/${eventData.artist.genre.id}`}>{eventData.artist.genre.genre}</Link>
            <span>/</span>
            <Link href="/">{eventData.artist.name}</Link>
          </div>
          <div className="flex gap-4">
            <div className='pt-2 hidden sm:block'>
              <img src={eventData.artist.image} className="w-32 h-16 rounded object-cover shadow-2xl" />
            </div>
            <div>
              <h1 className='text-xl font-semibold my-1'>{eventData.artist.name}: {eventData.name}</h1>
              <span className="text-sm">{timeString}</span>
              <div className="text-sm">{eventData.location.venue}, {eventData.location.city}, {eventData.location.country}</div>
            </div>
          </div>
        </div>
      </div>
      <Tickets eventId={eventData.id} />
    </Page>
  )
}
