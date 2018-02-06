import React from 'react';
import { Link, Redirect } from 'react-router-dom';

export class ProjectIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {

  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="sidebar-secttion">
        <div className="sidebar-title">
          <h4>Projects</h4>
        </div>
        <div className="sidebar-list">
          <ul>
            {this.props.projects.map(project => {
              return <li key={project.id * Math.random()}>
                <Link to={`/dashboard/projects/${project.id}`}>
                  {project.title}
                </Link>
              </li>;
            })}
          </ul>
        </div>
      </div>
    );
  }
}