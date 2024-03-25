import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('@/components/404/Scene'), {
  ssr: false,
});

export default function notFound() {
  return (
    <main className="relative h-screen">
      <Scene />
    </main>
  );
}
