import "./App.css";
import p1 from "./p1.png";
import p2 from "./p2.png";
import w1 from "./w1.png";
import w2 from "./w2.png";
import w3 from "./w3.png";
import c1 from "./c1.png";
import { useEffect, useState } from "react";
import { House, Person, Telephone, Facebook, Instagram, Twitter, Youtube } from "react-bootstrap-icons";
import emailjs from "emailjs-com";

function Home() {
  // Scroll animations
  useEffect(() => {
    const elements = document.querySelectorAll(".work-card, .animate, .footer-animate");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("show");
        });
      },
      { threshold: 0.3 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

 const downloadCV = () => {
  window.open("https://sauldesign.onrender.com/download-cv", "_blank");
};
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  // Form submit using EmailJS
  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
    };

    emailjs
      .send(
        "service_c68ut4m",    
        "template_mkzq1fw",  
        templateParams,
        "KBD5Ko6Aao0P-HuYp"     
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setSuccess("Message sent successfully!");
          setName(""); setEmail(""); setMessage("");
        },
        (err) => {
          console.error("FAILED...", err);
          setSuccess("❌ Message failed. Try again later.");
        }
      );
  };

  return (
    <div>
      {/* HERO */}
      <section className="hero-section d-flex align-items-center">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-white">
              <h1 className="hero-title">
                CREATIVE UI <br /> <span>DESIGNER</span>
              </h1>
              <div className="mt-4 d-flex gap-3">
                <button className="btn btn-hire">Hire me</button>
                <button className="btn btn-cv" onClick={downloadCV}>Download CV</button>
              </div>
            </div>
            <div className="col-md-6 text-end">
              <img src={p1} alt="Designer" className="img-fluid hero-img" />
            </div>
          </div>
        </div>
        <div className="scroll-down">↓</div>
      </section>

      {/* ABOUT */}
      <section id="about" className="text-light py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 about-left">
              <h1 className="fw-bold about-text">
                About <span className="text-info">me</span>
              </h1>
              <p className="mt-4 about-subtitle">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
              </p>
            </div>
            <div className="col-lg-4 mt-auto about-right">
              <img src={p2} alt="About" className="img-fluid" />
            </div>
          </div>
        </div>
      </section>

      {/* WORKS */}
      <section className="works-section text-light py-5">
        <div className="container py-5">
          <h2 className="fw-bold mb-4">
            My recent <span className="text-info">works</span>
          </h2>
          <div className="row g-4">
            <div className="col-md-4"><div className="work-card"><img src={w1} alt="Work 1" className="img-fluid" /></div></div>
            <div className="col-md-4"><div className="work-card delay-1"><img src={w2} alt="Work 2" className="img-fluid" /></div></div>
            <div className="col-md-4"><div className="work-card delay-2"><img src={w3} alt="Work 3" className="img-fluid" /></div></div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-section text-light py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 animate">
              <h1 className="fw-bold">Got a project in <br /><span className="text-info">mind?</span></h1>
              <img src={c1} alt="Contact" className="img-fluid mt-4" />
            </div>
            <div className="col-lg-6 animate">
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col">
                    <input className="form-control custom-input" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>
                  <div className="col">
                    <input type="email" className="form-control custom-input" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                </div>
                <textarea rows="5" className="form-control custom-input mb-3" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} required />
                <button type="submit" className="btn btn-send">Send Message ✈</button>
                {success && <p className="mt-3 text-info">{success}</p>}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer-section text-light py-5">
        <div className="container">
          <div className="d-flex justify-content-center gap-5 mb-4 footer-animate">
            <a href="#Home" className="footer-link"><House /> Home</a>
            <a href="#about" className="footer-link"><Person /> About me</a>
            <a href="#contact" className="footer-link"><Telephone /> Contact</a>
          </div>
          <div className="d-flex justify-content-center gap-3 mb-4 footer-animate delay-1">
             <a href="https://www.facebook.com/share/1ZauB6jaSx/" className=" social-icon"> <Facebook /></a>
            <span className="social-icon"><Instagram /></span>
            <span className="social-icon"><Twitter /></span>
            <span className="social-icon"><Youtube /></span>
          </div>
          <div className="d-flex justify-content-between footer-bottom footer-animate delay-2">
            <p className="mb-0 small">© 2025 Tulsi Gohil</p>
            <p className="mb-0 small">Terms of Service · Privacy Policy</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
