import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUser } from "../hocks/useAuthHocks";
import FullPageLoader from './../components/ui/layout/FullPageLoader';
import NotAllowedPage from './../pages/Forbidden';

export default function PrivateRoute({ allowedRoles }) {
    const { data: userData, isLoading } = useUser();
    const location = useLocation();

    // فك البيانات اللي راجعة من الـ select داخل الـ Hook
    const { user, isAuthenticated, userRole } = userData || {};

    // 1. حالة التحميل
    if (isLoading) {
        return <FullPageLoader />;
    }

    // 2. إذا لم يكن مسجل دخول، توجه لصفحة اللوجن
    if (!isAuthenticated || !user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // 3. التأكد من الصلاحيات
    const isAllowed = allowedRoles?.some(r => r.toLowerCase() === userRole?.toLowerCase());

    if (!isAllowed) {
        return <NotAllowedPage />;
    }

    return <Outlet />;
}