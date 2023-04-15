import { Page } from '@/components/templates/page';
import { Events } from '@/components/loop/events/events';



export default function Home({}) {

  return (
    <Page>
      <div className='sm:m-3 p-2'>
        <h1 className='text-3xl font-bold my-5 opacity-70'>Upcoming Events</h1>
        <Events limitList limit={4}/>
      </div>
    </Page>
  )
}
