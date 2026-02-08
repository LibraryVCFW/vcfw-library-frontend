import "./Header.css";

function Header() {
  return (
    <header className="header-bg">
      <div className="header-overlay">

        {/* LEFT : MAIN COLLEGE LOGO */}
        <div className="main-logo">
          <img
            src="https://vcfw.org/images/vcfw-logo.png"
            alt="Vidyasagar College for Women Logo"
          />
        </div>

        {/* CENTER : TEXT */}
        <div className="header-text">
          <h4 className="library-title">
            Central Library: Knowledge Resource Center
          </h4>

          <h1 className="college-title">
            Vidyasagar College for Women
          </h1>
       
          <h1 className="details">
Govt. Aided College, Kolkata, Established in 1960, Affiliated to University of Calcutta
          </h1>
          <h1 className="address">
39, Sankar Ghosh Lane, Kolkata - 700 006, West Bengal
          </h1>
        </div>
        {/* RIGHT : SUB LOGOS */}
        <div className="header-logos">
          <img
            src="https://i0.wp.com/sjbit.edu.in/wp-content/uploads/2021/07/NAAC-Logo-250x250-1.png?fit=250%2C250&ssl=1"
            alt="NAAC Logo"
          />
          <img
            src="https://vcfw.org/images/iso-pic1.png"
            alt="ISO Logo 1"
          />
          <img
            src="https://vcfw.org/images/iso-pic2.png"
            alt="ISO Logo 2"
          />
          <img
            src="https://vcfw.org/images/iso-pic3.png"
            alt="ISO Logo 3"
          />
        </div>

      </div>
    </header>
  );
}

export default Header;
