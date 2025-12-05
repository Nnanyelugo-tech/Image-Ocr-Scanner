// Function to create vCard text
export function createVCard(
  name: string,
  phones: string[] = [],
  emails: string[] = [],
  urls: string[] = []
) {
// sanitize inputs to avoid newlines
  const sanitize = (val: string) => val.replace(/[\r\n]+/g, " ").trim();

  let v = `BEGIN:VCARD\nVERSION:3.0\nFN:${sanitize(name)}\n`;

  phones.forEach((p) => (v += `TEL;TYPE=CELL:${sanitize(p)}\n`));
  emails.forEach((e) => (v += `EMAIL:${sanitize(e)}\n`));
  urls.forEach((u) => (v += `URL:${sanitize(u)}\n`));

  v += "END:VCARD";
  return v;
}

// Function to download the vCard file
export function downloadVCard(filename: string, vcard: string) {
  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;

  document.body.appendChild(a);
  a.click();
  a.remove();

  setTimeout(() => URL.revokeObjectURL(url), 200);
}
