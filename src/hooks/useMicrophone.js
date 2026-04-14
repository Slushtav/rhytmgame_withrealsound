import { useEffect, useState } from "react";

export default function useMicrophone(active) {
  const [volume, setVolume] = useState(0);

  useEffect(() => {
    if (!active) return;

    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let analyser = audioContext.createAnalyser();
    let dataArray = new Uint8Array(analyser.frequencyBinCount);

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mic = audioContext.createMediaStreamSource(stream);
      mic.connect(analyser);

      const detect = () => {
        analyser.getByteFrequencyData(dataArray);
        const avg =
          dataArray.reduce((a, b) => a + b, 0) / dataArray.length;

        setVolume(avg);
        requestAnimationFrame(detect);
      };

      detect();
    });
  }, [active]);

  return volume;
}