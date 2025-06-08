import { useUser } from "@clerk/clerk-react";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom"; // sau alt router

export function withRoleGuard(children: ReactNode, allowedRoles: string[]) {
    const { user, isLoaded } = useUser();

    if (!isLoaded) return <div>Loading...</div>;

    const role: string = user?.publicMetadata?.role as string;

    if (!role || !allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
}
