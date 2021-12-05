import schemaAbout from '../models/modelAbout';
import schemaAuth from '../models/modelAuth';

/*
  CRUD method: Search all the categories objects in the DB and send them as an array.
*/

function servicesConfiguration() {
  const servicesConfig = {
    current_time: Math.round(new Date().getTime() / 1000),
    services: [{
      name: 'Spotify',
      widgets: [{
        name: 'Spotify search Artist',
        description: 'Search an artist and get his profile informations',
        params: [{
          name: 'Artistname',
          type: 'String'
        }]
      }, {
        name: 'Spotify search Track',
        description: "Search a track and get it's informations",
        params: [{
          name: 'Trackname',
          type: 'String'
        }]
      }, {
        name: 'Spotify Me',
        description: 'Retrieves the user profile and informations',
        params: [{
        }]
      }]
    }, {
      name: 'Github',
      widgets: [{
        name: 'GitHub search User',
        description: "Searches an user and retrieves it's profile properties",
        params: [{
          name: 'Username',
          type: 'String'
        }]
      }, {
        name: 'GitHub search Project',
        description: "Searches a project's informations",
        params: [{
          name: 'username',
          type: 'String'
        }]
      }]
    }]
  };
  return servicesConfig;
}

function getAbout(req, res) {
  var About = {
    client: {
      host: req.ip
    },
    server: servicesConfiguration()
  };
  console.log(req);
  res.status(200).json(About);
}

export default getAbout;
