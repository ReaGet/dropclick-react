import { Footer } from "components/layout/Footer"
import { Header } from "components/layout/Header"

export const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div class="mt-28 md:mt-44">
        { children }
      </div>
      <Footer />
    </div>
  )
}