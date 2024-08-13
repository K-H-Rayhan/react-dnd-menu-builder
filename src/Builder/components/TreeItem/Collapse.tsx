export function Collapse(props: {
  open: boolean;
  handleOpen: (open: boolean) => void;
}) {
  return (
    <div
      onPointerDown={(e) => {
        e.stopPropagation();
        props.handleOpen(!props.open);
      }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "30px",
        width: "30px",
        cursor: "pointer",
      }}
    >
      {!props.open ? (
        <svg
          width="12"
          style={{}}
          viewBox="0 0 22 22"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      ) : (
        <svg
          width="12"
          style={{
            rotate: "180deg",
          }}
          viewBox="0 0 22 22"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      )}
    </div>
  );
}
