import {
  Component,
  type ComponentType,
  type PropsWithChildren,
  type ReactNode,
  isValidElement,
} from "react";

type ErrorBoundaryPropsWithComponent = {
  fallback?: never;
  FallbackComponent: ComponentType<{ error: Error }>;
};

type ErrorBoundaryPropsWithFallback = {
  fallback: ReactNode;
  FallbackComponent?: never;
};

type ErrorBoundaryProps =
  | ErrorBoundaryPropsWithComponent
  | ErrorBoundaryPropsWithFallback;

type ErrorBoundaryState = {
  error?: Error;
};

export type FallbackProps = Required<ErrorBoundaryState>;

const initialState: ErrorBoundaryState = { error: undefined };

export class ErrorBoundary extends Component<
  PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  override state = initialState;

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  override render() {
    const { fallback, FallbackComponent, children } = this.props;

    if (this.state.error !== undefined) {
      if (isValidElement(fallback)) {
        return fallback;
      }
      if (FallbackComponent !== undefined) {
        return <FallbackComponent error={this.state.error} />;
      }
      throw new Error("ErrorBoundaryでfallbackが指定されていません");
    }

    return children;
  }
}
