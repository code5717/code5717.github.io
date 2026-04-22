import { profile } from '../data/profile';

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mx-auto w-[min(100%-1.5rem,1340px)] mt-16 md:mt-24 border-t border-white/6 py-8 flex flex-wrap gap-3 justify-between items-center text-slate-500 text-[0.82rem]">
      <span>
        © {year} Abdussamad Farooq Saeed · {profile.location}
      </span>
      <nav className="flex gap-5 text-[0.72rem] uppercase tracking-[0.14em]">
        <a href={profile.contacts.github} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-200">
          GitHub
        </a>
        <a href={profile.contacts.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-200">
          LinkedIn
        </a>
        <a href={`mailto:${profile.contacts.email}`} className="hover:text-cyan-200">
          Email
        </a>
      </nav>
    </footer>
  );
}
