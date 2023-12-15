import Header from "@/app/components/Header";
import Navbar from "@/app/components/Navbar";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <Header />
      <Navbar />
    </>
  );
}
