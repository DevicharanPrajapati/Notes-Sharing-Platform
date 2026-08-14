import CategorySection from "../components/home/CategorySection";
import CommunityCTA from "../components/home/CommunityCTA";
import HeroSection from "../components/home/HeroSection";
import RecentNotes from "../components/home/RecentNotes";
import SearchBar from "../components/home/SearchBar";

const HomePage = () => {
  return (
    <div>
      <HeroSection />

      <SearchBar />

      <CategorySection />

      <RecentNotes />

      <CommunityCTA />
    </div>
  );
};

export default HomePage;