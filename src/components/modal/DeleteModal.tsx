import React from "react";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  taskName: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  taskName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="modal_delete">
        <div className="close-button" onClick={onClose}>
          &times;
        </div>
        <h2>Подтвердите удаление</h2>
        <p>
          Вы уверены, что хотите удалить задачу: <strong>{taskName}</strong>?
        </p>
        <div className="modal-actions">
          <button className="confirm-btn" onClick={onConfirm}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
