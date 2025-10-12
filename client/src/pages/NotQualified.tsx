import QuizLayout from "@/components/QuizLayout";

export default function NotQualified() {
  return (
    <QuizLayout 
      headline="GOLD HARBOR INSURANCE"
      subheadline="Life Insurance Benefits"
    >
      <div className="max-w-2xl mx-auto text-center py-12 px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            We're Sorry
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-4">
            Unfortunately, you do not qualify for coverage at this time.
          </p>
          <p className="text-base md:text-lg text-gray-600">
            Based on your age and location, we are unable to provide coverage options. Thank you for your interest in Gold Harbor Insurance.
          </p>
        </div>
      </div>
    </QuizLayout>
  );
}
