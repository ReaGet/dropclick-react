import { Footer } from "components/layout/Footer";
import { Header } from "components/layout/Header";

export const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="mt-[150px] md:mt-[200px]">
        { children }
      </div>
      <Footer />
    </div>
  )
}