import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import {
    LoginForm,
    RegisterForm,
    UpdateUserForm,
    ResetPasswordForm,
    RequestPasswordResetForm,
    SearchPage,
} from './controllers';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='' element={<SearchPage />} />

                <Route path='/login' element={<LoginForm />} />
                <Route path='/register' element={<RegisterForm />} />
                <Route path='/update' element={<UpdateUserForm />} />
                <Route path='/recover'>
                    <Route index element={<RequestPasswordResetForm />} />
                    <Route path='/:id' element={<ResetPasswordForm />} />
                </Route>

                <Route path='*' element={<Navigate to='' />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
