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
        <div className="flex justify-between w-full">
          <h3 className="text-xl font-medium">Select coin</h3>
          <button onClick={() => handleToggle(false)}>
            <Image
              src={`/images/portfolio/${currentTheme}/x-circle.svg`}
              alt="Close modal"
              width={30}
              height={30}
            ></Image>
          </button>
        </div>
        <div className="flex justify-between w-full gap-8 ">
          <div className="max-w-[365px] w-full rounded-lg">
            <img src="" alt="" />
            <h3>Token name</h3>
          </div>
          <div className="flex flex-col gap-8 w-full">
            <div className="text-content-main flex flex-col gap-4">
              <input
                className="bg-bkg-subnav rounded-md px-2 py-3"
                type="text"
                placeholder="Select coin"
              />
              <input
                className="bg-bkg-subnav rounded-md px-2 py-3"
                type="number"
                placeholder="Purchased amount"
              />
              <input
                className="bg-bkg-subnav rounded-md px-2 py-3"
                type="text"
                placeholder="Purchased date"
              />
            </div>
            <div className="flex justify-between">
              <button onClick={() => handleToggle(false)}>Cancel</button>
              <button>
                Save Asset
                {/* ADD_ASSET redux action */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAssetModal;
