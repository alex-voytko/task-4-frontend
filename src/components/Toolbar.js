import { Button } from "react-bootstrap";
import * as Icons from "../icons";

function Toolbar({ onBlockClick, disabled, onDeleteClick }) {
  return (
    <>
      <Button
        variant="dark"
        disabled={disabled}
        type="button"
        onClick={onBlockClick}
      >
        <Icons.lockIcon />
      </Button>
      <Button
        variant="secondary"
        disabled={disabled}
        type="button"
        onClick={onBlockClick}
      >
        <Icons.unlockIcon />
      </Button>
      <Button
        variant="danger"
        disabled={disabled}
        type="button"
        onClick={onDeleteClick}
      >
        <Icons.deleteIcon />
      </Button>
    </>
  );
}

export default Toolbar;
