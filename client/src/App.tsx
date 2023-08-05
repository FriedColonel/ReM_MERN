import { Outlet, Route, Routes } from 'react-router-dom'
import Login from './features/auth/Login'
import RequireAuth from './features/auth/RequireAuth'
import ResidentsList from './features/residents/List'
import ResidentCreate from './features/residents/Create'
import ResidentDetail from './features/residents/Detail'
import ResidentEdit from './features/residents/Edit'
import HouseHoldsList from './features/households/List'
import HouseholdDetail from './features/households/Detail'
import HouseholdEdit from './features/households/Edit'
import HouseholdChangeLog from './features/households/ChangeLog'
import Temporary from './features/temporary'
import Create from './features/households/Create'
import Prefetch from './features/auth/Prefetch'
import SplitHousehold from './features/households/Split'
import Overview from './features/statistical/Overview'
import Signup from './features/auth/Signup'
import PersistLogin from './features/auth/PersistLogin'
import { ROLES } from './config/roles'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* PRIVATE ROUTES */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            <Route element={<Prefetch />}>
              <Route path="nhan-khau">
                <Route index element={<ResidentsList />} />
                <Route path="them" element={<ResidentCreate />} />
                <Route path=":id" element={<ResidentDetail />} />
                <Route path="chinh-sua/:id" element={<ResidentEdit />} />
              </Route>
              <Route index element={<Overview />} />

              <Route path="ho-khau">
                <Route index element={<HouseHoldsList />} />
                <Route path=":id" element={<HouseholdDetail />} />
                <Route path="chinh-sua/:id" element={<HouseholdEdit />} />
                <Route path="them" element={<Create />} />
                <Route path="tach/:id" element={<SplitHousehold />} />
                <Route path="lich-su/:id" element={<HouseholdChangeLog />} />
              </Route>

              <Route path="nhan-khau">
                <Route index element={<ResidentsList />} />
                <Route path="them" element={<ResidentCreate />} />
                <Route path=":id" element={<ResidentDetail />} />
                <Route path="chinh-sua/:id" element={<ResidentEdit />} />
              </Route>

              <Route path="tam-tru">
                <Route index element={<Temporary />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
