import { AlertCircle } from "lucide-react";
import Modal from "./Modal";
import SecondaryButton from "../Button/SecondaryButton";
import TertiaryButton from "../Button/TertiaryButton";

export default function ErrorModal({ isOpen, onClose, error, title = "Error" }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      type="error"
    >
      <div className="flex items-start space-x-3">
        <AlertCircle className="text-red-500 mt-1" size={20} />
        <div className="flex-1">
          <p className="text-gray-300 text-sm leading-relaxed">
            {error}
          </p>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <TertiaryButton onClick={onClose}>
          Cerrar
        </TertiaryButton>
      </div>
    </Modal>
  );
}