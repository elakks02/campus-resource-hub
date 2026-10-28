import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Items from "./pages/Items";
import AddItem from "./pages/AddItem";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import ItemDetails from "./pages/ItemDetails";
import EditItem from "./pages/EditItem";
function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route path="/signup" element={<Signup />} />

                <Route
                    path="/items"
                    element={
                        <ProtectedRoute>
                            <Items />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/items/:id"
                    element={
                        <ProtectedRoute>
                            <ItemDetails />
                        </ProtectedRoute>
                    }
                />
                <Route
    path="/items/:id/edit"
    element={
        <ProtectedRoute>
            <EditItem />
        </ProtectedRoute>
    }
/>

                <Route
                    path="/add-item"
                    element={
                        <ProtectedRoute>
                            <AddItem />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                

                <Route
    path="/admin"
    element={
        <AdminRoute>
            <Admin />
        </AdminRoute>
    }
/>

            </Routes>
        </BrowserRouter>
    );
}

export default App;