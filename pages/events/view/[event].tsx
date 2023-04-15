import { Page } from '@/components/templates/page';
import { prisma } from '@/util/prisma';
import Link from 'next/link';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { dateToDay, dateToMonth } from '@/util/time';


export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.event;

  const eventData = await prisma.event.findUnique({
    where: {
      id: Number(id)
    },
    select: {
      name: true,
      artist: {
        select: {
          name: true,
          genre: {
            select: {
              genre: true
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
      <div className='bg-zinc-900 text-white p-5'>
        <div className="flex gap-2 flex-wrap mb-3">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/">{eventData.artist.genre.genre}</Link>
          <span>/</span>
          <Link href="/">{eventData.artist.name}</Link>
        </div>
        <h1 className='text-xl font-semibold my-1'>{eventData.artist.name}: {eventData.name}</h1>
        <span className="text-sm">{timeString}</span>
      </div>
      <div className='sm:m-3 p-2'>
      </div>
    </Page>
  )
}
