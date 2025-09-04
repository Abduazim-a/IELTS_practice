// Mock data for development - this would normally come from Firestore

export const adminNumbers = ['+998777771968', '+998910122461'];

export const mockUsers = [
  {
    phoneNumber: '+998777771968',
    name: 'Admin',
    surname: 'User',
    isAdmin: true,
    deviceCount: 1,
    createdAt: new Date('2024-01-01')
  },
  {
    phoneNumber: '+998910122461',
    name: 'Admin',
    surname: 'Two',
    isAdmin: true,
    deviceCount: 1,
    createdAt: new Date('2024-01-01')
  },
  {
    phoneNumber: '+998771234567',
    name: 'John',
    surname: 'Doe',
    isAdmin: false,
    deviceCount: 1,
    createdAt: new Date('2024-01-02')
  }
];

export const mockTests = [
  {
    id: 'listening-1',
    section: 'listening',
    title: 'Listening Test 1',
    duration: 1800,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        audio: '/audio/listening-1-q1.mp3',
        question: 'What is the main topic of the conversation?',
        options: [
          'Planning a vacation',
          'Discussing work schedules',
          'Talking about the weather',
          'Making dinner plans'
        ],
        correctAnswer: 'Planning a vacation'
      }
    ]
  },
  {
    id: 'reading-1',
    section: 'reading',
    title: 'Reading Test 1',
    duration: 1800,
    passages: [
      {
        id: 1,
        title: 'The Future of Technology',
        text: 'Technology continues to evolve at an unprecedented pace...',
        questions: [
          {
            id: 1,
            type: 'multiple-choice',
            question: 'According to the passage, what is the main driver of technological advancement?',
            options: [
              'Government funding',
              'Consumer demand',
              'Scientific research',
              'Corporate competition'
            ],
            correctAnswer: 'Consumer demand'
          }
        ]
      }
    ]
  },
  {
    id: 'writing-1',
    section: 'writing',
    title: 'Writing Test 1',
    duration: 3600,
    tasks: [
      {
        id: 1,
        type: 'task1',
        prompt: 'The chart below shows the percentage of households with different types of technology from 1995 to 2015. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.',
        imageUrl: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg',
        wordLimit: 150
      },
      {
        id: 2,
        type: 'task2',
        prompt: 'Some people believe that technology has made our lives more complex, while others think it has simplified our daily routines. Discuss both views and give your own opinion.',
        wordLimit: 250
      }
    ]
  }
];