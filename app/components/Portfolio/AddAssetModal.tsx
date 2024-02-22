import Image from "next/image";
import { useTheme } from "@/app/contexts/themeContext";

interface AddAssetModalProps {
  handleToggle: (val: boolean) => void;
}

const AddAssetModal = ({ handleToggle }: AddAssetModalProps) => {
  const { currentTheme } = useTheme();
  // Display this when user selects "Add asset"
  return (
    <div
      onClick={() => handleToggle(false)}
      className="flex justify-center items-center backdrop-blur-sm bg-content-main/5 w-full h-full mx-auto absolute right-0 left-0 top-0 z-30"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="flex flex-col gap-8 bg-bkg-main p-10 max-w-[888px] w-full rounded-2xl"
      >
        <div className="flex justify-between">
          <h3 className="text-xl font-medium">Select coin</h3>
          <button onClick={() => handleToggle(false)}>
            <Image
              src={`/images/portfolio/${currentTheme}/x-circle.svg`}
              alt="Close modal"
              width={15}
              height={15}
            ></Image>
          </button>
        </div>
        <div className="flex justify-between">
          <div>
            <img src="" alt="" />
            <h3>Token name</h3>
          </div>
          <div>
            <div>
              <input type="text" />
            </div>
            <div>
              <input type="number" name="" id="" />
            </div>
            <div>
              <input type="text" />
            </div>
            <div className="flex">
              <button>Cancel</button>
              <button>Save Asset</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAssetModal;
