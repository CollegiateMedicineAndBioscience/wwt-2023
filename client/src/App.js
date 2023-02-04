import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* login, register, user profile, user inventory, user orders, advanced search, about */}
                <Route path='*' element={<Navigate to='' />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
