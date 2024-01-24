import DuoCharts from "./components/DuoCharts";
import Header from "./components/Header";
import NavCoinsConverter from "./components/NavCoinsConverter";
import Navbar from "./components/Navbar";
import TokenTable from "./components/TokenTable";

export default function Home() {
  return (
    <>
      <Header />
      <Navbar />
      <NavCoinsConverter />
      <DuoCharts />
      <TokenTable />
    </>
  );
}
