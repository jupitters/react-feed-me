import {Component, type ReactNode, Suspense} from "react";
import {ErrorState} from "./components/ErrorState.tsx";
import {Route, Routes, useSearchParams} from "react-router-dom";
import {LoadingScreen} from "./components/LoadingScreen.tsx";

class AppErrorBoundary extends Component<{ children: ReactNode }, { error: unknown }> {
    override state = {error: null as unknown};

    static getDerivedStateFromError(error: unknown) {
        return {error};
    }

    override render() {
        if(this.state.error) {
            return <ErrorState error={this.state.error} />
        }

        return this.props.children;
    }
}

function DashboardRoute() {
    const [searchParams] = useSearchParams();
    const activeUserId = searchParams.get('user') ?? 'u1';

    return <Suspense fallback={<LoadingScreen />}>

    </Suspense>
}

function App() {
  return (
    <>
      <AppErrorBoundary>
          <Routes>
              <Route path="/"></Route>
          </Routes>
      </AppErrorBoundary>
    </>
  )
}

export default App
