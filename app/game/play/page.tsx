import PlayContent from './components/PlayContent';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function PlayPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const isAnonymous = searchParams.anonymous === 'true';

  return <PlayContent isAnonymous={isAnonymous} />;
}
