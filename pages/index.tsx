import { prisma } from '@/util/prisma';
import { Artist } from '@prisma/client';
import { InferGetStaticPropsType } from 'next'




export const getServerSideProps = async () => {

  const artists = await prisma.artist.findMany({
    select: {
      name: true,
      event: {
        select: {
          name: true,
          location: true
        }
      }
    }
  });
  console.log(artists)
  return { props: { artists: artists } }
}



export default function Home({ artists }: InferGetStaticPropsType<typeof getServerSideProps>) {
  console.log(artists)
  return (
    <div>
      <ul>
        {artists.map((artist: Artist) => {
          return (
            <div>
              {artist.name}
              <ul className="ml-5">
                {artist.event.map((e: string) => {
                  return (<li>{e.name} - {e.location.venue}</li>)
                })}
              </ul>
            </div>
          )
        })}
      </ul>
    </div>
  )
}
