function showFairplay(){
  content.innerHTML = `
    <h2>Fairplay</h2>

    <div class="fp-wrap">
      <div>
        <textarea
          id="fpInput"
          placeholder="Paste data dari Panel"
          oninput="prosesFairplay()"
        ></textarea>

        <button class="action" onclick="copyFairplay()">Copy</button>
      </div>

      <div>
        <table>
          <tr>
            <th>TEBAK</th>
            <th>X</th>
            <th>BET</th>
          </tr>
          <tbody id="fpResult"></tbody>
        </table>
      </div>
    </div>
  `;
}

function prosesFairplay(){
  const input = document.getElementById("fpInput");
  const result = document.getElementById("fpResult");

  if(!input || !result) return;

  result.innerHTML = "";

  const lines = input.value
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  lines.forEach(line => {
    const parts = line.split(/\s+/);
    if(parts.length < 2) return;

    const tebakan = parts[0];
    const angka = parseFloat(
      parts
        .slice(1)
        .join("")
        .replace(/\./g, "")
        .replace(",", ".")
    );

    if(!isNaN(angka)){
      result.innerHTML += `
        <tr>
          <td>${tebakan}</td>
          <td>X</td>
          <td>${Math.floor(angka)}</td>
        </tr>
      `;
    }
  });
}

/* ===== COPY HASIL FAIRPLAY ===== */
function copyFairplay(){
  const rows = document.querySelectorAll("#fpResult tr");
  if(!rows.length){
    alert("Belum ada data");
    return;
  }

  let text = "";
  rows.forEach(tr => {
    const td = tr.querySelectorAll("td");
    text += `${td[0].innerText}\t${td[1].innerText}\t${td[2].innerText}\n`;
  });

  navigator.clipboard.writeText(text.trim());
}
