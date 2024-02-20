interface AddAssetContainerProps {
  handleToggle: (val: boolean) => void;
}

const AddAssetContainer = ({ handleToggle }: AddAssetContainerProps) => {
  // Display this when user selects "Add asset"
  return (
    <div className="absolute">
      AddAssetContainer
      <button onClick={() => handleToggle(false)}>Close modal</button>
    </div>
  );
};

export default AddAssetContainer;
