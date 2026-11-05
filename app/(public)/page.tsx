import { Header } from "./_components/header";
import { NavBar } from "./_components/nav-bar";
import { Hero } from "./_components/hero";
import { Categories } from "./_components/categories";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <NavBar />
      <main>
        <Hero />
        <Categories />
      </main>
    </div>


  )
}
