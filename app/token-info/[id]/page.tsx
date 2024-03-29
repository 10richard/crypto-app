import Header from "@/app/components/Header";
import Navbar from "@/app/components/Navbar";
import TokenInfo from "@/app/components/TokenInfo";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <Header />
      <Navbar />
      <TokenInfo token_id={params.id} />
    </>
  );
}
