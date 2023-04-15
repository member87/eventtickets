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
  ],
  "Birmingham": [
    "Arena Birmingham",
    "Birmingham Arena",
    "Birmingham NIA"
  ],
  "Bristol": [
    "Bristol Arena",
    "Bristol Hippodrome",
    "Bristol O2 Academy",
    "Bristol Colston Hall"
  ],
  "Leeds": [
    "Leeds Arena",
    "Leeds First Direct Arena",
    "Leeds O2 Academy",
    "Leeds Town Hall"
  ],
  "Liverpool": [
    "Liverpool Echo Arena",
    "Liverpool M&S Bank Arena",
    "Liverpool O2 Academy"
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
  ],
  "Justin Bieber": [
    "Believe",
    "Purpose",
    "My World"
  ],
  "Ariana Grande": [
    "Sweetener",
  ],
  "Katy Perry": [
    "Witness",
    "Prism",
    "Teenage Dream",
  ],
  "Miley Cyrus": [
    "Bangerz",
    "Can't Be Tamed",
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
  const rockPop =await prisma.genre.upsert({
    where: {
      genre: "Rock / Pop"
    },
    update: {},
    create: {
      genre: "Rock / Pop"
    }
  })

  const countyFolk =await prisma.genre.upsert({
    where: {
      genre: "Country / Folk"
    },
    update: {},
    create: {
      genre: "Country / Folk"
    }
  })

  const alternativeIndie =await prisma.genre.upsert({
    where: {
      genre: "Alternative and Indie"
    },
    update: {},
    create: {
      genre: "Alternative and Indie"
    }
  })

  const classical =await prisma.genre.upsert({
    where: {
      genre: "Classical"
    },
    update: {},
    create: {
      genre: "Classical"
    }
  })

  const jazzBlues =await prisma.genre.upsert({
    where: {
      genre: "Jazz / Blues"
    },
    update: {},
    create: {
      genre: "Jazz / Blues"
    }
  })
  
  const genres = [rockPop, countyFolk, alternativeIndie, classical, jazzBlues];


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
        genreId: getRandom(genres).id,
      }
    })


    /**
     * Create random events from aritsts and location. Multiple of same events are created at different locations
     */
    artists[artist].forEach(async (eventName: string) => {
      for (let i = 0; i < getRandomInt(20) + 1; i++) {
        const location = getRandom(await prisma.location.findMany())
        
        /* generate a random datetime for prismajs DateTime type */
        const date = new Date(+(new Date()) + Math.floor(Math.random()*10000000000));

        /* Add event */
        const event = await prisma.event.upsert({
          where: {
            event_identifier: {
              locationId: location.id,
              name: eventName,
              time: date
            }
          },
          update: {},
          create: {
            artistId: artistRecord.id,
            locationId: location.id,
            name: eventName,
            time: date
          }
        })

        /* Add tickets */
        for(let i = 0; i < getRandomInt(200) + 1; i++) {
          const seat = String.fromCharCode(65 + getRandomInt(26)) + (getRandomInt(10) + 1)
          await prisma.ticket.upsert({
            where: {
              ticket_identifier: {
                eventId: event.id,
                seat: seat
              }
            },
            update: {},
            create: {
              eventId: event.id,
              seat: seat,
              price: getRandomInt(100000) + 1,
            }
          })
        }

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
