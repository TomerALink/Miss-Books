const { useState } = React
// const Router = ReactRouterDOM.Browser //for prodaction
const Router = ReactRouterDOM.HashRouter //for dev
const { Routes, Route, Navigate } = ReactRouterDOM

import { AppHeader } from "./cmps/AppHeader.jsx"
import { AboutUs } from "./pages/AboutUs.jsx"
import { Home } from "./pages/Home.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { Team } from "./cmps/Team.jsx"
import { Vision } from "./cmps/Vision.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { NotFound } from "./cmps/NotFound.jsx"
import { BookEdit } from "./cmps/BookEdit.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"
import { AddReview } from "./cmps/AddReview.jsx"
import { BookAdd } from './cmps/BookAdd.jsx';

export function App() {
  // const [page, setPage] = useState('book')

  return (
    <Router>
      <section className="app">
        <AppHeader onSetPage={(page) => setPage(page)} />

        <main className="main-layout">

          <Routes>   
                <Route path="/" element={<Navigate to="/home"/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/about" element={<AboutUs/>}>
                    <Route path="/about/team" element={<Team/>}/>
                    <Route path="/about/vision" element={<Vision/>}/>
                </Route>
                <Route path="/book" element={<BookIndex/>}/>
                <Route path="/book/:bookId" element={<BookDetails/>}/>
                <Route path="/book/review/:bookId" element={<AddReview/>}/>
                <Route path="/book/edit/:bookId" element={<BookEdit/>}/>
                {/* <Route path="/book/add" element={<BookEdit/>}/> */}
                <Route path="/*" element={<NotFound/>}/>
                <Route path="/book/add" element={<BookAdd />} />
          </Routes>
          
        </main>
        <UserMsg/>
      </section>
    </Router>
  )
}
