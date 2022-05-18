import logo from './headshot-crop.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import Job from './class/Job';

const jobs = [
  {
    title: 'Software Engineer Intern',
    description: [],
    company: 'PlayStation - Sony',
    location: 'San Francisco, CA',
    date: 'May 2022 - Augest 2022',
    image: './imgs/sonylogo.jpg',
    border: {
      backgroundImage: './imgs/playstation-border.png',
    }
  },
  {
    title: 'Founder & Software Developer',
    description: [
      'Created & developed a user-generated live streaming platform (SeasonCast app & SeasonCast.com)',
      'Used by 300,000+ monthly users & 6,000+ high school/youth teams in the US',
      'Full-stack software development: mobile application, dynamic web application, and (public & private) API',
      'Developed internal systems: server transcoding, graphics rendering, payment notification webhooks, clustering, and auto-failover management',
      'Soft skills: Customer communication/budgeting/management/marketing skills',
      'Built systems for scalability, high availability, & redundancy',
      'Learned the skills needed to run a profitable startup software company',
      'Used: Swift, JS, Obj-C, C++, Java, SQL, No SQL, Vue.js, GCP',
    ],
    company: 'SeasonCast',
    location: 'Iowa, US',
    date: 'June 2018 - Present',
    image: './imgs/seasoncastLogo.svg',
    imageStyle: {
      padding: '1em',
      backgroundColor: '#fff',
    },
    links: [
      {
        text: 'SeasonCast.com Website',
        url: 'https://seasoncast.com/',
  },
  {
    text: 'SeasonCast App Store Page',
    url: 'https://apps.apple.com/us/app/gametime-broadcast/id1392642543?mt=8',
  },
],
  },
  {

    title: 'Software Engineer Intern',
    description: [
      'Developed new features and maintained HyVee’s online grocery web & mobile e-commerce platform.',
      'An application that customers for Hy-Vee’s 245+ grocery retail locations can use to order groceries online to be picked up or delivered.',
      'Focused mainly on the product detail page and product search results optimizations.',
      'Used: React, Node.js, GraphQL, TypeScript, API development, Full Stack, TDD, Elastic Search, Peer Programming, Scrum Sprints, GCP, Jest, Kubernetes, iOS Development, Cypress',
    ],
    company: 'Hy-Vee',
    location: 'Des Moines, IA',
    date: 'May 2021 - August 2021',
    image: './imgs/hyveeLogo.png',
    links: [
      {
        text: 'Hy-Vee Aisle Online',
        url: 'https://www.hy-vee.com/aisles-online',
      },
    ]
  },
  {
    title: 'Associate Software Developer',
    description: [
      'Individually created the NFC encoding process and developed the shared library that is used to read, service, and securely program the Polaris NFC emblem.',
      'The library is used by internal, retail, and consumer mobile apps.',
      'The NFC tag is located on all 2022 Polaris snowmobiles, RZR (UTV), and ATV product lines.',
      'Used: C#, .Net Core, Android & iOS SDK in C#, Daily scrum, Dev Ops, CI/CD',
    ],
    company: 'Polaris',
    location: 'Medina, MN',
    date: 'August 2020 - December 2020',
    image: './imgs/polarisLogo.jpeg',
    links: [
      {
        text: 'Polaris NFC Information',
        url: 'https://atv.polaris.com/en-us/self-help/article/KA-03414/',
      },
    ],
  },
  {
    title: 'D&IS Software Developer Intern',
    description: [
      'Developed new features & maintained the internal “Vehicle Inspection Application” used in Polaris manufacturing plants worldwide (mobile app, backend API, shared library).',
      'The app is used to track manufacturing progress, report vehicle issues, and inspection of vehicle parts.',
      'Focused on manufacturing of motorcycles, snowmobiles, and UTV vehicles',
      'Individually visited a manufacturing plant to learn how to improve the mobile app to make it easier to use & improve the time efficiency on manufacturing lines.',
      'Used: C#, .Net Core, ASP.Net, Xarmian, SQL, Daily scrum, Dev Ops, CI/CD',
    ],
    company: 'Polaris',
    location: 'Medina, MN',
    date: 'May 2020 - Augest 2020',
    image: './imgs/polarisLogo.jpeg',
  },
  {
    title: 'Software Developer Intern',
    company: 'Tero International Inc',
    location: 'Clive, IA',
    description: [
      'Developed a dynamic online client onboarding process, and digital quiz system.',
      'Received professional development courses in communication, selling, and marketing',
      'Used: PHP, JavaScript, MySQL',
    ],
    date: 'May 2019 - Aug 2019',
    image: './imgs/teroLogo.jpeg',
  },
      

    

];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <br />
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Maxwell Smith</h1>
        <h5>Full Stack Software Engineer</h5>
    
<span className="icons">
  <a href="https://www.linkedin.com/in/themaxsmith/" target="_blank" rel="noopener noreferrer">
    <i class="bi bi-linkedin"></i>

  </a>

  <a href="mailto:themaxsmith@icloud.com" target="_blank" rel="noopener noreferrer">
    <i class="bi-envelope-fill"></i>
  </a>

</span>
        <hr />
        <div className="jobs" class="container">
        {jobs.map(job => <Job key={job.title} job={job} />)}
    </div>
      </header>

    </div>
  );
}

export default App;
