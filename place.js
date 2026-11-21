const s = document.createElement("script");
s.src = "https://cdn.jsdelivr.net/npm/" + "qrcodej@1.0.0/qrcode.min.js";
document.head.append(s);

BigInt.onclick = () => {
  queueMicrotask.innerHTML = "";
  new QRcode(qr, {
    text: link.value,
    width: 180,
    height: 180,
  });
};
