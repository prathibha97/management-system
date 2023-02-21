import { v4 as uuidv4 } from 'uuid';

const mockData = [
  {
    id: uuidv4(),
    title: ' 📃 To do',
    tasks: [
      {
        id: uuidv4(),
        title: 'Implement authentication feature',
        description: 'Add authentication to our app using Firebase',
        status: 'todo',
        assignee: 'John Doe',
      },
      {
        id: uuidv4(),
        title: 'Create landing page design',
        description: 'Design a landing page for our website',
        status: 'todo',
        assignee: 'Jane Smith',
      },
      {
        id: uuidv4(),
        title: 'Fix bug on checkout page',
        description: 'Checkout button is not working on mobile devices',
        status: 'todo',
        assignee: 'John Doe',
      },
    ],
  },
  {
    id: uuidv4(),
    title: ' ✏️ In progress',
    tasks: [
      {
        id: uuidv4(),
        title: 'Write documentation for API',
        description: 'Create a comprehensive guide for developers',
        status: 'inProgress',
        assignee: 'Jane Smith',
      },
      {
        id: uuidv4(),
        title: 'Improve performance of search feature',
        description: 'Optimize search algorithm and improve UI responsiveness',
        status: 'inProgress',
        assignee: 'John Doe',
      },
    ],
  },
  {
    id: uuidv4(),
    title: ' ✔️ Completed',
    tasks: [
      {
        id: uuidv4(),
        title: 'Run performance tests',
        description: 'Test the app under heavy load and optimize it',
        status: 'Completed',
        assignee: 'Jane Smith',
      },
    ],
  },
];

export default mockData;
