import { useState, useEffect } from "react";
import { resumeData } from "./data/resume";
import "./App.css";

// Components
import LoadingScreen from "./components/LoadingScreen";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import About from "./components/About";
import Journey from "./components/Journey";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Achievements from "./components/Achievements";
import AskMe from "./components/AskMe";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CursorTrail from "./components/CursorTrail";
import ThemeProvider from "./context/ThemeContext";

function AppContent() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate ETL pipeline loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="app">
      <CursorTrail />
      <Header />
      <main>
        <HeroSection data={resumeData} />
        <About data={resumeData} />
        <Journey data={resumeData} />
        <Projects data={resumeData} />
        <Skills data={resumeData} />
        {/* <Achievements data={resumeData} /> */}
        <AskMe />
        <Contact data={resumeData} />
        <Footer data={resumeData} />
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
