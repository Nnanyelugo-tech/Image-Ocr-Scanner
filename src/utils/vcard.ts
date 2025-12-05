// Function to create a vCard text string based on name, phone numbers, emails, and URLs
export function createVCard(
  name: string,
  phones: string[] = [],
  emails: string[] = [],
  urls: string[] = []
) {
// Removes any newline characters to avoid breaking vCard formatting
  const sanitize = (val: string) => val.replace(/[\r\n]+/g, " ").trim();
  // Start the vCard with required headers and the contact's full name
  let v = `BEGIN:VCARD\nVERSION:3.0\nFN:${sanitize(name)}\n`;
   
  // Add each phone number in TEL format
  phones.forEach((p) => (v += `TEL;TYPE=CELL:${sanitize(p)}\n`));
  emails.forEach((e) => (v += `EMAIL:${sanitize(e)}\n`));
  urls.forEach((u) => (v += `URL:${sanitize(u)}\n`));

  v += "END:VCARD";
  // Return the complete vCard string
  return v;
}

// Function to trigger downloading of a .vcf file containing the vCard text
export function downloadVCard(filename: string, vcard: string) {
  // Convert the vCard text into a downloadable Blob object
  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  // Create an invisible anchor link for downloading
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;

  // Add link to the DOM, trigger click to download, then remove it
  document.body.appendChild(a);
  a.click();
  a.remove();
 // Release the temporary URL to free memory
  setTimeout(() => URL.revokeObjectURL(url), 200);
}
