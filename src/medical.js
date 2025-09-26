import { useNavigate } from "react-router-dom";
import "./medical.css";

function Medical() {
  const navigate = useNavigate();

  return (
    <div className="medical">
      <button onClick={() => navigate("/ecg")}>ECG</button>
      <button onClick={() => navigate("/eeg")}>EEG</button>
    </div>
  );
}

export default Medical;
