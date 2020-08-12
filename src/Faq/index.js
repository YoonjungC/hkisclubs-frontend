import React from "react";
import "./index.css";

export default class Faq extends React.Component {
  render() {
    return (
      <div className="faq">
        <div id="title">
          <h1> Frequently Asked Questions </h1>
        </div>
      <div id="faqContent"> 
          <h4 id="top"> What is HKIS Clubs? </h4>
          <p>
            Hong Kong International School offers various student led clubs to
            support the wide range of interests the students here have. There
            are STEM related clubs, Debate clubs, Art clubs, Technology clubs, Music Clubs,
            and so much more! Most of the students here can agree: Being part of
            a club means more than just being a member – you have a 2nd family.
            Thus, HKIS Clubs is meant to be your central source of information
            about student organizations at Hong Kong International School. Keep
            discovering new clubs throughout the year, not just at the club
            marketplace.
          </p>
          <h4> How can I provide feedback? </h4>
          <p>
            {" "}
            We’re so excited to let everyone at HKIS contribute to the
            development of HKIS Clubs! Your feedback is incredibly important to
            us. Have any questions or comments? Find any bugs? Please let us
            know on our feedback form.{" "}
          </p>
          <h4> How do I use this site? </h4>
          <p>
            The #1 way to use this site is to browse clubs at HKIS! Pusue your
            passions by joining clubs! You can:
          </p>
          <li>  Search for clubs by name or sort through the categories using the filter </li>
          <li>
            Browse information that clubs post: Description of each club, contact details of club leaders, and photos. {" "}
            </li>
            <p>
              If you run a club, make sure your club is on HKIS Clubs!
              This lets other students find out about your club and learn how to get
              involved.
            </p>
          

          <h4> How many clubs should I be in? </h4>
          <p>
            {" "}
            Keep in mind that being a part of a club means that you will have
            the responsibility to attend weekly (for most of the clubs) meetings
            and participate in different events. If you are in too many clubs,
            it can be a challenge as you will have to find a way to balance
            schoolwork and your extracurriculars. There isn't a set amount of
            clubs you should join but try joining different clubs at the
            beginning of the year and later in the month you can choose to stay
            in the ones you wish to continue participating in.{" "}
          </p>

          <h4> Why should I join a club? </h4>
          <p>
            {" "}
            Joining clubs is one of the best ways to become friends with upper
            and younger classmen. You may also find something new that you enjoy! 
            You have something in common to share!{" "}
          </p>

          <h4> What typically happens in a weekly club meeting? </h4>
          <p>
            {" "}
            Different clubs meet on different dates. You can check the club page to search for clubs meeting on certain days. In a club meeting, members
            may discuss plans for the club and events that are coming up for you
            to participate in.{" "}
          </p>
          <p id="line">  </p>
          <h1 id="newStudents"> For New and Freshmen students </h1>
          <h4> What should I do if I missed the club marketplace? </h4>
          <p>
            {" "}
            Don't worry! We have you all covered with the resources we provide.
            Browse through clubs and when you find a club that interest you,
            click on the card to find the club leader's email so that you can email them.{" "}
          </p>
          <p id="line">  </p>
          <h4> How do I edit an organization’s profile? </h4>
          <p>
            {" "}
            If you are a club leader, you will have acess to your admin portal which will display the clubs you are part of. You can then update your club. {" "}
          </p>

          <h4> Why can’t I find a club I run on HKIS Clubs? </h4>
          <p>
            {" "}
            Sorry about that! We’re in the process of making HKIS Clubs as
            comprehensive as possible, creating the first complete directory of
            student organizations at HKIS. As a club leader, you will have access to editing your club on the website via the admin portal. 
            Please fill out the <a href=""> Missing Club Form </a>  {" "}
          </p>

          <h4> I have another question! </h4>
          <p id="feedback_form"> Please let us know on our <a href=""> Feedback Form </a> </p>
        </div>
      </div>
    );
  }
}
