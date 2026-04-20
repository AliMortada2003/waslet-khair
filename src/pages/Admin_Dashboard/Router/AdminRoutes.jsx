import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../../router/PrivateRoute";
import AdminLayout from './../../../Layouts/AdminLayout';
import AdminDashboard from "../AdminDashboard";
import AdminCharityProfile from "../charity/AdminCharityProfile";
import AdminCasesPage from "../cases/AdminCasesPage";
import AdminProfilePage from "../profile/AdminProfilePage";
import CategoryPage from './../categories/CategoryPage';
import NotificationsPage from './../../notificationPage/NotificationsPage';
import AdminDonationPage from "../donation/AdminDonationPage";
export default function AdminRoutes() {
    return (
        <Routes>
            <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
                <Route element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="chprofile" element={<AdminCharityProfile />} />
                    <Route path="chcases" element={<AdminCasesPage />} />
                    <Route path="categories" element={<CategoryPage />} />
                    <Route path="profile" element={<AdminProfilePage />} />
                    <Route path="donations" element={<AdminDonationPage />} />
                    <Route path="notifications" element={<NotificationsPage />} />
                </Route>
            </Route>
        </Routes>
    );
}