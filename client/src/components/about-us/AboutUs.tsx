import { Container, Row, Col } from "react-bootstrap";
import lens from "../../animation/lens.json"
import Lottie from "lottie-react";

const AboutUs = () => {
  return (
    <div className="bg-dark text-light">
      <Container>
        <Row>
          <Col sm={8} className="p-5">
            <h2>About Us</h2>
            <p>
              Introducing LensEase: Revolutionizing Optics and Eyeglass Stores
            </p>
            <p>
              Welcome to LensEase, the cutting-edge solution designed
              specifically for optometrists and eyeglass stores. Our app is here
              to transform the way you handle price lists and streamline your
              service experience.
            </p>
            <p>
              Say goodbye to the hassle of searching through stacks of papers or
              navigating complex systems. With LensEase, optometrists and
              salespersons gain effortless access to comprehensive lens data,
              empowering them to provide customers with a seamless and efficient
              service.
            </p>
            <p>
              We believe in simplifying the optical industry by providing an
              intuitive platform that revolutionizes the way lenses are priced
              and managed. By centralizing all lens information, LensEase
              enables you to instantly retrieve accurate data, ensuring
              precision and reliability in your recommendations.
            </p>
            <p>
              Imagine effortlessly navigating a vast array of lens options,
              quickly finding the perfect match for your customers' needs.
              LensEase empowers you to provide personalized recommendations,
              delivering an exceptional service experience that leaves a lasting
              impression.
            </p>
            <p>
              Join us on this journey to transform the optics industry. LensEase
              is your key to unlock a new era of efficiency and convenience.
              Embrace the future of optics and experience the power of LensEase
              today.
            </p>
          </Col>
          <Col sm={4} className="mt-5 d-flex">
            <Lottie animationData={lens} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutUs;
