import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Shield, Users } from "lucide-react";
import blueskyLogo from "@/assets/bluesky-navbar.png";
import familyImg from "@/assets/img/family-img.jpg";
import aetnaLogo from "@/assets/img/aetna.svg";
import cignaLogo from "@/assets/img/cigna.svg";
import humanaLogo from "@/assets/img/humana.svg";
import uhcLogo from "@/assets/img/united-healthcare.svg";
import wellcareLogo from "@/assets/img/wellcare.svg";
import card1 from "@/assets/img/card-1.jpg";
import card2 from "@/assets/img/card-2.jpg";
import card3 from "@/assets/img/card-3.jpg";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header/Navbar */}
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <img 
            src={blueskyLogo} 
            alt="BlueSky Life" 
            className="h-12 md:h-16"
            data-testid="img-logo"
          />
          <nav className="hidden md:flex gap-6">
            <Button variant="ghost" data-testid="button-home">Home</Button>
            <Button variant="ghost" data-testid="button-about">About</Button>
            <Button variant="ghost" data-testid="button-contact">Contact</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[hsl(var(--gradient-navy-start))] to-[hsl(var(--gradient-navy-end))] text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" data-testid="text-hero-title">
                Embark on Your Health Coverage Journey
              </h1>
              <p className="text-xl md:text-2xl text-white/90" data-testid="text-hero-subtitle">
                Start Achieving Comprehensive Protection Now
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-[hsl(var(--bluesky-primary))] hover:bg-[hsl(var(--bluesky-primary))] text-white border-2 border-[hsl(var(--bluesky-primary))]"
                  data-testid="button-get-started"
                >
                  Get Started
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10"
                  data-testid="button-learn-more"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src={familyImg} 
                alt="Happy family" 
                className="rounded-lg shadow-xl"
                data-testid="img-hero"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Carriers Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <img src={aetnaLogo} alt="Aetna" className="h-8 md:h-12 opacity-70 hover:opacity-100 transition-opacity" data-testid="img-carrier-aetna" />
            <img src={cignaLogo} alt="Cigna" className="h-8 md:h-12 opacity-70 hover:opacity-100 transition-opacity" data-testid="img-carrier-cigna" />
            <img src={humanaLogo} alt="Humana" className="h-8 md:h-12 opacity-70 hover:opacity-100 transition-opacity" data-testid="img-carrier-humana" />
            <img src={uhcLogo} alt="UnitedHealthcare" className="h-8 md:h-12 opacity-70 hover:opacity-100 transition-opacity" data-testid="img-carrier-uhc" />
            <img src={wellcareLogo} alt="Wellcare" className="h-8 md:h-12 opacity-70 hover:opacity-100 transition-opacity" data-testid="img-carrier-wellcare" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold" data-testid="text-services-title">
              Maximize Your Coverage with a BlueSky Life Agent
            </h2>
            <div className="text-lg text-muted-foreground space-y-4">
              <p data-testid="text-services-intro">
                BlueSky Life is committed to enhancing your health and security through personalized insurance solutions. Leveraging our in-depth healthcare expertise, we offer bespoke coverage options designed to align perfectly with your individual requirements.
              </p>
              <p className="font-semibold text-foreground" data-testid="text-services-header">
                Our services include:
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-12 text-left">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[hsl(var(--bluesky-primary))] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-2" data-testid="text-service-plan-title">Plan Options</h3>
                    <p className="text-muted-foreground" data-testid="text-service-plan-desc">
                      Recognizing the diverse nature of health insurance needs, we work closely with you to present a variety of plans from leading insurance providers, customized to fit your budget and healthcare priorities.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-[hsl(var(--bluesky-primary))] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-2" data-testid="text-service-guidance-title">Expert Guidance</h3>
                    <p className="text-muted-foreground" data-testid="text-service-guidance-desc">
                      Navigating the complexities of health insurance can be daunting. Our experienced brokers are here to provide you with expert advice, answer your questions, and help you make informed decisions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-[hsl(var(--bluesky-primary))] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-2" data-testid="text-service-support-title">Ongoing Support</h3>
                    <p className="text-muted-foreground" data-testid="text-service-support-desc">
                      Our commitment to your well-being extends beyond the selection of your plan. We offer ongoing support to address any concerns or changes in your healthcare needs, ensuring you experience peace of mind throughout your coverage.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover-elevate" data-testid="card-feature-1">
              <img 
                src={card1} 
                alt="Comprehensive information" 
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <p className="text-muted-foreground" data-testid="text-card-1">
                  Our licensed agents provide comprehensive information on all available plan options in your area, streamlining the selection process for you.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover-elevate" data-testid="card-feature-2">
              <img 
                src={card2} 
                alt="Enrollment guidance" 
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <p className="text-muted-foreground" data-testid="text-card-2">
                  Once you've selected the right plan, your licensed agent will guide you through the enrollment process, providing clear and comprehensive assistance at each step.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover-elevate" data-testid="card-feature-3">
              <img 
                src={card3} 
                alt="Dedicated support" 
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <p className="text-muted-foreground" data-testid="text-card-3">
                  Welcome to BlueSky Life, where our team of devoted experts is ready to support you and your family, ensuring assistance and confidence both now and in the future.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Careers CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[hsl(var(--gradient-navy-start))] to-[hsl(var(--gradient-navy-end))] text-white">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold" data-testid="text-careers-title">
            Want to Take Your Career to the Next Level?<br />
            Partner with Us for Growth and Success!
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto" data-testid="text-careers-desc">
            We are seeking enthusiastic individuals to join our team.
          </p>
          <p className="text-lg text-white/80" data-testid="text-careers-cta">
            Click the button below to explore how you can join our team.
          </p>
          <Button 
            size="lg"
            className="bg-[hsl(var(--bluesky-primary))] hover:bg-[hsl(var(--bluesky-primary))] text-white border-2 border-[hsl(var(--bluesky-primary))]"
            data-testid="button-join-team"
          >
            Join Our Growing Team of Professionals
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground" data-testid="text-copyright">
              © 2024 BlueSky Life. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground" data-testid="link-privacy">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground" data-testid="link-terms">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
