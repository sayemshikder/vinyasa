import React from 'react';
import { Link, Redirect } from 'react-router-dom';

export class TeamIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchTeams();
  }


  render() {
    if (this.props.teams) {
      return (
        <div className="sidebar-section">
          <h4>My Teams</h4>
          {Object.values(this.props.teams).map(team => {
            return <li key={team.id}>
              <Link to={`/dashboard/teams/${team.id}`}>
                {team.name}
              </Link>
            </li>;
          })}
      </div>
    );
  } else {
    return null;
    }
  }
}
