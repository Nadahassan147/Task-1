import "./ecg.css";
import { useNavigate } from "react-router-dom";
import { FaArrowCircleUp } from "react-icons/fa"; 
import { HiOutlineLockClosed } from "react-icons/hi2";
import { PiChartPolar } from "react-icons/pi";
import { RiRobot2Line } from "react-icons/ri";
import { LuAudioWaveform } from "react-icons/lu";
import { useState, useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function ECG() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [fileName, setFileName] = useState(null);
  const fileInputRef = useRef(null);

  // فتح File Dialog عند الضغط على أيكون Upload
  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  // لما المستخدم يختار ملف → يترفع أوتوماتيك
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:5000/upload_data", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      setFileName(result.filename); // ناخد الاسم اللي رجع من السيرفر
      alert(result.message);
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    }
  };

  // لما ندوس على أيكون Wave → يقرأ الملف المرفوع ويرسمه
  const handleWave = async () => {
    if (!fileName) {
      alert("Please upload a file first!");
      return;
    }

    try {
      const res = await fetch(`http://127.0.0.1:5000/read_ecg_file?file=${fileName}`);
      const json = await res.json();

      if (json.values) {
        const formatted = json.values.map((val, idx) => ({
          value: val,
          index: idx,
        }));
        setData(formatted);
      } else {
        alert("No values returned from server!");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to read file!");
    }
  };

  return (
    <div className="ecg">
      <div className="icons">
        {/* زرار الأبلود */}
        <span className="icon" onClick={triggerFileSelect}>
          <FaArrowCircleUp size={30} color="purple" />
        </span>
        {/* input مخفي يفتح بالايكون */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        <span className="icon" onClick={() => navigate("/")}>
          <HiOutlineLockClosed size={30} color="purple" />
        </span>

        <span className="icon" onClick={() => navigate("")}>
          <PiChartPolar size={30} color="purple" />
        </span>

        <span className="icon" onClick={() => navigate("")}>
          <RiRobot2Line size={30} color="purple" />
        </span>

        {/* Wave icon */}
        <span className="icon" onClick={handleWave}>
          <LuAudioWaveform size={30} color="purple" />
        </span>
      </div>

      <h1>ECG Page</h1>

      {/* الرسم البياني للموجة */}
      {data.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <LineChart width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="index" tick={false} />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="purple"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </div>
      )}
    </div>
  );
}

export default ECG;
