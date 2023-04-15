import { Page } from '@/components/templates/page';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Events } from '@/components/loop/events/events';


export const getServerSideProps: GetServerSideProps = async (context) => {
  const genreId = context.query.genre;

  return {
    props: {
      genreId,
    },
  }
}

export default function Genres({genreId}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Page>
      <Events genre={genreId} />
    </Page>
  )
}
