export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-50 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1a3d7c] m-0">
          Welcome to BlueSky Life
        </h1>
      </header>

      {/* Main Content */}
      <section className="max-w-3xl mx-auto my-12 px-4">
        <p className="text-lg text-gray-700 mb-6">
          At BlueSky Life, we believe in simplicity, clarity, and peace of mind.
          Our platform is built to help everyday individuals explore reliable options 
          and connect with trusted professionals.
        </p>

        <p className="text-lg text-gray-700 mb-6">
          Whether you're planning ahead or simply learning more, we provide helpful 
          resources and simple tools to guide your journey.
        </p>

        <div className="mt-8 text-center">
          <button
            onClick={() => window.location.href = '/seniors'}
            className="bg-[#1a3d7c] text-white border-none py-4 px-8 text-base rounded-md cursor-pointer hover:bg-[#15325f] transition-colors duration-200"
            data-testid="button-learn-more"
          >
            Learn More
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-600 mt-16 py-8">
        <p>&copy; 2025 BlueSky Life. All rights reserved.</p>
      </footer>
    </div>
  );
}
