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
      "image": "data:image/jpeg;base64,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"
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
      "image": "data:image/jpeg;base64,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"
    },
  },
  "Jazz/Blues": {
    "Jools Holland": {
      "events": [
        "Jools Holland",
      ],
      "image": "data:image/jpeg;base64,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"
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
