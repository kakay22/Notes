import Note from "./Note"
import AddNote from "./AddNote"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <>
      <Note />

      <Router>
          <Routes>
              <Route path={'/addnote'} element={<AddNote />} />
          </Routes>
      </Router>
    </>
  )
}