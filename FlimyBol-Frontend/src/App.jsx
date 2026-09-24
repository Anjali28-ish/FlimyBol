import { useState } from "react";
import axios from "axios";
import {
  FiFilm,
  FiGlobe,
  FiSmile,
  FiMessageSquare,
  FiCopy,
  FiZap,
} from "react-icons/fi";
import "./App.css";

function App() {
  const [sentence, setSentence] = useState("");
  const [genre, setGenre] = useState("Action");
  const [emotion, setEmotion] = useState("Angry");
  const [language, setLanguage] = useState("Hindi");
  const [dialogue, setDialogue] = useState("");
  const [loading, setLoading] = useState(false);

  const generateDialogue = async () => {
    if (!sentence.trim()) return;

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8080/api/chat", {
        sentence,
        genre,
        emotion,
        language,
      });

      setDialogue(res.data);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert("Backend not connected.");
    }

    setLoading(false);
  };

  const copyDialogue = () => {
    navigator.clipboard.writeText(dialogue);
    alert("Copied!");
  };

  return (
    <div className="app">

      <div className="blur blur1"></div>
      <div className="blur blur2"></div>

      <nav className="navbar">

        <div className="logo">
          <FiFilm />
          <span>FilmyBol AI</span>
        </div>

        <div className="badge">
          <FiZap />
          Powered by Gemini
        </div>

      </nav>

      <section className="hero">

        <h1>
          Create
          <span> Cinematic </span>
          Dialogues
        </h1>

        <p>
          Transform simple ideas into blockbuster movie dialogues with AI.
          Choose your genre, emotion and language to generate dialogues
          worthy of the big screen.
        </p>

      </section>

      <section className="card">

        <h2>
          <FiMessageSquare />
          Describe Your Scene
        </h2>

        <div className="inputWrapper">

          <textarea
            placeholder="Example: A fearless hero confronts the villain before the final battle..."
            value={sentence}
            onChange={(e) => setSentence(e.target.value)}
          />

        </div>

        <div className="selectors">

          <div className="field">

            <label>Genre</label>

            <div className="selectBox">
              <FiFilm />

              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              >
                <option>Action</option>
                <option>Comedy</option>
                <option>Romance</option>
                <option>Drama</option>
                <option>Thriller</option>
              </select>

            </div>

          </div>

          <div className="field">

            <label>Emotion</label>

            <div className="selectBox">
              <FiSmile />

              <select
                value={emotion}
                onChange={(e) => setEmotion(e.target.value)}
              >
                <option>Angry</option>
                <option>Happy</option>
                <option>Sad</option>
                <option>Fear</option>
                <option>Emotional</option>
              </select>

            </div>

          </div>

          <div className="field">

            <label>Language</label>

            <div className="selectBox">
              <FiGlobe />

              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option>Hindi</option>
                <option>English</option>
                <option>Hinglish</option>
              </select>

            </div>

          </div>

        </div>

        <button
          className="generateBtn"
          onClick={generateDialogue}
        >
          <FiZap />

          {loading
            ? "Generating..."
            : "Generate Dialogue"}
        </button>

      </section>

      {dialogue && (

        <section className="resultCard">

          <div className="resultTop">

            <h2>🎬 Generated Dialogue</h2>

            <button
              className="copyBtn"
              onClick={copyDialogue}
            >
              <FiCopy />
            </button>

          </div>

          <div className="dialogueText">
            {dialogue}
          </div>

        </section>

      )}

      <section className="features">

        <div className="feature">
          🎭
          <h3>20+ Genres</h3>
          <p>Action, Comedy, Romance and more.</p>
        </div>

        <div className="feature">
          😊
          <h3>50+ Emotions</h3>
          <p>Generate dialogues with perfect emotions.</p>
        </div>

        <div className="feature">
          🌍
          <h3>Multi Language</h3>
          <p>Hindi, English & Hinglish supported.</p>
        </div>

      </section>

    </div>
  );
}

export default App;