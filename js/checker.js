function showChecker(){
  content.innerHTML = `
    <h2>Cek Domain</h2>
    <b>Input Domain / URL</b>
    <textarea id="domainInput" placeholder="Cari Data Pemblokiran"></textarea>
    <button class="action" onclick="cekDomain()">Cari</button>
    <table class="domain-table">
      <tr><th>Domain</th><th>Status</th><th>Keterangan</th></tr>
      <tbody id="domainResult"></tbody>
    </table>
  `;
}

async function cekDomain(){
  domainResult.innerHTML="";
  const domains = domainInput.value.split("\n").map(v=>v.trim()).filter(Boolean);

  for(const v of domains){
    const d=v.replace(/^https?:\/\//,"").replace(/^www\./,"").split("/")[0].toLowerCase();
    const tr=document.createElement("tr");
    tr.innerHTML=`<td>${d}</td><td class="warn">CEK...</td><td>Memeriksa TrustPositif</td>`;
    domainResult.appendChild(tr);

    try{
      const res=await fetch("http://localhost:3000/cek-domain",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({domain:d})
      }).then(r=>r.json());

      let cls="ok",st="Tidak ada",kt="Aman";
      if(res.status==="TERBLOKIR"){cls="bad";st="Ada";kt="Blokir";}
      tr.innerHTML=`<td>${d}</td><td class="${cls}">${st}</td><td>${kt}</td>`;
    }catch{
      tr.innerHTML=`<td>${d}</td><td class="warn">Tidak ada</td><td>Server tidak aktif</td>`;
    }
  }
}
