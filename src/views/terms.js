import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import './about.css';
import './home.css';

const Terms = () => {
  return (
    <div className='home-container'>
      <Navbar></Navbar>
      <div className="about-content">
        <div className="about-card">
          <h2>Terms of Service</h2>
          <p>
            <strong>1. Acceptance of the Terms:</strong><br/>
            By using the Favorite Four website, you agree to abide by these Terms of Service and any modifications thereto.
            <br/><br/>

            <strong>2. Description of Services and Content Policy:</strong><br/>
            Favorite Four provides a platform that allows football enthusiasts to compete with each other in a weekly challenge. Users can make four selections: a favorite, an underdog, an over, and an under from each week's NFL games.
            <br/><br/>

            <strong>3. User's Responsibilities:</strong><br/>
            All users are expected to engage with the platform in good faith. Misuse, including but not limited to cheating or attempting to manipulate results, will result in account suspension or termination.
            <br/><br/>

            <strong>4. Termination and Account Cancellation:</strong><br/>
            Favorite Four reserves the right to terminate or suspend any account without prior notice if a violation of the Terms of Service is suspected.
            <br/><br/>

            <strong>5. Changes to the Terms:</strong><br/>
            We may update these Terms of Service from time to time. It is the responsibility of the user to review any changes made to these terms.
            <br/><br/>

            <strong>6. Governing Law and Jurisdiction:</strong><br/>
            All disputes related to these terms will be resolved under the laws and jurisdiction of the location where the website's primary operations are based.
            <br/><br/>

            <strong>7. No Waiver:</strong><br/>
            Failure by Favorite Four to enforce any provision of these Terms of Service will not be considered a waiver of such provision.
            <br/><br/>

            <strong>8. Limitation of Liability:</strong><br/>
            Favorite Four will not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use the service, or from any communications or interactions with other users.
            <br/><br/>

            <strong>9. Entire Agreement:</strong><br/>
            These Terms of Service constitute the entire agreement between Favorite Four and you concerning the subject matter hereof.
            <br/><br/>

            <strong>10. Contact Information:</strong><br/>
            For any queries regarding these Terms of Service or any other issues related to Favorite Four, please reach out to our contact page.
          </p>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Terms;
