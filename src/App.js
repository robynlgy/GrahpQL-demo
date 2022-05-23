import logo from "./logo.svg";
import "./App.css";
import GetUsers from "./GetUsers";
import GetUser from "./GetUser";
import GetMessages from "./GetMessages";
import NewUserForm from "./NewUserForm";
import NewMessageForm from "./NewMessageForm";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/users" element={<GetUsers />} />
          <Route path="/:username" element={<GetUser />} />
          <Route path="/:username/messages" element={<GetMessages />} />
          <Route path="/adduser" element={<NewUserForm />} />
          <Route path="/addmessage" element={<NewMessageForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
