function showValidasi(){
  content.innerHTML = `
    <h2>Validasi</h2>

    <b>Input</b>
    <textarea id="rawData" placeholder="Paste data dari Excel"></textarea>
    <button class="action" onclick="prosesValidasi()">Proses</button>

    <b style="display:block;margin-top:14px">Hasil</b>

    <table class="hasil-table">
      <tr>
        <th>BCA</th>
        <th>MANDIRI</th>
        <th>BNI</th>
        <th>BRI</th>
        <th>CIMB</th>
        <th>SEABANK</th>
        <th>DANAMON</th>
        <th>E-WALLET</th>
      </tr>
      <tr>
        <td id="rBCA">0</td>
        <td id="rMANDIRI">0</td>
        <td id="rBNI">0</td>
        <td id="rBRI">0</td>
        <td id="rCIMB">0</td>
        <td id="rSEABANK">0</td>
        <td id="rDANAMON">0</td>
        <td id="rEWALLET">0</td>
      </tr>
    </table>

    <table class="fd-table">
      <tr>
        <td class="title">FIRST DEPOSIT</td>
      </tr>
      <tr>
        <td id="rFD">0</td>
      </tr>
    </table>
  `;
}

function prosesValidasi(){
  const rows = rawData.value
    .toUpperCase()
    .split("\n")
    .map(r => r.trim())
    .filter(Boolean);

  const bank = {
    BCA:0,
    MANDIRI:0,
    BNI:0,
    BRI:0,
    CIMB:0,
    SEABANK:0,
    DANAMON:0
  };

  let ewallet = 0;
  let fd = 0;

  for(const row of rows){
    const m = row.match(/(?:^|\s)(BCA|MANDIRI|BNI|BRI|CIMB|SEABANK|DANAMON)\s*-/);
    if(m) bank[m[1]]++;

    if(/(?:^|\s)(DANA|OVO|GOPAY|LINKAJA)\s*-/i.test(row)){
      ewallet++;
    }

    const nums = row.match(/\b\d+\b/g);
    if(nums && parseInt(nums.at(-1)) > 0){
      fd++;
    }
  }

  rBCA.textContent = bank.BCA;
  rMANDIRI.textContent = bank.MANDIRI;
  rBNI.textContent = bank.BNI;
  rBRI.textContent = bank.BRI;
  rCIMB.textContent = bank.CIMB;
  rSEABANK.textContent = bank.SEABANK;
  rDANAMON.textContent = bank.DANAMON;
  rEWALLET.textContent = ewallet;
  rFD.textContent = fd;
}
