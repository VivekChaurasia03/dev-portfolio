const About = () => {
  return (
    <div className="w-full flex flex-col overflow-x-hidden">
      <div className="relative">
        <h1
          className="flex gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] 
          lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          ABOUT <span className="text-tubeLight-effect font-extrabold">ME</span>
        </h1>
        <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
      </div>
      <div className="text-center">
        <p className="uppercase text-xl text-slate-400">
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
            My name is Vivek, and I am pursuing a Master’s in Software Engineering at the University of Maryland, College Park. I have experience as a software developer, specializing in backend development, system migrations, and AI-based applications.
            </p>
            <p>
            Beyond technology, I enjoy movies, series, video games, cooking, playing badminton, and solving puzzles. I take pride in meeting deadlines and balancing my professional work with my personal interests.
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
