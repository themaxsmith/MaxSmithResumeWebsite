import logo from './imgs/profile3.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import Job from './class/Job';
import jobs from './jobs';
import { motion } from "framer-motion"
import cloud from "./imgs/cloud.svg"
function App() {
  return (
    <div className="App">
      <header className="App-header">

        <div class="aboutMe">
        <motion.div
                style={{
                    position: "absolute",
                    zIndex: 1,
                    left: "-10em",
                    width: "10em",
                    height: "10em",
                    // use cloud.svg as a background image
                    backgroundImage: `url(${cloud})`,
                    // fit image
                    backgroundRepeat: "no-repeat",

                    backgroundSize: "contain",
                }}

                animate={{ left: "110%" }}
                transition={{ ease: "linear", duration: 18, repeat: Infinity }}
            ></motion.div>
                  <motion.div
                style={{
                    position: "absolute",
                    zIndex: 1,
                    left: "-15em",
                    width: "15em",
                    top: "10%",
                    
                    height: "10em",
                    // use cloud.svg as a background image
                    backgroundImage: `url(${cloud})`,
                    // fit image
                    backgroundRepeat: "no-repeat",

                    backgroundSize: "contain",
                }}
                
                animate={{ left: "110%" }}
                transition={{ ease: "linear", duration: 25, repeat: Infinity }}
            ></motion.div>

<motion.div
                style={{
                    position: "absolute",
                    zIndex: 1,
                    left: "-20em",
                    width: "20em",
                    top: "5%",
                    height: "5em",
                    // use cloud.svg as a background image
                    backgroundImage: `url(${cloud})`,
                    // fit image
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                }}
                animate={{ left: "110%" }}
                transition={{ ease: "linear", duration: 35, repeat: Infinity }}
            ></motion.div>
                   <motion.div
                style={{
                    position: "absolute",
                    zIndex: 1,
                    left: "-13em",
                    width: "13em",
                    top: "7%",
                    height: "8em",
                    // use cloud.svg as a background image
                    backgroundImage: `url(${cloud})`,
                    // fit image
                    backgroundRepeat: "no-repeat",

                    backgroundSize: "contain",
                }}
                animate={{ left: "110%" }}
                transition={{ ease: "linear", duration: 40, repeat: Infinity }}
            ></motion.div>
        <br />
        <div class="billboard">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 class="name">Maxwell Smith</h1>
        <h5>Full Stack Software Engineer</h5>
        <h5>Des Moines, IA | San Francisco, CA</h5>
        <br />
        </div>
<div class="grass"></div>
<div class="dirt">
<span className="icons">
  <a href="https://www.linkedin.com/in/themaxsmith/" target="_blank" rel="noopener noreferrer">
    <i class="bi bi-linkedin"></i>

  </a>

  <a href="mailto:themaxsmith@icloud.com" target="_blank" rel="noopener noreferrer">
    <i class="bi-envelope-fill"></i>
  </a>

  {/* github */}
  <a href="https://github.com/themaxsmith" target="_blank" rel="noopener noreferrer">
    <i class="bi-github"></i>
  </a>

</span>
</div>
    </div>
        <hr />
        <div className="jobs" class="container">
        {jobs.map(job => <Job key={job.title} job={job} />)}
    </div>

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
