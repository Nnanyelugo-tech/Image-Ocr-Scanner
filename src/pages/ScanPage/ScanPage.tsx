import { useScanLogic } from "../../hooks/useScanLogic";
import { ScanUI } from "../../components/ScanUI";

export default function ScanPage() {
  const logic = useScanLogic();

  return (
    <ScanUI
      preview={logic.preview}
      inputError={logic.inputError}
      ocrError={logic.ocrError}
      result={logic.result}
      tags={logic.tags}
      onTagChange={logic.setTags}
      handleImageSelected={logic.handleImageSelected}
      processImage={logic.processImage}
      resetAll={logic.resetAll}
      loading={logic.loading}
    />
  );
}