import Inbox from './components/inbox';
import Navbar from './components/navbar';

export default function Home() {
  return (
    <main className="px-4 py-6 min-h-screen">
      <Navbar />
      <h1 className="text-2xl font-bold pb-2 pt-8 px-8">Lead Emails</h1>
      <Inbox />
    </main>
  );
}
