import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Suspense } from "react";
import Loader from "../UI/loader/Loader";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import CenteredLoaderWrapper from "../UI/centeredLoaderWrapper/CenteredLoaderWrapper";
import ErrorHandler from "../UI/errorHandler/ErrorHandler";

const AppLayout = () => {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col grow">
        <Suspense
          fallback={
            <CenteredLoaderWrapper>
              <Loader />
            </CenteredLoaderWrapper>
          }
        >
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ resetErrorBoundary }) => {
              const handleReset = () => {
                resetErrorBoundary();
              };
              return <ErrorHandler handleResetErrorBoundary={handleReset} />;
            }}
          >
            <Outlet />
          </ErrorBoundary>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
