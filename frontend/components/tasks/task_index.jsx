import React from 'react';

export class TaskIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    let currentProjectId = Number(this.props.location.pathname.match(/\d+/));
    let nextProjectId = Number(nextProps.location.pathname.match(/\d+/));
    let pathname = this.props.location.pathname.split('/')[2];
    if (currentProjectId !== nextProjectId && pathname === 'projects') {
      this.props.fetchProject(nextProjectId);
    }
  }

  componentDidMount() {
    let projectId = Number(this.props.location.pathname.match(/\d+/));
    let pathname = this.props.location.pathname.split('/')[2];
    console.log('mounting');
    if (pathname === 'projects') {
      this.props.fetchProject(projectId);
    }
  }

  render() {
    if (this.props.tasks.length > 0) {
      return (
        <div className="center-pane">
            <ul>
              {Object.values(this.props.tasks).map(task => {
                return <li key={task.id* Math.random()}>{task.title}</li>;
              })}
            </ul>
        </div>
      );
    } else {
      return null;
    }
  }
}
