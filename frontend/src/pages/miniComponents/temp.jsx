const About = () => {
    return (
      <div className="w-full flex flex-col overflow-x-hidden">
        {/* Title Section */}
        <div className="relative text-center mb-10">
          <h1
            className="flex justify-center items-center gap-4 text-[2rem] sm:text-[2.75rem] 
            md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] 
            lg:leading-[90px] tracking-[15px] font-extrabold about-h1"
            style={{
              background: "hsl(222.2 84% 4.9%)",
            }}
          >
            ABOUT <span className="text-tubeLight-effect font-extrabold">ME</span>
          </h1>
          <span className="absolute w-[80%] mx-auto h-[2px] top-10 z-[-1] bg-slate-200"></span>
        </div>
  
        <div className="text-center">
          <p className="uppercase text-xl text-slate-400 mt-4">
            Allow me to introduce myself.
          </p>
        </div>
  
        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-10 items-center mt-12">
          {/* Image Section */}
          <div className="flex justify-center">
            <img
              src="/ME.jpeg"
              alt="avatar"
              className="bg-white p-4 rounded-lg shadow-lg object-cover w-[300px] sm:w-[350px] md:w-[400px] lg:w-[450px] h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px]"
            />
          </div>
  
          {/* Text Section */}
          <div className="flex flex-col text-left tracking-[1px] text-lg gap-6 px-4">
            <p>
              I am a <strong>driven and detail-oriented software engineer</strong>{" "}
              pursuing my Master’s in Software Engineering at the{" "}
              <strong>University of Maryland, College Park</strong>. With a strong
              foundation in backend development, system migrations,
              microservices, and AI-powered applications, I enjoy tackling
              complex challenges and delivering impactful solutions. My key
              expertise includes developing robust backend architectures and
              designing scalable, innovative systems tailored to meet business
              needs.
            </p>
            <p>
              My passion for learning drives me to constantly explore cutting-edge
              technologies, from cloud computing to advanced AI models. I take
              pride in my ability to seamlessly adapt to diverse team environments
              and thrive in collaborative spaces, delivering high-quality results
              while continuously refining my technical skills.
            </p>
            <p>
              Outside of work, I’m a creative thinker who enjoys{" "}
              <strong>playing badminton</strong>, solving puzzles, and
              experimenting with cooking. I’m also an avid fan of movies, series,
              and video games, which spark my imagination and inspire new ideas.
              Whether I'm meeting professional deadlines or exploring personal
              interests, I strive for balance, creativity, and excellence in
              everything I do.
            </p>
          </div>
        </div>
  
        {/* Footer Text */}
        <p className="text-lg text-center tracking-[1px] mt-8 max-w-[800px] mx-auto">
          With my blend of technical expertise, creative problem-solving, and a
          collaborative spirit, I am committed to making a positive impact on the
          teams and projects I contribute to.
        </p>
      </div>
    );
  };
  
  export default About;
  