// import "./eeg.css";
// import { useNavigate } from "react-router-dom";
// import { FaArrowCircleDown } from "react-icons/fa";
// import { HiOutlineLockClosed } from "react-icons/hi2";
// import { PiChartPolar } from "react-icons/pi";
// import { RiRobot2Line } from "react-icons/ri";
// import { LuAudioWaveform } from "react-icons/lu";
// import { useState } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
// } from "recharts";

// function EEG() {
//   const navigate = useNavigate();
//   const [data, setData] = useState([]);
//   const [isStreaming, setIsStreaming] = useState(false);
//   let eventSource;

//   // تحميل ملف EEG
//   const handleDownload = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:5000/upload_eeg");
//       if (!response.ok) throw new Error("Download failed");

//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);

//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "eeg_file.csv";
//       a.click();

//       window.URL.revokeObjectURL(url);
//     } catch (err) {
//       console.error(err);
//       alert("Download failed!");
//     }
//   };

//   // تشغيل Stream EEG
//   const handleWave = () => {
//     if (isStreaming) return;
//     setIsStreaming(true);

//     eventSource = new EventSource("http://127.0.0.1:5000/eeg_stream");

//     eventSource.onmessage = (event) => {
//       const newValue = parseInt(event.data, 10);
//       setData((prev) => {
//         const updated = [...prev, { value: newValue }];
//         return updated.slice(-50);
//       });
//     };

//     eventSource.onerror = () => {
//       console.error("Stream error, closing...");
//       eventSource.close();
//       setIsStreaming(false);
//     };
//   };

//   return (
//     <div className="eeg">
//       <div className="icons">
//         <span className="icon" onClick={handleDownload}>
//           <FaArrowCircleDown size={30} color="purple" />
//         </span>

//         <span className="icon" onClick={() => navigate("/")}>
//           <HiOutlineLockClosed size={30} color="purple" />
//         </span>

//         <span className="icon" onClick={() => navigate("")}>
//           <PiChartPolar size={30} color="purple" />
//         </span>

//         <span className="icon" onClick={() => navigate("")}>
//           <RiRobot2Line size={30} color="purple" />
//         </span>

//         <span className="icon" onClick={handleWave}>
//           <LuAudioWaveform size={30} color="purple" />
//         </span>
//       </div>

//       <h1>EEG Page</h1>

//       {isStreaming && (
//         <div style={{ marginTop: "30px" }}>
//           <LineChart width={600} height={300} data={data}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis tick={false} />
//             <YAxis domain={[50, 350]} />
//             <Tooltip />
//             <Line
//               type="monotone"
//               dataKey="value"
//               stroke="purple"
//               strokeWidth={2}
//               dot={false}
//             />
//           </LineChart>
//         </div>
//       )}
//     </div>
//   );
// }

// export default EEG;


import "./eeg.css";
import { useNavigate } from "react-router-dom";
import { FaArrowCircleUp } from "react-icons/fa"; 
import { HiOutlineLockClosed } from 'react-icons/hi2';
import { PiChartPolar } from 'react-icons/pi';
import { RiRobot2Line } from 'react-icons/ri';
import { LuAudioWaveform } from 'react-icons/lu';

function EEG() {
  const navigate = useNavigate();

  return (
    <div className="eeg">
      <div className="icons">
        <span className="icon" onClick={() => alert("Downloading...")}>
          <FaArrowCircleUp size={30} color="purple" />
        </span>
        <span className="icon" onClick={() => navigate("/")}>
          <HiOutlineLockClosed size={30} color="purple" />
        </span>
        <span className="icon" onClick={() => navigate("")}>
          <PiChartPolar size={30} color="purple" />
        </span>
        <span className="icon" onClick={() => navigate("")}>
          <RiRobot2Line size={30} color="purple" />
        </span>
        <span className="icon" onClick={() => navigate("")}>
          <LuAudioWaveform size={30} color="purple" />
        </span>
      </div>
      <h1>EEG Page</h1>
    </div>
  );
}

export default EEG;
