import React from 'react';
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import './about.css'
import './home.css'

const About = () => {
  return (
    <div className='home-container'>
      <Navbar></Navbar>
      <div className="about-content">
        <div className="about-card">
          <h2>About Us</h2>
          <p>
            Favorite Four is a website that allows football fans to compete
            with each other by picking just a few selections: a favorite, an underdog, an over, and
            an under for each week's games. The goal is to showcase your football
            knowledge and strategic insights while having fun with friends and
            other fans. Make a League and share with friends to easily track picks
            each week and see who is the sharpest!
          </p>
          <p>
            Whether you're a seasoned football expert or a casual fan,
            Favorite Four is the perfect platform to put your knowledge to the
            test and enjoy the excitement of the NFL season.
          </p>
        </div>
        <div className="about-card">
          <h2>FAQ</h2>
          <div className="faq-entry">
            <h3>How does a spread work?</h3>
            <p>
              A spread is a type of selection where oddsmakers set a margin of
              victory that the favored team must win by. You can choose to
              either select the favored team to win by more points than the spread, or
              the underdog team to lose by fewer points than the spread. For example,
              if you choose the favorite when the spread is -6.5, you need them to win
              by 7 or more for your selection to win! Likewise, the underdog in such a
              matchup can lose by 6 or less (or win, of course!), and your pick still wins!
              Your goal is to pick a correct favorite and underdog every week.
            </p>
          </div>
          <div className="faq-entry">
            <h3>How does an over/under work?</h3>
            <p>
              An over/under involves speculating on the total combined points scored by both 
              teams in a game. Oddsmakers set a predicted total, and you choose whether the 
              actual total will be over or under that prediction. For example, if the over/under
              is 44.5, scores such as 41-33 (74 total points) and 38-7 (45 total points), would
              result in a winning result for the "over". Scores such as 13-9 (22 points) would of
              course hit the under! Your goal is to pick a correct over and a correct under every week.
            </p>
          </div>
          <div className="faq-entry">
            <h3>When are picks due?</h3>
            <p>
              Picks for each game can be submitted up to the start time; picks for unstarted games can be changed at any time.
              Picks will be graded at the conclusion of all of the week's games.
            </p>
          </div>
        </div>
        <div className="about-card">
          <h2>Contact Us</h2>
          <p>
            If you have any questions, feedback, inquiries, or suggestion, feel free
            to reach out at:
          </p>
          <p>Email: connorjshields@alumni.nd.edu</p>
          <p>Twitter: connorshieldss</p>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default About;
