import { useState, useEffect } from "react";
import "./RasaSection.css";

const events = [
  { 
    id: 1, 
    title: "Lilac Dreams", 
    rasa: "Shringara", 
    emotion: "Love & Beauty", 
    eventType: "Fashion Show", 
    description: "Competition between Fashion Societies of Delhi NCR Colleges.", 
    whyRasa: "Fashion embodies love and beauty through the celebration of aesthetics, self-expression, and the art of visual allure.", 
    date: "Day 1", 
    time: "11:00 am – 1:30 pm", 
    venue: "Main Stage", 
    shortlist: "8 Teams (including boys & girls, max 20 per team)", 
    winners: "2 Teams",
    borderColor: "rgba(187, 72, 236, 0.5)", 
    rasaColor: "rgb(209, 137, 240)" 
  },
  { 
    id: 2, 
    title: "Rangmanch", 
    rasa: "Karuna", 
    emotion: "Compassion", 
    eventType: "Solo Acting", 
    description: "Acting Competition (Solo and Duet). Step into another's emotional reality through empathy and vulnerability.", 
    whyRasa: "Solo acting channels compassion by requiring the performer to deeply inhabit another's pain, joy, and emotional truth.", 
    date: "Day 1", 
    time: "11:00 am – 1:30 pm", 
    venue: "Auditorium", 
    shortlist: "8 participants (including both boys & girls)", 
    winners: "2 Winners",
    borderColor: "#3f90f480", 
    rasaColor: "#3f90f4" 
  },
  { 
    id: 3, 
    title: "Aaghaaz", 
    rasa: "Bibhatsa", 
    emotion: "Disgust", 
    eventType: "Street Theatre", 
    description: "Nukkad Natak Competition between Dramatics Societies of Delhi NCR colleges, exposing corruption and injustice.", 
    whyRasa: "Street theatre channels disgust at social injustice into powerful performances that confront audiences with uncomfortable truths.", 
    date: "Day 1", 
    time: "11:00 am – 3:00 pm", 
    venue: "Kaveri Hostel Ground", 
    shortlist: "8 Teams (including boys & girls, max 15 per team)", 
    winners: "2 Teams",
    borderColor: "#06fe7a80", 
    rasaColor: "#06fe7a" 
  },
  { 
    id: 4, 
    title: "Slam Poetry", 
    rasa: "Bhayanaka", 
    emotion: "Fear", 
    eventType: "Open Mic", 
    description: "Open Mic Poetry Competition (Solo). True expression requires vulnerability and facing the fear of being heard.", 
    whyRasa: "Slam poetry embodies fear through the vulnerability of standing alone, bearing your soul, and facing judgment from the audience.", 
    date: "Day 1", 
    time: "2:00 pm – 4:00 pm", 
    venue: "Auditorium", 
    shortlist: "6 participants (including boys & girls)", 
    winners: "2 Winners",
    borderColor: "#652dd489", 
    rasaColor: "#7c49e4" 
  },
  { 
    id: 5, 
    title: "Antra", 
    rasa: "Adbhuta", 
    emotion: "Wonder", 
    eventType: "Group Singing", 
    description: "Group Singing Competition between Music Societies of Delhi NCR colleges. Harmony where something greater emerges.", 
    whyRasa: "Group singing evokes awe through collective resonance, unpredictability, and the sheer wonder of shared musical expression.", 
    date: "Day 1", 
    time: "2:00 pm – 4:00 pm", 
    venue: "Main Stage", 
    shortlist: "8 Teams (including boys & girls = Max limit is 12 per team)", 
    winners: "2 Teams",
    borderColor: "#55e6d0a5", 
    rasaColor: "#55e6d1" 
  },
  { 
    id: 6, 
    title: "Aalap", 
    rasa: "Shanta", 
    emotion: "Peace", 
    eventType: "Solo Singing", 
    description: "Solo Singing Competition. A solitary voice, unaccompanied and introspective, creates an atmosphere of calm.", 
    whyRasa: "Solo singing in the aalap form represents the pursuit of inner peace through meditative, unhurried musical exploration.", 
    date: "Day 2", 
    time: "11:00 am – 1:30 pm", 
    venue: "Auditorium", 
    shortlist: "8 participants (including boys & girls)", 
    winners: "2 Winners",
    borderColor: "rgba(255, 249, 206, 0.5)", 
    rasaColor: "#fff7af" 
  },
  { 
    id: 7, 
    title: "Ms. & Mr. Taarangana", 
    rasa: "Hasya", 
    emotion: "Joy & Laughter", 
    eventType: "Talent & Personality", 
    description: "Personality / Talent Competition (Solo / Pageant). Wit, spontaneity, and stage presence define this celebration.", 
    whyRasa: "This event captures joy through humor, spontaneity, and the infectious energy of performers connecting with their audience.", 
    date: "Day 2", 
    time: "11:00 am – 1:00 pm", 
    venue: "Main Stage", 
    shortlist: "10 Boys & 10 Girls", 
    winners: "2 Pairs (2 Boys & 2 Girls)",
    borderColor: "rgba(234,179,8,0.5)", 
    rasaColor: "#facc15" 
  },
  { 
    id: 8, 
    title: "Rap Battle", 
    rasa: "Raudra", 
    emotion: "Fury", 
    eventType: "Solo Rap", 
    description: "Solo Rap Competition. Channel raw intensity, confrontation, and aggressive cadence through lyrical warfare.", 
    whyRasa: "Rap battles embody fury through verbal confrontation, intense energy, and the raw power of unfiltered expression.", 
    date: "Day 2", 
    time: "1:30 pm – 3:30 pm", 
    venue: "Auditorium", 
    shortlist: "8 participants (including boys & girls)", 
    winners: "2 Winners",
    borderColor: "rgba(239,68,68,0.5)", 
    rasaColor: "#f87171" 
  },
  { 
    id: 9, 
    title: "Urban Thump", 
    rasa: "Veera", 
    emotion: "Heroic Energy", 
    eventType: "Group Dance", 
    description: "Competition between Dance Societies of Delhi NCR Colleges. High-impact choreography demanding strength and stamina.", 
    whyRasa: "Group dance embodies heroic energy through synchronized power, physical prowess, and the courage to command the stage.", 
    date: "Day 2", 
    time: "1:30 pm – 4:00 pm", 
    venue: "Main Stage", 
    shortlist: "8 Teams (including boys & girls, max 20 per team)", 
    winners: "2 Teams",
    borderColor: "rgba(22, 181, 249, 0.5)", 
    rasaColor: "rgb(22, 181, 249)" 
  },
];

export default function RasaComponent() {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  return (
    <div className="rasa-container">
      <div className="rasa-header">
        <h1 className="rasa-title">The Nine <span>Rasas</span></h1>
        <p className="rasa-subtitle">Each event embodies one of the nine classical emotions — discover the essence that resonates with your soul</p>
      </div>

      <div className="rasa-grid">
        {events.map((e) => (
          <button
            key={e.id}
            className="rasa-card"
            style={{ "--card-border": e.borderColor, "--rasa-color": e.rasaColor }}
            onClick={() => setSelected(e)}
          >
            <h3 className="rasa-card-title">{e.title}</h3>
            <p className="rasa-card-rasa">{e.rasa} · {e.emotion}</p>
            <p className="rasa-card-desc">{e.eventType} – {e.description}</p>
            <div className="rasa-card-meta">
              <span>{e.date} | {e.time}</span>
              <span>{e.venue}</span>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <div className="rasa-overlay" onClick={() => setSelected(null)}>
          <div className="rasa-dialog" onClick={(ev) => ev.stopPropagation()} style={{ "--rasa-color": selected.rasaColor }}>
            <button className="rasa-dialog-close" onClick={() => setSelected(null)}>✕</button>
            <div className="rasa-dialog-body">
              <h2 className="rasa-dialog-title">{selected.title}</h2>
              <p className="rasa-dialog-rasa">{selected.rasa} · {selected.emotion}</p>
              <div className="rasa-dialog-meta">
                <span>🗓 {selected.date} &nbsp;|&nbsp; ⏰ {selected.time}</span>
                <span>📍 {selected.venue}</span>
              </div>
              <p className="rasa-dialog-desc">{selected.eventType} – {selected.description}</p>
              
              <div className="rasa-extra-info" style={{ margin: "12px 0", fontSize: "0.9rem", opacity: 0.9 }}>
                <p><strong>Shortlist:</strong> {selected.shortlist}</p>
                <p><strong>Winners:</strong> {selected.winners}</p>
              </div>

              <div className="rasa-why-box">
                <p className="rasa-why-title">Why {selected.rasa}?</p>
                <p className="rasa-why-text">{selected.whyRasa}</p>
              </div>
              <button className="rasa-register-btn">Coming Soon</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}