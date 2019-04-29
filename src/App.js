import React from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import './App.css';

const particleOptions = {
  "particles": {
    "number": {
      "value": 70,
      "density": {
         "enable": true,
        }
      },
      "size": {
        "value": 10,
        "random": true
      },
      "move": {
        "direction": "bottom",
        "out_mode": "out"
      },
      "line_linked": {
        "enable": false
        }
      },
      "interactivity": {
        "events": {
           "onclick": {
             "enable": true,
              "mode": "remove"
            }
          },
          "modes": {
            "remove": {
                "particles_nb": 10
              }
          }
      }
}

function App() {
  return (
    <div className="App">
      <Particles className='particles'
        params={particleOptions} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
    </div>
  );
}

export default App;
