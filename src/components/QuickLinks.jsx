function QuickLinks() {
  const links = [
    { text: "WEB OPAC", icon: "fa-magnifying-glass" },
    { text: "OER Repository", icon: "fa-database" },
    { text: "PYQs", icon: "fa-file-lines" },
    { text: "E-Shikshak", icon: "fa-chalkboard-user" },
    { text: "Library Blog", icon: "fa-blog" },
    { text: "Gallery", icon: "fa-image" },
    { text: "Audio Books", icon: "fa-headphones" }
  ];

  return (
    <div className="d-flex gap-2 p-3 justify-content-center bg-dark">
      {links.map((link, i) => (
        <button key={i} className="btn quick-btn px-3">
          <i className={`fa-solid ${link.icon}`}></i>
          {link.text}
        </button>
      ))}
    </div>
  );
}

export default QuickLinks;
