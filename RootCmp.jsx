const { useState } = React

import { AppHeader } from "./cmps/AppHeader.jsx"
import { AboutUs } from "./pages/AboutUs.jsx"
import { Home } from "./pages/Home.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"

export function App() {

    const [page, setPage] = useState('book')
    

    return (
        <section className="app">
            <AppHeader onSetPage={(page) => setPage(page)} />

            <main className="main-layout">
                {page === 'home' && <Home />}
                {page === 'about' && <AboutUs />}
                {page === 'book' && <BookIndex />}
            </main>
        </section>
    )
} 