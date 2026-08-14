import CategorySection from "../components/home/CategorySection"
import CommunityCTA from "../components/home/CommunityCTA"
import HeroSection from "../components/home/HeroSection"
import RecentNotes from "../components/home/RecentNotes"
import SearchBar from "../components/home/SearchBar"


import NoteCard from "../components/notes/NoteCard"

const HomePage = () => {
  return (
    <div>
      <HeroSection />

      <SearchBar />

      <CategorySection />

      <RecentNotes />

      <CommunityCTA />

      <NoteCard />
    </div>
  )
}

export default HomePage