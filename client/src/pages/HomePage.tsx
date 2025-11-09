import { useState } from "react";
import logoImage from "@assets/BlueSky Life Landscape transparent bg_1762273618192.png";
import LegalModal from "@/components/LegalModal";

export default function HomePage() {
  const [legalModal, setLegalModal] = useState<"privacy" | "terms" | null>(null);

  return (
    <>
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <header className="max-w-5xl mx-auto px-6 pt-16 pb-12 text-center">
        <div className="flex justify-center mb-8">
          <img 
            src={logoImage} 
            alt="BlueSky Life" 
            className="h-16 md:h-20 w-auto"
            data-testid="img-bluesky-logo-hero"
          />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a3d7c] mb-4">
          Welcome to BlueSky Life
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 font-light">
          Helping Everyday Americans Plan with Confidence
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 pb-16">
        {/* Introduction */}
        <section className="mb-16">
          <p className="text-lg md:text-xl text-gray-800 leading-relaxed mb-6">
            At BlueSky Life, we understand that peace of mind comes from having a plan in place. One that reflects your values, honors your family, and prepares you for the future.
          </p>
          
          <p className="text-lg md:text-xl text-gray-800 leading-relaxed mb-6">
            Our mission is simple: to make it easier for individuals and families to explore important planning options with clarity, convenience, and confidence. Whether you're preparing for the years ahead or just getting started, we're here to help guide the way.
          </p>
          
          <p className="text-lg md:text-xl text-gray-800 leading-relaxed mb-6">
            We've created an easy-to-use experience that connects people with trusted, licensed professionals who can answer questions, offer guidance, and provide real solutions based on your unique needs. All without pressure, gimmicks, or confusing jargon.
          </p>
          
          <p className="text-xl md:text-2xl text-[#1a3d7c] font-semibold text-center my-8">
            You don't need to know everything. You just need a place to start.
          </p>
        </section>

        {/* Why Choose Section */}
        <section className="mb-16 bg-white rounded-lg shadow-sm p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a3d7c] mb-8 text-center">
            Why People Choose BlueSky Life
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Easy to Use</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our process is designed to be straightforward, fast, and hassle-free.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Guesswork</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                We provide helpful tools and resources so you can make informed decisions without stress.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Friendly Experts</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Every conversation is with a trained, licensed professional who cares about helping. Not selling.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Support You Can Trust</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                We pride ourselves on honesty, transparency, and always doing what's right for the people we serve.
              </p>
            </div>
          </div>
        </section>

        {/* What to Expect */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a3d7c] mb-6 text-center">
            What to Expect
          </h2>
          
          <p className="text-lg md:text-xl text-gray-800 leading-relaxed mb-6">
            When you explore with BlueSky Life, you're taking a simple step toward more control, more knowledge, and more peace of mind. From your first click to your final decision, we're here to make sure you feel informed, supported, and never rushed.
          </p>
          
          <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
            Whether you're curious, ready to take action, or just browsing, you're in the right place.
          </p>
        </section>

        {/* Get Started */}
        <section className="bg-gradient-to-r from-[#1a3d7c] to-[#2d5aa8] rounded-lg shadow-lg p-8 md:p-12 text-center text-white mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Get Started Today
          </h2>
          
          <p className="text-lg md:text-xl leading-relaxed mb-4">
            There's no pressure. No complicated forms. Just a better way to plan.
          </p>
          
          <p className="text-lg md:text-xl leading-relaxed">
            Take a look around. Learn something new. And when you're ready — we'll be here.
          </p>
        </section>

        {/* Tagline */}
        <section className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-[#1a3d7c] mb-3">
            BlueSky Life
          </h3>
          <p className="text-xl md:text-2xl text-gray-700 font-light italic">
            Clarity. Compassion. Confidence.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 py-12 mt-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img 
              src={logoImage} 
              alt="BlueSky Life" 
              className="h-12 w-auto"
              data-testid="img-bluesky-logo-footer"
            />
          </div>

          {/* Privacy and Terms Links */}
          <div className="text-center mb-3">
            <button
              onClick={() => setLegalModal("privacy")}
              className="text-gray-600 hover:underline cursor-pointer text-sm"
              data-testid="link-privacy-policy"
            >
              Privacy Policy
            </button>
            <span className="text-gray-600 mx-2 text-sm">|</span>
            <button
              onClick={() => setLegalModal("terms")}
              className="text-gray-600 hover:underline cursor-pointer text-sm"
              data-testid="link-terms-of-use"
            >
              Terms of Use
            </button>
          </div>

          {/* Copyright */}
          <p className="text-center text-sm text-gray-700 mb-4">
            &copy; 2025 BlueSky Life. All Rights Reserved.
          </p>

          {/* Privacy Statement */}
          <p className="text-center text-sm text-gray-600 mb-6">
            We never share your information without consent.
          </p>

          {/* Disclaimer */}
          <p className="text-center text-xs text-gray-500 leading-relaxed max-w-3xl mx-auto">
            DISCLAIMER: BlueSkyLife.io, a website owned and operated by BlueSky Investments LLC, is not a federal or state Marketplace website. BlueSky Life is not an insurance company or financial institution. We connect individuals with licensed professionals who can provide personalized assistance with insurance and related planning options.
          </p>
        </div>
      </footer>

      {/* Legal Modals */}
      {legalModal && (
        <LegalModal
          isOpen={!!legalModal}
          onClose={() => setLegalModal(null)}
          type={legalModal}
        />
      )}
    </div>
    </>
  );
}
