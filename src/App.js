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
    // border: {
    //   backgroundImage: './imgs/playstation-border.png',
    // }
  },
  {
    title: 'Founder & Software Developer',
    description: [

      'Developed a successful live streaming platform (iOS, Android, & web) that was used by 300,000+ monthly users & 6,000+ high school/youth teams yearly',
      'Created a profitable business model: each team paid a yearly subscription of $45 per year + 20% profit sharing on PPV revenue from viewers.',
      '4.7/5 stars with 2,600+ reviews on the Apple App Store.',
      'Full-stack software development: mobile application (Swift & Java), web application (Vue.js), and API (Node.js). Design & developed 100% of all 7 codebases for SeasonCast',
      'Soft skills: customer support, managing budgets, marketing skills, accounting',
      'Developed internal systems: server transcoding, graphics rendering, payment notification webhooks, clustering, admin systems, and auto-failover management',
      'Built systems for scalability, reliability, & redundancy. 99.995% global uptime for 3+ years - less than 26 mins yearly (status.seasoncast.com). 13+ VM instances self-managed.',
      'Using cutting edge live streaming technology: SRT, Dash, P2P CDN, mobile graphics, WebRTC',
      'Awarded 1st place for best student-owned business at Iowa State University in 2021',
      'Used: Swift (iOS/MacOS), JavaScript (Node.js), Vue.js, Obj-C, C++ (Custom Media Server), Java (Android), SQL (user management), No SQL (game scoring stats), Jest, Nginx, AWS (S3, lambda), GCP (compute, firestore, firebase), Python (push notifications), Apple IAP & Stripe (payment processing), streaming protocols (SRT, RTMP, WebRTC, HLS, DASH), P2P streaming, CDN video distribution'

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
    links: [
      {
        text: 'Tero Cards (Developed by Me)',
        url: 'https://www.tero.com/cards',
      }
    ]
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

    {/* footer saying Created in React by Maxwell Smith */}
    <div class="footer">
      <small>Website Created by Maxwell Smith</small><br />
      {/* view on github (icon) */}
      Source Code on <a style={{color: 'grey'}} href="https://github.com/themaxsmith/MaxSmithResumeWebsite" target="_blank" rel="noopener noreferrer">
        <i class="bi bi-github"></i>
      </a>
    </div>

   
            
      </header>

    </div>
  );
}

export default App;
