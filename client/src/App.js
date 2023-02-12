import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Login, Register } from './controllers';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* login, register, user profile, user inventory, user orders, advanced search, about */}
                {/* <Route path='' element={<MainPage />} /> */}

                <Route path='/form'>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    {/* <Route path='/update' element={<EditUser />} /> */}
                </Route>

                <Route path='*' element={<Navigate to='' />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
