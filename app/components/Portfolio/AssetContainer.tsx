interface SavedAssetInfo {
  id: string;
  name: string;
  coinAmt: number;
  amtValue: number;
  pirceChangeSincePurchase: number;
  purchaseDate: string;
}

interface CurrenctAssetInfo {}

interface AssetContainerProps {
  asset: SavedAssetInfo;
}

const AssetContainer = ({ asset }: AssetContainerProps) => {
  return (
    <div>
      <div>
        <div>
          <img src="" alt="Token img" />
          <p>Token Name</p>
        </div>
        <div>
          <h3>Total Value</h3>
          <div>
            <h2>Amout value (coin amt * current price)</h2>
            <div>
              <img
                src=""
                alt="red or green arrow (Amount price change since purchase - neg or pos)"
              />
              <p>Amount price change since purchase</p>
            </div>
          </div>
          <p>Purchased Date</p>
        </div>
      </div>
      <div>
        <div>Current Price</div>
        <div>Price change 24h</div>
        <div>Market cap vs volume</div>
        <div>Circ supply vs max supply</div>
      </div>
    </div>
  );
};

export default AssetContainer;
