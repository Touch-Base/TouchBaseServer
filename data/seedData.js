const faker = require('faker')

module.exports = {

  // seeds for users
  
  users: [
    {
      // master - 1
      
      firstname: 'Master',
      lastname: 'User',
      creationDate: '08/11/1992',
      email: 'masterUser@gmail.com',
      age: 29,
      location: 'Boston, MA',
      position: 'Developer',
      jobsTotal: 69,
      connectionsTotal: 11,
      summary: 'Hey my name is Mr. Master. Welcome to my profile.'
      
    },
    {
      // master - 2
      
      firstname: 'Sam',
      lastname: 'Hynes',
      creationDate: '08/12/1996',
      email: 'samhynes@mac.com',
      age: 18,
      location: 'Lowell, MA',
      jobsTotal: 29,
      connectionsTotal: 12,
      summary: 'Hey my name is Sam, I want to web develop!'
    }
  ],
    
    // seeds for jobs
    
    jobs: [
      {
        // job - 1
        
        position: 'Web Developer',
        company: 'Arthrex',
        appDate: '12/12/2009',
        link: 'www.anthonyvigliotta.com',
        method: 'Company Site',
        notes: 'I really want to work here I hope they interview me!',
        userId: 1
      },
      {
        // job - 2
        
        position: 'Coder',
        company: 'Athena Health',
        appDate: '12/12/2229',
        link: 'www.letsgetajob.com',
        method: 'Other',
        notes: 'I love Athena! They are in Waltham, MA',
        userId: 1
      }
    ],
  
  // seeds for connections
  
   connections: [
      {
        // connection - 1
        
        firstname: 'Mikey',
        lastname: 'Jobgetter',
        title: 'CEO',
        company: 'Recroot',
        phone: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        notes: 'Great guy and great friend!!!',
        userId: 1
      },
      {
        // connection - 2
        
        firstname: 'Selena',
        lastname: 'Hawty',
        title: 'CFO',
        company: 'Worldwide World',
        phone: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        notes: 'Great connection, awesome to talk to!!!',
        userId: 1
      },
    ],
    
    // seeds for events
    
    events: [
      {
        // event - 1
        
        name: 'Worldwide Coders International',
        location: 'Chicago, IL',
        date: '08/08/2050',
        description: 'WCI first event at biggest venue on planet. Going to be incredible',
        userId: 1
      },
      {
        // event - 2
        
        name: 'Coder Convention',
        location: 'New York, NY',
        date: '01/01/1250',
        description: 'Wish I went to this.',
        userId: 1
      }
    ]
}
      
  
  
        
        
        
    
    
    
