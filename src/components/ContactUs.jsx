import "./ContactUs.css";

function ContactUs() {
  return (
    <section className="contact-section">
      <h2>Contact Us</h2>

      <p className="contact-intro">
        For any queries related to library services, resources, or facilities,
        please feel free to contact us. We are always happy to assist you.
      </p>

      <div className="contact-grid">
        {/* CONTACT DETAILS */}
        <div className="contact-details">

          <div className="contact-card">
            <h3>📞 Phone</h3>
            <p>033-22410114</p>
          </div>

          <div className="contact-card">
            <h3>✉️ Email</h3>
            <p>library@vcfw.org</p>
<p>library.vcfw@gmail.com</p>
          </div>

          <div className="contact-card">
            <h3>📍 Address</h3>
            <p>
              Vidyasagar College for Women <br />
              39, Sankar Ghosh Lane <br />
              Kolkata – 700006 <br />
              West Bengal, India
            </p>
          </div>

        </div>

        {/* MAP */}
        <div className="contact-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1841.9577299517455!2d88.36493611335754!3d22.58226501320787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277004acc9bd7%3A0x1aeff07a13ccac2b!2sVidyasagar%20College%20For%20Women!5e0!3m2!1sen!2sin!4v1769665827146!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Vidyasagar College for Women Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
