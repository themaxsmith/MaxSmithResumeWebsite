// react component for a job held by a company
import React from 'react';

class Job extends React.Component {
  render() {
    return (
      <div class="job">
        <div class="row">
            <div class="col-md-2 col-12">
                {/* <img src={this.props.job.image} style={this.props.job.imageStyle} class="img-company" alt="logo" /> */}
            </div>
            <div class="d-block d-md-none col-12 location">
                <span>{this.props.job.location}<br/>
                {this.props.job.date}</span>
                <br />
                <br />

            </div>
            <div class="col-md-8 col-12">
                <h3 class="jobTitle">{this.props.job.title} at {this.props.job.company}</h3>
                {/* props.job.description list as bullet points */}
                <ul class="description">
                    {this.props.job.description.map(item => <li>{item}</li>)}
                </ul>
                {/* links list mapped as grid boxes */}
                {this.props.job.links ? (
                <div class="links">
                                    <h5>Related Links</h5>

                    {this.props.job.links.map(link => <a href={link.url} target="_blank" rel="noopener noreferrer">{link.text}</a>)}

                </div>
                ) : null}
            </div>
            <div class="col-md-2 d-none d-md-block location">
                <span>{this.props.job.location}<br/>
                {this.props.job.date}</span>
            </div>
            </div>
            <br />
        {/* border */} 
        { this.props.job.border ? <div style={{backgroundImage: 'url(' + this.props.job.border.backgroundImage + ')'}} class="borderJob"></div> : null }
      </div>
    );
  }
}

export default Job;