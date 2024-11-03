interface IErrorHandlerProps {
  handleResetErrorBoundary: () => void;
}

const ErrorHandler = ({ handleResetErrorBoundary }: IErrorHandlerProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 grow">
      <h1 className="text-6xl font-bold text-inactive mb-4">
        Oops! Something went wrong!
      </h1>

      <button
        className="redirect-btn"
        onClick={() => handleResetErrorBoundary()}
      >
        Try again
      </button>
    </div>
  );
};

export default ErrorHandler;
