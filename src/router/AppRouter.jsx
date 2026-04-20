import React from "react";
import { Routes, Route } from "react-router-dom";


// public Pages
import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import AboutPage from '../pages/About page/AboutPage';
import Login from "../pages/loginPage/LoginPage";
import Register from "../pages/registerPage/RegisterPage";
import ForgetPassword from "../pages/loginPage/ForgetPassword/ForgetPassword";
import CheckCode from "../pages/loginPage/cheeck/Cheeck";
import ResetPassword from "../pages/loginPage/resetPassword/ResetPassword";
import PrivateRoute from "./PrivateRoute";
import ZakatCalculatorPage from './../pages/ZakatCalculatorPage/ZakatCalculatorPage';
import AwarenessPage from "../pages/AwarenessPage/AwarenessPage";
import PublicCasesPage from "../pages/casePage/PublicCasesPage";
import CategoriesPage from "../pages/categoriesPage/CategoriesPage";
import CharitiesPage from "../pages/charities/CharitiesPage";

// super Admin Routes
import SuperAdminRoutes from "../pages/SuperAdminDashboard/router/SuperAdminRoutes";
// Admin Routes
import AdminRoutes from "../pages/Admin_Dashboard/Router/AdminRoutes";
// Donor Dashboard
import DonorRoutes from './../pages/Donor_Dashboard/router/DonorRoutes';
import CategoriesPageDetails from "../pages/categoriesPage/CategoriesPageDetails";
import CaseDetailsPage from "../pages/casePage/CaseDetailsPage";
import CharitesPageDetails from "../pages/charities/CharitesPageDetails";
import DonatePage from "../pages/donatePage/DonatePage";

const AppRouter = () => {
    return (
        <Routes>
            {/* 🌍 المسارات العامة */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/zakatcalc" element={<ZakatCalculatorPage />} />
            <Route path="/advice" element={<AwarenessPage />} />
            <Route path="/cases" element={<PublicCasesPage />} />
            <Route path="/case/:caseId" element={<CaseDetailsPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/categories/:slug" element={<CategoriesPageDetails />} />
            <Route path="/charities" element={<CharitiesPage />} />
            <Route path="/charities/:charityId" element={<CharitesPageDetails />} />
            <Route path="/case/:caseId/donate" element={<DonatePage />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/check-code" element={<CheckCode />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Super admin dashboard */}
            <Route element={<PrivateRoute allowedRoles={["superadmin"]} />}>
                <Route path="/supermanager/*" element={<SuperAdminRoutes />} />
            </Route>

            {/* admin charity */}
            <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
                <Route path="/admin/*" element={<AdminRoutes />} />
            </Route>


            {/* admin charity */}
            <Route element={<PrivateRoute allowedRoles={["donor"]} />}>
                <Route path="/donor/*" element={<DonorRoutes />} />
            </Route>

            {/* 🚫 صفحة 404 */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default AppRouter;