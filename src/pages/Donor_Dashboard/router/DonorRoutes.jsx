import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DonorDashboard from '../DonorDashboard'
import PrivateRoute from '../../../router/PrivateRoute'
import DonorLayout from '../../../Layouts/DonorLayout'
import FavoritePage from '../favorite/FavoritePage'
import PublicCasesPage from './../../casePage/PublicCasesPage';
import MyDonationPage from './../myDonation/MyDonationPage';
import DonorProfilePage from '../profile/DonorProfilePage'
import NotificationsPage from '../../notificationPage/NotificationsPage'

function DonorRoutes() {
    return (
        <Routes>
            <Route element={<PrivateRoute allowedRoles={["donor"]} />}>
                <Route element={<DonorLayout />}>
                    <Route index element={<DonorDashboard />} />
                    <Route path='favorites' element={<FavoritePage />} />
                    <Route path='explore' element={<PublicCasesPage />} />
                    <Route path='my-donations' element={<MyDonationPage />} />
                    <Route path='profile' element={<DonorProfilePage />} />
                    <Route path='notifications' element={<NotificationsPage />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default DonorRoutes