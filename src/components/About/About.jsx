import Footer from '../Footer/Footer.jsx';
import './About.css';
import desk from '../../assets/desk/desk.png';
import Dev from '../../assets/Dev/Dev.png';

export default function About() {
  return (
    <>
      <div className="about-page">
        <div className="about-content">
          <div className="about-text">
            <p>
              I created this app to practice the knowledge I learned through Codecademy and to better understand how to work with a database.
            </p>
            <p>
              This project was built using the following technologies:
            </p>
            <ul>
              <li>React</li>
              <li>Vite</li>
              <li>CSS</li>
              <li>Bootstrap <small>(only for icons)</small></li>
              <li>MySQL</li>
              <li>Express</li>
              <li>Node.js</li>
              <li>Jest</li>
              <li>Babel</li>
              <li>Git</li>
              <li>GitHub Pages</li>
            </ul>
          </div>

          {/* Contenedor de imágenes para la media query */}
          <div className="about-images">
            <a
              href="https://github.com/Daniel01101000"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={Dev} alt="dev" className="dev" />
            </a>
            <img src={desk} alt="desk" className="desk" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}