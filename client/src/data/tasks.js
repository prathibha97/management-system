export const data = {
  columns: {
    column1: {
      id: 'column1',
      title: 'To do',
      cardIds: ['card1', 'card2', 'card3', 'card4'],
    },
    column2: {
      id: 'column2',
      title: 'In progress',
      cardIds: ['card5', 'card6'],
    },
    column3: {
      id: 'column3',
      title: 'Done',
      cardIds: ['card7', 'card8', 'card9'],
    },
  },
  cards: {
    card1: {
      id: 'card1',
      title: 'Implement authentication feature',
      description: 'Add authentication to our app using Firebase',
      status: 'todo',
      assignee: 'John Doe',
    },
    card2: {
      id: 'card2',
      title: 'Create landing page design',
      description: 'Design a landing page for our website',
      status: 'todo',
      assignee: 'Jane Smith',
    },
    card3: {
      id: 'card3',
      title: 'Fix bug on checkout page',
      description: 'Checkout button is not working on mobile devices',
      status: 'todo',
      assignee: 'John Doe',
    },
    card4: {
      id: 'card4',
      title: 'Add payment options',
      description: 'Allow customers to pay with credit card or PayPal',
      status: 'todo',
      assignee: 'Jane Smith',
    },
    card5: {
      id: 'card5',
      title: 'Improve performance of search feature',
      description: 'Optimize search algorithm and improve UI responsiveness',
      status: 'inProgress',
      assignee: 'John Doe',
    },
    card6: {
      id: 'card6',
      title: 'Write documentation for API',
      description: 'Create a comprehensive guide for developers',
      status: 'inProgress',
      assignee: 'Jane Smith',
    },
    card7: {
      id: 'card7',
      title: 'Deploy app to production',
      description: 'Set up production environment and deploy the app',
      status: 'done',
      assignee: 'John Doe',
    },
    card8: {
      id: 'card8',
      title: 'Run performance tests',
      description: 'Test the app under heavy load and optimize it',
      status: 'done',
      assignee: 'Jane Smith',
    },
    card9: {
      id: 'card9',
      title: 'Fix typos and grammar errors',
      description: 'Go through the entire app and fix any mistakes',
      status: 'done',
      assignee: 'John Doe',
    },
  },
};
