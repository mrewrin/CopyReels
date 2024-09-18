import React, { useEffect, useRef } from "react";

const useOnScreen = (ref) => {
  const [isIntersecting, setIntersecting] = React.useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return isIntersecting;
};

const FadeInSection = ({ children, delay }) => {
  const ref = useRef();
  const isVisible = useOnScreen(ref);

  return (
    <div
      ref={ref}
      className={`fade-in ${isVisible ? "visible" : ""}`}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : "0ms",
        transitionDuration: "1s", // Увеличиваем длительность анимации для более плавного появления
      }}
    >
      {children}
    </div>
  );
};

const ContentTools = () => {
  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-3xl font-semibold mb-2">
        Useful for any type of content
      </h1>
      <p className="text-gray-500 mb-8">
        Adapts to any workflow, platform, and content
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FadeInSection delay={100}>
          <div className="bg-gradient-to-br from-purple-100 via-white to-purple-200 p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold mb-2">Writing Assistant</h2>
            <p className="text-gray-500 mb-4">
              Draft, rewrite, or improve text with AI and more
            </p>
            <img
              src="https://placehold.co/300x200?text=Instagram+Writing+Assistant"
              alt="Instagram Writing Assistant interface"
              className="mx-auto mb-4"
            />
            <button className="bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded">
              Improve with AI
            </button>
          </div>
        </FadeInSection>
        <FadeInSection delay={200}>
          <div className="bg-gradient-to-br from-blue-100 via-white to-blue-200 p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold mb-2">
              Available on All Platforms
            </h2>
            <p className="text-gray-500 mb-4">
              At your fingertips, wherever you work
            </p>
            <div className="flex justify-center space-x-4 mb-4">
              <i className="fab fa-windows text-3xl"></i>
              <i className="fab fa-apple text-3xl"></i>
              <i className="fab fa-linux text-3xl"></i>
              <i className="fab fa-chrome text-3xl"></i>
              <i className="fab fa-firefox text-3xl"></i>
              <i className="fab fa-safari text-3xl"></i>
            </div>
            <img
              src="https://placehold.co/300x100?text=Instagram+Platform+Logos"
              alt="Platform logos"
              className="mx-auto"
            />
          </div>
        </FadeInSection>
        <FadeInSection delay={300}>
          <div className="bg-gradient-to-br from-yellow-100 via-white to-yellow-200 p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold mb-2">
              Video to text transcription
            </h2>
            <p className="text-gray-500 mb-4">
              Transcribe text from video or audio, automatically rewrite or
              paraphrase text, create summaries, and more for articles, essays,
              or social media posts.
            </p>
            <img
              src="https://placehold.co/300x200?text=Instagram+Transcription+Interface"
              alt="Transcription interface"
              className="mx-auto"
            />
          </div>
        </FadeInSection>
        <FadeInSection delay={400}>
          <div className="bg-gradient-to-br from-green-100 via-white to-green-200 p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold mb-2">Youtube Summary</h2>
            <p className="text-gray-500 mb-4">
              Summarize YouTube videos, ask the most important "why" and "what"
              questions about the video, and save thousands of hours while
              gaining the best insights...
            </p>
            <img
              src="https://placehold.co/300x200?text=Instagram+YouTube+Summary+Interface"
              alt="YouTube summary interface"
              className="mx-auto"
            />
          </div>
        </FadeInSection>
        <FadeInSection delay={500}>
          <div className="bg-gradient-to-br from-pink-100 via-white to-pink-200 p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold mb-2">Gmail AI</h2>
            <p className="text-gray-500 mb-4">
              Write better emails much faster, using your own words and style
              while keeping them safe and confidential.
            </p>
            <img
              src="https://placehold.co/300x200?text=Instagram+Gmail+AI+Interface"
              alt="Gmail AI interface"
              className="mx-auto"
            />
          </div>
        </FadeInSection>
      </div>
    </div>
  );
};

export default ContentTools;
