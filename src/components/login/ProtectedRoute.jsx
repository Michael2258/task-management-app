const ProtectedRoute = ({ token, children }) => {
    if (!token) {
        return <Navigate to="/landing" replace />;
    }

    return children;
};
