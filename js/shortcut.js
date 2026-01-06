function showShortcut(){
  content.innerHTML = `
    <h2>Shortcut</h2>
    <button class="action">Deposit</button>
    <button class="action" style="margin-left:6px" onclick="showWithdraw()">Withdraw</button>
  `;
}
