import { Page } from '@/components/templates/page';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Events } from '@/components/loop/events/events';
import Link from 'next/link';
import { prisma } from '@/util/prisma';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const genreId = context.query.genre;

  const genre = await prisma.genre.findUnique({
    where: {
      id: Number(genreId)
    }
  });

  return {
    props: {
      genreId,
      genre
    },
  }
}

export default function Genres({genreId, genre}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Page>
      <div className='bg-zinc-900 text-white p-5'>
        <div className="flex gap-2 flex-wrap mb-3">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href={`/events/`}>Events</Link>
          <span>/</span>
          <Link href="/">{genre.genre}</Link>
        </div>
        <h1 className="text-xl font-bold">{genre.genre}</h1>
      </div>
      <Events genre={genreId} />
    </Page>
  )
}
