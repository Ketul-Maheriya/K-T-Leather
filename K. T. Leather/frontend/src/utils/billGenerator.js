export function generateBillHTML(billData) {
  const rows = billData.items.map(item =>
    `<tr>
      <td>${item.product}</td>
      <td>${item.qty}</td>
      <td>₹${Number(item.rate).toLocaleString("en-IN")}</td>
      <td>₹${Number(item.qty * item.rate).toLocaleString("en-IN")}</td>
    </tr>`
  ).join("");
  const subtotal = billData.items.reduce((s, i) => s + i.qty * i.rate, 0);
  const gstAmt = Math.round(subtotal * billData.gstPercent / 100);
  const grand = subtotal + gstAmt;

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Bill - ${billData.billNo}</title>
<style>
  body{font-family:Arial,sans-serif;padding:30px;color:#222;max-width:800px;margin:auto}
  .header{text-align:center;border-bottom:3px solid #5c2d09;padding-bottom:16px;margin-bottom:20px}
  .co-name{font-size:26px;font-weight:800;color:#5c2d09;letter-spacing:1px}
  .co-sub{font-size:12px;color:#555;margin-top:4px}
  .bill-meta{display:flex;justify-content:space-between;margin:16px 0}
  .bill-meta div{font-size:13px}
  .client-box{background:#fdf6ee;border:1px solid #ddd;padding:12px;border-radius:6px;margin:12px 0}
  table{width:100%;border-collapse:collapse;margin:16px 0}
  th{background:#5c2d09;color:#fff;padding:10px;text-align:left;font-size:13px}
  td{padding:9px 10px;border-bottom:1px solid #eee;font-size:13px}
  .totals{text-align:right;margin-top:10px}
  .totals table{width:260px;margin-left:auto}
  .grand{font-size:16px;font-weight:bold;color:#5c2d09}
  .footer{margin-top:40px;display:flex;justify-content:space-between;font-size:12px;color:#666;border-top:1px solid #ddd;padding-top:16px}
  .sign{text-align:right}
  @media print{body{padding:10px}}
</style></head>
<body>
<div class="header">
  <img src="${window.location.origin}/logo.png" alt="KT Logo" style="height: 60px; margin-bottom: 12px; object-fit: contain;" />
  <div class="co-name">K.T. LEATHER STORE</div>
  <div class="co-sub">09/SF, Vaibhav Laxmi Complex, Nr. H.B. Kapadia School, Shahibaug, Ahmedabad-380004</div>
  <div class="co-sub">GST: 24AOXPM5482M1Z0 &nbsp;|&nbsp; Tel: 9825562702 / 8200647440 &nbsp;|&nbsp; Email: ktlsyogesh114@gmail.com</div>
</div>
<div class="bill-meta">
  <div><strong>Bill No:</strong> ${billData.billNo}<br><strong>Date:</strong> ${billData.date}</div>
  <div style="text-align:right"><strong>Proprietor:</strong> Yogesh Chandrakantbhai Makwana<br><strong>Est.:</strong> 1965</div>
</div>
<div class="client-box">
  <strong>Billed To:</strong><br>
  Company: <strong>${billData.companyName}</strong><br>
  ${billData.clientAddress ? `Address: ${billData.clientAddress}<br>` : ""}
  ${billData.clientGst ? `GST No.: ${billData.clientGst}` : ""}
</div>
<table>
  <thead><tr><th>Product / Description</th><th>Qty</th><th>Rate</th><th>Amount</th></tr></thead>
  <tbody>${rows}</tbody>
</table>
<div class="totals">
  <table>
    <tr><td>Subtotal</td><td>₹${subtotal.toLocaleString("en-IN")}</td></tr>
    <tr><td>GST (${billData.gstPercent}%)</td><td>₹${gstAmt.toLocaleString("en-IN")}</td></tr>
    <tr class="grand"><td><strong>Grand Total</strong></td><td><strong>₹${grand.toLocaleString("en-IN")}</strong></td></tr>
  </table>
</div>
<div class="footer">
  <div>Thank you for your business!<br>Payment due within 30 days.</div>
  <div class="sign">_______________________<br>Authorized Signatory<br><strong>K.T. Leather Store</strong></div>
</div>
</body></html>`;
}
