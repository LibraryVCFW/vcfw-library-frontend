import "./BreakingNotice.css";

function BreakingNotice() {
  return (
    <div className="breaking-wrapper">
      <div className="breaking-label">Library Timings</div>

      <div className="breaking-container">
        <div className="breaking-track">
          <span>
            📚 Central Library Timings: Monday to Saturday — 8:00 AM to 2:00 PM
            &nbsp;&nbsp;|&nbsp;&nbsp;
            📖 Seminar Library: As per college hours
            &nbsp;&nbsp;|&nbsp;&nbsp;
            ⏰ General Library Timing: 8:00 AM – 2:00 PM
            (May vary during holidays or special occasions)
          </span>

          {/* duplicate for infinite loop */}
          <span>
            📚 Central Library Timings: Monday to Saturday — 8:00 AM to 2:00 PM
            &nbsp;&nbsp;|&nbsp;&nbsp;
            📖 Seminar Library: As per college hours
            &nbsp;&nbsp;|&nbsp;&nbsp;
            ⏰ General Library Timing: 8:00 AM – 2:00 PM
            (May vary during holidays or special occasions)
          </span>
        </div>
      </div>
    </div>
  );
}

export default BreakingNotice;
