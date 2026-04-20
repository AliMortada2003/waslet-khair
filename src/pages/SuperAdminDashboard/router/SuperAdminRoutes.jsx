import React from 'react'
import SuperAdminDashboard from '../SuperAdminDashboard'
import SuperAdminLayout from '../../../Layouts/SuperAdminLayout'
import PrivateRoute from '../../../router/PrivateRoute'
import { Route, Routes } from 'react-router-dom'
import CharityPage from './../charity/CharityPage';
import CategoryPage from '../categories/CategoryPage'
import CasesPage from '../cases/CasesPage'
import AdminsPage from '../admins/AdminsPage'
import DonorsPage from '../donors/DonorsPage'
import SuperAdminProfilePage from '../profile/SuperAdminProfilePage'
import NotificationsPage from '../../notificationPage/NotificationsPage'

function SuperAdminRoutes() {
    return (
        <Routes>
            <Route element={<PrivateRoute allowedRoles={["SuperAdmin"]} />}>
                <Route element={<SuperAdminLayout />}>
                    <Route index element={<SuperAdminDashboard />} />
                    <Route path="/charity" element={<CharityPage />} />
                    <Route path="/categories" element={<CategoryPage />} />
                    <Route path="/cases" element={<CasesPage />} />
                    <Route path="/users" element={<AdminsPage />} />
                    <Route path="/donors" element={<DonorsPage />} />
                    <Route path="/profile" element={<SuperAdminProfilePage />} />
                    <Route path="/notifications" element={<NotificationsPage />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default SuperAdminRoutes