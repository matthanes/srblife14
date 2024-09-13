import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Beliefs | Schomburg Road Baptist Church Columbus, Georgia',
  description: 'The Son, the historical Jesus of Nazareth, is eternal. He was born of a virgin, died on the cross, physically rose from the dead, is alive today and is seated next to God the Father. Through His death, He provided salvation to all who believe.',
  keywords: 'beliefs, doctrine',
};

export default function OurBeliefs() {
  return (
    <div className="mb-12">
      <h1 className="container mx-auto px-8 md:px-20 mt-4 mb-4 font-headings font-black text-4xl text-slate-700 border-b-2">
        Our <span className="font-light">Beliefs</span>
      </h1>

      <h2 className="mt-8 lg:px-72 md:px-12 px-6 font-headings font-light tracking-wider text-3xl text-primary uppercase">
        The Bible
      </h2>
      <p className="mt-4 px-6 lg:px-72 md:px-12 font-bodytext text-xl md:text-left text-justify">
        <strong>The Bible</strong> is the God-given, accurate, reliable,
        permanent and complete, authority for personal growth in Christ.
      </p>

      <h2 className="mt-8 lg:px-72 md:px-12 px-6 font-headings font-light tracking-wider text-3xl text-primary uppercase">
        Nature of God
      </h2>
      <p className="mt-4 px-6 lg:px-72 md:px-12 font-bodytext text-xl  md:text-left text-justify">
        There is <strong>only one God</strong>. Through the{' '}
        <strong>Trinity</strong>, He reveals Himself to us as Father, Son and
        Holy Spirit:
      </p>
      <ul className="list-disc px-8 lg:px-72 list-outside font-bodytext text-xl md:text-left text-justify">
        <li className="mt-2 mb-4 mx-6">
          <strong>Father God</strong> cares for His creation and loves mankind
          unconditionally.
        </li>
        <li className="mb-4 mx-6">
          The <strong>Son</strong>, the historical Jesus of Nazareth, is
          eternal. He was born of a virgin, died on the cross, physically rose
          from the dead, is alive today and is seated next to God the Father.
          Through His death, He provided salvation to all who believe.
        </li>
        <li className="mb-4 mx-6">
          The <strong>Holy Spirit</strong> is the essence of a personal God who
          enlightens all men of their need for God and empowers those who
          believe.
        </li>
      </ul>

      <h2 className="mt-8 lg:px-72 md:px-12 px-6 font-headings font-light tracking-wider text-3xl text-primary uppercase">
        Mankind
      </h2>
      <p className="mt-4 px-6 lg:px-72 md:px-12 font-bodytext text-xl  md:text-left text-justify">
        <strong>Mankind</strong> was made in God’s own image as male and female
        and was the pinnacle work of creation. By their free choice they sinned
        against God thus bringing sin into the human race, yet human life is
        sacred and unique to God.
      </p>

      <h2 className="mt-8 lg:px-72 md:px-12 px-6 font-headings font-light tracking-wider text-3xl text-primary uppercase">
        Salvation
      </h2>
      <p className="mt-4 px-6 lg:px-72 md:px-12 font-bodytext text-xl  md:text-left text-justify">
        <strong>Salvation</strong> involves the redemption of the whole person
        and is offered freely to all who believe by placing their faith in Jesus
        Christ alone as their Savior, who by His own blood obtained eternal
        redemption for the believer. In its broadest sense salvation includes
        regeneration, justification, sanctification, and glorification.
      </p>

      <h2 className="mt-8 lg:px-72 md:px-12 px-6 font-headings font-light tracking-wider text-3xl text-primary uppercase">
        Baptism
      </h2>
      <p className="mt-4 px-6 lg:px-72 md:px-12 font-bodytext text-xl  md:text-left text-justify">
        <strong>Baptism</strong> is the immersion of a believer in water. It is
        an act of obedience symbolizing the believer’s faith in a crucified,
        buried, and risen Savior, the believer’s death to sin, the burial of the
        old life, and the resurrection to walk in newness of life in Christ
        Jesus. It is not a requirement for salvation, but rather a demonstration
        of salvation.
      </p>

      <h2 className="mt-8 lg:px-72 md:px-12 px-6 font-headings font-light tracking-wider text-3xl text-primary uppercase">
        The Lord's Supper
      </h2>
      <p className="mt-4 px-6 lg:px-72 md:px-12 font-bodytext text-xl  md:text-left text-justify">
        <strong>The Lord's Supper</strong> is a symbolic act of obedience
        whereby believers remember the death and anticipate His second coming.
      </p>

      <h2 className="mt-8 lg:px-72 md:px-12 px-6 font-headings font-light tracking-wider text-3xl text-primary uppercase">
        Evangelism and Missions
      </h2>
      <p className="mt-4 px-6 lg:px-72 md:px-12 font-bodytext text-xl  md:text-left text-justify">
        <strong>Evangelism & Missions</strong> are the responsibility of every
        follower of Christ and therefore the church is to make disciples of all
        nations by sharing the Gospel and by a Christian lifestyle.
      </p>

      <h2 className="mt-8 lg:px-72 md:px-12 px-6 font-headings font-light tracking-wider text-3xl text-primary uppercase">
        The Last Days
      </h2>
      <p className="mt-4 px-6 lg:px-72 md:px-12 font-bodytext text-xl  md:text-left text-justify">
        In <strong>the Last Days</strong>, God, in His own time and in His own
        way, will bring the world to end as we know it now. Jesus Christ will
        return personally and visibly and the dead will be raised; and Christ
        will judge all men in righteousness. The unrighteous will be consigned
        to Hell. The righteous will receive their reward and will dwell forever
        in Heaven with the Lord.
      </p>

      <h2 className="mt-8 lg:px-72 md:px-12 px-6 font-headings font-light tracking-wider text-3xl text-primary uppercase">
        Cooperation
      </h2>
      <p className="mt-4 px-6 lg:px-72 md:px-12 font-bodytext text-xl  md:text-left text-justify">
        <strong>Cooperation</strong> with Christians should organize to
        cooperate for the Kingdom of God. These organizations have no authority
        over one another or over the churches. Cooperation is desirable between
        the various Christian denominations.
      </p>
    </div>
  );
}
