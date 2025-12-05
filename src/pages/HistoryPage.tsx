
import { useHistoryLogic } from "../hooks/useHistoryLogic";
import { HistoryUI } from "../components/HistoryUI";

export default function HistoryPage() {
  const logic = useHistoryLogic();

  return (
    <HistoryUI
      history={logic.history}
      filteredHistory={logic.filteredHistory}
      tagQuery={logic.tagQuery}
      setTagQuery={logic.setTagQuery}
      copiedIndex={logic.copiedIndex}
      copyCard={logic.copyCard}
      removeHistoryItem={logic.removeHistoryItem}
      clearHistory={logic.clearHistory}
    />
  );
}
