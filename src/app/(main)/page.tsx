import TopHundertList from "@/components/stations/TopHundertList";

export default async function Home(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>
}) {

  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
      <TopHundertList query={query} currentPage={currentPage} />
  );
}
