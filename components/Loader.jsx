export default function Loader() {
  return (
    <div className="loader" id="loader" aria-hidden="true">
      <div className="lg">
        <div className="loader-count" id="lcount">0</div>
        <div className="pct">%</div>
      </div>
      <div className="loader-track"><i id="lbar"></i></div>
      <div className="cap">Loading experience</div>
    </div>
  );
}
