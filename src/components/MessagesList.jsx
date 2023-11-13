export function MessagesList({ messages }) {
  return (
    <>
      {messages.map((msg, index) => {
        return <p key={index}>{msg}</p>;
      })}
    </>
  );
}
