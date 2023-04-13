import { Location, Event, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const venues: { [key: string]: string[] } = {
  "London": [
    "O2",
    "Wembely"
  ]
};
const artists: { [key: string]: string[] } = {
  "Coldplay": [
    "WORLD TOUR",
  ],
  "Taylor Swift": [
    "Some Tour",
  ],
  "ED Sheeran": [
    "Maths",
  ]
}

function getRandom(array: any[]) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

/*
async function addLocations() {
  const locations: Location[] = [];
  for (let i = 0; i < 5; i++) {
    const v: string = getRandom(venues);
    const e = await prisma.location.upsert({
      where: { venue: v },
      update: {},
      create: {
        venue: v,
        lat: 0,
        long: 0,
        city: "London",
        country: "United Kingdom"
      }
    })
    locations.push(e);
  }

  return locations;
}

async function addEvents() {
  const locations: Location[] = await prisma.location.findMany();
  const eventList: Event[] = [];
  for (let i = 0; i < 25; i++) {
    const event: string = getRandom(events);
    const location: Location = getRandom(locations)

    const e = await prisma.event.upsert({
      where: {
        event_identifier: {
          name: event,
          locationId: location.id
        }
      },
      update: {},
      create: {
        name: event,
        locationId: location.id,
        time: 0,
      }
    })


    eventList.push(e);
  }

  return eventList;
}

async function addTickets() {
  const eventList: Event[] = await prisma.event.findMany()
  eventList.forEach(async (e: Event) => {
    for (let i = 0; i < getRandomInt(100); i++) {
      const seat = `A${i}`;
      await prisma.ticket.upsert({
        where: {
          ticket_identifier: {
            eventId: e.id,
            seat: seat,
          }
        },
        update: {},
        create: {
          eventId: e.id,
          seat: seat,
          price: 100,

        }
      })
    }
  })
}
*/

async function main() {
  /*
  await addLocations();
  await addEvents();
  await addTickets();
  */

  await prisma.genre.upsert({
    where: {
      genre: "TEST"
    },
    update: {},
    create: {
      genre: "TEST"
    }
  })


  for (const city in venues) {
    console.log(city, venues[city])

    venues[city].forEach(async (venue: string) => {
      const venueRecord = await prisma.location.upsert({
        where: {
          venue: venue
        },
        update: {},
        create: {
          venue: venue,
          city: city,
          country: "United Kingdom",
          lat: 0,
          long: 0,
        }
      })


    })

  }



  for (const artist in artists) {
    const events: string[] = artists[artist]
    console.log(artist, events)


    const artistRecord = await prisma.artist.upsert({
      where: {
        name: artist,
      },
      update: {},
      create: {
        name: artist,
        genreId: 1,
      }
    })


    /**
     * Create random events from aritsts and location. Multiple of same events are created at different locations
     */
    artists[artist].forEach((eventName: string) => {
      events.forEach(async (event: string) => {
        for (let i = 0; i < getRandomInt(5) + 1; i++) {
          const location = getRandom(await prisma.location.findMany())
          await prisma.event.upsert({
            where: {
              event_identifier: {
                locationId: location.id,
                name: eventName
              }
            },
            update: {},
            create: {
              artistId: artistRecord.id,
              locationId: location.id,
              name: eventName,
              time: 0,
            }
          })
        }
      })
    })

  }
}

main()

  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
