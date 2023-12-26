import Header from "./components/Header";
import NavCoinsConverter from "./components/NavCoinsConverter";
import Navbar from "./components/Navbar";
import TokenTable from "./components/TokenTable/TokenTable";

export default function Home() {
  return (
    <>
      <Header />
      <Navbar />
      <NavCoinsConverter />
      <TokenTable />
    </>
  );
}
