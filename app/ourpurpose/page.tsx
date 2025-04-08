import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Purpose | Schomburg Road Baptist Church Columbus Georgia',
  description: 'Loving Him, Loving Them, Changing Lives!',
  keywords: 'purpose, why, missions',
};

export default function OurPurpose() {
  return (
    <div>
      <h1 className="container mx-auto px-8 md:px-20 mt-4 mb-4 font-headings font-black text-4xl text-slate-700 border-b-2">
        Our <span className="font-light">Purpose</span>
      </h1>

      <div className="bg-primary text-white text-center font-rock-salt lg:px-32 md:px-12 px-4 flex flex-wrap justify-center">
        <div className="text-3xl py-8 bg-primary text-white w-full lg:w-1/3">
          Loving Him
          <p className="font-bodytext text-lg px-6 pt-4 lg:px-8 xl:px-12">
            through worship...
          </p>
        </div>
        <div className="text-3xl py-8 bg-primary text-white w-full lg:w-1/3">
          Loving Them
          <p className="font-bodytext text-lg px-6 pt-4 lg:px-8 xl:px-12">
            through ministry and fellowship, as He is…
          </p>
        </div>
        <div className="text-3xl py-8 bg-primary text-white w-full lg:w-1/3 xl:px-12">
          Changing Lives
          <p className="font-bodytext text-lg px-6 pt-4 lg:px-8">
            through discipleship and missional outreach.
          </p>
        </div>
      </div>

      <div className="bg-white text-slate-700 text-xl font-bodytext font-medium py-8 lg:px-64 md:px-20 sm:px-16">
        <p className="px-6 py-4 md:text-left text-justify ">
          That is our purpose at Schomburg Road Baptist Church. Everything we do
          is driven from these six short words written above. By understanding
          this statement you will better understand who we are.
        </p>
        <p className="px-6 md:text-left text-justify py-4">
          In Loving Him, we will seek to love our Lord with all of our heart,
          mind, and soul. This includes being in the center of His will at all
          times. It is our purpose to glorify Him in all that we do in worship
          and service.
        </p>
        <p className="px-6 md:text-left text-justify py-4">
          We can be about Loving Them because He first loved us. In all that we
          do, we desire to be vessels of His love. Starting with our families,
          to our neighbors, and to all of the world.
        </p>
        <p className="px-6 md:text-left text-justify py-4">
          God is in the business of Changing Lives. We seek to see God change
          the lives of others by our influence and leadership through a growing
          relationship at all levels. This mission will be accomplished by
          pointing people towards and introducing them to Jesus Christ. As the
          relationship grows, we will seek to teach, disciple, and mentor the
          people God brings our way. We want to help them in their hurts and to
          cope with all of life’s opportunities. It is our desire to role model
          as individuals and a church a life that lives for Christ in the power
          of His Spirit through His Word. In short: “Preach to many, teach to
          some, disciple a few, and mentor one to one.”
        </p>
      </div>
      <div className="bg-map bg-fixed bg-cover bg-center h-72">
        <div className="flex items-center bg-primary bg-opacity-60 h-full w-full text-white">
          <div className="grow text-center text-6xl font-headings">
            <div>Our Mission:</div>
            <div className="mt-6">Missions</div>
          </div>
        </div>
      </div>

      <div className="bg-white text-slate-700 text-xl font-bodytext font-medium py-8 lg:px-64 md:px-20 sm:px-16">
        <p className="px-6 py-4 text-center leading-relaxed md:leading-snug">
          Do you know how many seeds are in an apple?
          <br />
          What about how many apples in an apple?
          <br />
          Or more importantly, how many TREES are in an apple?
          <br />
          As for His Kingdom, we THINK ORCHARD.
        </p>
        <p className="px-6 md:text-left text-justify py-4">
          This reminds us that we are to be Kingdom minded; a church that is
          seeking to build up HIS Kingdom and not our church. Thinking Orchard
          is how our purpose statement is lived out.
        </p>
        <p className="px-6 md:text-left text-justify py-4">
          Because of this, we are involved with the Columbus Baptist Association
          and partnering with other churches in different ministries and
          missions locally, within our state, across our country and around the
          world. Specifically, we are involved in Valley Rescue Missions,
          Crossroads Addition Recover Program, Sound Choices Pregnancy Clinic,
          Rutledge State Prison, Operation Christmas Child, GBC Children’s Home
          and more. We also have been on short-term mission trips to South
          Carolina, Arkansas, Kentucky, Florida, Mississippi, Tennessee,
          Georgia, Alabama, Zimbabwe, Thailand, Uganda, and East Asia.
        </p>
        <p className="px-6 text-red-500 text-semibold italic md:text-left text-justify py-4">
          Go therefore and make disciples of all the nations, baptizing them in
          the name of the Father and the Son and the Holy Spirit, teaching them
          to observe all that I commanded you; and lo, I am with you always,
          even to the end of the age.
        </p>
        <p className="px-6 text-right">Matthew 28: 19-20 (NASB)</p>
      </div>
    </div>
  );
}
