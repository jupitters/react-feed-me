import {Component, type ReactNode} from "react";
import {ErrorState} from "./components/ErrorState.tsx";
import {Route, Routes} from "react-router-dom";

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
