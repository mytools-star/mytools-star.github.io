/* ================= WITHDRAW ================= */
console.log("withdraw.js loaded");

/* ===== TAMPILAN WITHDRAW ===== */
window.showWithdraw = function(){
  const content = document.getElementById("content");

  content.innerHTML = `
    <h2>Withdraw</h2>
    <div class="wd-wrap">
      <div class="wd-box">
        <div class="wd-title">CTRL + V</div>
        <textarea id="wdInput" placeholder="Paste data dari Panel"></textarea>
        <button class="action" onclick="copyAllWithdraw()">Copy</button>
        <button class="action" onclick="refreshWithdraw()">Refresh</button>
      </div>
      <div class="wd-box">
        <div class="wd-title">Hasil</div>
        <table class="wd-table">
          <tr>
            <th>Username</th>
            <th>Nama & Rekening</th>
            <th>Nominal</th>
          </tr>
          <tbody id="wdResult"></tbody>
        </table>
      </div>
    </div>
  `;

  // AUTO PROSES SAAT PASTE / KETIK
  document
    .getElementById("wdInput")
    .addEventListener("input", window.prosesWithdraw);
};

/* ===== AUTO PROSES WITHDRAW ===== */
window.prosesWithdraw = function(){
  const inputEl = document.getElementById("wdInput");
  const result = document.getElementById("wdResult");

  if(!inputEl || !result) return;

  result.innerHTML = "";

  const lines = inputEl.value
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  for(let i = 0; i < lines.length; i++){
    // contoh:
    // 1. username 100.000 GOPAY - 08123
    const main = lines[i].match(/^\d+\.\s+(\S+)\s+([\d\.]+)\s+(.+)$/);
    if(main){
      const username = main[1];
      const nominal = main[2];
      const rekening = main[3];

      let nama = "";
      if(lines[i+1] && /^a\.n/i.test(lines[i+1])){
        nama = lines[i+1].replace(/a\.n/i, "a.n").trim();
      }

      result.innerHTML += `
        <tr>
          <td>${username}</td>
          <td>${rekening} ${nama}</td>
          <td style="color:red">${nominal}</td>
        </tr>
      `;
    }
  }
};

/* ===== COPY SEMUA HASIL ===== */
window.copyAllWithdraw = function(){
  const rows = document.querySelectorAll("#wdResult tr");
  if(rows.length === 0){
    alert("Belum ada data");
    return;
  }

  let text = "";
  rows.forEach(tr => {
    const td = tr.querySelectorAll("td");
    text += `${td[0].innerText}\t${td[1].innerText}\t${td[2].innerText}\n`;
  });

  navigator.clipboard.writeText(text.trim());
};

/* ===== REFRESH ===== */
window.refreshWithdraw = function(){
  const input = document.getElementById("wdInput");
  const result = document.getElementById("wdResult");

  if(input) input.value = "";
  if(result) result.innerHTML = "";
};
