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


const seed: { [key: string]: { [key: string]: { events: string[], image: string } } } = {
  "Rock/Pop": {
    "Coldplay": {
      "events": [
        "A Head Full of Dreams Tour",
        "MOTS",
        "Parachutes",
      ],
      "image": "https://upload.wikimedia.org/wikipedia/commons/2/2e/ColdplayBBC071221_%28cropped%29.jpg"
    },
    "Ed Sheeran": {
      "events": [
        "Divide Tour",
      ],
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Ed_Sheeran-6886_%28cropped%29.jpg/1200px-Ed_Sheeran-6886_%28cropped%29.jpg"
    },
  },
  "Country/Folk": {
    "Taylor Swift": {
      "events": [
        "Reputation Tour",
        "1989 Tour",
        "Red Tour",
        "Speak Now Tour",
      ],
      "image": "https://www.gannett-cdn.com/presto/2023/03/18/USAT/7d4c67a0-ad47-4800-b794-c5cb0a9e1427-GTY_1474302747.jpg"
    },
    "Kacey Musgraves": {
      "events": [
        "Golden Hour Tour",
      ],
      "image": "https://i.scdn.co/image/ab6761610000e5ebd123e4c884d1a5e2edff1895"
    },
  },
  "Alternative/Indie": {
    "The 1975": {
      "events": [
        "A Brief Inquiry Into Online Relationships Tour",
        "I Like It When You Sleep, for You Are So Beautiful Yet So Unaware of It Tour",
        "The 1975 Tour",
      ],
      "image": "https://static.standard.co.uk/2022/10/21/18/21153240-553216a7-0188-4f5e-b122-cc1899601526.jpg?width=968&auto=webp&quality=50&crop=968%3A645%2Csmart"
    },
    "The Strokes": {
      "events": [
        "The New Abnormal Tour",
      ],
      "image": "https://cdn.britannica.com/77/205077-050-358F982F/The-Strokes-Nikolai-Fraiture-Fabrizio-Moretti-Albert-2006.jpg"
    },
  },
  "Classical": {
    "Andrea Bocelli": {
      "events": [
        "Andrea Bocelli Tour",
      ],
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Andrea_Bocelli_20190511_017-2.jpg/1920px-Andrea_Bocelli_20190511_017-2.jpg"
    },
  },
  "Jazz/Blues": {
    "Jools Holland": {
      "events": [
        "Jools Holland",
      ],
      "image": "https://joolsholland.com/news/jools23.jpg"
    },
  }
}


function getRandom(array: any[]) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

async function main() {

  /**
   * Insert data from seed variable
   */
  for (const genre in seed) {
    const genreData = seed[genre];
    for (const artist in genreData) {
      const artistData = genreData[artist];
      const artistImage = artistData.image;
      const artistEvents = artistData.events;
      const artistGenre = await prisma.genre.upsert({
        where: {
          genre: genre
        },
        update: {},
        create: {
          genre: genre
        }
      });
      const newArtist = await prisma.artist.upsert({
        where: {
          name: artist
        },
        update: {},
        create: {
          name: artist,
          image: artistImage,
          genre: {
            connect: {
              genre: genre
            }
          }
        }
      });
      for (const event in artistEvents) {
        /**
         * Create random number of locations for each artist
         */
        for (let j = 0; j < getRandomInt(10) + 1; j++) {
          const city = getRandom(Object.keys(venues));
          const location = getRandom(venues[city]);
          const locationId = await prisma.location.upsert({
            where: {
              venue: location,
            },
            update: {},
            create: {
              venue: location,
              city: city,
              country: "United Kingdom",
              lat: 0,
              long: 0,
            }
          });

          /**
           * Create random number of events for each artist at specific location
           */
          for (let i = 0; i < getRandomInt(10) + 1; i++) {
            const date = new Date(+(new Date()) + Math.floor(Math.random() * 10000000000));
            const newEvent = await prisma.event.upsert({
              where: {
                event_identifier: {
                  name: artistEvents[event],
                  locationId: locationId.id,
                  time: date
                }
              },
              update: {},
              create: {
                name: artistEvents[event],
                locationId: locationId.id,
                time: date,
                artistId: newArtist.id,
              }
            });


            /**
             * Create random number of tickets for each event
             */
            for (let i = 0; i < getRandomInt(100) + 1; i++) {

              /* Generate random seat number */
              const seat = String.fromCharCode(65 + getRandomInt(26)) + getRandomInt(10) + getRandomInt(10);

              const ticket = await prisma.ticket.upsert({
                where: {
                  ticket_identifier: {
                    eventId: newEvent.id,
                    seat: seat
                  }
                },
                update: {},
                create: {
                  eventId: newEvent.id,
                  seat: seat,
                  price: getRandomInt(10000) + 1,
                }
              });
            }
          }


        }
      }
    }
  }

  return;

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
