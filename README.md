# Vinyasa

[Vinyasa live](https://vinyasa.herokuapp.com/)

Vinyasa is a clone of [Asana](https://asana.com/?utm_source=app.asana.com&utm_campaign=app.asana.com#close)
It is built with a Rails backend and React/Redux frontend. Authentication implemented using BCyrpt.

![vinyasa_login](https://github.com/adrianhorning08/vinyasa/blob/master/vinyasa%20login.png)
![vinyasa_main](https://github.com/adrianhorning08/vinyasa/blob/master/vinyasa%20main.png)
## Features

  * Simple todo app
  * Users can create profiles and login with secure authentication
  * Users can create teams, projects, and tasks
  * Users can view and assign themselves (or others) tasks
  * Realtime task task title update

## Implementation

### Realtime task update
One of the most difficult things to figure out was how to have the realtime task editing that Asana has.

A user should be able to edit the title of a task in either the main index container, or in the task detail that appears in the right pane, with both titles updating in realtime.

<img src="https://media.giphy.com/media/Xop0pN6zv92avT8fRM/giphy.gif" width="800" height="400" />

To solve this, I did the following: whenever a user clicks on a task, a get request is sent that updates the current task in the Redux store.
Whenever a user updates the input field, an action is dispatched to the Redux store that updates the current task in the store, but will not send an AJAX request until after the user clicks out of the input field.

```
updateField(e) {
  if (this.state.title !== e.target.value) {
    this.setState({title: e.target.value});
    this.props.updateTaskInStore(this.state);
  }
}
```

### Getting all dependencies
Another difficult thing was fetching the correct dependencies and not having duplicate data in the database.

Dependencies:
  * Teams/Projects have many Users
  * Users have many Teams/Projects

To solve the issue of not creating duplicate data in the database, I created Team Membership and Project Membership join tables, this way, I did not need to keep track of foreign keys in the Team/Project tables respectively. As an example, here is what the users model looked like:
```
has_many :team_memberships
has_many :teams,
  through: :team_memberships,
  source: :team
has_many :project_memberships
has_many :projects,
  through: :project_memberships,
  source: :project
has_many :tasks
```

To solve getting the correct dependencies I used JBuilder to extract the associations I needed.

```
json.team do
  json.extract! team, :id, :name
end

json.members do
  json.array! team.members, :id, :username
end

json.projects do
  json.array! team.projects, :id, :title
end
```

Then the data would hit my reducers, and update my Redux store appropriately.


## Ideas for Future Work

  * In the main task right pane window, users should be able to assign other users a task and set a due date
  * Users should only be able to see team specific tasks (right now they see all their tasks across all teams)
  * Users should be able to invite other people to join their team via email
