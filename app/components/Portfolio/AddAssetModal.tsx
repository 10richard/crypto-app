interface AddAssetModalProps {
  handleToggle: (val: boolean) => void;
}

const AddAssetModal = ({ handleToggle }: AddAssetModalProps) => {
  // Display this when user selects "Add asset"
  return (
    <div className="absolute">
      AddAssetModal
      <button onClick={() => handleToggle(false)}>Close modal</button>
    </div>
  );
};

export default AddAssetModal;
