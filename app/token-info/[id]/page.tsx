export default function Page({ params }: { params: { id: string } }) {
  return <h1>Token Info ID:{params.id}</h1>;
}
