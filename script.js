const faceColor = document.getElementById("face-color");
const borderColor = document.getElementById("border-color");
const lineColor = document.getElementById("line-color");
const largeHandColor = document.getElementById("large-hand-color");
const secondHandColor = document.getElementById("second-hand-color");
const canvas = document.getElementById("canvas");

function clock() {
  const now = new Date();
  const context = canvas.getContext("2d");

  // Setup Canvas
  context.save(); // save default state
  context.clearRect(0, 0, 500, 500);
  context.translate(250, 250); // put 0,0 n the middle
  context.rotate(-Math.PI / 2); //Rotate -90 degress

  // Set default styles
  context.strokeStyle = "#000000";
  context.fillStyle = "#f4f4f4";
  context.lineWidth = 5;
  context.lineCap = "round";

  // Draw clock face and border
  context.save();
  context.beginPath();
  context.lineWidth = 14;
  context.strokeStyle = borderColor.value;
  context.fillStyle = faceColor.value;
  context.arc(0, 0, 142, 0, Math.PI * 2, true);
  context.stroke();
  context.fill();
  context.restore();

  // Draw hour lines
  context.save();
  for (let i = 0; i < 12; i++) {
    context.beginPath();
    context.rotate(Math.PI / 6);
    context.moveTo(100, 0);
    context.lineTo(120, 0);
    context.strokeStyle = lineColor.value;
    context.stroke();
  }
  context.restore();

  // Draw minute lines
  context.save();
  context.lineWidth = 3;
  for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
      context.beginPath();
      context.moveTo(117, 0);
      context.lineTo(120, 0);
      context.strokeStyle = lineColor.value;
      context.stroke();
    }
    context.rotate(Math.PI / 30);
  }
  context.restore();

  //   Get current time
  const hr = now.getHours() % 12;
  const min = now.getMinutes();
  const sec = now.getSeconds();

  // Draw hour hands
  context.save();
  context.rotate(
    (Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec
  );
  context.strokeStyle = largeHandColor.value;
  context.lineWidth = 14;
  context.beginPath();
  context.moveTo(-20, 0);
  context.lineTo(80, 0);
  context.stroke();
  context.restore();

  // Draw minute hand
  context.save();
  context.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
  context.strokeStyle = largeHandColor.value;
  context.lineWidth = 10;
  context.beginPath();
  context.moveTo(-28, 0);
  context.lineTo(112, 0);
  context.stroke();
  context.restore();

  // Draw second hand
  context.save();
  context.rotate((sec * Math.PI) / 30);
  context.strokeStyle = secondHandColor.value;
  context.fillStyle = secondHandColor.value;
  context.lineWidth = 6;
  context.beginPath();
  context.moveTo(-30, 0);
  context.lineTo(100, 0);
  context.stroke();
  context.beginPath();
  context.arc(0, 0, 10, 0, Math.PI * 2, true);
  context.fill();
  context.restore();

  context.restore(); //Restore the default sate
  requestAnimationFrame(clock);
}

requestAnimationFrame(clock);

document.getElementById("save-btn").addEventListener("click", () => {
  const dataURL = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = "clock.png";
  link.href = dataURL;
  link.click();
});
