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


               {/* for 1-10 create motion div with random duration width, height, and top */}
               {[...Array(30)].map((x, i) => {
                 const randomDuration = Math.floor(Math.random() * (120 - 40 + 1)) + 40;
                 const randomWidth = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
                 const randomHeight = Math.floor(Math.random() * (12 - 1 + 1)) + 1;
                  const randomTop = Math.floor(Math.random() * (30 )) ;
                  return (
                    <motion.div
                      key={i}
                      style={{
                        position: "absolute",
                        zIndex: 1,
                        left:`-${randomWidth+5}em`,
                        width: `${randomWidth}em`,
                        height: `${randomHeight}em`,
                        top: `${randomTop}%`,
                        // use cloud.svg as a background image
                        backgroundImage: `url(${cloud})`,
                        // fit image
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "contain",
                      }}
                      animate={{ left: "110%" }}
                     
                      transition={{ ease: "linear", duration: randomDuration, repeat: Infinity
                    , delay: i * 4 }}
                    ></motion.div>
                  );
                })}
               
               {[...Array(8)].map((x, i) => {
                 const randomDuration = Math.floor(Math.random() * (120 - 40 + 1)) + 40;
                 const randomWidth = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
                 const randomHeight = Math.floor(Math.random() * (12 - 1 )) + 1;
                  const randomTop = Math.floor(Math.random() * (25 )) ;
                  const randomLeft = Math.floor(Math.random() * (100 )) ;
                const calculateDurationRatio = ((100-randomLeft) / 100 * randomDuration);
                  return (
                    <motion.div
                      key={i}
                      style={{
                        position: "absolute",
                        zIndex: 1,
                        left:`${randomLeft}%`,
                        width: `${randomWidth}em`,
                        height: `${randomHeight}em`,
                        top: `${randomTop}%`,
                        // use cloud.svg as a background image
                        backgroundImage: `url(${cloud})`,
                        // fit image
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "contain",
                      }}
                      animate={{ left: "110%" }}
                     
                      transition={{ ease: "linear", duration: calculateDurationRatio, repeat: NaN
                    }}
                    ></motion.div>
                  );
                })}
               

        <br />
        <div class="billboard">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 class="name">Maxwell Smith</h1>
        <h5>Full Stack Software Engineer</h5>
        <h5>Des Moines, IA • San Francisco, CA</h5>
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
        <div className="jobs" class="container jobs">
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
