
import { useState } from "react";
import LandingPage from "./landing/LandingPage";
import LoginForm from "./auth/LoginForm";
import RegistrationForm from "./auth/RegistrationForm";
import HomePage from "./home/HomePage";

const Index = () => {
  const [currentView, setCurrentView] = useState<"landing" | "login" | "register" | "home">("landing");
  const [userEmail, setUserEmail] = useState<string>("");

  const handleLoginClick = () => {
    setCurrentView("login");
  };

  const handleEmailSubmit = (email: string) => {
    setUserEmail(email);
    setCurrentView("register");
  };

  const handleLogin = () => {
    setCurrentView("home");
  };

  const handleRegistrationComplete = () => {
    setCurrentView("home");
  };

  const handleBackToLanding = () => {
    setCurrentView("landing");
  };

  switch (currentView) {
    case "login":
      return <LoginForm onLogin={handleLogin} onBackToLanding={handleBackToLanding} />;
    case "register":
      return <RegistrationForm email={userEmail} onRegistrationComplete={handleRegistrationComplete} onBackToLanding={handleBackToLanding} />;
    case "home":
      return <HomePage />;
    default:
      return <LandingPage onLoginClick={handleLoginClick} onEmailSubmit={handleEmailSubmit} />;
  }
};

export default Index;
