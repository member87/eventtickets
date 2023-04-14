import { Page } from '@/components/templates/page';
import { useRouter } from 'next/router'
import { prisma } from '@/util/prisma';
import Link from 'next/link';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'



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

  console.log(eventData)

  return {
    props: {eventData},
  }
}

export default function Home({eventData}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Page>
      <div className="flex gap-2 ">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/">{eventData.artist.genre.genre}</Link>
        <span>/</span>
        <Link href="/">{eventData.artist.name}</Link>
      </div>
      <div className='sm:m-3 p-2'>
        <h1 className='text-3xl font-bold my-2'></h1>
      </div>
    </Page>
  )
}
