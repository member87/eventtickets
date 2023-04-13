import { Location, Event, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const venues: { [key: string]: string[] } = {
  "London": [
    "O2",
    "Wembely"
  ],
  "Manchester": [
    "Etihad Stadium"
  ],
  "Cardiff": [
    "Principality Stadium"
  ]
};
const artists: { [key: string]: string[] } = {
  "Coldplay": [
    "WORLD TOUR",
    "Music of the Spheres",
    "Parachutes"
  ],
  "Taylor Swift": [
    "Some Tour",
    "Midnights",
    "Lover",
    "Reputation"
  ],
  "ED Sheeran": [
    "Maths",
    "+",
    "="
  ],
  "Harry Styles": [
    "Harrys House"
  ]
}

function getRandom(array: any[]) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

async function main() {
  /**
   * Create test music genre
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


  /**
   * Add venues into database
   */
  for (const city in venues) {
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


  /**
   * Add artists into database
   */
  for (const artist in artists) {
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
    artists[artist].forEach(async (eventName: string) => {
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
          }
        })
      }
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
