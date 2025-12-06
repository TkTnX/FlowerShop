interface Props {
    error: Error
}

export const ErrorMessage = ({ error }: Props) => {
  return (
    <div className="error-message">
      <h3 className="error-message__title">Что-то пошло не так!</h3>
      <p className="error-message__desc">{error.message}</p>
    </div>
  );
}
