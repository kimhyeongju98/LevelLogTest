document.getElementById("fileInput").addEventListener("change", function(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const text = e.target.result;
    const lines = text.split("\n");

    // CSV 파싱 (예: "시간,킬수")
    const labels = [];
    const kills = [];
    lines.forEach((line, i) => {
      if (i === 0) return; // 첫 줄은 헤더
      const parts = line.split(",");
      if (parts.length >= 2) {
        labels.push(parts[0]);
        kills.push(parseInt(parts[1]));
      }
    });

    // Chart.js 그래프 생성
    const ctx = document.getElementById("chart").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [{
          label: "킬 수",
          data: kills,
          borderColor: "blue",
          fill: false
        }]
      },
      options: { responsive: true }
    });
  };
  reader.readAsText(file);
});
