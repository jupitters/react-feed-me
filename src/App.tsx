import {Component, type ReactNode} from "react";

class AppErrorBoundary extends Component<{ children: ReactNode }, { error: unknown }> {
    override state = {error: null as unknown};

    static getDerivedStateFromError(error: unknown) {
        return {error};
    }

    override render() {
        if(this.state.error) {

        }

        return this.props.children;
    }
}

function App() {
  return (
    <>
      oi
    </>
  )
}

export default App
