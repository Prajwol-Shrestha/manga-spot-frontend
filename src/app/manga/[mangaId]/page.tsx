export default async function Page({
  params,
}: {
  params: Promise<{ mangaId: string }>
}) {
  const { mangaId } = await params
  return <div>My Post: {mangaId}</div>
}