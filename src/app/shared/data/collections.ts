import { Collection } from '../../services/dashboard/collection.service';

export const MOCK_COLLECTIONS: Collection[] = [
  {
    Name: 'Git',
    CreatedDate: '2024-06-28',
    IsFav: true,
    Icon: 'fa-github',
    Bookmarks: [
      {
        Name: 'GitHub',
        Url: 'https://github.com',
        IsFav: true,
        Icon: 'fa-github',
        CreatedDate: '2024-06-28',
      },
    ],
  },
  {
    Name: 'grid-horizontal',
    CreatedDate: '2024-06-27',
    IsFav: false,
    Icon: 'fa-th-large',
    Bookmarks: [
      {
        Name: 'Bootstrap',
        Url: 'https://getbootstrap.com',
        IsFav: false,
        Icon: 'fa-bootstrap',
        CreatedDate: '2024-06-27',
      },
    ],
  },
  {
    Name: 'Angular',
    CreatedDate: '2024-06-26',
    IsFav: true,
    Icon: 'fa-angular',
    Bookmarks: [
      {
        Name: 'Angular Docs',
        Url: 'https://angular.io',
        IsFav: true,
        Icon: 'fa-book',
        CreatedDate: '2024-06-26',
      },
    ],
  },
  {
    Name: 'React',
    CreatedDate: '2024-06-25',
    IsFav: false,
    Icon: 'fa-react',
    Bookmarks: [
      {
        Name: 'ReactJS',
        Url: 'https://reactjs.org',
        IsFav: false,
        Icon: 'fa-react',
        CreatedDate: '2024-06-25',
      },
    ],
  },
  {
    Name: 'Vue',
    CreatedDate: '2024-06-24',
    IsFav: false,
    Icon: 'fa-vuejs',
    Bookmarks: [
      {
        Name: 'VueJS',
        Url: 'https://vuejs.org',
        IsFav: false,
        Icon: 'fa-vuejs',
        CreatedDate: '2024-06-24',
      },
    ],
  },
  {
    Name: 'Node',
    CreatedDate: '2024-06-23',
    IsFav: true,
    Icon: 'fa-node-js',
    Bookmarks: [
      {
        Name: 'NodeJS',
        Url: 'https://nodejs.org',
        IsFav: true,
        Icon: 'fa-node-js',
        CreatedDate: '2024-06-23',
      },
    ],
  },
  {
    Name: 'Python',
    CreatedDate: '2024-06-22',
    IsFav: false,
    Icon: 'fa-python',
    Bookmarks: [
      {
        Name: 'Python',
        Url: 'https://python.org',
        IsFav: false,
        Icon: 'fa-python',
        CreatedDate: '2024-06-22',
      },
    ],
  },
  {
    Name: 'Java',
    CreatedDate: '2024-06-21',
    IsFav: false,
    Icon: 'fa-java',
    Bookmarks: [
      {
        Name: 'Java',
        Url: 'https://www.java.com',
        IsFav: false,
        Icon: 'fa-java',
        CreatedDate: '2024-06-21',
      },
    ],
  },
  {
    Name: 'AWS',
    CreatedDate: '2024-06-20',
    IsFav: true,
    Icon: 'fa-aws',
    Bookmarks: [
      {
        Name: 'AWS',
        Url: 'https://aws.amazon.com',
        IsFav: true,
        Icon: 'fa-aws',
        CreatedDate: '2024-06-20',
      },
    ],
  },
  {
    Name: 'Docker',
    CreatedDate: '2024-06-19',
    IsFav: false,
    Icon: 'fa-docker',
    Bookmarks: [
      {
        Name: 'Docker',
        Url: 'https://www.docker.com',
        IsFav: false,
        Icon: 'fa-docker',
        CreatedDate: '2024-06-19',
      },
    ],
  },
]; 